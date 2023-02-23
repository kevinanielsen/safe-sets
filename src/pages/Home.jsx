import { Gear } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { baseUrl } from '../db';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${baseUrl}/collections/users/records`)
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
  }, [])


  return( 
    <div className='flex flex-col items-center justify-center m-4'>
      {/* {data && data.items[0].name}
      {error && error}
      {loading && <ThreeDots color="#177ed7" />} */}
      <div className='flex justify-between w-full'>
        <div className='flex justify-center align-center gap-4'>
          <img src={data && `${baseUrl}/files/users/${data.items[0].id}/${data.items[0].avatar}?thumb=200x200`} alt="profile picture" className='w-20 h-20 rounded-full bg-light' />
          <h1 className='text-base font-main font-bold w-[13ch] flex justify-center items-center'>Good morning, {data && data.items[0].name.split(' ')[0]}</h1>
        </div>
        <Link to="/settings" className='bg-light rounded-full w-10 h-10 flex items-center justify-center'>
          <Gear size="32px" color="#177ed7" />
        </Link>
        
      </div>
    </div>
  )
}