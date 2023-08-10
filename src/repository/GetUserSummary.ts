import { prisma } from "@/lib/prisma";
import { UserSummary } from "@/models/UserSummary";

export default async function GetUserSummary(
  userId: string
): Promise<UserSummary> {
  const usersWithRatings = await prisma.user.findMany({
    select: {
      name: true,
      avatar_url: true,
      ratings: {
        select: {
          created_at: true,
          rate: true,
          description: true,
          book: {
            select: {
              name: true,
              author: true,
              total_pages: true,
              categories: {
                select: {
                  category: {
                    select: {
                      name: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    where: {
      id: userId,
    },
  });

  const pagesRead = usersWithRatings
    .flatMap((user) => user.ratings)
    .reduce((acc, rating) => rating.book.total_pages + acc, 0);

  const booksAvaliated = usersWithRatings
    .flatMap((user) => user.ratings)
    .reduce((acc) => acc + 1, 0);

  const authorsRead = usersWithRatings
    .flatMap((user) => user.ratings)
    .reduce(
      (acc: string[], rating) =>
        acc.some((author) => author === rating.book.author)
          ? acc
          : acc.concat(rating.book.author),
      []
    ).length;

  const categoriesRead = usersWithRatings
    .flatMap((user) => user.ratings)
    .flatMap((rating) => rating.book.categories)
    .flatMap((categories) => categories.category.name)
    .reduce(
      (acc: string[], catToCheck) =>
        acc.some((cat) => cat === catToCheck) ? acc : acc.concat(catToCheck),
      []
    ).length;

  return {
    pagesRead,
    booksAvaliated,
    authorsRead,
    categoriesRead,
  };
}
