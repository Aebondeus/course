import React from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useLoad } from "../hooks/loadHook";
import {useHistory} from "react-router-dom";

const registerOptions = {
  login: {
    required: "Login is required!",
    minLength: {
      value: 3,
      message: "Login must have at least 8 characters!",
    },
  },
  password: {
    required: "Password is required!",
    minLength: {
      value: 3,
      message: "Password must have at least 3 characters",
    },
  },
  nickname: {
    required: "Nickname is very required!",
    minLength: {
      value: 1,
      message: "Nickname must have at least 1 character",
    },
  },
};

export const RegisterPage = () => {
  const { register, errors, handleSubmit } = useForm();
  const {load, request, error, clearError} = useLoad();
  const history = useHistory();

  const onSubmit = async(data) => {
    try{
      clearError();
      const result = await request("/auth/register", "POST", data);
      history.push('/');
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <div className="registr-wrapper">
      <h1>REGISTER PAGE</h1>

      <div className="registr-card card">
        <div className="reg-form">
          <Form onSubmit={handleSubmit(onSubmit)}>
            {error ? <div className="error-text text-center">{error}</div> : null}
            <Form.Group controlId="formLogin">
              <Form.Label>Login:</Form.Label>
              <Form.Control
                type="login"
                name="login"
                placeholder="Enter your login"
                ref={register(registerOptions.login)}
              />
            </Form.Group>
            {errors.login && (<p className="error-text">{errors.login.message}</p>)}
            <Form.Group controlId="formPassword">
              <Form.Label>Password:</Form.Label>
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
            <Form.Group>
              <Form.Label>Your NickName:</Form.Label>
              <Form.Control
                type="nickname"
                name="nickname"
                placeholder="And your nickname here"
                ref={register(registerOptions.nickname)}
              ></Form.Control>
              <Form.Text className="text-muted">
                Choose wisely! By the way, someone could already took your name,
                but don't be sad :3
              </Form.Text>
            </Form.Group>
            {errors.nickname && (
              <p className="error-text">{errors.nickname.message}</p>
            )}
            <Button disabled={load} variant="primary" type="submit">
              Register
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};
