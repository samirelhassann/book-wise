"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import SideMenu from "@/components/SideMenu";

type Props = {
  children?: React.ReactNode;
};

export const SideMenuProvider = ({ children }: Props) => {
  const pathName = usePathname();
  const { data: session } = useSession();

  const excludedSideMenu = ["/login"].includes(pathName);

  if (excludedSideMenu) {
    return children;
  }

  return <SideMenu session={session}>{children}</SideMenu>;
};