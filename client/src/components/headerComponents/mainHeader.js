import React, { useEffect, useContext, useState, useCallback } from "react";
import { Button, Navbar, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { AuthWrapper } from "./auth/wrapper.js";
import { UiSwitch } from "./switchers/switchers.js";
import { authContext } from "../../context/authContext.js";
import { AuthSnack } from "../commonComponents/authSnack.js";

import "../../styles/header.css";
import { serverRoutes } from '../../constants/allRoutes';
import { oauthHeaders as headers } from '../../constants/headers' 

const { oauth: {success} } = serverRoutes;

export const MainHeader = ({ setLang, setTheme }) => {
  const [authOpen, setAuthOpen] = useState(false);
  const theme = localStorage.getItem("theme");
  const { login, nickname } = useContext(authContext);

  const handleAuthClose = () => {
    setAuthOpen(false);
  };

  const loginOauth = useCallback(async () => {
    await fetch(success, {
      method: "GET",
      credentials: "include",
      headers,
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        throw Error;
      })
      .then(({user, msg}) => {
        if (!user) {
          console.log(msg);
        } else {
          login(user.jwtToken);
          setAuthOpen(true);
        }
      })
      .catch(() => {
        console.log("Athentication was failed");
      });
  }, [login]);

  useEffect(() => {
    loginOauth();
  }, [loginOauth]);

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
        <AuthWrapper setAuthOpen={setAuthOpen}/>
        <AuthSnack
          nickname={nickname}
          open={authOpen}
          handleClose={handleAuthClose}
        />
      </Navbar.Collapse>
    </Navbar>
  );
};
