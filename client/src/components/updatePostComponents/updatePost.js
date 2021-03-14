import React from "react";
import { Form, Card, Button } from "react-bootstrap";
import { TagsField } from "../newPostComponents/tagsSelect";

export const MainPart = (props) => {
  return (
    <div className="update-post-wrapper">
      <Card style={{ marginLeft: "5rem", marginRight: "5rem" }}>
        <Card.Header>
          <span className="post-title">Update post:</span>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={props.formSubmit}>
            <Form.Group>
              <Form.Label>Title:</Form.Label>
              <Form.Control
                type="title"
                name="title"
                placeholder={props.data.name}
                onChange={props.handleForm}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Title:</Form.Label>
              <Form.Control
                type="synopsis"
                name="synopsis"
                placeholder={props.data.synopsis}
                onChange={props.handleForm}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Genre:</Form.Label>
              <div className="genres">
                {props.genres.map((genre) => {
                  return (
                    <Form.Check
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
              <TagsField tags={props.tags} handleTag={props.handleTag} placeholder={props.data.tags}/>
            </Form.Group>
            <Button variant="success" type="submit" disabled={props.load} value={props.data.postId}>
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};
