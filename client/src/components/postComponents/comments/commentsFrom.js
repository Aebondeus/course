import React from "react";
import { Form, Button } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import { useForm } from "react-hook-form";

const registerOptions = {
  content: {
    required: <FormattedMessage id="comments-form.error" />,
  },
};

export const CommentsForm = ({ onSubmit, load }) => {
  const { register, errors, handleSubmit } = useForm();

  return (
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
  );
};
