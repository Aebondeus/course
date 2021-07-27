import React from "react";
import { Card, Form, Button } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import { PartEditor } from "../commonComponents/partEditor";
import { ImgDrop } from "../commonComponents/partDropzone";
import "../../styles/newpart.css";

export const MainForm = ({
  error,
  handleSubmit,
  nameHandler,
  handleFileInput,
  content,
  setContent,
  selectedTab,
  setSelectedTab,
  load
}) => (
  <div className="new-part-wrapper">
    <Card>
      <Card.Header className="post-title">
        <FormattedMessage id="new-part.title" />:
      </Card.Header>
      <Card.Body>
        {error && (
          <div className="error-text text-center">{error}</div>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>
              <FormattedMessage id="part-title" />:
            </Form.Label>
            <Form.Control
              name="name"
              type="name"
              onChange={nameHandler}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <ImgDrop handleFileInput={handleFileInput} />
          </Form.Group>
          <Form.Group>
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
