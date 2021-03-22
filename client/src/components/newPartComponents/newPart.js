import React from "react";
import { Card, Form, Button } from "react-bootstrap";
import {FormattedMessage} from "react-intl";
import { PartEditor } from "../commonComponents/partEditor";
import { ImgDrop } from "../commonComponents/partDropzone";
import "./components.css"

export const MainForm = (props) => {


  return (
    <Card>
      <Card.Header><FormattedMessage id="new-part.title"/>:</Card.Header>
      <Card.Body>
        <Form onSubmit={props.handleSubmit}>
          <Form.Group>
            <Form.Label><FormattedMessage id="part-title"/>:</Form.Label>
            <Form.Control
              name="name"
              type="name"
              onChange={props.nameHandler}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <ImgDrop handleFileInput={props.handleFileInput}/>
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
