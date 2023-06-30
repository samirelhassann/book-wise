"use client";

import React from "react";
import { FcGoogle } from "react-icons/fc";
import { GoRocket } from "react-icons/go";
import { GrGithub } from "react-icons/gr";

import { signIn } from "next-auth/react";
import Image from "next/image";

import WebLoginBgImageMobile from "../../assets/web-login-bg-image-mobile.jpg";
import WebLoginBgImage from "../../assets/web-login-bg-image.jpg";

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 xl:gap-56 xl:flex-row my-7">
      <div className="hidden xl:flex relative w-[41rem] h-[calc(100vh-3.5rem)]">
        <Image src={WebLoginBgImage} alt="login page image" priority fill />
      </div>

      <div className="flex xl:hidden relative w-[calc(100vw-20px)] max-w-[400px] h-[200px]">
        <Image
          src={WebLoginBgImageMobile}
          alt="login page image"
          priority
          fill
        />
      </div>

      <div className="flex flex-col gap-10 text-center xl:text-start">
        <div>
          <h1 className="text-2xl font-bold leading-[140%] text-gray-100">
            Boas vindas!
          </h1>
          <h2 className="text-base font-normal leadinng-[160%]">
            Faça seu login ou acesse como visitante.
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          <button
            className="flex items-center gap-5 w-96 text-gray-200 font-bold leading-[160%] bg-gray-600 py-5 px-6 rounded text-lg hover:bg-gray-500"
            type="button"
            onClick={() => signIn("google")}
          >
            <FcGoogle size={32} /> Entrar com Google
          </button>

          <button
            className="flex items-center gap-5 w-96 text-gray-200 font-bold leading-[160%] bg-gray-600 py-5 px-6 rounded text-lg hover:bg-gray-500"
            type="button"
          >
            <GrGithub size={32} className="fill-gray-100" /> Entrar com GitHub
          </button>

          <button
            className="flex items-center gap-5 w-96 text-gray-200 font-bold leading-[160%] bg-gray-600 py-5 px-6 rounded text-lg hover:bg-gray-500"
            type="button"
          >
            <GoRocket size={32} className="fill-purple-100" /> Acessar como
            visitante
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
