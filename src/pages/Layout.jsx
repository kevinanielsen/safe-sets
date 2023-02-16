import { Link, Outlet } from 'react-router-dom';

export default function Layout() {
  return(
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
      

    </>
  )
}