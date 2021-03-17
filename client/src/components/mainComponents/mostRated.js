import React from "react";
import {FormattedMessage} from "react-intl";
import {GenericPost} from "../commonComponents/mainPost.js"
export const MostRated = ({posts}) => {

  return (
    <div className="popular-fictions">
      <div className="card">
        <div className="card-body">
          <div className="card-title">
            <h5><FormattedMessage id="most-rated"/></h5>
          </div>
          <GenericPost posts={posts} />
        </div>
      </div>
    </div>
  );
};
