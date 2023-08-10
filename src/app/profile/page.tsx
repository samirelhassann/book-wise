/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Suspense } from "react";
import { BiUser } from "react-icons/bi";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth/auth";

import ListBooksGroupedByDate from "./components/ListBooksGroupedByDate";
import { UserSummary } from "./components/UserSummary";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <main className="flex flex-col gap-10 px-24 pt-20 h-[calc(100vh-100px)]">
      <div className="flex items-center gap-3">
        <BiUser size={32} className="fill-green-100" />
        <h1 className="font-bold leading-[140%] text-2xl text-gray-100">
          Profile
        </h1>
      </div>

      <div className="flex h-full gap-16">
        <div className="w-4/6 overflow-y-scroll no-scrollbar">
          <Suspense fallback={<ListBooksGroupedByDate.Loading />}>
            <ListBooksGroupedByDate.Component userId={session.user.id} />
          </Suspense>
        </div>

        <div className="w-2/6">
          <UserSummary
            userId={session.user.id}
            userImage={session.user.avatar_url}
            userName={session.user.name}
          />
        </div>
      </div>
    </main>
  );
}
