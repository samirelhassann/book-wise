"use client";

/* eslint-disable react/no-array-index-key */
import React, { ReactNode, useState } from "react";

interface RatingStarsProps {
  bookName: string;
  ratingStar: number;
  isDisabled: boolean;
  setRatingStar: (numberStar: number) => void;
}

export function InteractiveRatingStars({
  bookName,
  ratingStar,
  isDisabled,
  setRatingStar,
}: RatingStarsProps): ReactNode {
  const [hoverRating, setHoverRating] = useState(0);

  const handleHoverStar = (numberStar: number) => {
    setHoverRating(() => numberStar);
  };

  const handleMouseLeaveStar = () => {
    setHoverRating(0);
  };

  const handleSelectStar = (numberStar: number) => {
    if (!isDisabled) {
      setRatingStar(numberStar);
    }
  };

  return (
    <div className="flex space-x-1">
      {Array.from({ length: 5 }).map((_, i) => {
        return (
          <svg
            key={`${bookName}-interactive-rating-star-${i + 1}`}
            className="w-7 h-7 text-gray-300 dark:text-gray-500 data-[filled=true]:fill-purple-100 hover:fill-purple-100 cursor-pointer data-[isDisabled=true]:cursor-not-allowed data-[isDisabled=true]:opacity-50"
            onMouseEnter={() => handleHoverStar(i + 1)}
            onMouseLeave={handleMouseLeaveStar}
            onClick={() => handleSelectStar(i + 1)}
            data-filled={i + 1 <= hoverRating || i + 1 <= ratingStar}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 22 20"
            data-isDisabled={isDisabled}
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
        );
      })}
    </div>
  );
}
