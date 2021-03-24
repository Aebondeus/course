import React from "react";
import { Button } from "react-bootstrap";

export const OauthComponent = () => {
  const handleVkSignIn = async () => {
    window.open("/oauth/auth/vkontakte", "_self");
  };
  const handleYaSignIn = async () => {
    window.open("/oauth/auth/yandex", "_self");
  };
  const handleGoogleSignIn = async () => {
    window.open("/oauth/auth/google", "_self");
  };
  return (
    <span>
      <Button onClick={handleVkSignIn}>Vk</Button>
      <Button onClick={handleYaSignIn}>Ya</Button>
      <Button onClick={handleGoogleSignIn}>G</Button>
    </span>
  );
};
