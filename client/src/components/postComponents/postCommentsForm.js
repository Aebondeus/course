import React, { useContext, useState, useEffect } from "react";
import { Form, Button, Toast } from "react-bootstrap";
import { useLoad } from "../../hooks/loadHook";
import { useForm } from "react-hook-form";
import { authContext } from "../../context/authContext";
import {FormattedMessage} from "react-intl";

const registerOptions = {
  content: {
    required: <FormattedMessage id="comments-form.error"/>,
  },
};

export const PostCommentsForm = (props) => {
  const [show, setShow] = useState(false);
  const { load, request } = useLoad();
  const { register, errors, handleSubmit } = useForm();
  const context = useContext(authContext);

  const onSubmit = async (data, e) => {
    try {
      data.author = context.id;
      const comment = { postId: props.data, comment: data };
      console.log(comment);
      await request("/post/add_comm", "PUT", comment);
      e.target.reset();
      setShow(true);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  return (
    <div className="comment-form-part">
      <div className="title-area text-center">
      </div>
      <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
        <Toast.Header>
          <strong className="mr-auto"><FormattedMessage id="comments-form.sent.header"/></strong>
        </Toast.Header>
        <Toast.Body>
          <FormattedMessage id="comments-form.sent.body"/>
        </Toast.Body>
      </Toast>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
          <div name="comment-area">
            <FormattedMessage id="comments-form.sign" />
          </div>
          <Form.Control
            id="comment"
            as="textarea"
            rows={2}
            name="content"
            style={{ width: "50%" }}
            ref={register(registerOptions.content)}
          ></Form.Control>
          {errors.content && (
            <p className="error-text">{errors.content.message}</p>
          )}
        </Form.Group>
        <Button
          variant="success"
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
