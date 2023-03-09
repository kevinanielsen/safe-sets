import { Link } from 'react-router-dom';
import { useUser } from '../context/user';

export default function Calendar() {
  const { user } = useUser();

  return(
    <main>
      <h1>Calendar of {user.name}</h1>
    </main>
  )
}