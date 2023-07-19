import React, { ReactNode } from "react";

import Image from "next/image";

import { formatDistance } from "date-fns";

import { Loader } from "./Loader";
import { RatingStars } from "./RatingStars";

interface DetailedCardProps {
  userImage: string | null;
  userName: string;
  bookName: string;
  BookCoverImage: string;
  bookDescription: string;
  authorName: string;
  date: Date;
  rating: number;
}

function Component({
  userImage,
  userName,
  bookName,
  bookDescription,
  BookCoverImage,
  authorName,
  date,
  rating,
}: DetailedCardProps): ReactNode {
  const formatedDate = formatDistance(date, new Date(), {
    addSuffix: true,
  });

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-8 p-6 bg-gray-700 rounded ">
        <div className="flex justify-between">
          <div className="flex gap-4 ">
            {userImage && (
              <Image
                className="max-w-sm p-[1px] rounded-full bg-gray800 bg-gradient-to-b from-green-100 to-purple-100"
                src={userImage}
                alt="rating image user"
                width={42}
                height={42}
              />
            )}

            <div className="flex flex-col">
              <span>{userName}</span>
              <span className="text-sm text-gray-400">{formatedDate}</span>
            </div>
          </div>

          <RatingStars rating={rating} bookName={bookName} />
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

function Loading() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-8 p-6 bg-gray-700 rounded ">
        <div className="flex justify-between">
          <div className="flex gap-4 ">
            <Loader height="h-[42px]" width="w-[42px]" rounded="rounded-full" />

            <div className="flex flex-col gap-2">
              <Loader height="h-[15px]" width="w-[200px]" />

              <Loader height="h-[12px]" width="w-[150px]" />
            </div>
          </div>

          <Loader height="h-[15px]" width="w-[100px]" />
        </div>

        <div className="flex gap-6">
          <Loader height="h-[152px]" width="w-[108px]" />

          <div className="flex flex-col w-full gap-5">
            <div className="flex flex-col gap-2">
              <Loader height="h-[15px]" width="w-[200px]" />

              <Loader height="h-[15px]" width="w-[150px]" />
            </div>

            <Loader height="h-[12px]" width="w-full" />
            <Loader height="h-[12px]" width="w-2/3" />
            <Loader height="h-[12px]" width="w-1/3" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default { Component, Loading };