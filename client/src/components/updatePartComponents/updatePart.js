import React from "react";
import { Card, Form, Button } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import { ImgDrop } from "../commonComponents/partDropzone.js";
import { PartEditor } from "../commonComponents/partEditor.js";

export const PartUpdate = (props) => (
  <Card>
    <Card.Header>
      <FormattedMessage id="update-part.title" />:
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
            name="title"
            type="title"
            value={props.name}
            onChange={props.nameHandler}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <ImgDrop handleFileInput={props.handleFileInput} updated={true} />
        </Form.Group>
        <Form.Group>
          <Form.Label></Form.Label>
          <PartEditor
            content={props.content}
            setContent={props.setContent}
            selectedTab={props.selectedTab}
            setSelectedTab={props.setSelectedTab}
          />
        </Form.Group>
        <Button variant="success" type="submit" disabled={props.load}>
          <FormattedMessage id="submit" />
        </Button>
      </Form>
    </Card.Body>
  </Card>
);
