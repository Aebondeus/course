import React from "react";
import { FormattedMessage } from "react-intl";
import { Form, Button } from "react-bootstrap";
import { regPageOptions } from "../../constants/registerOptions";

const blocks = ["Email", "Password"];

export const FormBlocks = ({ register, errors, error, load }) => (
  <>
    {error && <div className="error-text text-center">{error}</div>}
    {blocks.map((block) => {
      const lowerBlock = block.toLowerCase();
      return (
        <>
          <Form.Group controlId={`form${block}`}>
            <Form.Label>
              <FormattedMessage id={`${lowerBlock}`} />
            </Form.Label>
            <Form.Control
              type={lowerBlock}
              name={lowerBlock}
              ref={register(regPageOptions[lowerBlock])}
            />
          </Form.Group>
          {errors[lowerBlock] && (
            <p className="error-text">{errors[lowerBlock].message}</p>
          )}
        </>
      );
    })}
    <Form.Group controlId="formNickname">
      <Form.Label>
        <FormattedMessage id="nickname" />:
      </Form.Label>
      <Form.Control
        type="nickname"
        name="nickname"
        ref={register(regPageOptions.nickname)}
      ></Form.Control>
      <Form.Text className="text-muted">
        <FormattedMessage id="nickname-muted" />
      </Form.Text>
    </Form.Group>
    {errors.nickname && <p className="error-text">{errors.nickname.message}</p>}
    <Button disabled={load} variant="primary" type="submit">
      <FormattedMessage id="modal-register-btn" />
    </Button>
  </>
);
