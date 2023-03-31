import { useState, useEffect } from "react";
import { db } from "../db";
import { findHighestRM } from "../util/findHighestRM";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useUser } from "../context/user";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function Progress() {
  const [loading, setLoading] = useState(true);
  const [sets, setSets] = useState(null);
  const [records, setRecords] = useState([]);
  const [data, setData] = useState([]);
  const [exercise, setExercise] = useState({});

  const { user } = useUser();

  useEffect(() => {
    if(user.exercise.length > 1) {
      db.collection("sets")
        .getFullList(9999, {
          filter: `exercise = "${user.exercise}" && user = "${user.id}"`,
          expand: "workout",
        })
        .then((response) => {
          setSets(response);
        })
        .catch((err) => {
          toast.error(err.message);
          setSets(null);
        })
        .finally(() => {
          setLoading(false);
        });

      db.collection("exercises")
        .getOne(user.exercise)
        .then((response) => {
          setExercise(response)
        })
        .catch((error) => {
          console.error(error);
        })
    } else {
      setSets(null)
      setLoading(false);
    }

  }, []);

  useEffect(() => {
    sets && setRecords(findHighestRM(sets));
  }, [sets]);

  useEffect(() => {
    setData(
      records?.map((record) => {
        const date = new Date(record.rm.set.created)
          .toLocaleString()
          .split(" ")[0];
        return {
          rm: Math.round(record.rm.rm * 100) / 100,
          date: date,
        };
      })
    );
  }, [records]);

  if(user.exercise.length === 0) {
    return(
      <div className="h-32 bg-light rounded-main flex flex-col justify-center items-center">
        <h2 className="font-bold text-lg">No exercise chosen</h2>
        <p>Go to <Link className="text-main underline font-bold">settings</Link> and set your favorite exercise to track</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="h-full w-full flex items-center justify-center m-4">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <section className="mb-2">
      <h2>{exercise.name} 1RM progression</h2>
      <div className="h-32 bg-light rounded-main">
        <ResponsiveContainer>
          <LineChart data={data}>
            <Tooltip />
            <YAxis dataKey="rm" 
              domain={['dataMin', 'dataMax']}
              hide={true}
            />
            <XAxis dataKey="date" />
            <Line type="monotone" dataKey="rm" stroke="#177ED7" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
