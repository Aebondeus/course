import React from "react";
import { Form, Card, Button } from "react-bootstrap";
import { TagsField } from "./tagsSelect";
const formParts = ["Title", "Synopsis"];

export const MainPart = (props) => {
  return (
    <div className="new-post-wrapper">
      <Card style={{ marginLeft: "5rem", marginRight: "5rem" }}>
        <Card.Header>
          <span className="post-title">Create new post:</span>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={props.formSubmit}>
            {formParts.map((part) => {
              return (
                <Form.Group>
                  <Form.Label>{part}:</Form.Label>
                  <Form.Control
                    type={part.toLowerCase()}
                    name={part.toLowerCase()}
                    onChange={props.handleForm}
                  />
                </Form.Group>
              );
            })}
            <Form.Group>
              <Form.Label>Genre:</Form.Label>
              <div className="genres">
                {props.genres.map((genre) => {
                  return (
                    <Form.Check // change to another select
                      inline
                      type="radio"
                      label={genre}
                      name="genre"
                      id={genre}
                      value={genre}
                      onChange={props.handleForm}
                    />
                  );
                })}
              </div>
            </Form.Group>
            <Form.Group>
              <Form.Label>Tags:</Form.Label>
              <TagsField tags={props.tags} handleTag={props.handleTag} />
            </Form.Group>
            <Button variant="success" type="submit" disabled={props.load}>
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};
