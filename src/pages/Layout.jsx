import { Link, Outlet } from 'react-router-dom';

export default function Layout() {
  return(
    <>
      <nav className="p-4 bg-main shadow">
        <Link className="text-secondary hover:text-white px-3 py-2 rounded-md text-sm xs:text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl font-medium" to="/">
            Home
        </Link>
        <Link className="text-secondary hover:text-white px-3 py-2 rounded-md text-sm xs:text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl font-medium" to="/login">
            Login
        </Link>
      </nav>
      <main className='min-h-screen min-w-screen'>
        <Outlet />
      </main>
    </>
  )
}