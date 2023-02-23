import { db } from '../db';

export default function Settings() {
  function handleSignout() {
    db.authStore.clear();
  }

  return(
    <>
      <h1>Settings</h1>
      <button onClick={handleSignout}>Sign out</button>
    </>
  )
}