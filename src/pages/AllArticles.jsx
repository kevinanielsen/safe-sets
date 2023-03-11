import { useEffect, useState } from 'react';
import Thumbnail from '../components/Thumbnail';

export default function AllArticles() {
  const [articles, setArticles] = useState([])
  const [data, setData] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/fetchNotion')
      .then((response) => response.json())
      .then((data) => setArticles(data.results))
      .finally(() => setLoading(false))
  }, [])

  if(loading) {
    <main className='flex w-full h-main justify-center items-center'>
      <h2>Loading...</h2>
    </main>
  }


  return(
    <main className='m-4'>
      <h1 className='text-xl font-bold'>All Articles</h1>
      <div>
        {articles.map(item => {
          const properties = item.properties;
          return <Thumbnail img={properties.Image.files[0].name} title={properties.Name.title[0].plain_text} key={item.id} id={item.id} />
        })}
      </div>
    </main>
  )
}