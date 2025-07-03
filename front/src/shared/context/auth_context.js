import { createContext } from "react";

export const auth_context = createContext({
  isLoggedIn: false,
  userId: null,
  token: null,
  LOGIN: () => {},
  LOGOUT: () => {},
});
