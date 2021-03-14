import React from "react";
import { Card, Form, Button } from "react-bootstrap";
import { PartEditor } from "../commonComponents/partEditor";

export const MainForm = (props) => {
  return (
    <Card>
      <Card.Header>Create new part of the post:</Card.Header>
      <Card.Body>
        <Form onSubmit={props.handleSubmit}>
          <Form.Group>
            <Form.Label>Part Title:</Form.Label>
            <Form.Control
              name="name"
              type="name"
              onChange={props.nameHandler}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
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
