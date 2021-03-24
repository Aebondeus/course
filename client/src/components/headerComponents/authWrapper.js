import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button, Nav } from "react-bootstrap";
import { authContext } from "../../context/authContext";
import { AuthButton } from "./authModal";
import { FormattedMessage } from "react-intl";

export const AuthWrapper = () => {
  const context = useContext(authContext);
  const history = useHistory();

  const userHandler = (event) => {
    const userId = event.target.value;
    history.push(`/user/${userId}`);
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
              <FormattedMessage id="navbar-logout" />
            </Button>
          </div>
        ) : (
          <AuthButton />
        )}
      </Nav.Item>
    </Nav>
  );
};
