/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

"use client";

import React, { ReactNode, useContext } from "react";

import Image from "next/image";

import { ProductDrawerContext } from "@/providers/contexts/ProductDrawerContext";

import { Loader } from "./Loader";
import { RatingStars } from "./RatingStars";

interface DetailedCardProps {
  bookId: string;
  bookName: string;
  bookCoverImage: string;
  authorName: string;
  rating: number;
  isImageBigger?: boolean;
}

function Component({
  bookId,
  bookName,
  bookCoverImage,
  authorName,
  rating,
  isImageBigger,
}: DetailedCardProps): ReactNode {
  const { toggle } = useContext(ProductDrawerContext);

  const handleToggleDrawer = () => {
    toggle(bookId);
  };

  return (
    <div
      className="flex flex-col gap-3 cursor-pointer"
      onClick={handleToggleDrawer}
    >
      <div className="flex flex-col gap-8 p-6 bg-gray-700 rounded ">
        <div className="flex gap-6">
          <Image
            src={bookCoverImage}
            alt="book image user"
            width={isImageBigger ? 108 : 64}
            height={isImageBigger ? 152 : 94}
          />

          <div className="flex flex-col justify-between gap-5">
            <div className="flex flex-col">
              <span className="font-bold leading-[140%]">{bookName}</span>

              <span className="text-gray-400 ">{authorName}</span>
            </div>
            <RatingStars rating={rating} bookName={bookName} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Loading() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-8 p-6 bg-gray-700 rounded">
        <div className="flex gap-6">
          <Loader width="w-[64px]" height="h-[94px]" />

          <div className="flex flex-col justify-between gap-5">
            <div className="flex flex-col gap-3">
              <Loader width="w-[150px]" height="h-[17px]" />
              <Loader width="w-[100px]" height="h-[15px]" />
            </div>
            <Loader width="w-[70px]" height="h-[15px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default { Component, Loading };
