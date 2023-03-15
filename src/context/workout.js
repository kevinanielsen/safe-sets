import { createContext, useContext } from "react";

export const workoutContext = createContext(null);

export function useWorkout() {
  return useContext(workoutContext);
}
