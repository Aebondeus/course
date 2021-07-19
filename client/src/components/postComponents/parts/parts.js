import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import { Icon24Chevron } from "@vkontakte/icons";
import { authContext } from "../../../context/authContext.js";
import { useLoad } from "../../../hooks/loadHook.js";
import { dateTimeCommon } from "../../../utils/dateFormat.js";
import { clientRoutes, serverRoutes } from "../../../constants/allRoutes";

const { toPost, updatePart } = clientRoutes;
const {
  part: { main },
} = serverRoutes;

export const Parts = ({
  part: { id, date, name },
  data: { id: postId, author },
  idx,
}) => {
  const { id: contextId, token } = useContext(authContext);
  const history = useHistory();
  const { request, load } = useLoad();

  const updateHandler = async ({ target: { value: partId } }) => {
    history.push(`${updatePart}/${postId}/${partId}`);
  };

  const deleteHandler = async (event) => {
    const partId = event.target.value;
    await request(`${main}/${postId}/${partId}`, "DELETE", {
      token,
    });
  };

  return (
    <div className="post-parts" key={idx} style={{ marginTop: "1rem" }}>
      <Card className="part-card">
        <Link
          to={`${toPost}/${postId}/${id}`}
          style={{ color: "black", textDecoration: "none" }}
        >
          <Card.Body className="part-link">
            <div className="part-title">
              <span className="part-name">{name}</span>
              <div>{dateTimeCommon.format(Date.parse(date))}</div>
            </div>
            <Icon24Chevron width={26} height={26} />
          </Card.Body>
        </Link>
        {contextId === author && (
          <Card.Footer className="part-change">
            <Button
              className="change-btn update-btn"
              variant="link"
              value={id}
              onClick={updateHandler}
            >
              <FormattedMessage id="update-part" />
            </Button>
            <Button
              className="change-btn delete-btn"
              variant="link"
              value={id}
              onClick={deleteHandler}
              disabled={load}
            >
              <FormattedMessage id="delete-part" />
            </Button>
          </Card.Footer>
        )}
      </Card>
    </div>
  );
};
