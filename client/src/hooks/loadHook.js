import { useState, useCallback } from "react";

export const useLoad = () => {
  const [error, setError] = useState(null);
  const [load, setLoad] = useState(false);

  const request = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setLoad(true);
      try {
        if (body) {
          headers["Content-Type"] = "application/json";
          body = JSON.stringify(body);
        }
        const res = await fetch(url, {
          method,
          headers,
          body,
        });
        const data = await res.json();
        if (!res.ok) {
          console.log("res not ok");
          throw new Error(data.msg);
        }
        setLoad(false);
        return data;
      } catch (e) {
        console.log("Error in catch of request callback");
        console.log("Catch,", e.message);
        setLoad(false);
        setError(e.message);
        throw e;
      }
    },
    []
  );
  const clearError = useCallback(() => setError(null));
  return { load, request, error, clearError };
};
