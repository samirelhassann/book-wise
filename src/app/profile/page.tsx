import { Suspense } from "react";
import { BiUser } from "react-icons/bi";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth/auth";

import LastReading from "../components/LastReading";
import RecentRating from "../components/RecentRating";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="flex flex-col gap-10 px-24 pt-20 h-[calc(100vh-100px)]">
      <div className="flex items-center gap-3">
        <BiUser size={32} className="fill-green-100" />
        <h1 className="font-bold leading-[140%] text-2xl text-gray-100">
          Profile
        </h1>
      </div>

      <div className="flex h-full gap-16">
        <div className="w-3/4 overflow-y-scroll no-scrollbar">
          {!!session && (
            <Suspense fallback={<LastReading.Loading />}>
              <LastReading.Component userId={session?.user.id} />
            </Suspense>
          )}
          <Suspense fallback={<RecentRating.Loading />}>
            <RecentRating.Component />
          </Suspense>
        </div>

        <div className="w-1/4">
          <span>Profile card</span>
        </div>
      </div>
    </main>
  );
}
