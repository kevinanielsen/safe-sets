import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import Template from "../components/Template";
import { useUser } from "../context/user";
import { useWorkout } from "../context/workout";
import { db } from "../db";
import { Navigate } from 'react-router-dom'
import { toast } from "react-toastify";

export default function NewWorkout() {
  const [templates, setTemplates] = useState([]);
  const navigate = useNavigate();

  const { setSets, setName, setStartTime, id, setId } =
    useWorkout();

  const { user } = useUser();

  if (!user.id) {
    toast.error('You must be logged in!')
    return <Navigate to="/" replace />;
  }

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

  // Checks database for active workout, if one occures, sets state to fetched data
  useEffect(() => {
    db.collection("workout")
      .getFullList(200, {
        filter: `active = true && user = "${user.id}"`,
        expand: "sets.exercise",
      })
      .then((response) => {
        if (response.length == 1) {
          const time = new Date(response[0].created);
          setStartTime(time.toLocaleTimeString());
          setName(response[0].name);
          setSets(response[0].expand.sets);
          setId(response[0].id);
        }
      })
      .catch(e => {
        console.log(e.data)
      })
  }, []);

  useEffect(() => {
    if (id) {
      navigate(`/workout/${id}`);
    } else {
      console.log("No id found", id);
    }
  }, [id]);

  // Create a new, empty workout and navigate user to the corresponding page
  function handleNewWorkout() {
    db.collection("workout")
      .create({
        name: "New Workout",
        user: user.id,
        sets: [],
        active: true,
      })
      .then((response) => {
        console.log(response);
        navigate(`/workout/${response.id}`);
      });
  }

  return (
    <main className="m-4 mb-12">
      <h1 className="font-bold font-main text-xl">New workout</h1>
      <button
        className="font-bold font-main text-main text-base p-4 my-4 w-full text-left bg-light rounded-main"
        onClick={handleNewWorkout}
      >
        Start empty workout
      </button>
      <h1 className="font-bold font-main text-xl">Templates</h1>
      <div className="mt-4 flex flex-wrap gap-4 justify-center">
        {/* {templates.map((template) => (
          <Template key={template.id} workout={template} />
        ))} */}
        <h2 className="font-bold text-lg bg-main px-4 py-2 rounded-lg text-white">Coming Soon!</h2>
      </div>
    </main>
  );
}
