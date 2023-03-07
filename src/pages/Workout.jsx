import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../db";

export default function Workout() {
  // Check if user is logged in.
  const [user, setUser] = useState({});
  if(!user.id && db.authStore.model) {
    setUser(db.authStore.model);
  }
  useEffect(() => {
    if(!user.id) {
      navigate('/login');
    }
  }, [user])

  /* ---------------------- */

  const params = useParams();
  const id = params.id;

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [workoutName, setWorkoutName] = useState()

  useEffect(() => {
    db.collection('workout').getOne(id, {
      expand: 'sets.exercise',
    })
      .then((response) => {
        setData(response);
        setWorkoutName(response.name)
      })
      .finally(() => {
        setLoading(false);
      })
  }, [params])

  if(loading) {
    return <h1>Loading...</h1>
  }

  return(
    <main className="flex flex-col m-4">
      <div className="flex justify-between mb-4">
        <input 
          type="text" 
          value={workoutName} 
          onChange={(e) => setWorkoutName(e.value)}
          className="text-xl font-bold text-gray-500"
        />
        <p className="flex justify-end grow">{new Date().toDateString()}</p>
        
      </div>
      <hr className="border-light border mb-4" />
      <div className="w-full flex flex-col h-full items-center">
        <button className="bg-light text-main font-bold text-sm w-full rounded-lg p-2">Add exercise</button>  
      </div>
    </main>
  )
}