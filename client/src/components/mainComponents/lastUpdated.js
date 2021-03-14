import React from "react";
import { Link } from "react-router-dom";
import {FormattedMessage} from "react-intl";

export const LastUpdated = (props) => {
  return (
    <div className="updated-fictions">
      <div className="card">
        <div className="card-body">
          <div className="card-title">
            <h5><FormattedMessage id="last-updated" /></h5>
          </div>
          {props.posts.map((data, idx) => {
            return (
              <div className="card" key={idx}>
                <div className="card-body">
                  <div className="card-title post-title">{data.name}</div>
                  <div className="card-text">
                    <div className="post-synopsis">
                      <FormattedMessage id="synopsis" />: {data.synopsis}
                    </div>
                    <div className="post-date">
                      <FormattedMessage id="updated" />: {data.updated}
                    </div>
                    <div className="post-link">
                      <Link to={`/post/${data.id}`}>
                        <FormattedMessage id="open-post" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
