import React from "react";
import { Link, NavLink } from "react-router-dom";

export const PartNav = (props) => {
  const nextPage = props.parts[props.parts.indexOf(props.part._id) + 1];
  const prevPage = props.parts[props.parts.indexOf(props.part._id) - 1];
  if (!!nextPage && !!prevPage) {
    return (
      <div className="parts-nav">
        <Link to={`/post/${props.part.post}/${prevPage}`}>
          Previous Page
        </Link>
        <Link
          to={`/post/${props.part.post}`}
          style={{ marginLeft: "1rem", marginRight: "1rem" }}
        >
          Content
        </Link>
        <Link to={`/post/${props.part.post}/${nextPage}`}>Next Page</Link>
      </div>
    );
  } else if (!!nextPage) {
    return (
      <div className="parts-nav">
        <Link
          to={`/post/${props.part.post}`}
          style={{ marginLeft: "1rem", marginRight: "1rem" }}
        >
          Content
        </Link>
        <Link to={`/post/${props.part.post}/${nextPage}`}>Next Page</Link>
      </div>
    );
  } else if (!!prevPage) {
    return (
      <div className="parts-nav">
        <Link to={`/post/${props.part.post}/${prevPage}`}>Previous Page</Link>
        <Link
          to={`/post/${props.part.post}`}
          style={{ marginLeft: "1rem", marginRight: "1rem" }}
        >
          Content
        </Link>
      </div>
    );
  } else {
    return (
      <div className="parts-nav">
        <Link to={`/post/${props.part.post}`}>Content</Link>
      </div>
    );
  }
};
