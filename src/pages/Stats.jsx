import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUser } from "../context/user";

export default function Stats() {
  const { user } = useUser();
  if (!user.id) {
    toast.error('You must be logged in!')
    return <Navigate to="/" replace />;
  }

  return (
    <main className="flex flex-col p-4 mb-8 w-full items-center">
      <div className="sm:w-3/4 w-full max-w-4xl">
        <h1 className="font-bold text-xl mb-4">Stats</h1>
        <h2 className="font-bold text-lg bg-main px-4 py-2 rounded-lg text-white">
          Coming Soon!
        </h2>
      </div>
    </main>
  );
}
