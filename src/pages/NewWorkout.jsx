import { } from "phosphor-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Template from "../components/Template";
import { useUser } from "../context/user";
import { useWorkout } from "../context/workout";
import { db } from "../db";

export default function NewWorkout() {
  const [error, setError] = useState(null);
  const [templates, setTemplates] = useState([]);
  const navigate = useNavigate();

  const {
    sets,
    handleSets,
    name,
    setName,
    startTime,
    setStartTime,
    id,
    setId,
  } = useWorkout();

  const { user } = useUser();

  //Get list of workout templates/routines
  useEffect(() => {
    db.collection("templates")
      .getFullList(200, {
        sort: "-created",
      })
      .then((response) => {
        setTemplates(response);
      });
  }, []);

  useEffect(() => {
    if (id) {
      navigate(`/workout/${id}`);
    }
  });

  // Checks database for active workout, if one occures, sets state to fetched data
  useEffect(() => {
    db.collection("workout")
      .getFullList(200, {
        filter: `active = true`,
        expand: "sets.exercise",
      })
      .then((response) => {
        if (response.length == 1) {
          const time = new Date(response[0].created);
          setStartTime(time.toLocaleTimeString());
          setName(response[0].name);
          handleSets(response[0].expand.sets);
          setId(response[0].id);
        }
      });
  }, []);

  // Create a new, empty workout and navigate user to the corresponding page
  function handleNewWorkout() {
    db.collection("workout")
      .create({
        name: "New Workout",
        user: user.id,
        sets: [],
      })
      .then((response) => {
        navigate(`/workout/${response.id}`);
      });
  }

  return (
    <main className="m-4">
      <h1 className="font-bold font-main text-xl">New workout</h1>
      <button
        className="font-bold font-main text-main text-base p-4 my-4 w-full text-left bg-light rounded-main"
        onClick={handleNewWorkout}
      >
        Start empty workout
      </button>
      <h1 className="font-bold font-main text-xl">Templates</h1>
      <div className="mt-4 flex flex-wrap gap-4 justify-between">
        {templates.map((template) => (
          <Template key={template.id} workout={template} />
        ))}
      </div>
    </main>
  );
}
