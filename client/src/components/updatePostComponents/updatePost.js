import React from "react";
import { Form, Card, Button, Spinner } from "react-bootstrap";
import { TagsField } from "../commonComponents/tagsSelect";
import { FormattedMessage } from "react-intl";
import { GenreField } from "../commonComponents/genresSelect";

export const MainPart = (props) => {
  return !!props.data ? (
    <div className="update-post-wrapper">
      <Card style={{ marginLeft: "5rem", marginRight: "5rem" }}>
        <Card.Header>
          <span className="post-title"><FormattedMessage id="update-post"/>:</span>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={props.formSubmit}>
            <Form.Group>
              <Form.Label>
                <FormattedMessage id="title" />:
              </Form.Label>
              <Form.Control
                as="textarea"
                type="name"
                name="name"
                value={props.data.name}
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
                value={props.data.synopsis}
                onChange={props.handleForm}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>
                <FormattedMessage id="genre" />:
              </Form.Label>
              <div className="genres">
                <GenreField
                  genres={props.genres}
                  handleGenre={props.handleGenre}
                />
              </div>
            </Form.Group>
            <Form.Group>
              <Form.Label>
                <FormattedMessage id="tags" />:
              </Form.Label>
              <TagsField
                tags={props.tags}
                handleTag={props.handleTag}
                value={props.data.tags}
              />
            </Form.Group>
            <Button
              variant="success"
              type="submit"
              disabled={props.load}
              value={props.data.postId}
            >
              <FormattedMessage id="submit" />
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  ) : (
    <div>
      <Spinner animation="border" role="status" className="text-center" />
    </div>
  );
};
