import React, { useEffect, useState, useContext, useCallback } from "react";
import { FormattedMessage } from "react-intl";
import { PostInfoWrapper } from "../components/postComponents/info/postInfoWrapper";
import { PostParts } from "../components/postComponents/parts/postPartsWrapper";
import { PostCommentsForm } from "../components/postComponents/comments/commentsFormWrapper.js";
import { Comments } from "../components/postComponents/comments/commentsPost";
import { authContext } from "../context/authContext";
import { PageNotFound } from "../components/notFound";
import { serverRoutes } from "../constants/allRoutes";
import "../styles/post.css";

const {
  post: { main, uploadComments },
} = serverRoutes;

// TODO: change setTimeout to sockets
export const PostPage = ({ match }) => {
  const [postData, setData] = useState(null);
  const [error, setError] = useState(false);
  const [raters, setRaters] = useState([]);
  const [comments, setComments] = useState(null);
  const [time, setTime] = useState(true);
  const { token } = useContext(authContext);
  const postId = match.params.postId;
  document.title = !postData ? "Loading..." : postData.name;

  const getPost = useCallback(() => {
    fetch(`${main}/${postId}`)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        throw Error;
      })
      .then((data) => {
        const { author, nickname, raters } = data;
        setData({
          ...data,
          author: !author ? "road_to_404" : author,
          nickname: !nickname ? "DELETED USER" : nickname,
        });
        setRaters(raters);
      })
      .catch(() => setError(true));
  }, [postId]);

  const getComm = useCallback(() => {
    fetch(`${uploadComments}/${postId}`)
      .then((res) => res.json())
      .then((res) => setComments(res));
  }, [postId]);

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
  }, [time, getPost, getComm]);

  if (error) {
    return <PageNotFound />;
  }
  return (
    <div>
      <PostInfoWrapper data={postData} raters={raters} />
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
      {token && <PostCommentsForm data={postId} />}
      <div className="comment-part" style={{ marginTop: "1rem" }}>
        <Comments data={comments} />
      </div>
    </div>
  );
};
