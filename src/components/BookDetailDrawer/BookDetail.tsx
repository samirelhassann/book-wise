"use client";

import React, { ReactNode } from "react";

import useSWR from "swr";

import { EnrichedBook } from "@/models/PopularBooks";

import BookDetailCard from "./BookDetailCard";
import UserRatingCard from "./UserRatingCard";

interface BookDetailProps {
  bookId: string;
}

export function BookDetail({ bookId }: BookDetailProps): ReactNode {
  const { data, isLoading } = useSWR(`/api/books/${bookId}`);

  const book = data as EnrichedBook;

  const renderBookDetailCard = () => {
    if (isLoading) {
      return <BookDetailCard.Loading />;
    }

    return (
      <BookDetailCard.Component
        image={book.bookCoverImage}
        title={book.title}
        author={book.author}
        rating={book.averageRating}
        avaliationsCount={book.numberOfRatings}
        categories={book.categoryName}
        pagesCount={book.numberOfPages}
      />
    );
  };

  const renderComments = () => {
    if (isLoading) {
      return <UserRatingCard.Loading />;
    }

    const { avaliations } = book;

    return avaliations?.map((avaliation) => (
      <UserRatingCard.Component
        key={`${avaliation.comment}-${avaliation.userName}`}
        userImage={avaliation.userImage}
        userName={avaliation.userName}
        date={avaliation.date}
        rating={avaliation.rating}
        ratingDescription={avaliation.comment}
        bookName={book.title}
      />
    ));
  };

  return (
    <div className="flex flex-col gap-10">
      {renderBookDetailCard()}

      <div className="flex flex-col gap-5">
        <div className="flex justify-between item-center">
          <span className="text-sm leading-6 text-gray-200">Ratings</span>
          <button type="button" className="font-bold leading-6 text-purple-100">
            Rate
          </button>
        </div>

        <div className="flex flex-col gap-3">{renderComments()}</div>
      </div>
    </div>
  );
}
