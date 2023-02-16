import { useEffect, useState } from 'react';
import { baseUrl } from '../db';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${baseUrl}/collections/users/records`)
      .then((response) => response.json())
      .then((actualData) => {
        if(actualData.items) {
          setData(actualData);
          setLoading(false);
        } else {
          setError(actualData.message);
        }
      })
      .catch((err) => {
        console.log(err.message);
        setError(err.message);
      })
  }, [setData, setLoading])


  return( 
    <div className='flex flex-col items-center justify-center w-screen h-screen'>
      {data && data.items[0].name}
      {error && error}
    </div>
  )
}