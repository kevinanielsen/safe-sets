import { useEffect, useState } from 'react';
import Thumbnail from './Thumbnail';

export default function Articles() {

  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch('/api/fetchNotion')
      .then((response) => response.json())
      .then((data) => setArticles(data.results))
      .finally(() => setLoading(false))
  }, [])

  if(loading) {
    return(
      <h2>Loading...</h2>
    )
  }

  return(
    <section>
      <h2>Recent articles</h2>
      {articles[0] && articles.slice(0, 5).map((article) => {
        
      return(
        <Thumbnail 
          key={article.id} 
          id={article.id}
          img={article.properties.Image.files[0].name} 
          content={article.properties.Content.rich_text[0].text.content} 
          title={article.properties.Name.title[0].text.content} 
        />
      )
      })}
    </section>
  )
}