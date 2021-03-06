import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useLoad } from "../../hooks/loadHook.js";
import {useContext} from "react";
import { authContext } from "../../context/authContext.js";

const registerOptions = {
  login: {
    required: "Login field is empty!",
  },
  password: {
    required: "Password field is empty!",
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
      console.log(data.login, data.password);
      const result = await request("/auth/login", "POST", data);
      console.log(result.userId, result.token);
      context.login(result.token, result.userId, result.nickname);
      setShow(false);
      // history.push('/')
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="auth-wrapper">
      <Button variant="primary" onClick={handleShow}>
        Login/Register
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Log in</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {error ? <div className="error-text text-center">{error}</div> : null}
          
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="formLogin">
              <Form.Label>Login</Form.Label>
              <Form.Control
                type="login"
                name="login"
                placeholder="Enter your login"
                ref={register(registerOptions.login)}
              />
            </Form.Group>
            {errors.login && (
              <p className="error-text">{errors.login.message}</p>
            )}
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter your password"
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
              Log in
            </Button>
            <Button variant="link" onClick={handleRegister}>
              Register
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};
