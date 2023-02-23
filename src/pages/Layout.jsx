import { CalendarCheck, ChartLineUp, Plus } from 'phosphor-react';
import { Link, Outlet } from 'react-router-dom';

export default function Layout() {
  return(
    <>
      <main>
        <Outlet />
      </main>
      <footer className='h-12 w-screen bg-light fixed bottom-0 left-0 right-0'>
        <nav className="">
          <ul className='flex justify-between items-center mx-4 my-2'>
            <li><Link to="/calendar" ><CalendarCheck size={32} color="#177ED7" weight="bold" /></Link></li>
            <li><Link to="/new-workout"><Plus size={32} color="#177ED7" weight="bold" /></Link></li>
            <li><Link to="/stats"><ChartLineUp size={32} color="#177ED7" weight="bold" /></Link></li>
          </ul>
          
        </nav>
      </footer>
      
    </>
  )
}