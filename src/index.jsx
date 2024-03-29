import { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { userContext } from "./context/user";
import { workoutContext } from "./context/workout";
import { db } from "./db";
import "./index.css";
import AllArticles from "./pages/AllArticles";
import Article from "./pages/Article";
import FrontPage from "./pages/FrontPage";
import History from "./pages/History";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import Lost from "./pages/Lost";
import NewWorkout from "./pages/NewWorkout";
import Settings from "./pages/Settings";
import Signup from "./pages/Signup";
import Stats from "./pages/Stats";
import Workout from "./pages/Workout";
import Signout from "./pages/Signout";

export default function App() {
  const [sets, setSets] = useState([]);
  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [id, setId] = useState("");
  const [user, setUser] = useState({});

  if (!user.id && db.authStore.model) {
    setUser(db.authStore.model);
  }

  function handleSets(set) {
    setSets((prev) => [...prev, set]);
  }

  return (
    <BrowserRouter>
      <workoutContext.Provider
        value={{
          sets,
          setSets,
          handleSets,
          name,
          setName,
          startTime,
          setStartTime,
          id,
          setId,
        }}
      >
        <userContext.Provider
          value={{
            user,
            setUser,
          }}
        >
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<FrontPage/> }/>
              <Route path="home" element={<Home />} /> {/* Private */}
              <Route path="login" element={<Login />} />
              <Route path="history" element={<History />} /> {/* Private */}
              <Route path="new-workout" element={<NewWorkout />} /> {/* Private */}
              <Route path="settings" element={<Settings />} /> {/* Private */}
              <Route path="signup" element={<Signup />} />
              <Route path="stats" element={<Stats />} /> {/* Private */}
              <Route path="workout/:id" element={<Workout />} /> {/* Private */}
              <Route path="article" element={<AllArticles />} />
              <Route path="articles/:id" element={<Article />} />
              <Route path="signout" element={<Signout />} />
              <Route path="*" element={<Lost />} />
            </Route>
          </Routes>
        </userContext.Provider>
      </workoutContext.Provider>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
