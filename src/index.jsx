import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import Article from "./pages/Article";
import Calendar from './pages/Calendar';
import Home from './pages/Home';
import Layout from './pages/Layout';
import Login from './pages/Login';
import NewWorkout from './pages/NewWorkout';
import Settings from "./pages/Settings";
import Signup from './pages/Signup';
import Stats from "./pages/Stats";
import Workout from './pages/Workout';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="new-workout" element={<NewWorkout />} />
          <Route path="settings" element={<Settings />} />
          <Route path="signup" element={<Signup />} />
          <Route path="stats" element={<Stats />} />
          <Route path="workout/:id" element={<Workout />} />
          <Route path="articles/:id" element={<Article />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);