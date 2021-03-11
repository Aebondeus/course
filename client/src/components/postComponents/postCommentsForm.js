import React, { useContext, useState, useEffect } from "react";
import { Form, Button, Toast } from "react-bootstrap";
import { useLoad } from "../../hooks/loadHook";
import { useForm } from "react-hook-form";
import { authContext } from "../../context/authContext";

const registerOptions = {
  content: {
    required: "This field is required!",
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
        <h2 style={{ marginTop: "2rem" }}>Comments</h2>
      </div>
      <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
        <Toast.Header>
          <strong className="mr-auto">Comment was sent!</strong>
        </Toast.Header>
        <Toast.Body>
          It will appear in some seconds... Maybe even earlier!
        </Toast.Body>
      </Toast>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
          <div name="comment-area">
            Did you like it? Did you hate it? Leave a comment here!
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
          Send it!
        </Button>
      </Form>
    </div>
  );
};
