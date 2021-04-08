import { useState, useCallback, useEffect } from "react";
import jwt from "jsonwebtoken";

const storage = "local";

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [id, setId] = useState(null);
  const [nickname, setNickname] = useState(null);

  const logout = useCallback(async () => {
    localStorage.removeItem(storage);
    await fetch("/oauth/logout");
    setToken(null);
    setId(null);
    setNickname(null);
  });

  const login = useCallback((token) => {
    try {
      const data = jwt.verify(token, process.env.REACT_APP_FOR_TOKEN);
      const { id, nickname } = data;
      setToken(token);
      setId(id);
      setNickname(nickname);
      localStorage.setItem(
        storage,
        JSON.stringify({ userId: id, token, nickname })
      );
    } catch (e) {
      console.log(e);
      logout();
    }
  }, []);

   useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storage));
    if (data && data.token) {
      login(data.token);
    }
  }, []);

  return { token, id, nickname, login, logout };
};
