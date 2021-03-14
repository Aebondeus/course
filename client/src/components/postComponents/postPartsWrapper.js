import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button } from "react-bootstrap"; // change all class cards on react-bootstrap components
import { authContext } from "../../context/authContext.js";
import { Parts } from "./parts.js";

export const PostParts = (props) => {
  const context = useContext(authContext);
  const history = useHistory();

  const partAddHandler = (event) => {
    event.preventDefault();
    history.push(`/createpart/${event.target.value}`);
  };
  console.log(props.data);
  if (!!props.data) {
    return (
      <div className="post-parts-wrapper">
        {context.id === props.data.author ? (
          <div className="add-part">
            <Button value={props.data.id} onClick={partAddHandler}>
              Add new part
            </Button>
          </div>
        ) : null}
        {!!props.data.parts.length ? (
          props.data.parts.map((part, idx) => {
            return (
            <Parts part={part} data={props.data} idx={idx}/>
          )})
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
