import React from "react";
import { FormattedMessage } from "react-intl";
import { Card, Spinner } from "react-bootstrap";
import { GenericPost } from "../commonComponents/mainPost.js";

export const MostRated = ({ posts }) => {
  if (!posts) {
    return (
      <div className="text-center">
        <Spinner animation="border" role="status" />
      </div>
    );
  }
  return (
    <Card className="card-out">
      <Card.Body>
        <Card.Title>
          <FormattedMessage id="most-rated" />
        </Card.Title>
        <GenericPost posts={posts} />
      </Card.Body>
    </Card>
  );
};
