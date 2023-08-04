/* eslint-disable @typescript-eslint/no-shadow */

"use client";

import React, {
  ReactNode,
  createContext,
  useCallback,
  useMemo,
  useState,
} from "react";

import { LoginDialog } from "@/components/LoginDialog/LoginDialog";

interface LoginDialogType {
  toggle: () => void;
  showDrawer: boolean;
}

export const LoginDialogContext = createContext({} as LoginDialogType);

export function LoginDialogProvider({
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
    <LoginDialogContext.Provider value={contextReturn}>
      <LoginDialog />
      {children}
    </LoginDialogContext.Provider>
  );
}
