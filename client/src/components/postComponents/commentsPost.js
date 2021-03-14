import React from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import { Card, Spinner } from "react-bootstrap";

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
                <div className="comment-date">{comment.date}</div>
              </Card.Body>
            </Card>
          </div>
        );
      })
    ) : (
      <div className="comment-empty">Wow... such empty here...</div>
    )
  ) : (
    <div className="loader text-center">
      <Spinner animation="border" role="status" />
    </div>
  );
};
