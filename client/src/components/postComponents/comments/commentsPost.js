import React from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import { Card, Spinner } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import { dateTimeComments } from "../../../utils/dateFormat.js";
import { clientRoutes } from "../../../constants/allRoutes";

const { user } = clientRoutes;

export const Comments = ({ data }) => {
  if (!data) {
    return (
      <div className="loader text-center">
        <Spinner animation="border" role="status" />
      </div>
    );
  }
  if (!data.length) {
    return (
      <div className="comments-abscence">
        <FormattedMessage id="comments-abscence" />
      </div>
    );
  }
  return data.map((comment, idx) => {
    return (
      <div className="comment" key={idx} style={{ marginTop: "1rem" }}>
        <Card>
          <Card.Body>
            <Link to={`${user}/${comment.authorId}`}>
              <div className="comment-author">
                {!!comment.author ? (
                  comment.author
                ) : (
                  <FormattedMessage id="user-deleted" />
                )}
                :{" "}
              </div>
            </Link>
            <ReactMarkdown
              className="comment-content"
              source={comment.content}
            />
            <div className="comment-date">
              {dateTimeComments.format(Date.parse(comment.date))}
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  });
};
