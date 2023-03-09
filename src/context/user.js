import { createContext, useContext } from "react";

export const userContext = createContext(null);

export function useUser() {
  return useContext(userContext);
}