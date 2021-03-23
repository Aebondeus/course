import React from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import { Card, Spinner } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
const dateOption = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
};
const dateTimeFormat = new Intl.DateTimeFormat("ru-Ru", dateOption);

export const Comments = (props) => {
  return !!props.data ? (
    !!props.data.length ? (
      props.data.map((comment, idx) => {
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
                <div className="comment-date">{dateTimeFormat.format(Date.parse(comment.date))}</div>
              </Card.Body>
            </Card>
          </div>
        );
      })
    ) : (
      <div className="comments-abscence"><FormattedMessage id="comments-abscence"/></div>
    )
  ) : (
    <div className="loader text-center">
      <Spinner animation="border" role="status" />
    </div>
  );
};
