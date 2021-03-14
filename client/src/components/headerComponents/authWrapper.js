import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button, Nav } from "react-bootstrap";
import { authContext } from "../../context/authContext";
import { AuthButton } from "./authModal";

export const AuthWrapper = () => {
  const context = useContext(authContext);
  const history = useHistory();

  const userHandler = (event) => {
    history.push(`/user/${event.target.value}`);
  };

  return (
    <Nav id="navbar-items-switch" className="mt-lg-2 auth-nav">
      <Nav.Item>
        {context.id ? (
          <div className="auth-btn">
            <Button
              value={context.id}
              onClick={userHandler}
              variant="outline-success"
              id="login"
            >
              {context.nickname}
            </Button>
            <Button
              onClick={context.logout}
              id="logout"
              variant="outline-primary"
            >
              Выйти
            </Button>
          </div>
        ) : (
          <AuthButton />
        )}
      </Nav.Item>
    </Nav>
  );
};
