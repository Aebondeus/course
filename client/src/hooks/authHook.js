import { useState, useCallback, useEffect } from "react";
import jwt from "jsonwebtoken";
import { config } from "../config.js";

const storage = "local";

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [id, setId] = useState(null);
  const [nickname, setNickname] = useState(null);

  const setStatesAndStorageData = async (id, token, nickname) => {
    localStorage.setItem(
      storage,
      JSON.stringify({ userId: id, token, nickname })
    );
    setToken(token);
    setId(id);
    setNickname(nickname);
  };

  const login = useCallback(async (token) => {
    try {
      const data = jwt.verify(token, process.env.REACT_APP_FOR_TOKEN || config.REACT_APP_FOR_TOKEN);
      const { id, nickname } = data;
      await setStatesAndStorageData(id, token, nickname);
    } catch (e) {
      console.log(e);
      logout();
    }
  }, []);

  const logout = useCallback(async () => {
    localStorage.removeItem(storage);
    await fetch("/oauth/logout");
    setToken(null);
    setId(null);
    setNickname(null);
  });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storage));
    if (data && data.token) {
      login(data.token);
    }
  }, []);

  return { token, id, nickname, login, logout };
};
