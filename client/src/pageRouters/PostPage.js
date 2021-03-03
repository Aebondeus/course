import React, { useEffect, useState } from "react";
import { PostInfo } from "../postComponents/postInfo";
import { PostParts } from "../postComponents/postParts";
import { PostCommentsForm } from "../postComponents/postCommentsForm.js";
import { Comments } from "../postComponents/commentsPost";

export const PostPage = ({ match }) => {
  const [postData, setData] = useState({});
  const [comments, setComments] = useState([]);
  useEffect(() => {
    let getPost = async () => {
      await fetch(`/post/getpost/${match.params.postId}`)
        .then((res) => res.json())
        .then((data) => {
          setTimeout(() => {
            setData(data);
          }, 100);
        });
      await fetch(`/post/upload_comm/${match.params.postId}`)
        .then((res) => res.json())
        .then((data) => {
          setTimeout(() => {
            setComments(data);
          }, 0);
        });
    };
    getPost();
  }, [match.params.postId]);

  return (
    <div>
      <h1>POST PAGE</h1>
      <PostInfo data={postData.data} />
      <div className="title-area text-center">
        <h2 style={{marginTop:"2rem"}}>Content</h2>
      </div>
      <PostParts postId={match.params.postId} data={postData.data} />
      <PostCommentsForm />
      <div className="comment-part">
        <Comments data={comments} />
      </div>
    </div>
  );
};
