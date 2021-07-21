import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Card, Spinner } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import { authContext } from "../../../context/authContext";
import { useLoad } from "../../../hooks/loadHook.js";
import { clientRoutes, serverRoutes } from '../../../constants/allRoutes';
import { Post } from "./post";

const { post: { main }} = serverRoutes;
const { updatePost: update } = clientRoutes;

export const UserPostsWrapper = ({ posts, del, setDel }) => {
  const { request, load } = useLoad();
  const context = useContext(authContext);
  const history = useHistory();

  const { id: contextId, token } = context;

  const deletePost = async (event) => {
    event.preventDefault();
    const {
      target: { value: postId },
    } = event;
    await request(`${main}/${postId}`, "DELETE", {
      token,
    });
    setDel(!del);
  };

  const updatePost = async ({ target: { value: toUpdate } }) => {
    history.push(`${update}/${toUpdate}`);
  };

  if (!posts) {
    return (
      <div className="loader text-center">
        <Spinner animation="border" role="status" />
      </div>
    );
  }
  if (!posts.length) {
    return (
      <Card.Text>
        <div className="posts-abscence">
          <FormattedMessage id="user-posts.abscence" />
        </div>
      </Card.Text>
    );
  }
  return (
    <div className="userposts-wrapper">
      {posts.map((post, idx) => {
        return (
          <Post
            post={post}
            idx={idx}
            deletePost={deletePost}
            updatePost={updatePost}
            load={load}
            contextId={contextId}
          />
        );})}
    </div>
  );
};
