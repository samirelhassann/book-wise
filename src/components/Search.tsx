import React, { ComponentProps, ReactNode } from "react";
import { BsSearch } from "react-icons/bs";

import { twMerge } from "tailwind-merge";

type SearchProps = ComponentProps<"input"> & {
  onChangeSearch: (value: string) => void;
};

export function Search({
  onChangeSearch,
  className,
  ...props
}: SearchProps): ReactNode {
  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeSearch(event.target.value);
  };

  return (
    <div className="relative text-gray-600 focus-within:text-gray-400">
      <input
        name="q"
        className={twMerge(
          "py-3 pl-5 pr-10 text-gray-400 bg-gray-800 border-2 border-gray-500 rounded outline-none caret-gray-400",
          className
        )}
        {...props}
        onChange={handleChangeSearch}
      />

      <span className="absolute inset-y-0 right-0 flex items-center pr-5">
        <BsSearch size={20} className="fill-gray-500" />
      </span>
    </div>
  );
}
