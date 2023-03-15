import { Gear } from "phosphor-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Articles from "../components/Articles";
import Progress from "../components/Progress";
import WorkoutDays from "../components/WorkoutDays";
import { useUser } from "../context/user";
import { baseUrl, db } from "../db";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const { user } = useUser();

  // Fetch user data from database
  useEffect(() => {
    if (user.id) {
      db.collection("users")
        .getOne(user.id)
        .then((response) => {
          if (!response.id) {
            throw new Error(
              `This is an HTTP error: The code is ${response.code}`
            );
          } else {
            return response;
          }
        })
        .then((actualData) => {
          setData(actualData);
          setError(null);
        })
        .catch((err) => {
          setError(err.message);
          setData(null);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col justify-center m-4 mb-16">
      {error && error}
      <header className="flex justify-between w-full mb-2">
        <div className="flex justify-center align-center gap-4">
          <img
            src={`${baseUrl}files/users/${data.id}/${data.avatar}?thumb=80x80`}
            alt="profile picture"
            className="w-20 h-20 rounded-full bg-light bg-[length:100px_100px]"
          />
          <h1 className="text-base font-main font-bold w-[13ch] flex justify-center items-center">
            Good morning, {data.name.split(" ")[0]}
          </h1>
        </div>
        <Link
          to="/settings"
          aria-label="Settings"
          className="bg-light rounded-full w-10 h-10 flex items-center justify-center"
        >
          <Gear size="32px" color="#177ed7" />
        </Link>
      </header>
      <main className="">
        <WorkoutDays user={user.id} />
        <Progress />
        <Articles />
      </main>
    </div>
  );
}
