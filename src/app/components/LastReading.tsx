import React from "react";

import { EnrichedBook } from "@/models/EnrichedBook";

import DetailedCard from "../../components/DetailedCard";

interface LastReadingProps {
  userId: string;
}

async function Component({ userId }: LastReadingProps) {
  const data = await fetch(
    `http://localhost:3000/api/users/${userId}/read-books`,
    { next: { tags: ["infos"] } }
  );

  const userRatings = (await data.json()) as EnrichedBook[];
  const bookInfos = userRatings?.find((rating) => rating);
  const lastRating = bookInfos?.avaliations.find((av) => av);

  return (
    <div className="flex flex-col gap-4">
      <span className="text-base leading-[160%] text-gray-100">
        Your last reading
      </span>

      {lastRating && bookInfos && (
        <DetailedCard.Component
          userImage={lastRating.userImage}
          userName={lastRating.userName}
          bookName={bookInfos?.title}
          bookDescription={lastRating.comment}
          BookCoverImage={bookInfos.bookCoverImage}
          authorName={bookInfos.author}
          date={new Date(lastRating.date!)}
          rating={lastRating.rating}
          isAuthor
        />
      )}
    </div>
  );
}

function Loading() {
  return (
    <div className="flex flex-col gap-4">
      <span className="text-base leading-[160%] text-gray-100">
        Your last reading
      </span>

      <DetailedCard.Loading />
    </div>
  );
}

export default { Component, Loading };
