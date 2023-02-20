import { ArrowCircleLeft } from 'phosphor-react';
import { Link } from 'react-router-dom';

export default function Stats() {
  return(
    <>
      <Link to="/" className='w-8 h-8'><ArrowCircleLeft size={32} color="#0a0a0a" weight="bold" /></Link>
    </>
  )
}