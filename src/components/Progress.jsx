import { useState, useEffect } from "react";
import { db } from "../db";
import { findHighestRM } from "../util/findHighestRM";
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { useUser } from '../context/user';

export default function Progress() {
  const [loading, setLoading] = useState(true);
  const [sets, setSets] = useState(null);
  const [error, setError] = useState(null);
  const [records, setRecords] = useState([]);
  const [data, setData] = useState([]); 

  const { user } = useUser()

  useEffect(() => {
    db.collection("sets")
      .getFullList(9999, {
        filter: `exercise = "49v934ve51wubof" && user = "${user.id}"`,
        expand: "workout",
      })
      .then((response) => {
        setSets(response);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setSets(null);
      })
      .finally(() => {
        setLoading(false);
      });
      
  }, []);

  useEffect(() => {
    sets && setRecords(findHighestRM(sets))
  }, [sets])

  useEffect(() => {
    setData(records?.map(record => {
      const date = new Date(record.rm.set.created).toDateString();
      return {
        rm: Math.round(record.rm.rm * 100) / 100,
        date: date
      }
    }))
  }, [records])

  if (loading) {
    return (
      <div className="h-full w-full flex items-center justify-center m-4">
        <h2>Loading...</h2>
      </div>
    );
  }  

  console.log(data)

  return (
    <section className="mb-2">
      <h2>Bench press 1RM progression</h2>
      <div className="h-32 bg-light rounded-main">
        <ResponsiveContainer>
          <LineChart data={data}>
            <Tooltip />
            <XAxis dataKey="date" />
            <Line type="monotone" dataKey="rm" stroke="#177ED7" />
          </LineChart>
        </ResponsiveContainer>
        
      {/* {records?.map((record) => {
        return <h3>{Math.round(record.rm.rm * 100) / 100}</h3>
      })} */}
      </div>
    </section>
  );
}