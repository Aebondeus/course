import React, { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useLoad } from "../../hooks/loadHook";
import { useForm } from "react-hook-form";
import { authContext } from "../../context/authContext";
import { FormattedMessage } from "react-intl";
import { ToastComment, ToastError } from "./toasts";

const registerOptions = {
  content: {
    required: <FormattedMessage id="comments-form.error" />,
  },
};

export const PostCommentsForm = ({ data }) => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const { load, request } = useLoad();
  const { register, errors, handleSubmit } = useForm();
  const context = useContext(authContext);

  const onSubmit = async (text, e) => {
    try {
      text.author = context.id;
      const comment = { postId: data, comment: text, token: context.token };
      await request("/handle_post/add_comm", "PUT", comment);
      e.target.reset();
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
      <ToastComment setShow={setShow} show={show} />
      <ToastError setError={setError} show={error} />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group style={{ marginBottom: "0" }}>
          <div name="comment-area">
            <FormattedMessage id="comments-form.sign" />
          </div>
          <Form.Control
            id="comment"
            as="textarea"
            rows={2}
            name="content"
            ref={register(registerOptions.content)}
          ></Form.Control>
          {errors.content && (
            <p className="error-text">{errors.content.message}</p>
          )}
        </Form.Group>
        <Button
          className="send-btn"
          variant="link"
          type="submit"
          disabled={load}
          onClick={handleSubmit}
        >
          <FormattedMessage id="comments-form.send" />
        </Button>
      </Form>
    </div>
  );
};
