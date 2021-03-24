import React from "react";
import { Form, Card, Button } from "react-bootstrap";
import { TagsField } from "../commonComponents/tagsSelect";
import { FormattedMessage } from "react-intl";
import { GenreField } from "../commonComponents/genresSelect";

export const MainPart = (props) => {
  return (
    <div className="new-post-wrapper">
      <Card style={{ marginLeft: "5rem", marginRight: "5rem" }}>
        <Card.Header>
          <span className="post-title">
            <FormattedMessage id="new-post" />:
          </span>
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
              <GenreField
                genres={props.genres}
                handleGenre={props.handleGenre}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>
                <FormattedMessage id="tags" />:
              </Form.Label>
              <TagsField
                tags={props.tags}
                handleTag={props.handleTag}
                value={props.value}
              />
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
