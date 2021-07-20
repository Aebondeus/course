import React from "react";
import { Form, Card, Button, Spinner } from "react-bootstrap";
import { TagsField } from "../commonComponents/tagsSelect";
import { FormattedMessage } from "react-intl";
import { GenreField } from "../commonComponents/genresSelect";

export const MainPart = ({
  data,
  genre,
  genres,
  error,
  tags,
  handleForm,
  handleGenre,
  handleTag,
  formSubmit,
  load,
}) => {
  if (!data) {
    return (
      <div className="text-center">
        <Spinner animation="border" role="status" />
      </div>
    );
  }
  
  const { name, synopsis, postId } = data;

  return (
    <div className="update-post-wrapper">
      <Card>
        <Card.Header className="post-title">
          <FormattedMessage id="update-post" />:
        </Card.Header>
        <Card.Body>
          {error && (
            <div className="error-text text-center">{error}</div>
          )}
          <Form onSubmit={formSubmit}>
            <Form.Group>
              <Form.Label>
                <FormattedMessage id="title" />:
              </Form.Label>
              <Form.Control
                as="textarea"
                type="name"
                name="name"
                value={name}
                onChange={handleForm}
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
                value={synopsis}
                onChange={handleForm}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>
                <FormattedMessage id="genre" />:
              </Form.Label>
              <div className="genres">
                <GenreField
                  genres={genres}
                  handleGenre={handleGenre}
                  value={genre}
                />
              </div>
            </Form.Group>
            <Form.Group>
              <Form.Label>
                <FormattedMessage id="tags" />:
              </Form.Label>
              <TagsField
                tags={tags}
                handleTag={handleTag}
                value={data.tags}
              />
            </Form.Group>
            <Button
              variant="link"
              className="send-btn"
              type="submit"
              disabled={load}
              value={postId}
            >
              <FormattedMessage id="submit" />
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};
