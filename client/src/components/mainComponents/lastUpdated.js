import React from "react";
import { Link } from "react-router-dom";
import {FormattedMessage} from "react-intl";
import { GenericPost } from "../commonComponents/mainPost";

export const LastUpdated = ({posts}) => {
  return (
    <div className="updated-fictions">
      <div className="card">
        <div className="card-body">
          <div className="card-title">
            <h5><FormattedMessage id="last-updated" /></h5>
          </div>
          <GenericPost posts={posts} />
        </div>
      </div>
    </div>
  );
};
