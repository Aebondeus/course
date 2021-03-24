import React from "react";
import { Navbar } from "react-bootstrap";
import { FormattedMessage } from "react-intl";

export const MainFooter = () => {
  return (
    <footer id="footer">
      <Navbar bg="light">
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-center">
          <Navbar.Text>
            <FormattedMessage id="footer-sign" />
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    </footer>
  );
};
