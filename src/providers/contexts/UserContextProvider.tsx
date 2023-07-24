"use client";

import React, { ReactNode, createContext, useMemo, useState } from "react";

interface UserContextType {
  isLogged: boolean;
  setUserLogged: () => void;
}

export const UserContext = createContext({} as UserContextType);

export function UserContextProvider({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  const [isLogged, setIsLogged] = useState(false);

  const setUserLogged = () => {
    setIsLogged(true);
  };

  const contextReturn = useMemo(() => {
    return {
      isLogged,
      setUserLogged,
    };
  }, [isLogged]);

  return (
    <UserContext.Provider value={contextReturn}>
      {children}
    </UserContext.Provider>
  );
}
