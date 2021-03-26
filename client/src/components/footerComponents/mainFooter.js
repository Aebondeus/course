import React from "react";
import { Navbar } from "react-bootstrap";
import { FormattedMessage } from "react-intl";

const theme = localStorage.getItem("theme")


export const MainFooter = () => (
  <footer id="footer">
    <Navbar variant={theme}>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-center">
        <Navbar.Text>
          <FormattedMessage id="footer-sign" />
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  </footer>
);
