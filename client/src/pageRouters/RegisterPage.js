import React from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useLoad } from "../hooks/loadHook";
import {useHistory} from "react-router-dom";
import {FormattedMessage} from "react-intl";

const registerOptions = {
  login: {
    required: <FormattedMessage id="register-login-req-error" />,
    minLength: {
      value: 3,
      message: <FormattedMessage id="register-login-len-error" />,
    },
  },
  password: {
    required: <FormattedMessage id="register-password-req-error" />,
    minLength: {
      value: 3,
      message: <FormattedMessage id="register-password-len-error" />,
    },
  },
  nickname: {
    required: <FormattedMessage id="register-nick-req-error" />,
    minLength: {
      value: 1,
      message:<FormattedMessage id="register-nick-len-error" />,
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
      <h1><FormattedMessage id="register-page-title" /></h1>

      <div className="registr-card card">
        <div className="reg-form">
          <Form onSubmit={handleSubmit(onSubmit)}>
            {error ? <div className="error-text text-center">{error}</div> : null}
            <Form.Group controlId="formLogin">
              <Form.Label><FormattedMessage id="login" />:</Form.Label>
              <Form.Control
                type="login"
                name="login"
                placeholder="Enter your login"
                ref={register(registerOptions.login)}
              />
            </Form.Group>
            {errors.login && (<p className="error-text">{errors.login.message}</p>)}
            <Form.Group controlId="formPassword">
              <Form.Label><FormattedMessage id="password" />:</Form.Label>
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
              <Form.Label><FormattedMessage id="nickname" />:</Form.Label>
              <Form.Control
                type="nickname"
                name="nickname"
                placeholder="And your nickname here"
                ref={register(registerOptions.nickname)}
              ></Form.Control>
              <Form.Text className="text-muted">
                <FormattedMessage id="nickname-muted" />
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
