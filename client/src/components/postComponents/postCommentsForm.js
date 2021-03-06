import React from "react";

export const PostCommentsForm = () => { // will be useState and formHandler
  return (
    <div className="comment-form-part">
      <div className="title-area text-center">
        <h2 style={{marginTop:"2rem"}}>Comments</h2>
      </div>
      <div className="form-group" style={{width:"50%"}}>
        <div name="comment-area">
          Did you like it? Did you hate it? Leave a comment here!
        </div>
        <textarea className="form-control" name="comment" rows="3" cols="1"></textarea>
        <button type="button" className="btn btn-success" style={{marginTop:"1rem"}}>Send it!</button>
      </div>
    </div>
  );
};
