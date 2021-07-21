import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useLoad } from "../../hooks/loadHook.js";
import { useContext } from "react";
import { authContext } from "../../context/authContext.js";
import { OauthComponent } from "./oauthComponent.js";
import { serverRoutes, clientRoutes } from '../../constants/allRoutes';
import { authModalOptions } from "../../constants/registerOptions.js";

const { login } = serverRoutes;
const { registerPage } = clientRoutes;

export const AuthButton = ({ setOpen }) => {
  const [show, setShow] = useState(false);
  const { register, errors, handleSubmit } = useForm();
  const { load, request, error, clearError } = useLoad();
  const context = useContext(authContext);
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
      context.login(res.token);
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

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <FormattedMessage id="navbar-auth" />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!!error && <div className="error-text text-center">{error}</div>}
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="formSignIn">
              <Form.Label>
                <FormattedMessage id="email" />
              </Form.Label>
              <Form.Control
                type="email"
                name="email"
                ref={register(authModalOptions.email)}
              />
            </Form.Group>
            {errors.email && (
              <p className="error-text">{errors.email.message}</p>
            )}
            <Form.Group controlId="formPassword">
              <Form.Label>
                <FormattedMessage id="password" />
              </Form.Label>
              <Form.Control
                type="password"
                name="password"
                ref={register(authModalOptions.password)}
              />
            </Form.Group>
            {errors.password && (
              <p className="error-text">{errors.password.message}</p>
            )}
            <div className="modal-btns">
              <div className="local-strat">
                <Button
                  id="signin-btn"
                  variant="link"
                  disabled={load}
                  type="submit"
                  onClick={handleSubmit}
                >
                  <FormattedMessage id="modal-signin-btn" />
                </Button>
                <Button
                  variant="link"
                  id="register-btn"
                  onClick={handleRegister}
                >
                  <FormattedMessage id="modal-register-btn" />
                </Button>
              </div>
              <div className="oauth-strats">
                <OauthComponent />
              </div>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};
