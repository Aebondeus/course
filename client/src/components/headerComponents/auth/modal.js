import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import { useForm } from "react-hook-form";

import { authModalOptions } from "../../../constants/registerOptions.js";
import { OauthComponent } from "../oauth/oauthComponent.js";

const groups = ['Email', 'Password'];

export const AuthModal = ({
  show,
  onSubmit,
  handleClose,
  handleRegister,
  error,
  load,
}) => {
  const { register, errors, handleSubmit } = useForm();

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <FormattedMessage id="navbar-auth" />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!!error && <div className="error-text text-center">{error}</div>}
        <Form onSubmit={handleSubmit(onSubmit)}>
          {groups.map((group) => {
              const lowerGroup = group.toLowerCase();
             return (
               <>
                 <Form.Group controlId={`form${group}`}>
                   <Form.Label>
                     <FormattedMessage id={lowerGroup} />
                   </Form.Label>
                   <Form.Control
                     type={lowerGroup}
                     name={lowerGroup}
                     ref={register(authModalOptions[lowerGroup])}
                   />
                 </Form.Group>
                 {errors[lowerGroup] && (
                   <p className="error-text">{errors[lowerGroup].message}</p>
                 )}
               </>
             );
          })}
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
              <Button variant="link" id="register-btn" onClick={handleRegister}>
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
  );
};
