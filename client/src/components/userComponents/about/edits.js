import React from "react";
import { InlineEdit } from "../../commonComponents/inlineEdit";

export const NickNameEdit = ({ nickName, nicknameEdit, userId, contextId }) =>
  userId === contextId ? (
    <InlineEdit value={nickName} onSave={nicknameEdit} type="text" />
  ) : (
    <div>{nickName}</div>
  );

export const AboutEdit = ({ about, aboutEdit, userId, contextId }) =>
  userId === contextId ? (
    <InlineEdit value={about} onSave={aboutEdit} type="textarea" />
  ) : (
    <div>{!about ? "Nothing here yet!" : about}</div>
  );
