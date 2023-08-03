import { NextRequest, NextResponse } from "next/server";

import ListReadBookByUser from "@/repository/ListReadBookByUser";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const userId = params.id;

  return ListReadBookByUser({ userId })
    .then((response) => {
      return NextResponse.json(response);
    })
    .catch((err) => {
      if (err.cause === "USER_NOT_FOUND") {
        return NextResponse.json({ error: err.message }, { status: 404 });
      }
      return NextResponse.json({ error: err.message }, { status: 500 });
    });
};
