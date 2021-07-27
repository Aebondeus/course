import React, { useState, useContext } from "react";
import { Button } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router-dom";

import { useLoad } from "../../../hooks/loadHook.js";
import { authContext } from "../../../context/authContext.js";
import { AuthModal } from "./modal.js";

import { serverRoutes, clientRoutes } from "../../../constants/allRoutes";

const { login } = serverRoutes;
const { registerPage } = clientRoutes;

export const AuthButton = ({ setOpen }) => {
  const [show, setShow] = useState(false);

  const { load, request, error, clearError } = useLoad();
  const { login: contextLogin } = useContext(authContext);
  const history = useHistory();

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleRegister = () => {
    setShow(false);
    history.push(registerPage);
  };
  const onSubmit = async (data) => {
    try {
      clearError();
      const res = await request(login, "POST", data);
      contextLogin(res.token);
      setShow(false);
      setOpen(true);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="auth-wrapper">
      <Button variant="primary" onClick={handleShow} className="ml-lg-5">
        <FormattedMessage id="navbar-auth" />
      </Button>
      <AuthModal
        show={show}
        onSubmit={onSubmit}
        handleClose={handleClose}
        handleRegister={handleRegister}
        error={error}
        load={load}
      />
    </div>
  );
};
