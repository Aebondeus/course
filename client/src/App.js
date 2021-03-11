import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./components/components.css"
import { Routes } from "./routers";
import { MainHeader } from "./components/headerComponents/mainHeader";
import { authContext } from "./context/authContext.js";
import {useAuth} from "./hooks/authHook.js"

function App() {
  const {token, id, nickname, login, logout} = useAuth();
  const Route = Routes(token, id);
  return (
    <authContext.Provider value={{token, id, nickname, login, logout}}>
      <div className="container">
        <MainHeader />
        {Route}
      </div>
    </authContext.Provider>
  );
}

export default App;
