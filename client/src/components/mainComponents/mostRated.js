import React from "react";
import { Link } from "react-router-dom";

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
            <h5>Most rated fictions</h5>
          </div>
          <div className="card-text">The most rated fictions will be here</div>
          {props.posts.map((data, idx) => {
            return (
              <div className="card" key={idx}>
                <div className="card-body">
                  <div className="card-title post-title">{data.name}</div>
                  <div className="card-text">
                    <div className="post-synopsis">Synopsis: {data.synopsis}</div>
                    <div className="post-rating">Rating: {data.rating.length > 0 ? medium(data.rating) : 0}</div>
                    <div className="post-link"><Link to={`/post/${data.id}`}>Просмотреть пост</Link></div>
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
