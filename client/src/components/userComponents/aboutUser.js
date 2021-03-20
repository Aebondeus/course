import React, { useEffect, useState, useContext } from "react";
import { Card, Container, Spinner } from "react-bootstrap";
import EdiText from "react-editext";
import { authContext } from "../../context/authContext.js";
import { useLoad } from "../../hooks/loadHook.js";

export const UserInfo = ({ userId }) => {
  const [info, setInfo] = useState(null);
  const [isChange, setChange] = useState(true);
  const context = useContext(authContext);
  const { request } = useLoad();
  const dateOption = { year: "numeric", month: "numeric", day: "numeric" };
  const dateTimeFormat = new Intl.DateTimeFormat("ru-Ru", dateOption);

  useEffect(() => {
    if (isChange) {
      fetch(`/user/get_data/${userId}`)
        .then((res) => res.json())
        .then((res) => {
          setInfo(res);
        });
      setChange(false);
    }
  }, [isChange]);

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

  return !!info ? (
    <Card>
      <Card.Header>About user: </Card.Header>
      <Card.Body>
        <Container>
          <div className="user-name">
            <strong>User</strong>:{" "}
          </div>
          {context.id === userId ? (
            <EdiText
              type="text"
              value={info.nickName}
              onSave={nicknameEdit}
              editButtonClassName="edit-btn"
              editButtonContent="✎"
              saveButtonClassName="save-btn"
              saveButtonContent="✓"
              cancelButtonClassName="cancel-btn"
              cancelButtonContent="✕"
            />
          ) : (
            <span>{info.nickName}</span>
          )}
          <div className="user-about">
            <strong>About</strong>:{" "}
          </div>
          {context.id === userId ? (
            <EdiText
              type="textarea"
              value={!!info.about ? info.about : "Nothing here yet!"}
              onSave={aboutEdit}
              editButtonClassName="edit-btn"
              editButtonContent="✎"
              saveButtonClassName="save-btn"
              saveButtonContent="✓"
              cancelButtonClassName="cancel-btn"
              cancelButtonContent="✕"
            />
          ) : (
            <span>{!!info.about ? info.about : "Nothing here yet!"}</span>
          )}
          <div className="user-since">
            <strong>With us since</strong>:
          </div>
          <span>{dateTimeFormat.format(Date.parse(info.regDate))}</span>
        </Container>
      </Card.Body>
    </Card>
  ) : (
    <div className="loader text-center">
      <Spinner animation="border" role="status" />
    </div>
  );
};
