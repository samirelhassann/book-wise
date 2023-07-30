/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-console */

import { Suspense } from "react";
import { MdOutlineStackedLineChart } from "react-icons/md";

import { getServerSession } from "next-auth";

import RecentRating from "@/components/RecentRating";
import { authOptions } from "@/lib/auth/auth";

import { HomeDetails } from "./components/HomeDetails";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="flex flex-col gap-10 px-24 pt-20">
      <div className="flex items-center gap-3">
        <MdOutlineStackedLineChart size={32} className="fill-green-100" />
        <h1 className="font-bold leading-[140%] text-2xl text-gray-100">
          Início
        </h1>
      </div>

      <HomeDetails session={session}>
        <Suspense fallback={<RecentRating.Loading />}>
          <RecentRating.Component />
        </Suspense>
      </HomeDetails>
    </main>
  );
}
