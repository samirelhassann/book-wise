import React from "react";

import ListUserRatings from "@/repository/ListUserRatings";

import DetailedCard from "./DetailedCard";

async function Component() {
  const userRatings = await ListUserRatings();

  return (
    <div className="flex flex-col w-2/3 max-h-[82vh] gap-4 overflow-y-scroll no-scrollbar">
      <span className="text-base leading-[160%] text-gray-100">
        Recent ratings
      </span>
      {userRatings.map((rating) => (
        <DetailedCard.Component
          key={`${rating.userName}-${rating.bookName}`}
          userImage={rating.userImage}
          userName={rating.userName}
          bookName={rating.bookName}
          bookDescription={rating.bookDescription}
          BookCoverImage={rating.bookCoverImage}
          authorName={rating.authorName}
          date={rating.date}
          rating={rating.rating}
        />
      ))}
    </div>
  );
}

function Loading() {
  return (
    <div className="flex flex-col w-2/3 max-h-[82vh] gap-4 overflow-y-scroll no-scrollbar">
      <span className="text-base leading-[160%] text-gray-100">
        Recent ratings
      </span>

      <DetailedCard.Loading />
      <DetailedCard.Loading />
      <DetailedCard.Loading />
    </div>
  );
}

export default { Component, Loading };
