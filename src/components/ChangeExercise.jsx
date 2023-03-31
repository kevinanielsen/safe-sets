import { X } from "phosphor-react";
import { useEffect, useState } from "react";
import { db } from "../db";
import { useUser } from "../context/user";
import { toast } from "react-toastify";

export default function ChangeExercise(props) {
  const [exerciseList, setExerciseList] = useState([]);
  const [input, setInput] = useState("");
  const { handleChange, exercise } = props;
  const { user } = useUser();

  useEffect(() => {
    db.collection("exercises")
      .getFullList()
      .then((response) => {
        setExerciseList(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function handleExercise(exerciseId) {
    db.collection("users")
      .update(user.id, {
        "exercise": exerciseId
      })
      .then((response) => {
        toast.success('Exercise successfully changed')
        handleChange()
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="bg-black/50 w-full h-full top-0 left-0 absolute flex items-center justify-center">
      <div className="z-20 relative bg-white p-7 rounded-main h-5/6">
        <X
          className="absolute right-3 top-3 w-6 h-6 cursor-pointer"
          onClick={handleChange}
        />
        {exercise && 
          <h2>Current exercise: {exercise.name}</h2>
        }
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border-2 border-main rounded-md w-full p-2 mb-2 transition-all focus:outline-main focus:outline-2 outline-offset-0 outline-none"
          placeholder="Search"
        />
        <List
          exerciseList={exerciseList}
          handleExercise={handleExercise}
          input={input}
        />
      </div>
    </div>
  );
}

function List(props) {
  const { exerciseList, handleExercise } = props;
  const filteredData = exerciseList.filter((el) => {
    //if no input the return the original
    if (props.input === "") {
      return el;
    }
    //return the item which contains the user input
    else {
      return el.name.toLowerCase().includes(props.input);
    }
  });

  return (
    <ul className="flex flex-col overflow-scroll h-[80%]">
      {filteredData.map((exercise) => {
        return (
          <li
            className="even:bg-gray-100 odd:bg-light hover:py-2 font-bold text-main transition-all duration-75 my-2 hover:my-0"
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
  );
}
