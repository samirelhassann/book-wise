"use client";

import { ReactNode } from "react";

import { BookDetailsDrawer } from "@/components/BookDetailDrawer/BookDetailsDrawer";

export const BookDetailsDrawerProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <>
      <BookDetailsDrawer />
      {children}
    </>
  );
};
