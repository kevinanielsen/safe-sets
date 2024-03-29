import { Link } from "react-router-dom"
import { useUser } from "../context/user"
import { Barbell } from 'phosphor-react';

export default function FrontPage() {
  const { user } = useUser();
  
  return(
    <>
      <header className="flex justify-center items-center gap-3 bg-main text-white p-4">
        <Barbell size={48} color="#ffffff" weight="bold" />
        <h1 className="font-extrabold text-4xl">Safe Sets</h1>
      </header>
      <main className="flex flex-col justify-center items-center p-4 w-full">
        <div className="flex justify-center items-center py-8 text-center" id="banner">
          <h2 className="text-xl md:text-2xl font-bold">A one stop shop for all your workout tracking needs.</h2>
        </div>
        <div className="flex justify-between items-center p-4 text-center bg-light w-screen">
          <img src="https://ik.imagekit.io/safesets/progression-optimized.WEBP?tr=q-80" alt="screenshot" className="w-6/12 rounded-lg shadow-lg" />
          <h3 className="text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl font-bold w-full">Advanced exercise progression tracking.</h3>
        </div>
        <div className="flex justify-between items-center p-4 text-center w-screen gap-4">
          <h3 className="text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl font-bold text-main w-full">Extensively written articles on all your workout need. Anything you need about everything from how to stay motivated to the effects of supplements. </h3>
          <img src="https://ik.imagekit.io/safesets/article-optimized.WEBP?tr=q-80" alt="screenshot" className="w-1/4 rounded-lg shadow-lg" />
        </div>
        <div className="flex justify-between items-center gap-4 p-4 text-center w-screen bg-light">
          <img src="https://ik.imagekit.io/safesets/history-optimized.WEBP?tr=q-80" alt="screenshot" className="w-1/4 rounded-lg shadow-lg" />
          <h3 className="text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl font-bold w-full">All of your workout history at your finger tips.</h3>
        </div>
        <div className="flex justify-between items-center p-4 text-center w-screen gap-4">
          <h3 className="text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl font-bold text-main w-full">Comprehensive exercise list.</h3>
          <img loading="lazy" src="https://ik.imagekit.io/safesets/exercises-optimized.WEBP?tr=q-80" alt="screenshot" className="w-1/4 rounded-lg shadow-lg" />
        </div>
        <div className="flex justify-between items-center gap-4 p-4 text-center w-screen bg-light">
          <img loading="lazy" src="https://ik.imagekit.io/safesets/workout-optimized.WEBP?tr=q-80" alt="screenshot" className="w-1/4 rounded-lg shadow-lg" />
          <h3 className="text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl font-bold w-full">Complete workout tracking.</h3>
        </div>
        <div className="flex flex-col justify-between items-center pt-8 p-4 text-center w-screen gap-4">
          <h3 className="text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl font-bold w-full">Where to next?</h3>
          {!user.id ? 
          <>
            <h3 className="text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl font-bold text-main w-full underline">Start your journey now</h3>
            <Link to="/signup" className="bg-light text-main px-4 py-2 font-bold text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl rounded-lg w-2/3">Sign up</Link>
            <h3 className="text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl font-bold text-main w-full underline">Already have an account?</h3>
            <Link to="/login" className="bg-light text-main px-4 py-2 font-bold text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl rounded-lg w-2/3">Login</Link>
          </>
          :
          <>
            <Link to="/home" className="bg-light text-main px-4 py-2 font-bold text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl rounded-lg w-2/3">Home</Link>
          </>
          }
          
        </div>
      </main>

    </>
  )
}