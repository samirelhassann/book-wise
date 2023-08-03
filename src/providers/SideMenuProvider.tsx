"use client";

import { Session } from "next-auth";
import { usePathname } from "next/navigation";

import SideMenu from "@/components/SideMenu/SideMenu";

type Props = {
  children: React.ReactNode;
  session: Session | null;
};

export const SideMenuProvider = ({ children, session }: Props) => {
  const pathName = usePathname();

  const excludedSideMenu = ["/login"].includes(pathName);

  if (excludedSideMenu) {
    return children;
  }

  return (
    <div className="flex">
      <SideMenu session={session} />

      <div className="w-full">{children}</div>
    </div>
  );
};
