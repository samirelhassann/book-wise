import React, { ReactNode } from "react";

interface LoaderProps {
  height: string;
  width: string;
  rounded?: string;
}

export function Loader({ height, width, rounded }: LoaderProps): ReactNode {
  return (
    <div
      className={`${height} ${width} ${
        rounded ?? "rounded-md"
      } bg-gray-500 dark:bg-gray-600 animate-pulse`}
    />
  );
}
