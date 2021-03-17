import React, { useEffect, useState, useContext } from "react";
import {FormattedMessage} from "react-intl";
import { PostInfo } from "../components/postComponents/postInfo";
import { PostParts } from "../components/postComponents/postPartsWrapper";
import { PostCommentsForm } from "../components/postComponents/postCommentsForm.js";
import { Comments } from "../components/postComponents/commentsPost";
import { authContext } from "../context/authContext";

export const PostPage = ({ match }) => {
  const [postData, setData] = useState(null);
  const [raters, setRaters] = useState([]);
  const [comments, setComments] = useState(null);
  const [time, setTime] = useState([true]);
  const context = useContext(authContext);

  const getPost = () => {
    fetch(`/post/getpost/${match.params.postId}`)
      .then((res) => res.json())
      .then((data) => {
        setData({
          id:data.id,
          name:data.name,
          synopsis:data.synopsis,
          genre:data.genre,
          tags:data.tags,
          author:data.author,
          parts:data.parts,
          rating: data.rating
        });
        setRaters(data.raters);
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
      <h1>
        <FormattedMessage id="post-page" />
      </h1>
      <PostInfo data={postData} raters={raters} />
      <div className="title-area text-center">
        <h2 style={{ marginTop: "2rem" }}>
          <FormattedMessage id="content-title" />
        </h2>
      </div>
      <PostParts data={postData} />
      <div className="comments-title text-center" style={{marginTop:"2rem"}}>
        <h2>
          <FormattedMessage id="comments" />
        </h2>
      </div>
      {context.token ? <PostCommentsForm data={match.params.postId} /> : null}
      <div className="comment-part" style={{ marginTop: "2rem" }}>
        <Comments data={comments} />
      </div>
    </div>
  );
};
