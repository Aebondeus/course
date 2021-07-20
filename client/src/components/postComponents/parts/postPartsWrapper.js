import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";
import { authContext } from "../../../context/authContext.js";
import { Parts } from "./parts.js";
import { FormattedMessage } from "react-intl";
import { clientRoutes } from "../../../constants/allRoutes";

const { createPart } = clientRoutes;

export const PostParts = ({ data }) => {
  const context = useContext(authContext);
  const history = useHistory();
  const { id: contextId } = context;

  const partAddHandler = (event) => {
    event.preventDefault();
    const postId = event.target.value;
    history.push(`${createPart}/${postId}`);
  };
  if (!data) {
    return (
      <div className="loader text-center">
        <Spinner animation="border" role="status" />
      </div>
    );
  }

  const { id, author, parts } = data;

  return (
    <div className="post-parts-wrapper">
      {contextId === author && (
        <div className="add-part">
          <Button
            value={id}
            onClick={partAddHandler}
            className="new-part-btn"
            variant="link"
          >
            ✒️
            <FormattedMessage id="new-part" />
          </Button>
        </div>
      )}
      {!parts.length ? (
        <div className="parts-abscence">
          <FormattedMessage id="part-abscence" />
        </div>
      ) : (
        data.parts.map((part, idx) => {
          return <Parts part={part} data={data} idx={idx} />;
        })
      )}
    </div>
  );
};
