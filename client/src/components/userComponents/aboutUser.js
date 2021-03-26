import React, { useEffect, useState, useContext } from "react";
import { Card, Spinner } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import { authContext } from "../../context/authContext.js";
import { useLoad } from "../../hooks/loadHook.js";
import { dateTimeCommon } from "../../utils/dateFormat.js";
import { InlineEdit } from "../commonComponents/inlineEdit.js";

export const UserInfo = ({ userId }) => {
  const [info, setInfo] = useState(null);
  const [isChange, setChange] = useState(true);
  const context = useContext(authContext);
  const { request } = useLoad();

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

  if (!info) {
    return (
      <div className="loader text-center">
        <Spinner animation="border" role="status" />
      </div>
    );
  }
  return (
    <Card style={{ border: "none" }}>
      <Card.Header
        className="post-title"
        style={{ backgroundColor: "inherit", paddingLeft: "0" }}
      >
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
          <InlineEdit value={info.nickName} onSave={nicknameEdit} />
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
          <InlineEdit value={info.about} onSave={aboutEdit} />
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
      </Card.Body>
    </Card>
  );
};
