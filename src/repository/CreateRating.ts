import { prisma } from "@/lib/prisma";

interface CreateRatingProps {
  bookId: string;
  userId: string;
  description: string;
  rate: number;
}

export default async function CreateRating({
  bookId,
  userId,
  description,
  rate,
}: CreateRatingProps) {
  const book = await prisma.book.findUnique({
    where: {
      id: bookId,
    },
  });

  if (!book) {
    throw new Error("Book not founded", {
      cause: "NOT_FOUNDED",
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("User not founded", {
      cause: "NOT_FOUNDED",
    });
  }

  await prisma.rating.create({
    data: {
      description,
      rate,
      created_at: new Date(),
      book_id: bookId,
      user_id: userId,
    },
  });
}
