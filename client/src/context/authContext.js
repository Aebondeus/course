import { createContext } from "react";

export const authContext = createContext({
  token: null,
  id: null,
  nickname: null,
  login: () => {},
  logout: () => {},
});
