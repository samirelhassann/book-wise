import { prisma } from "@/lib/prisma";
import { UserRatings } from "@/models/UserRatings";

export default async function ListAllUserRatings(): Promise<UserRatings[]> {
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
              summary: true,
              cover_url: true,
            },
          },
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
    take: 20,
  });

  const userRatings = usersWithRatings
    .map((user) => {
      return user.ratings.map((rating) => {
        return {
          userImage: user.avatar_url,
          userName: user.name,
          bookName: rating.book.name,
          bookDescription: rating.book.summary,
          bookCoverImage: rating.book.cover_url,
          authorName: rating.book.author,
          date: rating.created_at,
          rating: rating.rate,
          comment: rating.description,
        } as UserRatings;
      });
    })
    .flatMap((ratings) => ratings)
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  return userRatings;
}
