import React from "react";
import {Button} from "react-bootstrap";

export const OauthComponent = () => {
  const handleFbSignIn = async () => {
    window.open("http://localhost:5000/oauth/auth/facebook", "_self");
  }; // on deploy - /oauth/auth/facebook
  const handleVkSignIn = async () => {
    window.open("http://localhost:5000/oauth/auth/vkontakte", "_self");
  }; // on deploy - /oauth/auth/vk

  return (
    <span>
      <Button onClick={handleFbSignIn}>FB</Button>
      <Button onClick={handleVkSignIn}>Vk</Button>
    </span>
  );
}
