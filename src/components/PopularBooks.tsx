/* eslint-disable react/no-array-index-key */

"use client";

import React from "react";
import { PiCaretRightBold } from "react-icons/pi";

import Link from "next/link";

import useSWR from "swr";

import { EnrichedBook } from "@/models/EnrichedBook";

import SmallCard from "./SmallCard";

function Loading() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-base leading-[160%] text-gray-100">
          Popular Books
        </span>

        <Link
          href="/explore"
          className="flex items-center gap-2 hover:opacity-75"
        >
          <span className="text-sm font-bold leading-6 text-purple-100">
            Check all
          </span>
          <PiCaretRightBold size={14} className="fill-purple-100" />
        </Link>
      </div>

      <div className="flex flex-col gap-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <SmallCard.Loading key={i} />
        ))}
      </div>
    </div>
  );
}

export default function Component() {
  const searchParams = [
    ["pageSize", "5"],
    ["sortByRating", "true"],
  ];

  const { data, isLoading } = useSWR(
    `/api/books/list?${new URLSearchParams(searchParams).toString()}`
  );

  const books = data as EnrichedBook[];

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-base leading-[160%] text-gray-100">
          Popular Books
        </span>

        <Link
          href="/explore"
          className="flex items-center gap-2 hover:opacity-75"
        >
          <span className="text-sm font-bold leading-6 text-purple-100">
            Check all
          </span>
          <PiCaretRightBold size={14} className="fill-purple-100" />
        </Link>
      </div>

      <div className="flex flex-col gap-3 h-[69vh] overflow-y-scroll no-scrollbar">
        {books?.map((book) => (
          <SmallCard.Component
            key={book.id}
            bookId={book.id}
            bookName={book.title}
            bookCoverImage={book.bookCoverImage}
            authorName={book.author}
            rating={book.averageRating}
          />
        ))}
      </div>
    </div>
  );
}
