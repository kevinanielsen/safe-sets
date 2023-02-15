import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='flex flex-col items-center justify-center w-screen h-screen'>
      <p className='underline'>List of functions:</p>
      <ul>
        <li>1RM Calculator</li>
        <li>1RM Tracker (with graph)</li>
        <li>Firebase database</li>
      </ul>
      <p className='underline'>Technologies:</p>
      <ul>
        <li>React</li>
        <li>Tailwind</li>
        <li>Vite</li>
        <li>Firebase</li>
      </ul>
    </div>
  )
}

export default App
