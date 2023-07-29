"use client";

import React, {
  ReactNode,
  createContext,
  useCallback,
  useMemo,
  useState,
} from "react";

interface ProductDrawerType {
  toggle: () => void;
  showDrawer: boolean;
}

export const ProductDrawer = createContext({} as ProductDrawerType);

export function ProductDrawerProvider({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  const [showDrawer, setShowDrawer] = useState(false);

  const toggle = useCallback(() => {
    setShowDrawer((state) => !state);
  }, []);

  const contextReturn = useMemo(() => {
    return {
      toggle,
      showDrawer,
    };
  }, [showDrawer, toggle]);

  return (
    <ProductDrawer.Provider value={contextReturn}>
      {children}
    </ProductDrawer.Provider>
  );
}
