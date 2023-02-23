import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import Calendar from './pages/Calendar';
import Home from './pages/Home';
import Layout from './pages/Layout';
import Login from './pages/Login';
import NewWorkout from './pages/NewWorkout';
import Settings from "./pages/Settings";
import Stats from './pages/Stats';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="stats" element={<Stats />} />
          <Route path="new-workout" element={<NewWorkout />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);