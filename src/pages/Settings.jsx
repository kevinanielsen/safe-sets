import { useState } from "react";
import ChangeUser from "../components/ChangeUser";
import { useUser } from "../context/user";
import { db } from "../db";

export default function Settings() {
  const [show, setShow] = useState(false);
  const [change, setChange] = useState("");

  const { user, setUser } = useUser();

  function handleSignout() {
    db.authStore.clear();
    setUser({});
  }

  function handleChange() {
    setShow(show === true ? false : true);
  }

  return (
    <main className="m-4">
      <h1 className="font-bold font-main text-xl">Settings</h1>
      <button
        className="font-bold font-main text-main text-base p-4 mt-4 w-full text-left bg-light rounded-main"
        onClick={handleSignout}
      >
        Sign out
      </button>
      <button
        className="font-bold font-main text-main text-base p-4 mt-4 w-full text-left bg-light rounded-main"
        onClick={() => {
          handleChange();
          setChange("username");
        }}
      >
        Change username
      </button>
      <button
        className="font-bold font-main text-main text-base p-4 mt-4 w-full text-left bg-light rounded-main"
        onClick={() => {
          handleChange();
          setChange("email");
        }}
      >
        Change email
      </button>
      <button
        className="font-bold font-main text-main text-base p-4 mt-4 w-full text-left bg-light rounded-main"
        onClick={() => {
          handleChange();
          setChange("password");
        }}
      >
        Change password
      </button>

      {show && <ChangeUser handleChange={handleChange} change={change} />}
    </main>
  );
}
