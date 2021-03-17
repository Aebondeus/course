import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import {FormattedMessage} from "react-intl";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useLoad } from "../../hooks/loadHook.js";
import {useContext} from "react";
import { authContext } from "../../context/authContext.js";
import {OauthComponent} from "./oauthComponent.js"

const registerOptions = {
  login: {
    required: <FormattedMessage id="modal-login-error"/>,
  },
  password: {
    required: <FormattedMessage id="modal-password-error"/>,
  },
};

export const AuthButton = () => {
  const [show, setShow] = useState(false);
  const { register, errors, handleSubmit } = useForm();
  const { load, request, error, clearError } = useLoad();
  const context = useContext(authContext);
  const history = useHistory();
  
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleRegister = () => {
    setShow(false);
    history.push("/register");
  };
  const onSubmit = async (data) => {
    try {
      clearError();
      const res = await request("/auth/login", "POST", data);
      context.login(res.token, res.userId, res.nickname);
      setShow(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="auth-wrapper">
      <Button variant="primary" onClick={handleShow} className="ml-lg-5">
        <FormattedMessage id="navbar-auth" />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><FormattedMessage id="navbar-auth"/></Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {error ? <div className="error-text text-center">{error}</div> : null}
          
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="formLogin">
              <Form.Label><FormattedMessage id="login"/></Form.Label>
              <Form.Control
                type="login"
                name="login"
                ref={register(registerOptions.login)}
              />
            </Form.Group>
            {errors.login && (
              <p className="error-text">{errors.login.message}</p>
            )}
            <Form.Group controlId="formPassword">
              <Form.Label><FormattedMessage id="password"/></Form.Label>
              <Form.Control
                type="password"
                name="password"
                ref={register(registerOptions.password)}
              />
            </Form.Group>
            {errors.password && (
              <p className="error-text">{errors.password.message}</p>
            )}
            <Button
              variant="primary"
              disabled={load}
              type="submit"
              onClick={handleSubmit}
            >
              <FormattedMessage id="modal-login-btn"/>
            </Button>
            <Button variant="link" onClick={handleRegister}>
            <FormattedMessage id="modal-register-btn"/>
            </Button>
            <OauthComponent/>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};
