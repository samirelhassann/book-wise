import React, { Suspense } from "react";
import { MdOutlineStackedLineChart } from "react-icons/md";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth/auth";

import { HomeDetails } from "./components/HomeDetails";
import LastReading from "./components/LastReading";
import RecentRating from "./components/RecentRating";

export async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="flex flex-col gap-10 px-24 pt-20 h-[calc(100vh-100px)]">
      <div className="flex items-center gap-3">
        <MdOutlineStackedLineChart size={32} className="fill-green-100" />
        <h1 className="font-bold leading-[140%] text-2xl text-gray-100">
          Início
        </h1>
      </div>

      <HomeDetails>
        <div className="flex flex-col gap-10">
          {!!session && (
            <Suspense fallback={<LastReading.Loading />}>
              <LastReading.Component userId={session?.user.id} />
            </Suspense>
          )}

          <Suspense fallback={<RecentRating.Loading />}>
            <RecentRating.Component />
          </Suspense>
        </div>
      </HomeDetails>
    </main>
  );
}
