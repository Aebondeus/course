import React from "react";
import {Button} from "react-bootstrap";
import { Link } from "react-router-dom"; // will be used for tags

export const PostInfo = (props) => {
  if (!!props.data){
    return (
      <div className="post-info">
        <div className="card">
          <div className="card-header post-title">{props.data.name}</div>
          <div className="card-body">
            <div className="post-synopsis">
              <div>Synopsis: {props.data.synopsis}</div>
            </div>
            <div className="post-genre">
                <div>Genre: {props.data.genre}</div>
            </div>
            <div className="post-tags">
                <div>Tags: {!!props.data.tags.length? props.data.tags.map(tag => {
                  return (<Button>{tag.label}</Button>)
                }) : "There is no tags yet"}</div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (<div>Now we wait</div>) // here will be loader
  }
  
};
