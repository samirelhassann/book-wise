import React, { ReactNode } from "react";

import Image from "next/image";

import { formatDistance } from "date-fns";

import { RatingStars } from "../RatingStars";
import { SkeletonLoader } from "../SkeletonLoader";

interface DetailedCardProps {
  userImage?: string | null;
  userName: string;
  bookName: string;
  date: Date;
  rating: number;
  ratingDescription: string;
  isUserRating: boolean;
}

function Component({
  userImage,
  userName,
  date,
  rating,
  ratingDescription,
  bookName,
  isUserRating,
}: DetailedCardProps): ReactNode {
  const formatedDate = formatDistance(date, new Date(), {
    addSuffix: true,
  });

  return (
    <div className="flex flex-col gap-3">
      <div
        className="flex flex-col gap-8 p-6 bg-gray-700 rounded data-[user-rating=true]:bg-gray-600"
        data-user-rating={isUserRating}
      >
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

        <span>{ratingDescription}</span>
      </div>
    </div>
  );
}

function Loading(): ReactNode {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-8 p-6 bg-gray-700 rounded ">
        <div className="flex justify-between">
          <div className="flex gap-4 ">
            <SkeletonLoader width="w-[42px]" height="h-[42px]" />

            <div className="flex flex-col">
              <SkeletonLoader width="w-[100px]" height="h-[15px]" />
              <SkeletonLoader width="w-[70px]" height="h-[15px]" />
            </div>
          </div>
          <SkeletonLoader width="w-[100px]" height="h-[15px]" />
        </div>

        <SkeletonLoader width="w-2/3" height="h-[15px]" />
        <SkeletonLoader width="w-1/3" height="h-[15px]" />
      </div>
    </div>
  );
}

export default { Component, Loading };
