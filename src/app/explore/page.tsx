/* eslint-disable react/no-array-index-key */
/* eslint-disable no-console */

"use client";

import { useState } from "react";
import { BiSolidBinoculars } from "react-icons/bi";

import useSWR from "swr";

import { Search } from "@/components/Search";
import SmallCard from "@/components/SmallCard";
import { EnrichedBook } from "@/models/EnrichedBook";

import CategoryButton from "./components/CategoryButton";

export default function Explore() {
  const { data, isLoading } = useSWR("/api/books/list");

  const allBooks = (data as EnrichedBook[]) ?? [];

  const allCategories = Array.from(
    new Set(allBooks?.map((book) => book.categoryName))
  );

  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBooks = () => {
    let filtered =
      selectedCategory === "All"
        ? allBooks
        : allBooks.filter((book) => book.categoryName === selectedCategory);

    filtered = filtered?.filter((book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return filtered;
  };

  const renderCategories = () => {
    return (
      <div className="flex flex-wrap gap-3">
        {isLoading ? (
          Array.from(new Array(5)).map((_, index) => (
            <CategoryButton.Loading key={`loading-${index}`} />
          ))
        ) : (
          <>
            <CategoryButton.Component
              title="All"
              selected={selectedCategory === "All"}
              onClick={() => setSelectedCategory("All")}
            />

            {allCategories.map((category) => (
              <CategoryButton.Component
                key={category}
                title={category}
                selected={selectedCategory === category}
                onClick={() => setSelectedCategory(category)}
              />
            ))}
          </>
        )}
      </div>
    );
  };

  const renderBooks = () => {
    return (
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 xxl:grid-cols-4 gap-3 max-h-[65vh] no-scrollbar overflow-y-scroll no-scrollbar">
        {isLoading
          ? Array.from(new Array(5)).map((_, index) => (
              <SmallCard.Loading key={`loading-${index}`} />
            ))
          : filteredBooks().map((book) => (
              <SmallCard.Component
                key={book.id}
                bookId={book.id}
                bookName={book.title}
                bookCoverImage={book.bookCoverImage}
                authorName={book.author}
                rating={book.averageRating}
                isImageBigger
              />
            ))}
      </div>
    );
  };

  return (
    <main className="flex flex-col gap-10 px-24 pt-20">
      <div className="flex justify-between">
        <div className="flex items-center gap-3">
          <BiSolidBinoculars size={32} className="fill-green-100" />
          <h1 className="font-bold leading-[140%] text-2xl text-gray-100">
            Explore
          </h1>
        </div>

        <Search onChangeSearch={setSearchQuery} className="w-[433px] h-12" />
      </div>
      <div className="flex flex-col gap-5">
        {renderCategories()}
        {renderBooks()}
      </div>
    </main>
  );
}
