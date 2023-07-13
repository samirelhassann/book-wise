"use client";

import React from "react";
import { FcGoogle } from "react-icons/fc";
import { GoRocket } from "react-icons/go";
import { GrGithub } from "react-icons/gr";

import { signIn } from "next-auth/react";
import Image from "next/image";

import WebLoginBgImageMobile from "../../assets/web-login-bg-image-mobile.jpg";
import WebLoginBgImage from "../../assets/web-login-bg-image.jpg";
import {
  Container,
  ImageContainer,
  MobileImageContainer,
  ButtonsContainer,
  WelcomeContainer,
  WelcomeTitle,
  WelcomeSubtitle,
  ButtonsArea,
  LoginButton,
} from "./page.styles";

const LoginPage = () => {
  const login = (provider: string) => {
    signIn(provider, {
      callbackUrl: "/",
    });
  };

  return (
    <Container>
      <ImageContainer>
        <Image src={WebLoginBgImage} alt="login page image" priority fill />
      </ImageContainer>

      <MobileImageContainer>
        <Image
          src={WebLoginBgImageMobile}
          alt="login page image"
          priority
          fill
        />
      </MobileImageContainer>

      <ButtonsContainer>
        <WelcomeContainer>
          <WelcomeTitle>Welcome!</WelcomeTitle>
          <WelcomeSubtitle>Log in or login as a guest.</WelcomeSubtitle>
        </WelcomeContainer>

        <ButtonsArea>
          <LoginButton type="button" onClick={() => login("google")}>
            <FcGoogle size={32} /> Login with Google
          </LoginButton>

          <LoginButton type="button" onClick={() => login("github")}>
            <GrGithub size={32} className="fill-gray-100" /> Login with GitHub
          </LoginButton>

          <LoginButton type="button">
            <GoRocket size={32} className="fill-purple-100" /> Access as a guest
          </LoginButton>
        </ButtonsArea>
      </ButtonsContainer>
    </Container>
  );
};

export default LoginPage;
