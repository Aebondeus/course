import React, {useContext} from "react";
import { Card, Form } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import {ThemeContext} from "styled-components";

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

export const Sorter = ({ selectHandler }) => {
  const context = useContext(ThemeContext);
  return (
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
              theme={theme => ({
                ...theme,
                colors:{
                  primary:context.text,
                  primary25:context.cardHeaderFooter,
                  primary50:context.cardHeaderFooter,
                  neutral0:context.wholeApp,
                  neutral20:context.cardBorder,
                  neutral40:context.text
                }
              })}
            />
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
};
