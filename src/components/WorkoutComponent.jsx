import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "../db";

export default function WorkoutComponent(props) {
  const [unique, setUnique] = useState([]);
  const [sets, setSets] = useState([])

  const { workout } = props;
  const { id, name, created } = workout;

  useEffect(() => {
    db.collection('sets')
      .getFullList({
        '$cancelKey': id,
        filter: `workout = "${id}"`,
        expand: `exercise`
      })
      .then((response) => {
        setSets(response)
        setUnique([...new Set(response.map((item) => item.exercise))]);
      })
      .catch((error) => {
        console.log(error.message)
      })
  }, [])

  return (
    <Link
      to={`/workout/${id}`}
      className="flex flex-col bg-light rounded-main p-4 mb-4"
    >
      <div className="flex justify-between w-full mb-2">
        <h2 className="text-lg font-bold text-main block">{name}</h2>
        <p className="block">{new Date(created).toDateString()}</p>
      </div>
      <hr />
      <ul>
        {unique?.map((item) => {
          const e = sets.find((value) => {
            return value.exercise === item
          })
          let count = 0;
          sets.forEach((value) => {
            if (value.expand.exercise.id === item) {
              count++;
            }
          });
          return (
            <li key={e.id} className="flex w-full justify-between">
              <h3>{e.expand.exercise.name}</h3>
              <p className="text-accent font-bold center">x{count}</p>
            </li>
          );
        })}
      </ul>
    </Link>
  );
}
