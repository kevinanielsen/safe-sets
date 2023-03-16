import { X } from "phosphor-react";
import { db } from "../db";
import { useUser } from "../context/user";

export function ChooseExercise(props) {
  const { exerciseList, handleChange, callUpdate, workoutId } = props;
  const { user } = useUser();

  function handleExercise(id) {
    db.collection("sets").create({
      "user": user.id,
      "workout": workoutId,
      "weight": 0,
      "reps": 0,
      "set_index": 0,
      "exercise": id,
      "done": false
    })
    .then((response) => {
      handleChange();
      callUpdate()
    })
    .catch((error) => {
      console.log(error.data)
    })
  }

  return (
    <div className="bg-black/50 w-full h-[105vh] top-0 left-0 absolute flex items-center justify-center">
      <div className="z-20 relative bg-white p-8 rounded-main h-4/6 w-4/6">
        <X
          className="absolute right-3 top-3 w-6 h-6 cursor-pointer"
          onClick={handleChange}
        />
        <h1 className="font-bold text-lg">Choose an exercise to add</h1>
        <hr className="my-2 border-b-2 border-light" />

        <ul className="flex flex-col shrink overflow-y-scroll max-h-[95%] mb-16">
          {exerciseList.map((exercise) => {
            return (
              <li
                className="even:bg-gray-100 odd:bg-light hover:py-2 transition-all duration-75 my-2 hover:my-0"
                key={exercise.id}
              >
                <button
                  className="w-full h-full text-left p-1"
                  onClick={() => {
                    handleExercise(exercise.id);
                  }}
                >
                  {exercise.name}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
