import { Link } from "react-router-dom"

export default function Lost() {
  return(
    <main className="m-4 flex flex-col gap-2 w-screen h-screen justify-center items-center">
        <div className="m-4 flex flex-col gap-2">
        <h1 className="text-4xl font-bold">404 - You seem to be lost!</h1>
        <h2 className="text-2xl">Here are some links to help you find a way back.</h2>
        <nav>
          <ul className="flex gap-4 text-xl">
            <li className="underline text-main"><Link to="/home">Home</Link></li>
            <li className="underline text-main"><Link to="/">Frontpage</Link></li>
            <li className="underline text-main"><Link to="/login">Login</Link></li>
            <li className="underline text-main"><Link to="/signup">Signup</Link></li>
          </ul>
        </nav>
      </div>
    </main>
  )
}