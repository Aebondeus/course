import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
export const PostsResult = ({ data }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title className="post-title">{data.name}</Card.Title>
        <Card.Text>
            <div className="post-synopsis">{data.synopsis}</div>
            <div className="post-rating">{data.rating}</div>
            <div className="post-updated">{data.updated}</div>
            <div className="post-link"><Link to={`/post/${data.id}`}>Просмотреть пост</Link></div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
