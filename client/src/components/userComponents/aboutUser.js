import React, { useEffect, useState, useContext } from "react";
import { Card, Spinner, Button, Modal, Form } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import { authContext } from "../../context/authContext.js";
import { useLoad } from "../../hooks/loadHook.js";
import { dateTimeCommon } from "../../utils/dateFormat.js";
import { InlineEdit } from "../commonComponents/inlineEdit.js";

export const UserInfo = ({ userId, deleteUser }) => {
  const [info, setInfo] = useState(null);
  const [isChange, setChange] = useState(true);
  const [show, setShow] = useState(false);
  const context = useContext(authContext);
  const { request } = useLoad();
  const id = context.id;
  document.title = !!info
    ? `User page | Страница пользователя: ${info.nickName}`
    : "Loading...";

  useEffect(() => {
    fetch(`/user/get_data/${userId}`)
      .then((res) => res.json())
      .then((res) => {
        setInfo(res);
      });
    setChange(false);
  }, [userId]);
  
  useEffect(() => {
    if (isChange) {
      fetch(`/user/get_data/${userId}`)
        .then((res) => res.json())
        .then((res) => {
          setInfo(res);
        });
      setChange(false);
    }
  }, [isChange, userId]);

  const nicknameEdit = async (event) => {
    let body = { id: userId, nickname: event };
    await request("/user/update_nickname", "PUT", body);
    context.login(context.token, context.id, event);
    setChange(true);
  };

  const aboutEdit = async (event) => {
    let body = { id: userId, about: event };
    await request("/user/update_about", "PUT", body);
    setChange(true);
  };

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  if (!info) {
    return (
      <div className="loader text-center">
        <Spinner animation="border" role="status" />
      </div>
    );
  }
  return (
    <Card style={{ border: "none" }}>
      <Card.Header className="post-title">
        <FormattedMessage id="user-info.title" />:{" "}
      </Card.Header>
      <Card.Body>
        <div className="user-name">
          <strong>
            <FormattedMessage id="user-info.nickname" />
          </strong>
          :{" "}
        </div>
        {userId === id ? (
          <InlineEdit value={info.nickName} onSave={nicknameEdit} type="text" />
        ) : (
          <span>{info.nickName}</span>
        )}
        <div className="user-about">
          <strong>
            <FormattedMessage id="user-info.about" />
          </strong>
          :{" "}
        </div>
        {userId === id ? (
          <InlineEdit value={info.about} onSave={aboutEdit} type="textarea" />
        ) : (
          <div>{!!info.about ? info.about : "Nothing here yet!"}</div>
        )}
        <div className="user-since">
          <strong>
            <FormattedMessage id="user-info.regdate" />
          </strong>
          :
        </div>
        <div>{dateTimeCommon.format(Date.parse(info.regDate))}</div>
        <div className="user-email">
          <strong>E-mail</strong>:{" "}
        </div>
        <div>{info.email}</div>
        {userId === id && (
          <div className="delete-user">
            <Button
              variant="danger"
              style={{ marginTop: "2rem" }}
              onClick={handleShow}
            >
              Удалить пользователя
            </Button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Удаление профиля:</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>
                  Вы действительно хотите удалить профиль? Все ваши посты и
                  комментарии будут сохранены, но при повторной регистрации
                  доступа к ним вы не получите:
                </p>
                <div className="modal-btns">
                  <Button
                    variant="danger"
                    onClick={() => {
                      handleClose();
                      deleteUser();
                    }}
                  >
                    Я все понимаю. Удалить.
                  </Button>
                  <Button
                    variant="link"
                    className="change-btn update-btn"
                    onClick={handleClose}
                  >
                    Fuck go back
                  </Button>
                </div>
              </Modal.Body>
            </Modal>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};
