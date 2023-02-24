import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../db';

export default function Signup() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState();
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const navigate = useNavigate();

  useEffect(() => {
    if(db.authStore.model) {
      navigate('/')
    }
  })

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    db.collection('users').create({
      "username": username,
      "email": "test@example.com",
      "emailVisibility": true,
      "password": password,
      "passwordConfirm": password,
      "name": name,
    })
      .then((response) => {
        setLoading(false);
        setData(response);

        setName('')
        setUsername('')
        setEmail('')
        setPassword('')
        navigate('/login')
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
        console.log('final error')
      })
  }

  function handlePassword(e) {
    setPassword(e.target.value)
  }
  function handleName(e) {
    setName(e.target.value)
  }
  function handleEmail(e) {
    setEmail(e.target.value)
  }
  function handleUsername(e) {
    setUsername(e.target.value)
  }
  
  return(
    <main className='flex flex-col justify-center items-center h-main w-full'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <div className="flex flex-col">
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" value={username} onChange={handleUsername} required
            className='transition-all focus:outline-none focus:bg-light border-2 border-gray-300 focus:border-main rounded-lg h-10 w-64'
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" value={password} onChange={handlePassword} required
            className='transition-all focus:outline-none focus:bg-light border-2 border-gray-300 focus:border-main rounded-lg h-10 w-64'
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="name">Full name</label>
          <input type="text" name="name" id="name" value={name} onChange={handleName} required
            className='transition-all focus:outline-none focus:bg-light border-2 border-gray-300 focus:border-main rounded-lg h-10 w-64'
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" value={email} onChange={handleEmail} required
            className='transition-all focus:outline-none focus:bg-light border-2 border-gray-300 focus:border-main rounded-lg h-10 w-64'
          />
        </div>
        <input type="submit" value="Submit" 
          className='transition-all focus:outline-none focus:bg-light border-2 border-gray-300 focus:border-main rounded-lg h-10 w-64'
        />
      </form>
    </main>
  )
}