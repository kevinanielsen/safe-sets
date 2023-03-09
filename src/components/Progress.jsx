import { useEffect, useRef, useState } from 'react';
import { Line, LineChart, Tooltip, YAxis } from 'recharts';
import { db } from '../db';

export default function Progress() {
  const [loading, setLoading] = useState(true);
  const [sets, setSets] = useState(null);
  const [error, setError] = useState(null);

  db.collection('sets').getList(1, 100, {
    filter: 'exercise = "Bench Press (Barbell)"'
  })
    .then((response) => {
      setSets(response);
      setError(null);
    })
    .catch((err) => {
      setError(err.message);
      setSets(null);
    })
    .finally(() => {
      setLoading(false);
    })


  const ref = useRef(null);

  if(loading) {
    return(
      <div className='h-full w-full flex items-center justify-center m-4'>
        <ThreeDots color="#177ed7" />
      </div>
    )
  }

  return(
    <section className='mb-2'>
      <h2>Bench press 1RM progression</h2>
      <div ref={ref} className='h-32 bg-light rounded-main'>
        <LineChart LineChart width={ref.current ? ref.current.offsetWidth : document.body.offsetWidth-32} height={128} data={[]}>
          <Line type="monotone" dataKey="PR" stroke="#177ed7" />
          <Tooltip />
        </LineChart>
      </div>
    </section>
  )
}