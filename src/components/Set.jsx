import { useEffect, useState } from 'react';

export function Set(props) {
  const { exercise, sets, exerciseList } = props;
  const [currentSets, setCurrentSets] = useState([])
  const [currentExercise, setCurrentExercise] = useState('');
  const [loading, setLoading] = useState(true);

  // console.log(sets);
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
  }, [])

  return(
    <div className='w-full mb-2'>
      <h2 className='font-bold'>{currentExercise?.name}</h2>
    </div>
  )
}