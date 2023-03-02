import { ArrowCircleLeft, CalendarCheck, ChartLineUp, Plus } from 'phosphor-react';
import { Link, Outlet, useLocation, useNavigation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Layout() {
  const location = useLocation();
  const path = location.pathname; 

  const pathSum = (path !== ('/login')) + (path !== ('/signup'));

  return(
    <>
      <ToastContainer />
      <h1 className='text-center underline'>Safe Sets</h1>
      <Outlet />
      {pathSum === 2 && <footer className='h-12 w-screen bg-light fixed bottom-0 left-0 right-0'>
        <nav className="">
          {path === '/' ?
          <ul className='flex justify-between items-center mx-4 my-2'>
            <li><Link to="/calendar" ><CalendarCheck size={32} color="#177ED7" weight="bold" /></Link></li>
            <li><Link to="/new-workout"><Plus size={32} color="#177ED7" weight="bold" /></Link></li>
            <li><Link to="/stats"><ChartLineUp size={32} color="#177ED7" weight="bold" /></Link></li>
          </ul>
          :
          <ul className='flex justify-center items-center mx-4 my-2'>
            <li><Link to="/"><ArrowCircleLeft size={32} color="#177ED7" weight="bold" /></Link></li>
          </ul>
          }
        </nav>
      </footer>}
      
    </>
  )
}