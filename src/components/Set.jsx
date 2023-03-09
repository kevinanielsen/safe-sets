import { useEffect, useState } from 'react';

export function Set(props) {
  const { exercise, sets, exerciseList } = props;
  const [currentSets, setCurrentSets] = useState([])
  const [currentExercise, setCurrentExercise] = useState('');
  const [loading, setLoading] = useState(true);
  const [actualSets, setActualSets] = useState([]);

  useEffect(() => {
    setCurrentSets(sets[0].reduce((result, set) => {
      if (set.exercise !== exercise) {
        result.push(set);
      }
      return result;
    }, []));

    setCurrentExercise(exerciseList.find((e) => {
      return e.id === exercise;
    }))
  }, [props])

  useEffect(() => {
    setActualSets(sets[0]?.filter((set) => set.exercise == currentExercise?.id))
    if(actualSets) {
      return setLoading(false)
    }
  }, [sets[0], currentExercise])

  if(!actualSets) {
    return <p>Loading...</p>
  }

  return(
    <div className='w-full mb-2'>
      <h2 className='font-bold text-main'>{currentExercise?.name}</h2>
      <table className='w-full'>
        <thead className='font-bold border-b-2 border-light'>
          <tr className=''>
            <td>#</td>
            <td>weight</td>
            <td>reps</td>
          </tr>
        </thead>
        <tbody>
          {actualSets.map((set) => {
            return(
              <tr key={set.id}>
                <td>{actualSets.findIndex((s) => s == set)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}