import { prisma } from "@/lib/prisma";
import { EnrichedBook } from "@/models/PopularBooks";

interface ListBooksEnrichedProps {
  pageSize?: number;
  page?: number;
  category?: string;
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
              name: true,
            },
          },
        },
      },
    },
  });

  let enrichedBooksResult = enrichedBooks.map((book) => {
    const averageRating =
      book.ratings.reduce((sum, rating) => sum + rating.rate, 0) /
      book.ratings.length;

    const avaliations = book.ratings.map((rating) => {
      return {
        userName: rating.user.name,
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
    enrichedBooksResult = enrichedBooksResult.sort(
      (a, b) => b.averageRating - a.averageRating
    );
  }

  return enrichedBooksResult.slice((page - 1) * pageSize, page * pageSize);
}
