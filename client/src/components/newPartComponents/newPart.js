import React from "react";
import { Card, Form, Button } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import { PartEditor } from "../commonComponents/partEditor";
import { ImgDrop } from "../commonComponents/partDropzone";
import "../../styles/newpart.css";

export const MainForm = (props) => (
  <div className="new-part-wrapper">
    <Card>
      <Card.Header className="post-title">
        <FormattedMessage id="new-part.title" />:
      </Card.Header>
      <Card.Body>
        {props.error && (
          <div className="error-text text-center">{props.error}</div>
        )}
        <Form onSubmit={props.handleSubmit}>
          <Form.Group>
            <Form.Label>
              <FormattedMessage id="part-title" />:
            </Form.Label>
            <Form.Control
              name="name"
              type="name"
              onChange={props.nameHandler}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <ImgDrop handleFileInput={props.handleFileInput} />
          </Form.Group>
          <Form.Group>
            <PartEditor
              content={props.content}
              setContent={props.setContent}
              selectedTab={props.selectedTab}
              setSelectedTab={props.setSelectedTab}
            />
          </Form.Group>
          <Button variant="link" className="send-btn" type="submit" disabled={props.load}>
            <FormattedMessage id="submit" />
          </Button>
        </Form>
      </Card.Body>
    </Card>
  </div>
);