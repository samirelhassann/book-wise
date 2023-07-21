/* eslint-disable no-console */

"use client";

import { useState } from "react";
import { BiSolidBinoculars } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";

import useSWR from "swr";

import SmallCard from "@/components/SmallCard";
import { EnrichedBook } from "@/models/PopularBooks";

import { CategoryButton } from "./components/CategoryButton";

export default function Explore() {
  const { data, isLoading, error } = useSWR("/api/list-enriched-books");

  console.log(data);

  console.log(isLoading);
  console.log(error);

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

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
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

        <div className="relative text-gray-600 focus-within:text-gray-400">
          <input
            name="q"
            className="w-[433px] h-12 rounded bg-gray-800 border-2 border-gray-500 pl-5 pr-10 py-3 text-gray-400 outline-none caret-gray-400"
            onChange={handleChangeSearch}
          />

          <span className="absolute inset-y-0 right-0 flex items-center pr-5">
            <BsSearch size={20} className="fill-gray-500" />
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-12">
        <div className="flex flex-wrap gap-3">
          <CategoryButton
            title="All"
            selected={selectedCategory === "All"}
            onClick={() => setSelectedCategory("All")}
          />

          {allCategories.map((category) => (
            <CategoryButton
              key={category}
              title={category}
              selected={selectedCategory === category}
              onClick={() => setSelectedCategory(category)}
            />
          ))}
        </div>

        <div className="grid lg:grid-cols-2 xl:grid-cols-3 xxl:grid-cols-4 gap-3 max-h-[72vh] overflow-y-scroll no-scrollbar">
          {filteredBooks().map((book) => (
            <SmallCard.Component
              key={book.id}
              bookName={book.title}
              bookCoverImage={book.bookCoverImage}
              authorName={book.author}
              rating={book.averageRating}
              isImageBigger
            />
          ))}
        </div>
      </div>
    </main>
  );
}
