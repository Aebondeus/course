import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button } from "react-bootstrap"; // change all class cards on react-bootstrap components
import { authContext } from "../../context/authContext.js";
import { Parts } from "./parts.js";

export const PostParts = ({ data }) => {
  const context = useContext(authContext);
  const history = useHistory();

  const partAddHandler = (event) => {
    event.preventDefault();
    history.push(`/createpart/${event.target.value}`);
  };
  if (!!data) {
    return (
      <div className="post-parts-wrapper">
        {context.id === data.author ? (
          <div className="add-part">
            <Button value={data.id} onClick={partAddHandler}>
              Add new part
            </Button>
          </div>
        ) : null}
        {!!data.parts.length ? (
          data.parts.map((part, idx) => {
            return <Parts part={part} data={data} idx={idx} />;
          })
        ) : (
          <div className="parts-abscence text-center">
            Here will be parts of the post!
          </div>
        )}
      </div>
    );
  } else {
    return <div>Now we wait</div>; // here will be loader
  }
};
