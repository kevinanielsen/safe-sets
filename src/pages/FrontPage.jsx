import { Link } from "react-router-dom"
import { useUser } from "../context/user"

export default function FrontPage() {
  const { user } = useUser();
  
  return(
    <>
      <header>
        <h1>Safe Sets</h1>
        <nav>
          <ul id="navList">
            <li><Link to="/home">Homepage</Link></li>
            <li><Link to="/history">Workout History</Link></li>
            <li><Link to="/stats">Stats</Link></li>
            <li><Link to="/new-workout">New Workout</Link></li>
          </ul>

          {!user.id && (
            <div>
              <h2>It seems like you're not logged in! <Link to="/login" className="underline text-main">log in</Link> or <Link to="/signup" className="underline text-main">create an account</Link> to get access to all features!</h2>
            </div>
          )}
        </nav>
      </header>
      <main>

      </main>

    </>
  )
}