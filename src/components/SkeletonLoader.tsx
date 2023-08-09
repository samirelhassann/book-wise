import React, { ReactNode } from "react";

interface SkeletonLoaderProps {
  height: string;
  width: string;
  rounded?: string;
}

export function SkeletonLoader({
  height,
  width,
  rounded,
}: SkeletonLoaderProps): ReactNode {
  return (
    <div
      className={`${height} ${width} ${
        rounded ?? "rounded-md"
      } bg-gray-500 dark:bg-gray-600 animate-pulse`}
    />
  );
}
