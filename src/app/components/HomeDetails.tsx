"use client";

import React, { ReactNode } from "react";

import PopularBooks from "@/components/PopularBooks";

interface HomeDetailsProps {
  children: ReactNode;
}

export function HomeDetails({ children }: HomeDetailsProps): ReactNode {
  return (
    <div className="flex h-full gap-16">
      <div className="w-3/4 overflow-y-scroll no-scrollbar">{children}</div>

      <div className="w-1/4">
        <PopularBooks />
      </div>
    </div>
  );
}
