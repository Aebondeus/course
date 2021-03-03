import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes } from "./routers";
import { Link } from "react-router-dom";

function App() {
  const Route = Routes();

  return (
    <div className="container">
      <div className="header">
        <div className="header-logo"><Link to="/" style={{color:'black', textDecoration:"none"}}>MORDOR</Link> </div>
        <div className="header-app">
          <ul style={{ marginTop: "5px" }}>
            <li className="btn header-lang">En/Ru</li>
            <li className="btn header-theme">Dark/Light</li>
            <li className="btn btn-header">Login/Register</li>
          </ul>
        </div>
      </div>
      {Route}
    </div>
  );
}

export default App;
