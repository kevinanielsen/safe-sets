import { X } from "phosphor-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUser } from "../context/user";
import { db } from "../db";

export default function ChangeUser(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [closed, setClosed] = useState(false);
  const [confirm, setConfirm] = useState([false, '']);

  const navigate = useNavigate();
  const { user } = useUser();
  
  useEffect(() => {
    db.collection('users')
    .authRefresh()
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
      console.log(db.authStore)
    })
  }, [])

  function handleUsername(e) {
    setUsername(e.target.value);
  }

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handleUsernameSubmit(e) {
    e.preventDefault();
    db.collection("users")
      .update(user.id, {
        username: username,
      })
      .then((res) => {
        toast.success("Username changed!");
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.data.data.username.message);
        throw new Error(err.data.data);
      });
  }

  function handleEmailSubmit(e) {
    e.preventDefault();
    db.collection('users')
      .requestEmailChange(email)
      .then((res) => {
        toast('Confirmation email has been sent')
      })
      .catch((err) => {
        toast.error(err.data.data.newEmail.message);
        throw new Error(err);
      });
  }

  useEffect(() => {
    setClosed(false);
  }, [props]);

  return (
    <div className="bg-black/50 w-full h-full top-0 left-0 absolute flex items-center justify-center">
      <div className="z-20 relative bg-white p-7 rounded-main">
        <X
          className="absolute right-3 top-3 w-6 h-6 cursor-pointer"
          onClick={props.handleChange}
        />
        {props.change == "username" && (
          <form
            onSubmit={handleUsernameSubmit}
            className="flex flex-col items-center"
          >
            <div className="mb-4">
              <label htmlFor="username">New username</label>
              <input
                type="text"
                name="username"
                id="username"
                value={username}
                onChange={handleUsername}
                required
                className="transition-all focus:outline-none focus:bg-light border-2 border-gray-300 focus:border-main rounded-lg h-10 w-full"
              />
            </div>
            <input
              type="submit"
              value="Submit"
              className="transition-all focus:outline-none focus:bg-light border-2 border-gray-300 focus:border-main rounded-lg h-10 w-3/4"
            />
          </form>
        )}

        {props.change == "email" && (
          <form
            onSubmit={handleEmailSubmit}
            className="flex flex-col items-center"
          >
            <div className="mb-4">
              <label htmlFor="email">New email</label>
              <input
                type="text"
                name="email"
                id="email"
                value={email}
                onChange={handleEmail}
                required
                className="transition-all focus:outline-none focus:bg-light border-2 border-gray-300 focus:border-main rounded-lg h-10 w-full"
              />
            </div>
            <input
              type="submit"
              value="Submit"
              className="transition-all focus:outline-none focus:bg-light border-2 border-gray-300 focus:border-main rounded-lg h-10 w-3/4"
            />
          </form>
        )}
      </div>
    </div>
  );
}
