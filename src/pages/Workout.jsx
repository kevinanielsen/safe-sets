import { HandbagSimple } from "phosphor-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Set } from '../components/Set';
import { useWorkout } from "../context/workout";
import { db } from "../db";

export default function Workout() {
  // Check if user is logged in.
  const [user, setUser] = useState({});
  if (!user.id && db.authStore.model) {
    setUser(db.authStore.model);
  }
  useEffect(() => {
    if (!user.id) {
      navigate("/login");
    }
  }, [user]);

  /* ---------------------- */

  const { sets, handleSets, name, setName, startTime, setStartTime } =
    useWorkout();

  const params = useParams();
  const id = params.id;

  const [loading, setLoading] = useState(true);
  const [created, setCreated] = useState({});
  const [active, setActive] = useState(true);
  const [exercises, setExercises] = useState([]);
  const [unique, setUnique] = useState([]);
  const [exerciseList, setExerciseList] = useState([])

  // Fetch info about current workout and add data to context
  useEffect(() => {
    db.collection("workout")
      .getOne(id, {
        expand: "sets.exercise",
      })
      .then((response) => {
        setActive(response.active);
        setCreated(new Date(response.created));
        handleSets(response.expand.sets);
        setName(response.name);
        setStartTime(new Date(response.created).toLocaleTimeString());
        
        
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Fetch exercise list
  useEffect(() => {
    db.collection("exercises")
      .getFullList()
      .then((response) => {
        setExerciseList(response);
      })
  }, [])

  function handleEnd() {
    db.collection('workout')
      .update(id, {
        "name": name,
        "user": user.id,
        "sets": sets,
        "active": false,
      })
      .then((res) => {
        console.log(res)
      })
  }

  // Lists exercises performed
  useEffect(() => {
    setExercises(sets[0]?.map((set) => set.exercise))
  }, [sets])

  useEffect(() => {
    if(exercises) {
      setUnique(exercises.filter((item, i, ar) => ar.indexOf(item) === i));
    }
  }, [exercises])

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <main className="flex flex-col m-4 h-main">
      <div>
        <div className="flex justify-between mb-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.value)}
            className="text-xl font-bold text-gray-500"
          />
          <p className="flex justify-end grow">{created.toDateString()}</p>
        </div>
        <hr className="border-light border mb-4" />
      </div>
      <div className="flex items-center flex-col justify-between h-main2 mb-6">
        <div className="w-full flex flex-col items-center">
          {unique?.map((set) => {
            return <Set key={set} exercise={set} sets={sets} exerciseList={exerciseList} />
          })}
          <button className="bg-light text-main font-bold text-sm w-full rounded-lg p-2">
            Add exercise
          </button>
        </div>
        {active && 
        <button 
          onClick={handleEnd}
          className="bg-green-300 text-green-700 font-bold text-sm w-full rounded-lg p-2"
        >End workout</button>}
      </div>
    </main>
  );
}
