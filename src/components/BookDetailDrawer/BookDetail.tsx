"use client";

import React, { ReactNode } from "react";

import { useSession } from "next-auth/react";

import useSWR from "swr";

import { Avaliation, EnrichedBook } from "@/models/EnrichedBook";

import BookDetailCard from "./BookDetailCard";
import { InteractiveUserRating } from "./InteractiveUserRating";
import UserRatingCard from "./UserRatingCard";

interface BookDetailProps {
  bookId: string;
}

type formatedAvaliation = Avaliation & { isUserRating: boolean };

function Loading(): ReactNode {
  return (
    <div className="flex flex-col gap-10">
      <BookDetailCard.Loading />

      <div className="flex flex-col gap-5">
        <div className="flex justify-between item-center">
          <span className="text-sm leading-6 text-gray-200">Ratings</span>
          <button type="button" className="font-bold leading-6 text-purple-100">
            Rate
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <UserRatingCard.Loading />
        </div>
      </div>
    </div>
  );
}

function ErrorHandling(): ReactNode {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-10">
      <span className="text-lg text-gray-300">
        Error to find the book details ...
      </span>
    </div>
  );
}

export function BookDetail({ bookId }: BookDetailProps): ReactNode {
  const {
    data: book,
    isLoading,
    error,
    mutate,
  } = useSWR<EnrichedBook>(`/api/books/${bookId}`);

  const { data: session } = useSession();
  const isUserLogged = !!session;
  const userId = session?.user?.id;

  if (isLoading) {
    return <Loading />;
  }

  if (error || !book) {
    return <ErrorHandling />;
  }

  const handleMutate = () => {
    mutate();
  };

  const renderBookDetailCard = () => {
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
    const { avaliations } = book;

    const formatedAvaliations: formatedAvaliation[] = avaliations
      ?.map((av) => {
        return {
          ...av,
          isUserRating: av.userId === userId,
        };
      })
      .sort((a) => (a.isUserRating ? -1 : 1));

    const shouldRequestUserToRate =
      !formatedAvaliations.some((a) => a.isUserRating) && isUserLogged;

    return (
      <>
        {shouldRequestUserToRate && (
          <InteractiveUserRating
            bookId={bookId}
            userId={session?.user.id}
            userImage={session?.user?.avatar_url}
            userName={session?.user?.name}
            onChangeRating={handleMutate}
          />
        )}
        {formatedAvaliations?.map((avaliation) => (
          <UserRatingCard.Component
            key={`${avaliation.comment}-${avaliation.userName}`}
            userImage={avaliation.userImage}
            userName={avaliation.userName}
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            date={new Date(avaliation.date!)}
            rating={avaliation.rating}
            ratingDescription={avaliation.comment}
            bookName={book.title}
            isUserRating={avaliation.isUserRating}
          />
        ))}
      </>
    );
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
