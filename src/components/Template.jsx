import { useEffect, useState } from 'react';
import { db } from '../db';

export default function Template(props) {
  const template = props.workout;
  const [ids, setIds] = useState([]);
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [exercises, setExercises] = useState([]);
  
  useEffect(() => {
    let isCancelled = false;
    if(!isCancelled) {
      db.collection('templateSets').getFullList(100, {
        sort: '-created',
        '$autoCancel': false
      })
        .then((response) => {
          setIds(response.map((item) => {
            if(template.sets.includes(item.id)){
              return item;
            } else {
              return null;
            }
          }).filter((item) => item))
        })
        .finally(() => {
          setLoading1(false);
        })
    }

    return () => {
      isCancelled = true;
    }
  }, [])

  useEffect(() => {
    let isCancelled = false

    if(!isCancelled) {
      db.collection('exercises').getFullList(100, {
        sort: '-created',
        '$autoCancel': false
      })
        .then((response) => {
          setExercises(response);
        })
        .finally(() => {
          setLoading2(false)
        })
    }

    return () => {
      isCancelled = true
    }
  }, [])

  if(loading1 || loading2) {
    return(
      <div className="bg-light rounded-main w-template flex flex-col p-4 gap-1">
        <h1 className="font-bold text-base text-main">Loading...</h1>
      </div>
    )
  }

  // {sets && sets.map((set) => {
  //   <h1>{set.exercise.name}</h1>
  // })}

  console.log(
    exercises.find((exercise) => {
      return exercise.id == ids[0].exercise
    })
  )

  // console.log(ids.map((id) => {
  //   exercises.find((exercise) => {
  //     return exercise.id == id.exercise
  //   })
  // }))

  return(
    <div className="bg-light rounded-main w-template flex flex-col p-4 gap-1">
      <h1 className="font-bold text-base text-main">{template.name}</h1>
      <h1>{ids.map((id) => {
          exercises.find((exercise) => {
            return exercise.id == id.exercise
          }).name
        })}</h1>
    </div>
    
  )

}