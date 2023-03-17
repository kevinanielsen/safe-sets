import { useEffect, useRef, useState } from "react";
import Resizer from "react-image-file-resizer";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../db";

const resizeFile = (file) => new Promise(resolve => {
  Resizer.imageFileResizer(
    file, 
    500, 
    500, 
    'WEBP', 
    100, 
    0,
    uri => {
      resolve(uri);
    }, 
    'blob'
  );
});

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState();
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (db.authStore.model) {
      navigate("/");
    }
  });

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("emailVisibility", true);
    formData.append("password", password);
    formData.append("passwordConfirm", password);
    formData.append("name", name);
    db.collection("users")
      .create(formData)
      .then((response) => {
        setLoading(false);
        setData(response);

        setName("");
        setUsername("");
        setEmail("");
        setPassword("");
        navigate("/login");
        toast.success("Account created!");
      })
      .catch((err) => {
        console.log(err.data)
        toast.error(err.data.username?.message)
        toast.error(err.data.password?.message)
        toast.error(err.data.avatar?.message)
        toast.error(err.data.email?.message)
        setError(err.message);
        setLoading(false);
      });
  }

  const fileInput = useRef(null);

  function handlePassword(e) {
    setPassword(e.target.value);
  }
  function handleName(e) {
    setName(e.target.value);
  }
  function handleEmail(e) {
    setEmail(e.target.value);
  }
  function handleUsername(e) {
    setUsername(e.target.value);
  }

  const formData = new FormData();

  function handleFileInput(e) {
    for (let file of fileInput.current.files) {
      resizeFile(file)
        .then((res) => {
          console.log(res);
          formData.append("avatar", res);
        })
      
    }
  }

  return (
    <main className="flex flex-col justify-center items-center h-main w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={handleUsername}
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
            value={password}
            onChange={handlePassword}
            required
            className="transition-all focus:outline-none focus:bg-light border-2 border-gray-300 focus:border-main rounded-lg h-10 w-64"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="name">Full name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={handleName}
            required
            className="transition-all focus:outline-none focus:bg-light border-2 border-gray-300 focus:border-main rounded-lg h-10 w-64"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={handleEmail}
            required
            className="transition-all focus:outline-none focus:bg-light border-2 border-gray-300 focus:border-main rounded-lg h-10 w-64"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="fileInput">Profile picture</label>
          <input
            type="file"
            name="fileInput"
            id="fileInput"
            ref={fileInput}
            onChange={handleFileInput}
            accept="image/png, image/jpeg"
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
        Already have an account?{" "}
        <Link to="/login" className="underline">
          Login
        </Link>
      </p>
    </main>
  );
}
