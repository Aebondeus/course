import React from "react";
import { Button } from "react-bootstrap";
import { Icon36LogoVk, Icon24LogoGoogle } from "@vkontakte/icons";
import { serverRoutes } from '../../constants/allRoutes';

const { oauth: {vk, yandex, google} } = serverRoutes;
export const OauthComponent = () => {

  const handleVkSignIn = async () => {
    window.open(vk, "_self");
  };
  const handleYaSignIn = async () => {
    window.open(yandex, "_self");
  };
  const handleGoogleSignIn = async () => {
    window.open(google, "_self");
  };
  return (
    <span>
      <Button id="logo-vk" variant="link" onClick={handleVkSignIn}>
        <Icon36LogoVk width={20} height={20} />
      </Button>
      <Button id="logo-yandex" variant="link" onClick={handleYaSignIn}>
        Y
      </Button>
      <Button id="logo-google" variant="link" onClick={handleGoogleSignIn}>
        <Icon24LogoGoogle width={20} height={20} />
      </Button>
    </span>
  );
};
