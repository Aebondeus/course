import React from "react";
import {Link} from "react-router-dom"
import {FormattedMessage} from "react-intl";
export const PageNotFound = () => {
    return (
      <div id="not-found text-center">
        <div id="status-code">404</div>
        <div className="explanation">
          <p><FormattedMessage id="not-found-1"/></p><p><FormattedMessage id="not-found-2"/></p>
          <p><FormattedMessage id="not-found-3"/></p>
          <p><FormattedMessage id="not-found-4"/></p>
          <p><FormattedMessage id="not-found-5"/></p>
          <Link to="/" style={{fontWeight:700, color:"black", textDecoration:"none"}}>♥</Link>
        </div>
      </div>
    );
}