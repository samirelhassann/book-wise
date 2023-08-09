import React, { ReactNode } from "react";
import { BsBook, BsBookmark } from "react-icons/bs";

import Image from "next/image";

import { RatingStars } from "../RatingStars";
import { SkeletonLoader } from "../SkeletonLoader";

interface BookDetailProps {
  image: string;
  title: string;
  author: string;
  rating: number;
  avaliationsCount: number;
  categories: string;
  pagesCount: number;
}

function Component({
  image,
  title,
  author,
  rating,
  avaliationsCount,
  categories,
  pagesCount,
}: BookDetailProps): ReactNode {
  return (
    <div className="flex flex-col gap-10 px-8 py-4 bg-gray-700 rounded-md">
      <div className="flex gap-8">
        <Image
          src={image}
          alt="drawer book image"
          className="rounded-md"
          width={160}
          height={240}
        />

        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-2">
            <span className="text-lg font-bold leading-6 text-gray-100">
              {title}
            </span>

            <span className="text-base leading-6 text-gray-300">{author}</span>
          </div>

          <div className="flex flex-col gap-1">
            <RatingStars rating={rating} bookName="test" />
            <span className="text-sm leading-6 text-gray-400">
              {avaliationsCount} avaliations
            </span>
          </div>
        </div>
      </div>

      <div className="flex py-6 border-t-[1px] border-gray-600 justify-evenly">
        <div className="flex items-center gap-4">
          <BsBookmark size={24} className="text-green-100" />
          <div className="flex flex-col">
            <span className="text-sm leading-6 text-gray-300">Category</span>
            <span className="font-bold leading-6 text-gray-200">
              {categories}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <BsBook size={24} className="text-green-100" />
          <div className="flex flex-col">
            <span className="text-sm leading-6 text-gray-300">Pages</span>
            <span className="font-bold leading-6 text-gray-200">
              {pagesCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Loading(): ReactNode {
  return (
    <div className="flex flex-col gap-10 px-8 py-4 bg-gray-700 rounded-md">
      <div className="flex gap-8">
        <SkeletonLoader width="w-[160px]" height="h-[240px]" />

        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-2">
            <SkeletonLoader width="w-[150px]" height="h-[17px]" />
            <SkeletonLoader width="w-[90px]" height="h-[15px]" />
          </div>

          <div className="flex flex-col gap-1">
            <SkeletonLoader width="w-[100px]" height="h-[15px]" />
            <SkeletonLoader width="w-[70px]" height="h-[15px]" />
          </div>
        </div>
      </div>

      <div className="flex py-6 border-t-[1px] border-gray-600 justify-evenly">
        <div className="flex items-center gap-4">
          <BsBookmark size={24} className="text-green-100" />
          <div className="flex flex-col">
            <span className="text-sm leading-6 text-gray-300">Category</span>
            <SkeletonLoader width="w-[70px]" height="h-[15px]" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <BsBook size={24} className="text-green-100" />
          <div className="flex flex-col">
            <span className="text-sm leading-6 text-gray-300">Pages</span>
            <SkeletonLoader width="w-[70px]" height="h-[15px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default { Component, Loading };
