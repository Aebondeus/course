import React, { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { CommentsForm } from "./commentsFrom";
import { useLoad } from "../../../hooks/loadHook";
import { authContext } from "../../../context/authContext";
import { ToastBlockComments } from "../toasts/toastBlocks";
import { serverRoutes } from '../../../constants/allRoutes';

const { post: { addComment } } = serverRoutes;

export const PostCommentsForm = ({ data }) => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const { load, request } = useLoad();

  const {id, token } = useContext(authContext);

  const onSubmit = async (text, { target }) => {
    try {
      setError(false);
      text.author = id;
      const comment = { postId: data, comment: text, token };
      await request(addComment, "PUT", comment);
      target.reset();
      setShow(true);
    } catch (err) {
      setError(true);
      console.log(err);
      throw err;
    }
  };

  return (
    <div className="comment-form-part">
      <div className="title-area text-center"></div>
      <ToastBlockComments
        setShow={setShow}
        show={show}
        error={error}
        setError={setError}
      />
      <CommentsForm onSubmit={onSubmit} load={load} />
    </div>
  );
};
