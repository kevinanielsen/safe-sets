import { useEffect, useState } from 'react';
import { ActiveSet } from './ActiveSet';
import { Check } from 'phosphor-react';
import { db } from '../db';
import { useUser } from '../context/user';
import { toast } from 'react-toastify';
import { useWorkout } from '../context/workout';

export function ActiveExercise(props) {
  const { exercise, sets, exerciseList, workoutId, callUpdate } = props;
  const [currentSets, setCurrentSets] = useState([])
  const [currentExercise, setCurrentExercise] = useState('');
  const [loading, setLoading] = useState(true);
  const [actualSets, setActualSets] = useState([]);

  const { handleSets } = useWorkout()

  const {user} = useUser(); 

  useEffect(() => {
    // Sets the sets that are relevant
    setCurrentSets(sets.reduce((result, set) => {
      if (set.exercise !== exercise) {
        result.push(set);
      }
      return result;
      
    }, []));

    // Sets the current exercise
    setCurrentExercise(exerciseList.find((e) => {
      return e.id === exercise;
    }))
  }, [props])

  useEffect(() => {
    // Updates state for relevant sets for the current exercise
    setActualSets(sets?.filter(set => set.exercise == currentExercise?.id))
    if(actualSets) {
      return setLoading(false)
    }
  }, [sets[0], currentExercise])

  function handleNewSet() {
    db.collection('sets')
      .create({
        "user": user.id,
        "workout": workoutId,
        "weight": 0,
        "reps": 0,
        "exercise": exercise,
        "done": false
      })
      .then(response => {
        handleSets(response)
        callUpdate();
      })
      .catch(e => {
        toast.error(e.data.data.reps.message)
      })
  }


  if(loading) {
    return <p>Loading...</p>
  }

  return(
    <div className='w-full mb-2'>
      <h2 className='font-bold text-main'>{currentExercise?.name}</h2>
      <table className='w-full'>
        <thead className='font-bold'>
          <tr className='text-gray-300 text-center'>
            <th className="w-1/6">Set</th>
            <th className="w-1/6">KG</th>
            <th className="w-1/6">Reps</th>
            <th className="w-full flex justify-end pr-1"><Check size={32} color="#cbd5e1" weight="bold" /></th>
          </tr>
        </thead>
        <tbody className="text-center font-bold">
          {actualSets.map((set) => {
            return <ActiveSet key={set.id} actualSets={actualSets} KG={set.weight} reps={set.reps} done={set.done} set={set} workoutId={workoutId} />
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4">
              <button className="w-full bg-light rounded-lg mt-2 text-main font-bold p-1 text-sm" onClick={handleNewSet}>Add set</button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}