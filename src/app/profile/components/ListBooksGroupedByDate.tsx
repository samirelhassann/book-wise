/* eslint-disable react/no-array-index-key */
import React from "react";

import { formatDistance } from "date-fns";

import { SkeletonLoader } from "@/components/SkeletonLoader";
import { UserRatings } from "@/models/UserRatings";
import ListUserRatings from "@/repository/ListUserRatings";

import BookRatedCard from "./BookRatedCard";

interface ListBooksGroupedByDateProps {
  userId: string;
}

async function Component({ userId }: ListBooksGroupedByDateProps) {
  const readedBooks = await ListUserRatings(userId);

  const booksGroupedByDate = readedBooks.reduce<{
    [date: string]: UserRatings[];
  }>((acc, currentRating) => {
    const dateKey = currentRating.date.toISOString().split("T")[0];

    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }

    acc[dateKey].push(currentRating);

    return acc;
  }, {});

  return (
    <div className="flex flex-col gap-6">
      {Object.entries(booksGroupedByDate).map(([date, ratingsForDate]) => {
        const formatedDate = formatDistance(new Date(date), new Date(), {
          addSuffix: true,
        });

        return (
          <div key={date} className="flex flex-col gap-3">
            <h2 className="text-sm leading-5 text-gray-300">{formatedDate}</h2>
            {ratingsForDate.map((rating) => (
              <BookRatedCard.Component
                key={`${rating.bookName}-${rating.comment}`}
                bookName={rating.bookName}
                userAvaliation={rating.comment}
                BookCoverImage={rating.bookCoverImage}
                authorName={rating.authorName}
                rating={rating.rating}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}

function Loading() {
  return (
    <div className="flex flex-col gap-6">
      {Array.from({ length: 2 }).map((_, index) => (
        <div key={index} className="flex flex-col gap-3">
          <SkeletonLoader width="w-[70px]" height="h-[15px]" />

          <BookRatedCard.Loading />
        </div>
      ))}
    </div>
  );
}

export default { Component, Loading };
