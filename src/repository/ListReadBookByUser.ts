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
        where: {
          user_id: userId,
        },
        select: {
          rate: true,
          description: true,
          created_at: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              avatar_url: true,
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

  return enrichedBooks
    .map((book) => {
      const averageRating =
        book.ratings.reduce((sum, rating) => sum + rating.rate, 0) /
        book.ratings.length;

      const avaliations = book.ratings.map((rating) => {
        return {
          userId: rating.user.id,
          userName: rating.user.name,
          userEmail: rating.user.email,
          userImage: rating.user.avatar_url,
          rating: rating.rate,
          comment: rating.description,
          date: rating.created_at,
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
    })
    .sort((a, b) => (a.avaliations[0]?.date < b.avaliations[0]?.date ? 1 : -1));
}
