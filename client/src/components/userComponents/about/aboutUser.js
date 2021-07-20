import React from "react";
import { Card } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import { DeleteUser } from "../modal/deleteUser";
import { Info } from "./info";

export const AboutUser = ({
  info,
  nicknameEdit,
  aboutEdit,
  userId,
  contextId,
  deleteUser,
}) => (
  <Card style={{ border: "none" }}>
    <Card.Header className="post-title">
      <FormattedMessage id="user-info.title" />:{" "}
    </Card.Header>
    <Card.Body>
      <Info
        info={info}
        userId={userId}
        contextId={contextId}
        nicknameEdit={nicknameEdit}
        aboutEdit={aboutEdit}
      />
      {userId === contextId && <DeleteUser deleteUser={deleteUser} />}
    </Card.Body>
  </Card>
);
