import React from "react";
import { Link } from "react-router-dom";

export const PartNav = (props) => {
  const nextPage = props.parts[props.parts.indexOf(props.part._id) + 1];
  const prevPage = props.parts[props.parts.indexOf(props.part._id) - 1];
  return (
    <div className="parts-nav">
      {!!prevPage && (
        <Link to={`/post/${props.part.post}/${prevPage}`}>Previous Page</Link>
      )}
      <Link
        to={`/post/${props.part.post}`}
        style={{ marginLeft: "1rem", marginRight: "1rem" }}
      >
        Content
      </Link>
      {!!nextPage && (
        <Link to={`/post/${props.part.post}/${nextPage}`}>Next Page</Link>
      )}
    </div>
  );
}
