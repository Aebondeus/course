import React from "react";
import {Button} from "react-bootstrap";

export const OauthComponent = () => {
  // const handleFbSignIn = async () => {
  // //   window.open("http://localhost:5000/oauth/auth/facebook", "_self");
  // // }; // on deploy - /oauth/auth/facebook probably will be destroyed
  const handleVkSignIn = async () => {
    window.open("/oauth/auth/vkontakte", "_self");
  }; // on deploy - /oauth/auth/vkontakte, on dev - http://localhost:5000/oauth/auth/vkontakte
  const handleYaSignIn = async () => {
    window.open("/oauth/auth/yandex", "_self");
  } // on deploy - /oauth/auth/yandex, on dev - http://localhost:5000/oauth/auth/yandex
  const handleGoogleSignIn = async () => {
    window.open("/oauth/auth/google", "_self");
  } // on deploy - /oauth/auth/google, on dev - http://localhost:5000/oauth/auth/google
  return (
    <span>
      <Button onClick={handleVkSignIn}>Vk</Button>
      <Button onClick={handleYaSignIn}>Ya</Button>
      <Button onClick={handleGoogleSignIn}>G</Button>
    </span>
  );
}
