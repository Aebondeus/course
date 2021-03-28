import React from "react";
import { Icon24List, Icon24ChevronLeft, Icon24ChevronRight } from "@vkontakte/icons";
import { Link } from "react-router-dom";

export const PartNav = (props) => {
  const partId = props.part._id;
  const postId = props.part.post;
  const parts = props.parts;
  const nextPage = parts[parts.indexOf(partId) + 1];
  const prevPage = parts[parts.indexOf(partId) - 1];
  return (
    <div className="parts-nav">
      {!!prevPage && (
        <Link className="prev-page" to={`/post/${postId}/${prevPage}`}>
          <Icon24ChevronLeft width={24} height={24} />
          <span>Previous Page</span>
        </Link>
      )}
      <Link className="to-content" to={`/post/${postId}`}>
        {" "}
        <span>Content</span>
        <Icon24List width={24} height={24} />
      </Link>
      {!!nextPage && (
        <Link className="next-page" to={`/post/${postId}/${nextPage}`}>
          <span>Next Page</span>
          <Icon24ChevronRight width={24} height={24} />
        </Link>
      )}
    </div>
  );
};
