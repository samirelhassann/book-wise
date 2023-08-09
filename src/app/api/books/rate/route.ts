import { NextResponse } from "next/server";

import { z } from "zod";

import CreateRating from "@/repository/CreateRating";
import { ZodValidationError } from "@/utils/ZodValidationError";

export const POST = async (request: Request) => {
  const schema = z.object({
    bookId: z.string(),
    userId: z.string(),
    rate: z.number().min(1).max(5),
    description: z.string(),
  });

  let params;

  try {
    const payload = await request.json();
    params = schema.parse(payload);
  } catch (error) {
    return ZodValidationError(error);
  }

  return CreateRating(params)
    .then((response) => {
      return NextResponse.json(response);
    })
    .catch((error) => {
      return NextResponse.json(
        { error: error.message },
        { status: error.cause === "NOT_FOUNDED" ? 404 : 500 }
      );
    });
};
