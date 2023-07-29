import { NextRequest, NextResponse } from "next/server";

import ListBooksEnriched from "@/repository/ListBooksEnriched";

export const GET = async (req: NextRequest) => {
  const pageSize = (req.nextUrl.searchParams.get("pageSize") ?? 9999) as number;
  const page = (req.nextUrl.searchParams.get("page") ?? 1) as number;
  const category = req.nextUrl.searchParams.get("category") ?? undefined;
  const sortByRating = !!req.nextUrl.searchParams.get("sortByRating");

  return ListBooksEnriched({ pageSize, page, category, sortByRating })
    .then((response) => {
      return NextResponse.json(response);
    })
    .catch((err) => {
      return NextResponse.json({ error: err.message }, { status: 500 });
    });
};
