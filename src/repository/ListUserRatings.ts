import { prisma } from "@/lib/prisma";
import { UserRatings } from "@/models/UserRatings";

export default async function ListUserRatings(): Promise<UserRatings[]> {
  const usersWithRatings = await prisma.user.findMany({
    select: {
      name: true,
      avatar_url: true,
      ratings: {
        select: {
          created_at: true,
          rate: true,
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
        } as UserRatings;
      });
    })
    .flatMap((ratings) => ratings);

  return userRatings;
}
