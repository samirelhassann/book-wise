import { NextResponse } from "next/server";

import ListBooksEnriched from "@/repository/ListBooksEnriched";

export const GET = async () => {
  // const paramSchema = z.object({
  //   pageSize: z.number().optional().default(9999),
  //   page: z.number().optional().default(1),
  //   category: z.string().optional(),
  //   sortByRating: z.boolean().optional().default(false),
  // });

  // const body = await req.json();

  // const { pageSize, page, category, sortByRating } = paramSchema.parse(body);

  return ListBooksEnriched({})
    .then((response) => {
      return NextResponse.json(response);
    })
    .catch((err) => {
      return NextResponse.json({ error: err.message }, { status: 500 });
    });
};
