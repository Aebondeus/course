import React from "react";
import {Button} from "react-bootstrap";

export const OauthComponent = () => {
  // const handleFbSignIn = async () => {
  // //   window.open("http://localhost:5000/oauth/auth/facebook", "_self");
  // // }; // on deploy - /oauth/auth/facebook probably will be destroyed
  const handleVkSignIn = async () => {
    window.open("http://localhost:5000/oauth/auth/vkontakte", "_self");
  }; // on deploy - /oauth/auth/vk
  const handleYaSignIn = async () => {
    window.open("http://localhost:5000/oauth/auth/yandex", "_self");
  }
  const handleGoogleSignIn = async () => {
    window.open("http://localhost:5000/oauth/auth/google", "_self");
  }
  return (
    <span>
      <Button onClick={handleVkSignIn}>Vk</Button>
      <Button onClick={handleYaSignIn}>Ya</Button>
      <Button onClick={handleGoogleSignIn}>G</Button>
    </span>
  );
}
