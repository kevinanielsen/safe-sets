import { X } from 'phosphor-react';
import { useEffect, useState } from 'react';

export default function ChangeUser(props){
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('');
  const [closed, setClosed] = useState(false);

  function handleUsername() {
    setUsername(e.target.value)
  }

  function handlePassword() {
    setPassword(e.target.value)
  }

  function handleEmail() {
    setEmail(e.target.value)
  }

  function handleUsernameSubmit() {

  }

  function handleEmailSubmit() {

  }

  function handlePasswordSubmit() {

  }

  useEffect(() => {
    setClosed(false)
  }, props)

  return (
    <div className="bg-black/50 w-full h-full top-0 left-0 absolute flex items-center justify-center">
      <div className="z-20 relative w-10/12 bg-white p-7 rounded-main">
        <X className='absolute right-3 top-3 w-5 h-5' onClick={props.handleChange} />
        {props.change === "username" && (
          <form onSubmit={handleUsernameSubmit} className='flex flex-col items-center'>
            <div className='mb-4'>
              <label htmlFor="username">New username</label>
                <input type="text" name="username" id="username" value={username} onChange={handleUsername} required
                  className='transition-all focus:outline-none focus:bg-light border-2 border-gray-300 focus:border-main rounded-lg h-10 w-full'
                />
            </div>
            
            <input type="submit" value="Submit" 
              className='transition-all focus:outline-none focus:bg-light border-2 border-gray-300 focus:border-main rounded-lg h-10 w-3/4'
            />
          </form>
        )}
      </div>
    </div>
  );
}