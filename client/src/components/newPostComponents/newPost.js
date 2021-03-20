import React from "react";
import { Form, Card, Button } from "react-bootstrap";
import { TagsField } from "./tagsSelect";
import {FormattedMessage} from "react-intl";

export const MainPart = (props) => {
  return (
    <div className="new-post-wrapper">
      <Card style={{ marginLeft: "5rem", marginRight: "5rem" }}>
        <Card.Header>
          <span className="post-title">Create new post:</span>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={props.formSubmit}>
            <Form.Group>
              <Form.Label>
                <FormattedMessage id="title" />:
              </Form.Label>
              <Form.Control
                as="textarea"
                type="title"
                name="title"
                onChange={props.handleForm}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>
                <FormattedMessage id="synopsis" />:
              </Form.Label>
              <Form.Control
                as="textarea"
                type="synopsis"
                name="synopsis"
                onChange={props.handleForm}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>
                <FormattedMessage id="genre" />:
              </Form.Label>
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
              <Form.Label>
                <FormattedMessage id="tags" />:
              </Form.Label>
              <TagsField tags={props.tags} handleTag={props.handleTag} value={props.value} />
            </Form.Group>
            <Button variant="success" type="submit" disabled={props.load}>
              <FormattedMessage id="submit" />
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};
