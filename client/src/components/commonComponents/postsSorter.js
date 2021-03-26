import React from "react";
import { Card, Form } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import Select from "react-select";

const options = [
  {
    label: <FormattedMessage id="user-posts.sort-name-desc" />,
    value: { name: -1 },
  },
  {
    label: <FormattedMessage id="user-posts.sort-name-asc" />,
    value: { name: 1 },
  },
  {
    label: <FormattedMessage id="user-posts.sort-date-asc" />,
    value: { updated: 1 },
  },
  {
    label: <FormattedMessage id="user-posts.sort-date-desc" />,
    value: { updated: -1 },
  },
  {
    label: <FormattedMessage id="user-posts.sort-length-asc" />,
    value: { length: 1 },
  },
  {
    label: <FormattedMessage id="user-posts.sort-length-desc" />,
    value: { length: -1 },
  },
  {
    label: <FormattedMessage id="user-posts.sort-rating-asc" />,
    value: { ratingTotal: 1 },
  },
  {
    label: <FormattedMessage id="user-posts.sort-rating-desc" />,
    value: { ratingTotal: -1 },
  },
];

export const Sorter = ({ selectHandler }) => (
  <Card>
    <Card.Header>
      <FormattedMessage id="user-posts.sort-title" />
    </Card.Header>
    <Card.Body>
      <Form>
        <Form.Group>
          <Select
            options={options}
            onChange={selectHandler}
            defaultValue={options[7]}
          />
        </Form.Group>
      </Form>
    </Card.Body>
  </Card>
);