import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { FormattedMessage } from "react-intl";

export const DeleteUser = ({ deleteUser }) => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <div className="delete-user">
      <Button
        variant="danger"
        style={{ marginTop: "1rem" }}
        onClick={handleShow}
      >
        <FormattedMessage id="profile-delete.btn" />
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <FormattedMessage id="profile-delete.title" />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <FormattedMessage id="profile-delete.description" />
          </p>
          <div className="modal-btns">
            <Button
              variant="danger"
              onClick={() => {
                handleClose();
                deleteUser();
              }}
            >
              <FormattedMessage id="profile-delete.yes" />
            </Button>
            <Button
              variant="link"
              className="change-btn update-btn"
              onClick={handleClose}
            >
              <FormattedMessage id="profile-delete.no" />
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
