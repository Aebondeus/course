import React from "react";
import { Card, Form, Button } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import { ImgDrop } from "../commonComponents/partDropzone.js";
import { PartEditor } from "../commonComponents/partEditor.js";

export const PartUpdate = ({
  error,
  name,
  content,
  selectedTab,
  load,
  nameHandler,
  handleFileInput,
  setContent,
  setSelectedTab,
  handleSubmit,
}) => (
  <div className="update-part-wrapper">
    <Card>
      <Card.Header className="post-title">
        <FormattedMessage id="update-part.title" />:
      </Card.Header>
      <Card.Body>
        {error && <div className="error-text text-center">{error}</div>}
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>
              <FormattedMessage id="part-title" />:
            </Form.Label>
            <Form.Control
              name="title"
              type="title"
              value={name}
              onChange={nameHandler}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <ImgDrop handleFileInput={handleFileInput} updated={true} />
          </Form.Group>
          <Form.Group>
            <Form.Label></Form.Label>
            <PartEditor
              content={content}
              setContent={setContent}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />
          </Form.Group>
          <Button
            variant="link"
            className="send-btn"
            type="submit"
            disabled={load}
          >
            <FormattedMessage id="submit" />
          </Button>
        </Form>
      </Card.Body>
    </Card>
  </div>
);
