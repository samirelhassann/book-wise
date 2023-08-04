"use client";

import React, { ReactNode } from "react";

import { useSession } from "next-auth/react";
import Image from "next/image";

import useSWR from "swr";

import { Avaliation, EnrichedBook } from "@/models/EnrichedBook";

import { RatingStars } from "../RatingStars";
import BookDetailCard from "./BookDetailCard";
import UserRatingCard from "./UserRatingCard";

interface BookDetailProps {
  bookId: string;
}

type formatedAvaliation = Avaliation & { isUserRating: boolean };

export function BookDetail({ bookId }: BookDetailProps): ReactNode {
  const { data, isLoading } = useSWR(`/api/books/${bookId}`);
  const book = data as EnrichedBook;

  const { data: session } = useSession();
  const isUserLogged = !!session;
  const userId = session?.user?.id;

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
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-8 p-6 bg-gray-700 rounded">
              <div className="flex justify-between">
                <div className="flex gap-4 ">
                  {session.user.avatar_url && (
                    <Image
                      className="max-w-sm p-[1px] rounded-full bg-gray800 bg-gradient-to-b from-green-100 to-purple-100"
                      src={session.user.avatar_url}
                      alt="rating image user"
                      width={42}
                      height={42}
                    />
                  )}

                  <div className="flex flex-col">
                    <span>{session.user.name}</span>
                  </div>
                </div>

                <RatingStars rating={1} bookName="test" />
              </div>
            </div>
          </div>
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
