import React from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import { Card, Spinner } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import { dateTimeComments } from "../../utils/dateFormat.js";

export const Comments = (props) => {
  if (!props.data) {
    return (
      <div className="loader text-center">
        <Spinner animation="border" role="status" />
      </div>
    );
  }
  if (!props.data.length) {
    return (
      <div className="comments-abscence">
        <FormattedMessage id="comments-abscence" />
      </div>
    );
  }
  return props.data.map((comment, idx) => {
    return (
      <div className="comment" key={idx} style={{ marginTop: "1rem" }}>
        <Card>
          <Card.Body>
            <Link to={`/user/${comment.authorId}`}>
              <div className="comment-author">{comment.author}: </div>
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
