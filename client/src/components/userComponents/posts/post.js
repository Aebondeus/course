import React from "react";
import { Card, Button } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import { dateTimeCommon } from "../../../utils/dateFormat.js";
import { Link } from "react-router-dom";

export const Post = ({
  post,
  idx,
  deletePost,
  updatePost,
  load,
  contextId,
}) => {
  const { name, synopsis, ratingTotal, updated, _id: id, author } = post;
  const date = dateTimeCommon.format(Date.parse(updated));

  return (
    <Card key={idx} style={{ marginBottom: "1rem" }}>
      <Card.Body className="user-post">
        <Card.Title className="post-title">{name}</Card.Title>
        <Card.Text>
          <div className="post-synopsis">
            <FormattedMessage id="synopsis" />: {synopsis}
          </div>
          <div className="post-rating">
            <FormattedMessage id="rating" />: {ratingTotal}
          </div>
          <div className="post-date">
            <FormattedMessage id="updated" />: {date}
          </div>
          <div>
            <Link className="post-link" to={`/post/${id}`}>
              <FormattedMessage id="open-post" />
            </Link>
          </div>
        </Card.Text>
      </Card.Body>
      {author === contextId && (
        <Card.Footer style={{ padding: "0 .5rem" }}>
          <Button
            value={id}
            variant="link"
            className="change-btn update-btn"
            onClick={updatePost}
          >
            <FormattedMessage id="update-post" />
          </Button>
          <Button
            value={id}
            variant="link"
            className="change-btn delete-btn"
            onClick={deletePost}
            disabled={load}
          >
            <FormattedMessage id="delete-post" />
          </Button>
        </Card.Footer>
      )}
    </Card>
  );
};
