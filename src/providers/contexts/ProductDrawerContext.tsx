/* eslint-disable @typescript-eslint/no-shadow */

"use client";

import React, {
  ReactNode,
  createContext,
  useCallback,
  useMemo,
  useState,
} from "react";

import { BookDetailsDrawer } from "@/components/BookDetailDrawer/BookDetailsDrawer";

interface ProductDrawerType {
  toggle: (bookId: string) => void;
  showDrawer: boolean;
  bookId: string;
}

export const ProductDrawerContext = createContext({} as ProductDrawerType);

export function ProductDrawerProvider({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  const [showDrawer, setShowDrawer] = useState(false);
  const [bookId, setBookId] = useState<string>("");

  const toggle = useCallback((bookId: string) => {
    setShowDrawer((state) => !state);

    setBookId(bookId);
  }, []);

  const contextReturn = useMemo(() => {
    return {
      toggle,
      showDrawer,
      bookId,
    };
  }, [bookId, showDrawer, toggle]);

  return (
    <ProductDrawerContext.Provider value={contextReturn}>
      <BookDetailsDrawer />
      {children}
    </ProductDrawerContext.Provider>
  );
}
