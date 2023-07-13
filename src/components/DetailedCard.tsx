import React, { ReactNode } from "react";

import Image from "next/image";

import { RatingStars } from "./RatingStars";

interface DetailedCardProps {
  userImage: string;
  userName: string;
  bookName: string;
  BookCoverImage: string;
  bookDescription: string;
  authorName: string;
}

export function DetailedCard({
  userImage,
  userName,
  bookName,
  bookDescription,
  BookCoverImage,
  authorName,
}: DetailedCardProps): ReactNode {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-8 p-6 bg-gray-700 rounded ">
        <div className="flex justify-between">
          <div className="flex gap-4 ">
            <Image
              className="max-w-sm p-[1px] rounded-full bg-gray800 bg-gradient-to-b from-green-100 to-purple-100"
              src={userImage}
              alt="rating image user"
              width={42}
              height={42}
            />

            <div className="flex flex-col">
              <span>{userName}</span>
              <span className="text-sm text-gray-400">Hoje</span>
            </div>
          </div>

          <RatingStars rating={3} bookName={bookName} />
        </div>

        <div className="flex gap-6">
          <Image
            src={BookCoverImage}
            alt="book image user"
            width={108}
            height={152}
          />

          <div className="flex flex-col gap-5">
            <div className="flex flex-col">
              <span className="font-bold leading-[140%]">{bookName}</span>
              <span className="text-gray-400 ">{authorName}</span>
            </div>
            <span className="text-sm text-gray-300">{bookDescription}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
