import React from "react";
import { FormattedMessage } from "react-intl";
import { dateTimeCommon } from "../../../utils/dateFormat";
import { NickNameEdit, AboutEdit } from "./edits";

export const Info = ({ info, userId, contextId, nicknameEdit, aboutEdit }) => {
  const { nickName, about, regDate, email } = info;
  const date = dateTimeCommon.format(Date.parse(regDate));

  return (
    <>
      <div className="user-name">
        <strong>
          <FormattedMessage id="user-info.nickname" />
        </strong>
        :{" "}
      </div>
      <NickNameEdit
        nickName={nickName}
        nicknameEdit={nicknameEdit}
        userId={userId}
        contextId={contextId}
      />
      <div className="user-about">
        <strong>
          <FormattedMessage id="user-info.about" />
        </strong>
        :{" "}
      </div>
      <AboutEdit
        about={about}
        aboutEdit={aboutEdit}
        userId={userId}
        contextId={contextId}
      />
      <div className="user-since">
        <strong>
          <FormattedMessage id="user-info.regdate" />
        </strong>
        :
      </div>
      <div>{date}</div>
      <div className="user-email">
        <strong>E-mail</strong>:{" "}
      </div>
      <div>{email}</div>
    </>
  );
};
