import React from "react";
import { Card, Form, Button } from "react-bootstrap";
import { PartEditor } from "../commonComponents/partEditor.js";

export const PartUpdate = (props) => {
  console.log(props);
  return (
    <Card>
      <Card.Header>Update part of the post:</Card.Header>
      <Card.Body>
        <Form onSubmit={props.onSubmit}>
          <Form.Group>
            <Form.Label>Title:</Form.Label>
            <Form.Control
              name="title"
              type="title"
              value={props.name}
              onChange={props.nameHandler}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Content:</Form.Label>
            <PartEditor
              content={props.content}
              setContent={props.setContent}
              selectedTab={props.selectedTab}
              setSelectedTab={props.setSelectedTab}
            />
          </Form.Group>

          <Button variant="success" type="submit" disabled={props.load}>
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};
