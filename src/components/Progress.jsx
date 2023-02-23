import { useEffect, useRef, useState } from 'react';
import { Line, LineChart, Tooltip, YAxis } from 'recharts';
import { db } from '../db';

export default function Progress() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${baseUrl}/collections/sets/records?filter=(id='${'asdf'}' && created>'2022-01-01')`)
      .then((response) => {
        if(!response.ok){
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          ) 
        } else {
          return response.json();
        }
      })
      .then((actualData) => {
        setData(actualData);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      })
  })

  const ref = useRef(null);

  return(
    <section className='mb-2'>
      <h2>Bench press 1RM progression</h2>
      <div ref={ref} className='h-32 bg-light rounded-main'>
        <p>Hello</p>
        <LineChart LineChart width={ref.current ? ref.current.offsetWidth : document.body.offsetWidth-32} height={128} data={[]}>
          <Line type="monotone" dataKey="PR" stroke="#177ed7" />
          <Tooltip />
        </LineChart>
      </div>
    </section>
  )
}