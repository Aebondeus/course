import React from "react";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { Card } from "react-bootstrap";
import { dateTimeCommon } from "../../utils/dateFormat.js";

export const GenericPost = ({ posts }) =>
  posts.map((post, idx) => {
    return (
        <Card.Body key={idx} className="post-preview">
          <div className="card-title post-title">{post.name}</div>
          <div className="card-text">
            <div className="post-synopsis">
              <FormattedMessage id="synopsis" />: {post.synopsis}
            </div>
            <div className="post-genre">
              <FormattedMessage id="genre" />: {post.genre}
            </div>
            <div className="post-rating">
              <FormattedMessage id="rating" />: {post.rating}
            </div>
            <div className="post-date">
              <FormattedMessage id="updated" />:{" "}
              {dateTimeCommon.format(Date.parse(post.updated))}
            </div>
            <div>
              <Link className="post-link" to={`/post/${post.id}`}>
                <FormattedMessage id="open-post" />
              </Link>
            </div>
          </div>
        </Card.Body>
    );
  });
