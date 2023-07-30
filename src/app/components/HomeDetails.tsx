"use client";

import React, { ReactNode } from "react";

import { Session } from "next-auth";

import PopularBooks from "@/components/PopularBooks";

interface HomeDetailsProps {
  session: Session | null;
  children: ReactNode;
}

export function HomeDetails({
  session,
  children,
}: HomeDetailsProps): ReactNode {
  return (
    <div className="flex gap-16 ">
      {children}

      <PopularBooks />
    </div>
  );
}
