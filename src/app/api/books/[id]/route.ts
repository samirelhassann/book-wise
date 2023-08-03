import { NextResponse } from "next/server";

import GetBookEnriched from "@/repository/GetBookEnriched";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const bookId = params.id;

  return GetBookEnriched({ bookId })
    .then((response) => {
      if (response === null) {
        return NextResponse.json({ error: "Book not found" }, { status: 404 });
      }

      return NextResponse.json(response);
    })
    .catch((err) => {
      return NextResponse.json({ error: err.message }, { status: 500 });
    });
};
