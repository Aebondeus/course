import React from "react";
import { Link } from "react-router-dom";

export const PostParts = (props) => {
  const postId = props.postId;
  if (!!props.data) {
    return props.data.parts.map((part, idx) => {
      return (
        <div className="post-parts" key={idx} style={{marginTop:"1rem"}}>
          <Link to={`/post/${postId}/${part.id}`} style={{color:"black", textDecoration:'none'}}>
            <div className="card">
                <div className="card-body">
                    <strong>{part.name}</strong>
                    <div>{part.date}</div>
                </div>
            </div>
          </Link>
        </div>
      );
    });
  } else {
    return <div>Now we wait</div>;
  }
};
