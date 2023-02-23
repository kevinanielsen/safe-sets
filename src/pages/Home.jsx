import { Gear } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import Progress from '../components/Progress';
import WorkoutDays from '../components/WorkoutDays';
import { baseUrl, db } from '../db';


export default function Home() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    db.collection('users').getOne('75vazuwr56iyr7b')
      .then((response) => {
        if(!response.id){
          throw new Error(
            `This is an HTTP error: The code is ${response.code}`
          ) 
        } else {
          return response;
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


  }, [])
  if(loading) {
    return(
      <div className='h-full w-full flex items-center justify-center m-4'>
        <ThreeDots color="#177ed7" />
      </div>
    )
  }
  return( 
    <div className='flex flex-col justify-center m-4'>
      {error && error}
      <header className='flex justify-between w-full mb-2'>
        <div className='flex justify-center align-center gap-4'>
          <img src={data && `${baseUrl}files/users/${data.id}/${data.avatar}?thumb=200x200`} alt="profile picture" className='w-20 h-20 rounded-full bg-light' />
          <h1 className='text-base font-main font-bold w-[13ch] flex justify-center items-center'>Good morning, {data && data.name.split(' ')[0]}</h1>
        </div>
        <Link to="/settings" className='bg-light rounded-full w-10 h-10 flex items-center justify-center'>
          <Gear size="32px" color="#177ed7" />
        </Link>
      </header>
      <main className=''>
        <WorkoutDays />
        {/* <Progress /> */}
        <section className='mb-2'>
          <h2>Recent articles</h2>
          <article className='h-24 bg-light rounded-main'></article>
        </section>
      </main>
    </div>
  )
}