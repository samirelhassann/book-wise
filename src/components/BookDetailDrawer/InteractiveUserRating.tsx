"use client";

import React, { ReactNode, useState } from "react";
import { BsCheck2 } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";

import Image from "next/image";

import { InteractiveRatingStars } from "../InteractiveRatingStars";
import { LoadingSpinner } from "../LoadingSpinner";

interface InteractiveUserRatingProps {
  userImage?: string;
  userName?: string;
  bookId: string;
  userId: string;
  onChangeRating: () => void;
}

const MAX_INPUT_LIMIT = 450;

const sendRating = async (data) => {
  await fetch("/api/books/rate", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  await fetch("/api/revalidate?tag=infos", {
    method: "POST",
  });
};

export function InteractiveUserRating({
  userImage,
  userName,
  bookId,
  userId,
  onChangeRating,
}: InteractiveUserRatingProps): ReactNode {
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [ratingStar, setRatingStar] = useState(0);

  const formatedInputCharsCounter = `${comment.length}/${MAX_INPUT_LIMIT}`;
  const isButtonSubmitDisabled = comment.length === 0 || ratingStar === 0;
  const isButtonCleanDisabled = comment.length === 0 && ratingStar === 0;

  const handleComment = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const handleClearRating = () => {
    setComment("");
    setRatingStar(0);
  };

  const handleSendRating = async () => {
    setIsLoading(true);

    fetch("/api/books/rate", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        bookId,
        userId,
        rate: ratingStar,
        description: comment,
      }),
    }).finally(async () => {
      onChangeRating();

      await fetch("/api/revalidate?tag=infos", {
        method: "POST",
      });

      setIsLoading(false);
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col p-6 bg-gray-700 rounded">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
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
            </div>
          </div>

          <InteractiveRatingStars
            bookName="test"
            ratingStar={ratingStar}
            setRatingStar={(starNumber) => setRatingStar(starNumber)}
            isDisabled={isLoading}
          />
        </div>

        <div className="flex justify-end mt-8 ">
          <textarea
            placeholder="Write your review"
            className="w-full px-5 py-4 overflow-y-scroll text-sm leading-5 text-gray-200 bg-gray-800 rounded-md palceholder-gray-400 h-36 no-scrollbar focus:outline-none focus-visible:ring-1 focus-visible:ring-gray-500 caret-gray-400 data-[isLoading=true]:opacity-40 data-[isLoading=true]:cursor-not-allowed"
            maxLength={MAX_INPUT_LIMIT}
            onChange={handleComment}
            value={comment}
            data-isLoading={isLoading}
            disabled={isLoading}
          />

          <span className="absolute self-end mb-1 mr-2 text-xs leading-5 text-gray-400">
            {formatedInputCharsCounter}
          </span>
        </div>

        <div className="flex self-end gap-2 mt-3">
          <button
            className="p-2 bg-gray-600 rounded-md data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50"
            type="button"
            onClick={handleClearRating}
            data-disabled={isButtonCleanDisabled}
            disabled={isButtonCleanDisabled || isLoading}
          >
            <RxCross1 size={24} className="text-purple-100" />
          </button>

          {isLoading ? (
            <div className="p-2 bg-gray-600 rounded-md">
              <LoadingSpinner color="green-100" />
            </div>
          ) : (
            <button
              className="p-2 bg-gray-600 rounded-md  data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50"
              type="button"
              data-disabled={isButtonSubmitDisabled}
              disabled={isButtonSubmitDisabled}
              onClick={handleSendRating}
            >
              <BsCheck2 size={24} className="text-green-100" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
