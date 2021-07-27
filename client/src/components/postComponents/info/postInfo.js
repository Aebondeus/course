import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import ReactStars from "react-stars";

import { FormattedMessage } from "react-intl";
import { Tag } from "../tag/tagButton";
import { ToastBlockRating } from "../toasts/toastBlocks";

import { clientRoutes } from "../../../constants/allRoutes";

const { user } = clientRoutes;

export const PostInfo = ({ data, toastProps, rateSent, contextId }) => {
  const { name, author, nickname, synopsis, genre, tags, rating } = data;
  const { setSuccess, showSuccess, setError, showError } = toastProps;

  const stars = {
    count: 5,
    size: 24,
    activeColor: "#ffd700",
    value: rating || 0,
    onChange: rateSent,
  };

  return (
    <div className="post-info">
      <Card style={{ border: "none" }}>
        <Card.Header className="post-title">{name}</Card.Header>
        <Card.Body>
          <div className="post-synopsis">
            <div>
              <strong>
                <FormattedMessage id="synopsis" />:{" "}
              </strong>
              {synopsis}
            </div>
          </div>
          <div className="post-author">
            <div>
              <strong>
                <FormattedMessage id="author" />:{" "}
              </strong>
              <Link to={`${user}/${author}`}>{nickname}</Link>
            </div>
          </div>
          <div className="post-genre">
            <div>
              <strong>
                <FormattedMessage id="genre" />:{" "}
              </strong>
              {genre}
            </div>
          </div>
          <div className="post-tags">
            <strong>
              <FormattedMessage id="tags" />:
            </strong>{" "}
            {tags.length ? (
              tags.map((tag) => {
                return <Tag tag={tag} />;
              })
            ) : (
              <FormattedMessage id="tags-abscence" />
            )}
          </div>
          <div>
            <strong>
              <FormattedMessage id="rating" />:{" "}
            </strong>
            {rating}
          </div>
          {contextId && <ReactStars {...stars} />}
          <ToastBlockRating
            setSuccess={setSuccess}
            showSuccess={showSuccess}
            setError={setError}
            showError={showError}
          />
        </Card.Body>
      </Card>
    </div>
  );
};
