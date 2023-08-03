import { prisma } from "@/lib/prisma";
import { EnrichedBook } from "@/models/EnrichedBook";

interface GetBookEnrichedProps {
  bookId: string;
}

export default async function GetBookEnriched({
  bookId,
}: GetBookEnrichedProps): Promise<EnrichedBook | null> {
  const book = await prisma.book.findUnique({
    where: {
      id: bookId,
    },
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
          created_at: true,
          user: {
            select: {
              name: true,
              avatar_url: true,
              email: true,
            },
          },
        },
      },
    },
  });

  if (!book) {
    return Promise.resolve(null);
  }

  const averageRating =
    book.ratings.reduce((sum, rating) => sum + rating.rate, 0) /
    book.ratings.length;

  const avaliations = book.ratings.map((rating) => {
    return {
      userName: rating.user.name,
      userEmail: rating.user.email,
      rating: rating.rate,
      comment: rating.description,
      userImage: rating.user.avatar_url,
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
}
