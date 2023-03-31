import { useUser } from "../context/user";
import { Navigate } from 'react-router-dom';
import { db } from "../db";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function Signout() {
  const { user, setUser } = useUser();

  
  useEffect(() => {
    setUser({});
    db.authStore.clear()
  })

  if (!user.id) {
    toast.error('You must be logged in!')
    return <Navigate to="/" replace />;
  }

  return <h1>You have been signed out - Redirecting...</h1>
}
  