import React from "react";
import { Form, Card, Button } from "react-bootstrap";
import { TagsField } from "../commonComponents/tagsSelect";
import { FormattedMessage } from "react-intl";
import { GenreField } from "../commonComponents/genresSelect";

export const MainPart = ({
  error,
  formSubmit,
  handleForm,
  handleGenre,
  genres,
  handleTag,
  tags,
  value,
  load,
}) => {
  const typingGroup = ["title", "synopsis"];
  return (
    <div className="new-post-wrapper">
      <Card>
        <Card.Header className="post-title">
          <FormattedMessage id="new-post" />:
        </Card.Header>
        <Card.Body>
          {error && <div className="error-text text-center">{error}</div>}
          <Form onSubmit={formSubmit}>
            {typingGroup.map((type) => (
              <Form.Group>
                <Form.Label>
                  <FormattedMessage id={type} />
                </Form.Label>
                <Form.Control
                  as="textarea"
                  type={type}
                  name={type}
                  onChange={handleForm}
                />
              </Form.Group>
            ))}
            <Form.Group>
              <Form.Label>
                <FormattedMessage id="genre" />:
              </Form.Label>
              <GenreField genres={genres} handleGenre={handleGenre} />
            </Form.Group>
            <Form.Group>
              <Form.Label>
                <FormattedMessage id="tags" />:
              </Form.Label>
              <TagsField tags={tags} handleTag={handleTag} value={value} />
            </Form.Group>
            <Button
              variant="link"
              className="send-btn"
              type="submit"
              disabled={load}
            >
              <FormattedMessage id="submit" />
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};
