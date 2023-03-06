import { useEffect, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { useParams } from 'react-router-dom';
import { renderRichText } from '../util/notion-rich-text-react';

export default function Article() {
  const params = useParams();
  const id = params.id;

  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [article, setArticle] = useState({});

  useEffect(() => {
    fetch('/api/fetchNotion')
      .then((response) => response.json())
      .then((data) => setArticles(data.results))
  }, [])

  useEffect(() => {
    if(articles[0]) {
      setArticle(articles.find((article) => article.id === id))
      setLoading(false)
    }
  }, [articles])

  if(loading) {
  return (
    <div className='h-main w-full flex items-center justify-center'>
      <ThreeDots color="#177ed7" />
    </div>
  )}

  return(
    <div className="flex flex-col p-4 h-main overflow-scroll">
      <h1 className='text-4xl font-bold mb-4'>{article.properties.Name.title[0].plain_text}</h1>
      <div className="w-full flex justify-center mb-4">
        <img src={article.properties.Image.files[0].name} alt="cover image" srcSet="" className='max-w-3xl' />  
      </div>
      <p dangerouslySetInnerHTML={{__html: renderRichText(article.properties && article.properties.Content.rich_text)}} />
      
    </div>
  )
  
}