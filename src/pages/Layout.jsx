import {
  ArrowCircleLeft,
  CalendarCheck,
  ChartLineUp,
  Plus,
} from "phosphor-react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { db } from "../db";

export default function Layout() {
  const location = useLocation();
  const path = location.pathname;
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  if (!user.id && db.authStore.model) {
    setUser(db.authStore.model);
  }

  // Redirect to /login if not logged in
  useEffect(() => {
    if (!user.id && (path !== "/login" || path !== "/signup")) {
      navigate("/login");
    }
  }, [user]);

  const pathSum = (path !== "/login") + (path !== "/signup");

  return (
    <>
      <ToastContainer />
      <Outlet />
      {pathSum === 2 && (
        <footer className="h-12 w-screen bg-light fixed bottom-0 left-0 right-0">
          <nav className="">
            {path === "/" ? (
              <ul className="flex justify-between items-center mx-4 my-2">
                <li>
                  <Link to="/calendar" aria-label="Calendar">
                    <CalendarCheck size={32} color="#177ED7" weight="bold" />
                  </Link>
                </li>
                <li>
                  <Link to="/new-workout" aria-label="New workout">
                    <Plus size={32} color="#177ED7" weight="bold" />
                  </Link>
                </li>
                <li>
                  <Link to="/stats" aria-label="Stats">
                    <ChartLineUp size={32} color="#177ED7" weight="bold" />
                  </Link>
                </li>
              </ul>
            ) : (
              <ul className="flex justify-center items-center mx-4 my-2">
                <li>
                  <Link to="/" aria-label="Go home">
                    <ArrowCircleLeft size={32} color="#177ED7" weight="bold" />
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
