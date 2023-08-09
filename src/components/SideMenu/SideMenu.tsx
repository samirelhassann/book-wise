import React from "react";
import { BiSolidBinoculars } from "react-icons/bi";
import { BsPerson } from "react-icons/bs";
import { MdOutlineStackedLineChart } from "react-icons/md";

import { Session } from "next-auth";
import Image from "next/image";

import Logo from "../../assets/logo.svg";

import { LoggedUserInfo } from "../LoggedUserInfo";

interface SideMenuProps {
  session: Session | null;
}

export function SideMenu({ session }: SideMenuProps) {
  const isLogged = !!session;

  return (
    <div className="h-[calc(100vh-40px)] my-5 ml-5 px-12 rounded-2xl border-solid border-black border-[1px] bg-gradient-to-t from-green-300 to-gray-700">
      <div className="flex flex-col items-center justify-between h-full py-6 pt-10">
        <div className="flex flex-col gap-20">
          <div className="relative w-32 h-8">
            <Image src={Logo} alt="login page image" priority fill />
          </div>

          <div>
            <div className="flex flex-col justify-start gap-6">
              <a
                href="/"
                className="flex gap-3 text-gray-400 hover:text-gray-100"
              >
                <MdOutlineStackedLineChart size={24} />
                <span className=" leading-[160%]">Home</span>
              </a>

              <a
                href="/explore"
                className="flex gap-3 text-gray-400 hover:text-gray-100 hover:font-bold"
              >
                <BiSolidBinoculars size={24} />
                <span className=" leading-[160%]">Explore</span>
              </a>

              {isLogged && (
                <a
                  href="/profile"
                  className="flex gap-3 text-gray-400 hover:text-gray-100"
                >
                  <BsPerson size={24} />
                  <span className=" leading-[160%]">Profile</span>
                </a>
              )}
            </div>
          </div>
        </div>

        <LoggedUserInfo
          isLogged={isLogged}
          userImage={session?.user?.avatar_url}
          userName={session?.user?.name}
        />
      </div>
    </div>
  );
}

export default SideMenu;
