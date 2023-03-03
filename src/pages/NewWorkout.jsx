import { } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Template from '../components/Template';
import { db } from '../db';

export default function NewWorkout() {
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);
  const [templates, setTemplates] = useState([])

  const navigate = useNavigate();

  if(!user.id && db.authStore.model) {
    setUser(db.authStore.model);
  }

  useEffect(() => {
    if(!user.id) {
      navigate('/login');
    }
  }, [user])

  useEffect(() => {
    db.collection('templates').getFullList(200, {
      sort: '-created',
    })
    .then((response) => {
      setTemplates(response);
    })
      
      
  }, [])

  function handleNewWorkout() {
    db.collection('workout').create({
      "name": "New Workout",
      "user": user.id,
      "sets": []
    })
      .then((response) => {
        console.log(response);
        navigate(`/workout/${response.id}`)
      })
  }

  return(
    <main className='m-4'>
      <h1 className='font-bold font-main text-xl'>New workout</h1>
      <button className='font-bold font-main text-main text-base p-4 my-4 w-full text-left bg-light rounded-main' onClick={handleNewWorkout}>Start empty workout</button>
      <h1 className='font-bold font-main text-xl'>Templates</h1>
      <div className='mt-4 flex flex-wrap gap-4 justify-between'>
        {templates.map((template) => <Template key={template.id} workout={template}/>)}
      </div>
    </main>
  )
}