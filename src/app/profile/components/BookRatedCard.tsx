import React, { ReactNode } from "react";

import Image from "next/image";

import { RatingStars } from "@/components/RatingStars";
import { SkeletonLoader } from "@/components/SkeletonLoader";

interface BookRatedCardProps {
  bookName: string;
  BookCoverImage: string;
  userAvaliation: string;
  authorName: string;
  rating: number;
}

function Component({
  bookName,
  userAvaliation,
  BookCoverImage,
  authorName,
  rating,
}: BookRatedCardProps): ReactNode {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-8 p-6 bg-gray-700 rounded-lg">
        <div className="flex gap-6">
          <Image
            src={BookCoverImage}
            alt="book image user"
            width={108}
            height={152}
          />

          <div className="flex flex-col justify-between gap-5">
            <div className="flex flex-col">
              <span className="font-bold leading-[140%]">{bookName}</span>

              <span className="text-gray-400 ">{authorName}</span>
            </div>
            <RatingStars rating={rating} bookName={bookName} />
          </div>
        </div>
        <span className="text-sm text-gray-300">{userAvaliation}</span>
      </div>
    </div>
  );
}

function Loading() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-8 p-6 bg-gray-700 rounded-lg">
        <div className="flex gap-6">
          <SkeletonLoader width="w-[108px]" height="h-[152px]" />

          <div className="flex flex-col justify-between gap-5">
            <div className="flex flex-col gap-2">
              <SkeletonLoader width="w-[200px]" height="h-[20px]" />
              <SkeletonLoader width="w-[120px]" height="h-[17px]" />
            </div>

            <SkeletonLoader width="w-[100px]" height="h-[17px]" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <SkeletonLoader width="w-2/3" height="h-[17px]" />
          <SkeletonLoader width="w-1/3" height="h-[17px]" />
        </div>
      </div>
    </div>
  );
}

export default { Component, Loading };
