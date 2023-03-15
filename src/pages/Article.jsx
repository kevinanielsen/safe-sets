import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { renderRichText } from "../util/notion-rich-text-react";

export default function Article() {
  const params = useParams();
  const id = params.id;

  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [article, setArticle] = useState({});

  useEffect(() => {
    fetch("/api/fetchNotion")
      .then((response) => response.json())
      .then((data) => setArticles(data.results));
  }, []);

  useEffect(() => {
    if (articles[0]) {
      setArticle(articles.find((article) => article.id === id));
      setLoading(false);
    }
  }, [articles]);

  if (loading) {
    return (
      <div className="h-main w-full flex items-center justify-center">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <main className="flex flex-col p-4 items-center w-full mb-16">
      <article className="lg:max-w-3xl w-full">
        <h1 className="text-4xl font-bold mb-4">
          {article.properties.Name.title[0].plain_text}
        </h1>
        <div className="w-full flex items-center mb-4 flex-col">
          <img
            src={article.properties.Image.files[0].name}
            alt="cover image"
            srcSet=""
            className="max-w-3xl w-full"
          />
          <p className="text-slate-500 text-xs mb-0">Image from Unsplash</p>
        </div>
        <p
          dangerouslySetInnerHTML={{
            __html: renderRichText(
              article.properties && article.properties.Content.rich_text
            ),
          }}
        />
      </article>
    </main>
  );
}
