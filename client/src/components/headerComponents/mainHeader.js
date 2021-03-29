import React, { useEffect, useContext } from "react";
import { Button, Navbar, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { AuthWrapper } from "./authWrapper.js";
import { UiSwitch } from "./uiSwitchers.js";
import { authContext } from "../../context/authContext.js";
import "../../styles/header.css";

export const MainHeader = ({ setLang, setTheme }) => {
  const theme = localStorage.getItem("theme");
  const context = useContext(authContext);

  const loginOauth = async () => {
    await fetch("/oauth/login/success", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        throw Error;
      })
      .then((res) => {
        if (!res.user) {
          console.log(res.msg);
        } else {
          context.login(res.user.jwtToken);
        }
      })
      .catch(() => {
        console.log("Athentication was failed");
      });
  };

  useEffect(() => {
    loginOauth();
  }, []);

  return (
    <Navbar collapseOnSelect expand="lg" variant={theme}>
      <Navbar.Brand className="header-logo">
        <Link to="/" className="header-logo">
          MORDOR
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="controlled-header" />
      <Navbar.Collapse id="controlled-header">
        <Form inline style={{ marginTop: "6px" }}>
          <Form.Control type="text" className="search-tab" />
          <Button variant="link" className="search-btn">
            <FormattedMessage id="navbar-search" />
          </Button>
        </Form>
        <UiSwitch setLang={setLang} setTheme={setTheme} />
        <div id="mock"></div>
        <AuthWrapper />
      </Navbar.Collapse>
    </Navbar>
  );
};
