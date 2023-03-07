import { Link } from "react-router-dom";

export default function Thumbnail(props) {
  const { img, content, title, id } = props;

  return (
    <Link to={`/articles/${id}`} className='rounded-main mt-4 h-32 block'>
      <div style={{backgroundImage: 'url(' + img + ')'}} className='w-full h-full rounded-main bg-cover'>
        <div className="bg-gradient-to-b from-transparent to-black h-full w-full p-4 rounded-main flex flex-col justify-end">
          <h2 className="text-xl font-bold text-light">{title}</h2>  
        </div>
        
      </div>
    </Link>
    
  );
}