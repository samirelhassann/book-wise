import { PrismaClient } from "@prisma/client";

import {
  books,
  categories,
  categoriesWithBooks,
  ratings,
  users,
} from "./mocks/categories";

const prisma = new PrismaClient();

async function main() {
  await prisma.rating.deleteMany();
  await prisma.user.deleteMany();
  await prisma.categoriesOnBooks.deleteMany();
  await prisma.category.deleteMany();
  await prisma.book.deleteMany();

  const usersSeed = users.map((user) => {
    return prisma.user.create({
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar_url: user.avatar_url,
      },
    });
  });

  const categoriesSeed = categories.map((category) => {
    return prisma.category.create({
      data: {
        name: category.name,
        id: category.id,
      },
    });
  });

  const booksSeed = books.map((book) => {
    return prisma.book.create({
      data: {
        id: book.id,
        name: book.name,
        author: book.author,
        summary: book.summary,
        cover_url: book.cover_url,
        total_pages: book.total_pages,
      },
    });
  });

  const categoriesOnBooksSeed = categoriesWithBooks.map((categoryOnBook) => {
    return prisma.categoriesOnBooks.create({
      data: {
        book_id: categoryOnBook.book_id,
        categoryId: categoryOnBook.categoryId,
      },
    });
  });

  const ratingsSeed = ratings.map((rating) => {
    return prisma.rating.create({
      data: {
        id: rating.id,
        rate: rating.rate,
        description: rating.description,
        user_id: rating.user_id,
        book_id: rating.book_id,
      },
    });
  });

  await prisma.$transaction([
    ...categoriesSeed,
    ...booksSeed,
    ...categoriesOnBooksSeed,
    ...usersSeed,
    ...ratingsSeed,
  ]);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
