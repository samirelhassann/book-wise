import { prisma } from "@/lib/prisma";
import { EnrichedBook } from "@/models/EnrichedBook";

interface ListBooksEnrichedProps {
  pageSize?: number;
  page?: number;
  sortByRating?: boolean;
}

export default async function ListBooksEnriched({
  pageSize = 9999,
  page = 1,
  sortByRating = false,
}: ListBooksEnrichedProps): Promise<EnrichedBook[]> {
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
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
    },
  });

  let enrichedBooksResult = enrichedBooks.map((book) => {
    const averageRating =
      book.ratings.length > 0
        ? book.ratings.reduce((sum, rating) => sum + rating.rate, 0) /
          book.ratings.length
        : 0;

    const avaliations = book.ratings.map((rating) => {
      return {
        userId: rating.user.id,
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

  if (sortByRating) {
    enrichedBooksResult = enrichedBooksResult.sort((a, b) =>
      b.averageRating < a.averageRating ? -1 : 1
    );
  }

  return enrichedBooksResult.slice((page - 1) * pageSize, page * pageSize);
}
