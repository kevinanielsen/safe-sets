import { useState } from "react";
import { Check, X } from "phosphor-react";
import { db } from "../db";
import { useUser } from "../context/user";
import { toast } from "react-toastify";

export function ActiveSet(props) {
  const { actualSets, set, KG, reps, done, workoutId, callUpdate } = props;
  const { id } = set;
  const { user } = useUser();
  
  // States
  const [weight, setWeight] = useState(KG);
  const [repCount, setRepCount] = useState(reps);
  const [finished, setFinished] = useState(done);

  function handleDone() {
    db.collection("sets")
      .update(id, {
        user: user.id,
        workout: workoutId,
        weight: weight,
        reps: repCount,
        set_index: index,
        exercise: set.exercise,
        done: !finished,
      })
      .then((response) => {
      })
      .catch((error) => {
        toast.error("Lost connection to database");
        console.log(error);
      });

    setFinished(!finished);
  }

  function handleDelete() {
    db.collection("sets")
      .delete(id)
      .then((response) => {
        callUpdate()
      })
      .catch((error) => {
        console.log(error)
        toast.error("Server error")
      })
  }

  // Set the background color of the row
  const index = actualSets.findIndex((s) => s == set);
  const even = index % 2 === 0;
  let bgColor = even && "bg-gray-100";
  if (finished && even) {
    bgColor = "bg-green-300";
  } else if (finished && !even) {
    bgColor = "bg-green-200";
  }

  return (
    <tr key={set.id} className={`${bgColor}`}>
      <td className="w-1/6">{index + 1}</td>
      <td className="w-1/6">
        <input
          type="number"
          value={weight}
          className="bg-transparent w-full text-center"
          onChange={(e) => setWeight(e.target.value)}
          placeholder={KG}
        />
      </td>
      <td className="w-1/6">
        <input
          type="number"
          value={repCount}
          className="bg-transparent w-full text-center"
          onChange={(e) => setRepCount(e.target.value)}
        />
      </td>
      <td className="w-full flex justify-end my-1 pr-2">
        <button onClick={handleDelete}>
            <X
              weight="bold"
              size={24}
              color="#fff"
              className="bg-red-300 rounded-lg mr-2"
            />
          </button>
        <button onClick={handleDone}>
          <Check
            weight="bold"
            size={24}
            color="#ffffff"
            className="bg-transBlack rounded-lg"
          />
        </button>
      </td>
    </tr>
  );
}
