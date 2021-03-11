import React, { useEffect, useState, useContext } from "react";
import { PostInfo } from "../components/postComponents/postInfo";
import { PostParts } from "../components/postComponents/postParts";
import { PostCommentsForm } from "../components/postComponents/postCommentsForm.js";
import { Comments } from "../components/postComponents/commentsPost";
import { authContext } from "../context/authContext";

export const PostPage = ({ match }) => {
  const [postData, setData] = useState({});
  const [comments, setComments] = useState([]);
  const [time, setTime] = useState([true]);
  const context = useContext(authContext);

  const getPost = () => {
    fetch(`/post/getpost/${match.params.postId}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
    fetch(`/post/upload_comm/${match.params.postId}`)
      .then((res) => res.json())
      .then((data) => {
        setComments(data);
      });
  };

  useEffect(() => {
    if (time) {
      setTimeout(() => {
        setTime(false);
      }, 3000);
    } else {
      setTimeout(() => {
        setTime(true);
      }, 5000);
    }
  }, [time]);

  useEffect(() => {
    getPost();
  }, [time]);

  return (
    <div>
      <h1>POST PAGE</h1>
      <PostInfo data={postData.data} />
      <div className="title-area text-center">
        <h2 style={{ marginTop: "2rem" }}>Content</h2>
      </div>
      <PostParts postId={match.params.postId} data={postData.data} />
      {context.token ? <PostCommentsForm data={match.params.postId} /> : null}
      <div className="comment-part" style={{ marginTop: "2rem" }}>
        <div className="comments-title text-center">
          <h2>Comments</h2>
        </div>
        <Comments data={comments} />
      </div>
    </div>
  );
};
