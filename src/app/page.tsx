/* eslint-disable no-console */

import { Suspense } from "react";
import { MdOutlineStackedLineChart } from "react-icons/md";

import { getServerSession } from "next-auth";

import PopularBooks from "@/components/PopularBooks";
import RecentRating from "@/components/RecentRating";
import { authOptions } from "@/lib/auth/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  const isLogged = !!session;

  console.log(isLogged);

  return (
    <main className="flex flex-col gap-10 px-24 pt-20">
      <div className="flex items-center gap-3">
        <MdOutlineStackedLineChart size={32} className="fill-green-100" />
        <h1 className="font-bold leading-[140%] text-2xl text-gray-100">
          Início
        </h1>
      </div>

      <div className="flex gap-16 ">
        <Suspense fallback={<RecentRating.Loading />}>
          <RecentRating.Component />
        </Suspense>

        <Suspense fallback={<PopularBooks.Loading />}>
          <PopularBooks.Component />
        </Suspense>
      </div>
    </main>
  );
}
