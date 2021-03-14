import React from "react";
import { Button, Navbar, Form } from "react-bootstrap";
import {Link} from "react-router-dom";
import {FormattedMessage} from "react-intl";
import {AuthWrapper} from "./authWrapper.js"
import {UiSwitch} from "./uiSwitchers.js"
import './header.css'
export const MainHeader = ({setLang}) => {

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Navbar.Brand className="header-logo">
        <Link to="/" style={{ color: "black", textDecoration: "none" }}>
          MORDOR
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="controlled-header" />
      <Navbar.Collapse id="controlled-header">
        <Form inline>
          <Form.Control
            type="text"
            className="search-tab ml-lg-2 mr-sm-2 mt-sm-2"
          />
          <Button variant="outline-success" className="mt-sm-2">
           <FormattedMessage id="navbar-search"/>
          </Button>
        </Form>
        <UiSwitch setLang={setLang} />
        <div id="mock"></div>
        <AuthWrapper />
      </Navbar.Collapse>
    </Navbar>
  );
};
