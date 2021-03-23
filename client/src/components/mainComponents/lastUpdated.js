import React from "react";
import {FormattedMessage} from "react-intl";
import {Card} from "react-bootstrap";
import { GenericPost } from "../commonComponents/mainPost";

export const LastUpdated = ({posts}) => {
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
