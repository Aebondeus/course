import React from "react";
import { Link } from "react-router-dom";

export const LastUpdated = (props) => {
  return (
    <div className="updated-fictions">
      <div className="card">
        <div className="card-body">
          <div className="card-title">
            <h5>Recently updated</h5>
          </div>
          <div className="card-text">
            All recently updated posts will be here
          </div>
          {props.posts.map((data, idx) => {
            return (
              <div className="card" key={idx}>
                <div className="card-body">
                  <div className="card-title">{data.name}</div>
                  <div className="card-text">
                    <div className="post-synopsis">{data.synopsis}</div>
                    <div className="post-date">{data.updated}</div>
                    <div className="post-link"><Link to={`/post/${data.id}`}>Посмотреть пост</Link></div>
                    
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
