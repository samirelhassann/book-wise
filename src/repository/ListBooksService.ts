import { prisma } from "@/lib/prisma";
import { Book } from "@prisma/client";

export default async function ListBooksRepository(): Promise<Book[]> {
  const books = await prisma.book.findMany();

  return books;
}
