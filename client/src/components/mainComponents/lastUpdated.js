import React from "react";
import { FormattedMessage } from "react-intl";
import { Card, Spinner } from "react-bootstrap";
import { GenericPost } from "../commonComponents/mainPost";

export const LastUpdated = ({ posts }) => {
  if (!posts) {
    return (
      <div className="text-center">
        <Spinner animation="border" role="status" />
      </div>
    );
  }
  return (
    <div className="updated-fictions">
      <Card className="card-out">
        <Card.Body>
          <Card.Title>
            <FormattedMessage id="last-updated" />
          </Card.Title>
          <GenericPost posts={posts} />
        </Card.Body>
      </Card>
    </div>
  );
};
