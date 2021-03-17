import React from "react";
import {Button} from "react-bootstrap";

export const OauthComponent = () => {

  const handleFbSignIn = async() => {
    window.open("http://localhost:5000/oauth/auth/facebook", "_self");
  }
  return (
    <Button onClick={handleFbSignIn}>FB</Button>
)
}
