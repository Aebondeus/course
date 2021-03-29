import React, { useEffect, useState, useContext } from "react";
import { FormattedMessage } from "react-intl";
import { PostInfo } from "../components/postComponents/postInfo";
import { PostParts } from "../components/postComponents/postPartsWrapper";
import { PostCommentsForm } from "../components/postComponents/postCommentsForm.js";
import { Comments } from "../components/postComponents/commentsPost";
import { authContext } from "../context/authContext";
import { PageNotFound } from "../components/notFound";
import "../styles/post.css";

export const PostPage = ({ match }) => {
  const [postData, setData] = useState(null);
  const [error, setError] = useState(false);
  const [raters, setRaters] = useState([]);
  const [comments, setComments] = useState(null);
  const [time, setTime] = useState([true]);
  const context = useContext(authContext);
  const postId = match.params.postId;
  document.title = !!postData ? postData.name : "Loading...";

  const getPost = () => {
    fetch(`/handle_post/post/${postId}`)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        throw Error;
      })
      .then((data) => {
        setData({
          id: data.id,
          name: data.name,
          synopsis: data.synopsis,
          genre: data.genre,
          tags: data.tags,
          author: data.author,
          parts: data.parts,
          rating: data.rating,
        });
        setRaters(data.raters);
      })
      .catch(() => setError(true));
  };

  const getComm = () => {
    fetch(`/handle_post/upload_comm/${postId}`)
      .then((res) => res.json())
      .then((res) => {
        setComments(res);
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
    getComm();
  }, [time]);

  if (error) {
    return <PageNotFound />;
  }
  return (
    <div>
      <PostInfo data={postData} raters={raters} />
      <div className="title-area text-center">
        <h2 style={{ margin: "2rem 0" }}>
          <FormattedMessage id="content-title" />
        </h2>
      </div>
      <PostParts data={postData} />
      <div className="comments-title text-center" style={{ margin: "2rem 0" }}>
        <h2>
          <FormattedMessage id="comments" />
        </h2>
      </div>
      {context.token && <PostCommentsForm data={postId} />}
      <div className="comment-part" style={{ marginTop: "1rem" }}>
        <Comments data={comments} />
      </div>
    </div>
  );
};
