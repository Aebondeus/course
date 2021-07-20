import React, { useEffect, useState, useContext, useCallback } from "react";
import { Spinner } from "react-bootstrap";
import { AboutUser } from "./aboutUser.js";
import { authContext } from "../../../context/authContext.js";
import { useLoad } from "../../../hooks/loadHook.js";
import { serverRoutes } from "../../../constants/allRoutes";

const {
  user: { getData, updateNickname, updateAbout },
} = serverRoutes;

export const AboutUserWrapper = ({ userId, deleteUser }) => {
  const [info, setInfo] = useState(null);
  const [isChange, setChange] = useState(true);

  const context = useContext(authContext);
  const { request } = useLoad();
  const { id, login, token: contextToken } = context;

  document.title = !info
    ? "Loading..."
    : `User page | Страница пользователя: ${info.nickName}`;

  const fetchUserData = useCallback(() => {
    fetch(`${getData}/${userId}`)
      .then((res) => res.json())
      .then((res) => {
        setInfo(res);
      });
    setChange(false);
  }, [userId]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  useEffect(() => {
    if (isChange) {
      fetchUserData();
    }
  }, [isChange, fetchUserData]);

  const nicknameEdit = async (event) => {
    let body = { token: contextToken, nickname: event };
    const { token } = await request(updateNickname, "PUT", body);
    login(token);
    setChange(true);
  };

  const aboutEdit = async (event) => {
    let body = { token: contextToken, about: event };
    await request(updateAbout, "PUT", body);
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
    <AboutUser
      info={info}
      nicknameEdit={nicknameEdit}
      aboutEdit={aboutEdit}
      userId={userId}
      contextId={id}
      deleteUser={deleteUser}
    />
  );
};
