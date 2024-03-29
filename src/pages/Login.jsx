import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUser } from "../context/user";
import { db } from "../db";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState();

  const username = useRef(null);
  const password = useRef(null)

  const navigate = useNavigate();

  const { user, setUser } = useUser();

  useEffect(() => {
    if (db.authStore.model) {
      navigate("/");
    }
  });

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    db.collection("users")
      .authWithPassword(username.current.value, password.current.value)
      .then((response) => {
        setLoading(false);
        setData(response);
        db.authStore.exportToCookie();
        setUser(db.authStore);
        toast.success(`Welcome back, ${db.authStore.model.name.split(" ")[0]}`);
      })
      .catch((err) => {
        console.log(err)
        setError(err.message);
        setLoading(false);
      });
  }

  if (loading) {
    return (
      <main className="flex justify-center items-center h-main w-full">
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main className="flex flex-col justify-center items-center h-main w-full">
      {error && <h1 className="text-red-500 font-bold">{error}</h1>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            ref={username}
            required
            className="transition-all focus:outline-none focus:bg-light border-2 border-gray-300 focus:border-main rounded-lg h-10 w-64"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            ref={password}
            required
            className="transition-all focus:outline-none focus:bg-light border-2 border-gray-300 focus:border-main rounded-lg h-10 w-64"
          />
        </div>
        <input
          type="submit"
          value="Submit"
          className="transition-all focus:outline-none focus:bg-light border-2 border-gray-300 focus:border-main rounded-lg h-10 w-64"
        />
      </form>
      <p className="mt-4">
        Don't have an account?{" "}
        <Link to="/signup" className="underline">
          Sign up
        </Link>
      </p>
    </main>
  );
}
