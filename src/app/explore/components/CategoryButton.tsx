import React, { ReactNode } from "react";

interface CategoryButtonProps {
  title: string;
  selected: boolean;
  onClick: () => void;
}

export function CategoryButton({
  title,
  selected,
  onClick,
}: CategoryButtonProps): ReactNode {
  return (
    <button
      type="button"
      className="px-4 py-1 border-[1px] border-purple-100 bg-none rounded-full text-purple-100 data-[selected=true]:text-white data-[selected=true]:bg-purple-200 data-[selected=true]:border-purple-200"
      data-selected={selected}
      onClick={() => onClick()}
    >
      {title}
    </button>
  );
}
