import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button, Nav } from "react-bootstrap";
import {Icon24DoorArrowLeftOutline} from "@vkontakte/icons"
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
              variant="link"
              id="login"
            >
              {context.nickname}
            </Button>
            <Button
              onClick={context.logout}
              id="logout"
              variant="link"
            >
              <Icon24DoorArrowLeftOutline width={24} height={24}/>
            </Button>
          </div>
        ) : (
          <AuthButton />
        )}
      </Nav.Item>
    </Nav>
  );
};
