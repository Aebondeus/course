import React, { useState, useEffect, useContext } from "react";
import {Link} from "react-router-dom";
import { authContext } from "../context/authContext";

export const Test = () => {
  const [data, setData] = useState({
    user: {},
    error: null,
    authenticated: false,
  });
  const context = useContext(authContext);
  const handleNotAuthenticated = () =>{
    setData({ authenticated: false });
  }
  const handleSignInClick = () => {
    window.open("http://localhost:5000/oauth/auth/facebook", "_self");  
  };
   const handleLogoutClick = async () => {
    fetch("/oauth/logout");
    handleNotAuthenticated();
  };

  useEffect(() => {
    fetch("/oauth/login/success", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        throw new Error("failed to authenticate user");
      })
      .then((res) => {
        console.log(res.user);
        context.login(res.user.jwtToken, res.user.userId, res.user.nickname);
        setData({ authenticated: true, user: res.user });
      })
      .catch(
        setData({ authenticated: false, error: "Failed to authenticate user" })
      );
  }, []);

  return (
    <div>
        <ul className="menu">
        <li>
          <Link to="/">Home</Link>
        </li>
        {data.authenticated ? (
          <li onClick={handleLogoutClick}>Logout</li>
        ) : (
          <li onClick={handleSignInClick}>Login</li>
        )}
      </ul>
      <div>
        {!data.authenticated ? (
          <h1>Welcome!</h1>
        ) : (
          <div>
            <h1>You have login succcessfully!</h1>
            <h2>Welcome {data.user.name}!</h2>
          </div>
        )}
      </div>
    </div>
  );
};
