import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChangeUser from '../components/ChangeUser';
import { db } from '../db';

export default function Settings() {
  const [user, setUser] = useState({});
  const [show, setShow] = useState(false);
  const [change, setChange] = useState('');

  const navigate = useNavigate();

  if(!user.id && db.authStore.model) {
    setUser(db.authStore.model);
  }

  function handleSignout() {
    db.authStore.clear();
    navigate('/login');
  }

  function handleChange() {
    setShow(show === true ? false : true);
    console.log(show)
  }

  useEffect(() => {
    if(!user.id) {
      navigate('/login');
    }
  }, [user])

  return(
    <main className='m-4'>
      <h1 className='font-bold font-main text-xl'>Settings</h1>
      <button className='font-bold font-main text-main text-base p-4 mt-4 w-full text-left bg-light rounded-main' onClick={handleSignout}>Sign out</button>
      <button className='font-bold font-main text-main text-base p-4 mt-4 w-full text-left bg-light rounded-main' onClick={() => {
        handleChange()
        setChange('username')
        }}>Change username</button>
      <button className='font-bold font-main text-main text-base p-4 mt-4 w-full text-left bg-light rounded-main' onClick={() => {
        handleChange()
        setChange('email')
      }}>Change email</button>
      <button className='font-bold font-main text-main text-base p-4 mt-4 w-full text-left bg-light rounded-main' onClick={() => {
        handleChange()
        setChange('password')
      }}>Change password</button>

      {show && <ChangeUser handleChange={handleChange} change={change} />}
    </main>
  )
}