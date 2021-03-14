import React from "react";
import { Link } from "react-router-dom";
import {FormattedMessage} from "react-intl";
export const MostRated = (props) => {

  const medium = (arr) => {
    let data = arr.reduce((prev, cur) => {
      return prev + cur;
    });
    return (data / arr.length).toFixed(1);
  }

  return (
    <div className="popular-fictions">
      <div className="card">
        <div className="card-body">
          <div className="card-title">
            <h5><FormattedMessage id="most-rated"/></h5>
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
                    <div className="post-rating">
                      <FormattedMessage id="rating" />:{" "}
                      {data.rating.length > 0 ? medium(data.rating) : 0}
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
