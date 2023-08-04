"use client";

import React, { ReactNode, useContext } from "react";
import { IoMdExit } from "react-icons/io";
import { RiLoginBoxLine } from "react-icons/ri";

import { signOut } from "next-auth/react";
import Image from "next/image";

import { LoginDialogContext } from "@/providers/contexts/LoginDialogContext";

interface LoggedUserInfoProps {
  isLogged: boolean;
  userImage: string | null | undefined;
  userName: string | null | undefined;
}

export function LoggedUserInfo({
  userImage,
  userName,
  isLogged,
}: LoggedUserInfoProps): ReactNode {
  const firstName = userName?.split(" ")[0];

  const { toggle } = useContext(LoginDialogContext);

  const handleToggleDialog = () => {
    toggle();
  };

  const renderIsLogged = () => {
    return (
      <>
        {userImage && (
          <Image
            className="max-w-sm p-[1px] my-4 rounded-full bg-gray800 bg-gradient-to-b from-green-100 to-purple-100"
            src={userImage}
            alt="logged image user"
            width={32}
            height={32}
          />
        )}

        <span>{firstName}</span>
        <IoMdExit
          size={24}
          className="cursor-pointer fill-red-100"
          onClick={() => signOut()}
        />
      </>
    );
  };

  const renderIsNotLogged = () => {
    return (
      <>
        <span>Login</span>
        <RiLoginBoxLine
          size={24}
          className="cursor-pointer fill-green-100"
          onClick={handleToggleDialog}
        />
      </>
    );
  };

  return (
    <div className="flex items-center self-center gap-3">
      {isLogged ? renderIsLogged() : renderIsNotLogged()}
    </div>
  );
}
