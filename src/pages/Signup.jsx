import { useEffect, useRef } from "react";
import Resizer from "react-image-file-resizer";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../db";

const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      500,
      500,
      "WEBP",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "blob"
    );
  });

export default function Signup() {
  const password = useRef(null)
  const username = useRef(null)
  const name = useRef(null)
  const email = useRef(null)

  const navigate = useNavigate();

  useEffect(() => {
    if (db.authStore.model) {
      navigate("/");
    }
  });

  function handleSubmit(e) {
    e.preventDefault();
    formData.append("username", username.current.value);
    formData.append("email", email.current.value);
    formData.append("emailVisibility", true);
    formData.append("password", password.current.value);
    formData.append("passwordConfirm", password.current.value);
    formData.append("name", name.current.value);
    db.collection("users")
      .create(formData)
      .then((response) => {
        navigate("/login");
        toast.success("Account created!");
      })
      .catch((err) => {
        console.log(err.data);
        toast.error(err.data.username?.message);
        toast.error(err.data.password?.message);
        toast.error(err.data.avatar?.message);
        toast.error(err.data.email?.message);
      });
  }

  const fileInput = useRef(null);

  const formData = new FormData();

  function handleFileInput(e) {
    for (let file of fileInput.current.files) {
      resizeFile(file).then((res) => {
        console.log(res);
        formData.append("avatar", res);
      });
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
        <div className="flex flex-col">
          <label htmlFor="name">Full name</label>
          <input
            type="text"
            name="name"
            id="name"
            ref={name}
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
            ref={email}
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
