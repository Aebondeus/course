import React from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router";
import { clientRoutes } from "../../../constants/allRoutes";

const { searchByTag } = clientRoutes;

export const Tag = ({ tag }) => {
  const { id, label } = tag;
  const history = useHistory();

  const tagSearch = (event) => {
    event.preventDefault();
    const {
      target: { name: tag },
    } = event;
    history.push(`${searchByTag}/${tag}`);
  };
  return (
    <Button
      variant="link"
      className="tag"
      value={id}
      name={label}
      onClick={tagSearch}
    >
      {label}
    </Button>
  );
};
