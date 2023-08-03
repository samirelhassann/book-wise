import { prisma } from "@/lib/prisma";
import { EnrichedBook } from "@/models/EnrichedBook";

interface ListReadBookByUserProps {
  userId: string;
}

export default async function ListReadBookByUser({
  userId,
}: ListReadBookByUserProps): Promise<EnrichedBook[]> {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("User not found", {
      cause: "USER_NOT_FOUND",
    });
  }

  const enrichedBooks = await prisma.book.findMany({
    select: {
      id: true,
      name: true,
      author: true,
      cover_url: true,
      categories: {
        select: {
          category: {
            select: {
              name: true,
            },
          },
        },
      },
      total_pages: true,
      ratings: {
        select: {
          rate: true,
          description: true,
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      },
    },
    where: {
      ratings: {
        some: {
          user_id: userId,
        },
      },
    },
  });

  const enrichedBooksResult = enrichedBooks.map((book) => {
    const averageRating =
      book.ratings.reduce((sum, rating) => sum + rating.rate, 0) /
      book.ratings.length;

    const avaliations = book.ratings.map((rating) => {
      return {
        userName: rating.user.name,
        userEmail: rating.user.email,
        rating: rating.rate,
        comment: rating.description,
      };
    });

    return {
      id: book.id,
      title: book.name,
      author: book.author,
      bookCoverImage: book.cover_url,
      averageRating,
      numberOfRatings: book.ratings.length,
      categoryName: book.categories[0]?.category.name || "",
      numberOfPages: book.total_pages,
      avaliations,
    };
  });

  return enrichedBooksResult;
}
