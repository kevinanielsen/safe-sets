import { } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Template from '../components/Template';
import { db } from '../db';

export default function NewWorkout() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    pb.collection('templates').getFullList(200, {
      sort: '-created',
    })
    .then((response) => {
      console.log(response);
    })
  })

  return(
    <main>
      <h1 className='font-bold font-main text-xl'>New workout</h1>
      <button className='font-bold font-main text-main text-base p-4 mt-4 w-full text-left bg-light rounded-main'>Start empty workout</button>
      <h1 className='font-bold font-main text-xl'>Templates</h1>
      {templates.map((template) => <Template workout={template}/>)}
    </main>
  )
}