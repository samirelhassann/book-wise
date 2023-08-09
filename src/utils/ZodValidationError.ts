import { NextResponse } from "next/server";

import { ZodError } from "zod";

export function ZodValidationError(error: unknown) {
  if (error instanceof ZodError) {
    const errors = error.issues.map((issue) => {
      if (issue.code === "invalid_type") {
        return `field(s) '${issue.path.join(
          ","
        )}' ${issue.message.toLowerCase()}`;
      }

      if (issue.code === "unrecognized_keys") {
        return `field(s) '${issue.keys.join(",")}' not recognized`;
      }

      return issue.message;
    });

    return NextResponse.json(
      { message: "Validation error.", errors },
      { status: 400 }
    );
  }

  return NextResponse.json({ message: "Unexpected error." }, { status: 500 });
}
