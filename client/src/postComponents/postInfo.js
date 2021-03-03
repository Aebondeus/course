import React from "react";
import { Link } from "react-router-dom"; // will be used for tags

export const PostInfo = (props) => {
  if (!!props.data){
    return (
      <div className="post-info">
        <div className="card">
          <div className="card-header">{props.data.name}</div>
          <div className="card-body">
            <div className="post-synopsis">
              <span>Synopsis:</span>
              <div>{props.data.synopsis}</div>
            </div>
            <div className="post-genre">
                <span>Genre:</span>
                <div>{props.data.genre}</div>
            </div>
            <div className="post-tags">
                <span>Tags:</span>
                <div>{props.data.tags > 0 ? props.data.tags : "There is no tags yet"}</div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (<div>Now we wait</div>) // here will be loader
  }
  
};
