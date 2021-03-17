import React from "react";
import { Link } from "react-router-dom";
import {FormattedMessage} from "react-intl";

export const GenericPost = ({ posts }) => {
  return posts.map((post, idx) => {
    return (
      <div className="card" key={idx}>
        <div className="card-body">
          <div className="card-title post-title">{post.name}</div>
          <div className="card-text">
            <div className="post-synopsis">
              <FormattedMessage id="synopsis" />: {post.synopsis}
            </div>
            <div className="post-rating">
              <FormattedMessage id="rating" />: {post.rating}
            </div>
            <div className="post-date">
              <FormattedMessage id="updated" />: {post.updated}
            </div>
            <div className="post-link">
              <Link to={`/post/${post.id}`}>
                <FormattedMessage id="open-post" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  });
};