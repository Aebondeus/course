import React, { useEffect, useState, useContext } from "react";
import { Card, Container, Spinner } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
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
    <Card style={{ border: "none" }}>
      <Card.Header className="post-title" style={{ backgroundColor: "#fff" }}>
        <FormattedMessage id="user-info.title" />:{" "}
      </Card.Header>
      <Card.Body>
        <div className="user-name">
          <strong>
            <FormattedMessage id="user-info.nickname" />
          </strong>
          :{" "}
        </div>
        {context.id === userId ? (
          <EdiText
            className="text-editor"
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
          <strong>
            <FormattedMessage id="user-info.about" />
          </strong>
          :{" "}
        </div>
        {context.id === userId ? (
          <EdiText
            className="text-editor"
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
          <div>{!!info.about ? info.about : "Nothing here yet!"}</div>
        )}
        <div className="user-since">
          <strong>
            <FormattedMessage id="user-info.regdate" />
          </strong>
          :
        </div>
        <div>
          {dateTimeFormat.format(Date.parse(info.regDate))}
        </div>
        <div className="user-email">
          <strong>E-mail</strong>:{" "}
        </div>
        <div>{info.email}</div>
      </Card.Body>
    </Card>
  ) : (
    <div className="loader text-center">
      <Spinner animation="border" role="status" />
    </div>
  );
};
