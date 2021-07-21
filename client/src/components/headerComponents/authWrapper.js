import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button, Nav } from "react-bootstrap";
import { Icon24DoorArrowLeftOutline } from "@vkontakte/icons";
import { authContext } from "../../context/authContext";
import { AuthButton } from "./authModal";
import { clientRoutes } from "../../constants/allRoutes";

const { user } = clientRoutes;
export const AuthWrapper = ({ setAuthOpen }) => {
  const { id: contextId, nickname, logout } = useContext(authContext);
  const history = useHistory();

  const userHandler = (event) => {
    const userId = event.target.value;
    history.push(`${user}/${userId}`);
  };

  return (
    <Nav id="navbar-items-switch" className="mt-lg-2 auth-nav">
      <Nav.Item>
        {contextId ? (
          <div className="auth-btn">
            <Button
              value={contextId}
              onClick={userHandler}
              variant="link"
              id="login"
            >
              {nickname}
            </Button>
            <Button onClick={logout} id="logout" variant="link">
              <Icon24DoorArrowLeftOutline width={24} height={24} />
            </Button>
          </div>
        ) : (
          <AuthButton setOpen={setAuthOpen} />
        )}
      </Nav.Item>
    </Nav>
  );
};
