import { useEffect, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
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
    <div className='flex flex-col items-center justify-center'>
      {data && data.items[0].name}
      {error && error}
      {loading && <ThreeDots color="#177ed7" />}
    </div>
  )
}