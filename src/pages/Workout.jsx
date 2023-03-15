import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Exercise } from "../components/Exercise";
import { ActiveExercise } from "../components/ActiveExercise";
import { useUser } from "../context/user";
import { useWorkout } from "../context/workout";
import { db } from "../db";
import { toast } from "react-toastify";

export default function Workout() {
  // Check if user is logged in.
  const { user } = useUser();

  /* ---------------------- */

  const { sets, handleSets, setSets, name, setName, startTime, setStartTime } =
    useWorkout();

  const params = useParams();
  const navigate = useNavigate();
  const id = params.id;

  const [loading, setLoading] = useState(true);
  const [created, setCreated] = useState({});
  const [active, setActive] = useState(true);
  const [exercises, setExercises] = useState([]);
  const [unique, setUnique] = useState([]);
  const [exerciseList, setExerciseList] = useState([]);
  const [check, update] = useState(false)

  useEffect(() => {
    // Fetch info about current workout and add data to context
    db.collection("workout")
      .getOne(id, {
        expand: "sets.exercise",
      })
      .then((response) => {
        setActive(response.active);
        setCreated(new Date(response.created));
        setName(response.name);
        setStartTime(new Date(response.created).toLocaleTimeString());
      })
      .finally(() => {
        setLoading(false);
      });

      db.collection('sets')
        .getFullList(200, {
          filter: `workout = "${id}"`
        })
        .then(response => {
          setSets(response);
        })

  // Fetch exercise list
      
  }, [check]);

  useEffect(() => {
    db.collection("exercises")
        .getFullList()
        .then(response => {
          setExerciseList(response);
        })
        .catch(e => {
          toast.error(e.data.exercises.message)
        })
  }, [])

  // Lists exercises performed
  useEffect(() => {
    setExercises(sets?.map((set) => set.exercise));
  }, [sets, check]);
  
  // Sets the unique exercises in this workout so the sets can be split up into exercises.
  useEffect(() => {
    if (exercises) {
      setUnique(exercises.filter((item, i, ar) => ar.indexOf(item) === i).filter((item) => item.length != 0));
    }
  }, [exercises, check]);
  
  function handleEnd() {
    db.collection("workout")
      .update(id, {
        name: name,
        user: user.id,
        active: false,
      })
      .then(res => {
        console.log(res);
      });
  }

  function callUpdate() {
    update(!check)
  }

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
          {active && unique?.map((set) => {
            return (
              <ActiveExercise
                key={set}
                exercise={set}
                sets={sets}
                exerciseList={exerciseList}
                workoutId={id}
                callUpdate={callUpdate}
              />
            );
          })}
          {!active && unique?.map((set) => {
            return (
              <Exercise
                key={set}
                exercise={set}
                sets={sets}
                exerciseList={exerciseList}
                workoutId={id}
                callUpdate={callUpdate}
              />
            );
          })}
          <hr className="mb-2 border-b-2 w-full border-light" />
          {active && <button className="bg-light text-main font-bold text-sm w-full rounded-lg p-2">
            Add exercise
          </button>}
        </div>
        {active && (
          <button
            onClick={handleEnd}
            className="bg-green-300 text-green-700 font-bold text-sm rounded-lg p-2 w-full"
          >
            End workout
          </button>
        )}
      </div>
    </main>
  );
}
