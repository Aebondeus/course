import React from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useLoad } from "../../hooks/loadHook";
import { useHistory } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { clientRoutes, serverRoutes } from "../../constants/allRoutes";
import { FormBlocks } from "./formBlocks";

const { register: registerRoute } = serverRoutes;
const { mainPage } = clientRoutes;

// TODO: take out titles of documents
export const RegisterPage = () => {
  document.title = "Регистрация | Sign Up";
  const { register, errors, handleSubmit } = useForm();
  const { load, request, error, clearError } = useLoad();
  const history = useHistory();

  const onSubmit = async (data) => {
    try {
      clearError();
      await request(registerRoute, "POST", data);
      history.push(mainPage);
    } catch (error) {
      console.log(error.message);
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
            <FormBlocks
              register={register}
              errors={errors}
              error={error}
              load={load}
            />
          </Form>
        </div>
      </div>
    </div>
  );
};
