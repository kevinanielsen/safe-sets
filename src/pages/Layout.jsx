import {
  ArrowCircleLeft,
  CalendarCheck,
  ChartLineUp,
  Plus,
  House,
} from "phosphor-react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Layout() {
  const location = useLocation();
  const path = location.pathname;

  const navigate = useNavigate();

  const pathSum = (path !== "/login") + (path !== "/signup") + (path !== "/");

  return (
    <>
      <ToastContainer />
      <Outlet />
      {pathSum === 3 && (
        <footer className="h-12 w-screen bg-light fixed bottom-0 left-0 right-0 flex justify-center min-w-[322px]">
          <nav className="lg:w-3/4 w-full max-w-4xl">
            {path === "/home" ? (
              <ul className="flex justify-between items-center mx-4 my-2">
                <li>
                  <Link id="history" to="/history" aria-label="Calendar">
                    <CalendarCheck size={32} color="#177ED7" weight="bold" />
                  </Link>
                </li>
                <li>
                  <Link id="new-workout" to="/new-workout" aria-label="New workout">
                    <Plus size={32} color="#177ED7" weight="bold" />
                  </Link>
                </li>
                <li>
                  <Link id="stats" to="/stats" aria-label="Stats">
                    <ChartLineUp size={32} color="#177ED7" weight="bold" />
                  </Link>
                </li>
              </ul>
            ) : (
              <ul className="flex justify-evenly items-center mx-4 my-2">
                <li>
                  <button id="go-back" aria-label="Go back" onClick={() => navigate(-1)}>
                    <ArrowCircleLeft size={32} color="#177ED7" weight="bold" />
                  </button>
                </li>
                <li>
                  <Link id="home" to="/home" aria-label="Go to homepage">
                    <House size={32} color="#177ED7" weight="bold" />
                  </Link>
                </li>
              </ul>
            )}
          </nav>
        </footer>
      )}
    </>
  );
}
