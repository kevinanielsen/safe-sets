import { useEffect, useState } from 'react';
import { Check } from 'phosphor-react';

export function Exercise(props) {
  const { exercise, sets, exerciseList } = props;
  const [currentSets, setCurrentSets] = useState([])
  const [currentExercise, setCurrentExercise] = useState('');
  const [loading, setLoading] = useState(true);
  const [actualSets, setActualSets] = useState([]);

  useEffect(() => {
    // Sets the sets that are relevant
    setCurrentSets(sets[0].reduce((result, set) => {
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
    setActualSets(sets[0]?.filter((set) => set.exercise == currentExercise?.id))
    if(actualSets) {
      return setLoading(false)
    }
  }, [sets[0], currentExercise])

  if(loading) {
    return <p>Loading...</p>
  }

  return(
    <div className='w-full mb-2'>
      <h2 className='font-bold text-main'>{currentExercise?.name}</h2>
      <table className='w-full'>
        <thead className='font-bold'>
          <tr className='text-gray-300 text-center'>
            <td className="w-1/6">Set</td>
            <td className="w-1/6">KG</td>
            <td className="w-1/6">Reps</td>
            <td className="w-full flex justify-end"><Check size={32} color="#cbd5e1" weight="bold" /></td>
          </tr>
        </thead>
        <tbody className="text-center font-bold">
          {actualSets.map((set) => {
            // console.log(set)
            return <Set key={set.id} actualSets={actualSets} KG={set.weight} reps={set.reps} done={set.done} set={set} />
          })}
        </tbody>
      </table>
    </div>
  )
}