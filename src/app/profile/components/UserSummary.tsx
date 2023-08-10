import React from "react";
import { BiSolidUserDetail } from "react-icons/bi";
import { BsBookmark } from "react-icons/bs";
import { GoBook } from "react-icons/go";
import { PiBooksLight } from "react-icons/pi";

import Image from "next/image";

import GetUserSummary from "@/repository/GetUserSummary";

interface UserSummaryProps {
  userId: string;
  userName: string;
  userImage?: string;
}

export async function UserSummary({
  userId,
  userImage,
  userName,
}: UserSummaryProps) {
  const { authorsRead, booksAvaliated, categoriesRead, pagesRead } =
    await GetUserSummary(userId);

  return (
    <div className="flex flex-col items-center w-full border-l-[1px] border-gray-700">
      <div className="flex flex-col items-center gap-8">
        {userImage && (
          <Image
            className="max-w-sm p-[1px] rounded-full bg-gray800 bg-gradient-to-b from-green-100 to-purple-100"
            src={userImage}
            alt="rating image user"
            width={112}
            height={112}
          />
        )}

        <span className="text-2xl font-bold leading-7 text-gray-100">
          {userName}
        </span>
      </div>

      <div className="w-8 h-1 rounded-full bg-gradient-to-r from-green-100 to-purple-100 my-14" />

      <div className="flex flex-col gap-10">
        <div className="flex items-center gap-5">
          <GoBook size={32} className="text-green-100" />

          <div className="flex flex-col">
            <span className="font-bold leading-6 text-gray-200">
              {pagesRead}
            </span>
            <span className="text-sm leading-6 text-gray-300">Pages read</span>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <PiBooksLight size={32} className="text-green-100" />

          <div className="flex flex-col">
            <span className="font-bold leading-6 text-gray-200">
              {booksAvaliated}
            </span>
            <span className="text-sm leading-6 text-gray-300">
              Books avaliated
            </span>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <BiSolidUserDetail size={32} className="text-green-100" />

          <div className="flex flex-col">
            <span className="font-bold leading-6 text-gray-200">
              {authorsRead}
            </span>
            <span className="text-sm leading-6 text-gray-300">
              Authors read
            </span>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <BsBookmark size={32} className="text-green-100" />

          <div className="flex flex-col">
            <span className="font-bold leading-6 text-gray-200">
              {categoriesRead}
            </span>
            <span className="text-sm leading-6 text-gray-300">
              Categories read
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
