import React from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useLoad } from "../hooks/loadHook";
import { useHistory } from "react-router-dom";
import { FormattedMessage } from "react-intl";

// TODO: take out all form options
const registerOptions = {
  email: {
    required: <FormattedMessage id="register-email-req-error" />,
    pattern: {
      value: /^.+@.+\w$/,
      message: <FormattedMessage id="register-email-pattern-error" />,
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
      message: <FormattedMessage id="register-nick-len-error" />,
    },
  },
};

// TODO: take out titles of documents, take out routes, simplify Form.Group with map
export const RegisterPage = () => {
  document.title = "Регистрация | Sign Up";
  const { register, errors, handleSubmit } = useForm();
  const { load, request, error, clearError } = useLoad();
  const history = useHistory();

  const onSubmit = async (data) => {
    try {
      clearError();
      await request("/auth/register", "POST", data);
      history.push("/");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className="registr-wrapper">
      <h1 className="text-center">
        <FormattedMessage id="register-page-title" />
      </h1>

      <div className="registr-card card">
        <div className="reg-form">
          <Form onSubmit={handleSubmit(onSubmit)}>
            {error && <div className="error-text text-center">{error}</div>}
            <Form.Group controlId="formEmail">
              <Form.Label>
                <FormattedMessage id="email" />:
              </Form.Label>
              <Form.Control
                type="email"
                name="email"
                ref={register(registerOptions.email)}
              />
            </Form.Group>
            {errors.email && (
              <p className="error-text">{errors.email.message}</p>
            )}
            <Form.Group controlId="formPassword">
              <Form.Label>
                <FormattedMessage id="password" />:
              </Form.Label>
              <Form.Control
                type="password"
                name="password"
                ref={register(registerOptions.password)}
              />
            </Form.Group>
            {errors.password && (
              <p className="error-text">{errors.password.message}</p>
            )}
            <Form.Group controlId="formNickname">
              <Form.Label>
                <FormattedMessage id="nickname" />:
              </Form.Label>
              <Form.Control
                type="nickname"
                name="nickname"
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
              <FormattedMessage id="modal-register-btn" />
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};
