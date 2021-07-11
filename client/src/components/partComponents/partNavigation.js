import React from "react";
import {
  Icon24List,
  Icon24ChevronLeft,
  Icon24ChevronRight,
} from "@vkontakte/icons";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { clientRoutes } from '../../constants/allRoutes';

const { toPost } = clientRoutes;

// TODO: all props should be destuctured
export const PartNav = (props) => {
  const partId = props.part._id;
  const postId = props.part.post;
  const parts = props.parts;
  const nextPage = parts[parts.indexOf(partId) + 1];
  const prevPage = parts[parts.indexOf(partId) - 1];
  return (
    <div className="parts-nav">
      {!!prevPage && (
        <Link className="prev-page" to={`${toPost}/${postId}/${prevPage}`}>
          <Icon24ChevronLeft />
          <span>
            <FormattedMessage id="previous-part" />
          </span>
        </Link>
      )}
      <Link className="to-content" to={`${toPost}/${postId}`}>
        {" "}
        <span>
          <FormattedMessage id="content-title" />
        </span>
        <Icon24List />
      </Link>
      {!!nextPage && (
        <Link className="next-page" to={`${toPost}/${postId}/${nextPage}`}>
          <span>
            <FormattedMessage id="next-part" />
          </span>
          <Icon24ChevronRight />
        </Link>
      )}
    </div>
  );
};
