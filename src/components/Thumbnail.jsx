import { Link } from "react-router-dom";

export default function Thumbnail(props) {
  const { img, content, title, id } = props;

  return (
    <Link to={`/articles/${id}`} className='rounded-main mt-4 h-32 block overflow-hidden'>
      <div style={{backgroundImage: 'url(' + img + ')'}} className='w-full h-full rounded-main bg-cover'>
        <div className="bg-gradient-to-b from-transparent to-black h-full w-full p-4 rounded-main flex flex-col justify-end">
          <h2 className="text-xl font-bold text-light">{title.length < 60 ? title : `${title.slice(0, 59)}...`}</h2>  
        </div>
        
      </div>
    </Link>
    
  );
}