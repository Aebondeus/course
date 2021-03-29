import React from "react";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import "../styles/404.css";
const styles = {
  notfound: {
    paddingTop: "40px",
    textAlign: "center",
    fontWeight: "700",
    fontSize: "2rem",
  },
};
export const PageNotFound = () => {
  document.title = "404 - Not found!";
  return (
    <div id="not-found">
      <div id="status-code">404</div>
      <div className="explanation">
        <p>
          <FormattedMessage id="not-found-1" />
        </p>
        <p>
          <FormattedMessage id="not-found-2" />
        </p>
        <p>
          <FormattedMessage id="not-found-3" />
        </p>
        <p>
          <FormattedMessage id="not-found-4" />
        </p>
        <p>
          <FormattedMessage id="not-found-5" />
        </p>
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
