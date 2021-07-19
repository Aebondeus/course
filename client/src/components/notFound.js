import React from "react";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import "../styles/404.css";

// TODO: try to more simplify explanation block

const messagesId = [
  "not-found-1",
  "not-found-2",
  "not-found-3",
  "not-found-4",
  "not-found-5",
];

export const PageNotFound = () => {
  document.title = "404 - Not found!";
  return (
    <div id="not-found">
      <div id="status-code">404</div>
      <div className="explanation">
        {messagesId.map((id) => (
          <p>
            <FormattedMessage id={id} />
          </p>
        ))}
        <Link
          to="/"
          style={{ fontWeight: 700, color: "inherit", textDecoration: "none" }}
        >
          ♥
        </Link>
      </div>
    </div>
  );
};
