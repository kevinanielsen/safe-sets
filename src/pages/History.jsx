import { useEffect, useState } from 'react';
import WorkoutComponent from '../components/WorkoutComponent';
import { useUser } from '../context/user';
import { db } from '../db';

export default function History() {
  const { user } = useUser();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);
  const [days, setDays] = useState([]);

  useEffect(() => {
    db.collection('workout')
      .getFullList(9999, {
        filter: `user = "${user.id}"`,
        sort: 'created'
      })
      .then(res => {
        setData(res);
      })
      .catch(err => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      })
  }, [])

  if(loading) {
    return(
      <main>
        <h2>Loading...</h2>
      </main>
    )
  }

  return(
    <main className='m-4 flex justify-center items-center h-main w-full overflow-hidden'>
      <div className="flex flex-col w-full sm:w-3/4">
        
        <h1>Calendar of {user.name}</h1>
        {data?.map((workout) => {
          return (
            <WorkoutComponent key={workout.id} workout={workout} />
          )
        })}
      </div>
    </main>
  )
}