import { useEffect, useState } from "react";
import WorkoutComponent from "../components/WorkoutComponent";
import { useUser } from "../context/user";
import { useWorkout } from "../context/workout";
import { db } from "../db";

export default function History() {
  const { user } = useUser();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);

  const { setName, setStartTime, setId, setSets } = useWorkout();

  useEffect(() => {
    setName("");
    setStartTime("");
    setId("");
    setSets([]);

    db.collection("workout")
      .getFullList(9999, {
        filter: `user = "${user.id}"`,
        sort: "created",
        expand: "sets.exercise",
      })
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <main>
        <h2>Loading...</h2>
      </main>
    );
  }

  return (
    <main className="m-4 flex justify-center items-center">
      <div className="flex flex-col w-full sm:w-3/4 mb-16">
        <h1 className="text-xl font-bold mb-4">
          Workout history of {user.name.split(" ")[0]}
        </h1>
        {data?.map((workout) => {
          return <WorkoutComponent key={workout.id} workout={workout} />;
        })}
      </div>
    </main>
  );
}
