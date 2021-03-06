import React from "react";
import { Link } from "react-router-dom";
import { AuthButton } from "./authModal";
import { useContext } from "react";
import { authContext } from "../../context/authContext";
import { Button } from "react-bootstrap";

export const MainHeader = () => {
  const context = useContext(authContext);
  return (
    <div className="header">
      <div className="header-logo">
        <Link to="/" style={{ color: "black", textDecoration: "none" }}>
          MORDOR
        </Link>
      </div>
      <div className="header-app">
        <ul style={{ marginTop: "5px" }}>
          <li className="btn header-lang">En/Ru</li>
          <li className="btn header-theme">Dark/Light</li>
          <li className="btn btn-header">
            {context.id ? (
              <span>
                <Link
                  to={`/user/${context.id}`}
                  className="btn"
                  style={{ transition: "none" }}
                >
                  {context.nickname}
                </Link>
                /
                <span>
                  <Button
                    variant="link"
                    onClick={context.logout}
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    Выйти
                  </Button>
                </span>
              </span>
            ) : (
              <AuthButton />
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};
