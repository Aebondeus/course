import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";
import { authContext } from "../../context/authContext.js";
import { Parts } from "./parts.js";
import { FormattedMessage } from "react-intl";

export const PostParts = ({ data }) => {
  const context = useContext(authContext);
  const history = useHistory();

  const partAddHandler = (event) => {
    event.preventDefault();
    history.push(`/createpart/${event.target.value}`);
  };
  if (!data) {
    return (
      <div className="loader text-center">
        <Spinner animation="border" role="status" />
      </div>
    );
  }
  return (
    <div className="post-parts-wrapper">
      {context.id === data.author && (
        <div className="add-part">
          <Button value={data.id} onClick={partAddHandler}>
            <FormattedMessage id="new-part" />
          </Button>
        </div>
      )}
      {!data.parts.length && (
        <div className="parts-abscence text-center">
          <FormattedMessage id="part-abscence" />
        </div>
      )}
      {!!data.parts.length &&
        data.parts.map((part, idx) => {
          return <Parts part={part} data={data} idx={idx} />;
        })}
    </div>
  );
};
