import { randomUUID } from "crypto";

import { Book, CategoriesOnBooks, Category, User } from "@prisma/client";

export const users: User[] = [
  {
    id: randomUUID(),
    email: "geralt.rivia@gmail.com",
    name: "Geralt de rivia",
    avatar_url:
      "https://cdn.ome.lt/n7DHcnNLUeJjnYEvLUBU315BFZg=/1200x630/smart/extras/conteudos/397438-blackangel.jpg",
    created_at: new Date(),
  },
  {
    id: randomUUID(),
    email: "yennefer@gmail.com",
    name: "Yennefer",
    avatar_url:
      "https://conteudo.imguol.com.br/c/entretenimento/f9/2019/11/12/yennefer-the-witcher-1573585910380_v2_1x1.jpg",
    created_at: new Date(),
  },
  {
    id: randomUUID(),
    email: "ciri@gmail.com",
    name: "Ciri",
    avatar_url:
      "https://static.wikia.nocookie.net/witcher/images/8/88/Netflix_Ciri_face.jpg/revision/latest?cb=20190701171135",
    created_at: new Date(),
  },
];

export const categories: Category[] = [
  {
    id: randomUUID(),
    name: "Fiction",
  },
  {
    id: randomUUID(),
    name: "Romance",
  },
  {
    id: randomUUID(),
    name: "Mystery",
  },
  {
    id: randomUUID(),
    name: "Biography",
  },
];

export const books: Book[] = [
  {
    id: randomUUID(),
    name: "Da Vinci Code",
    author: "Dan Brown",
    summary:
      "While in Paris, Harvard symbologist Robert Langdon is awakened by a phone call in the dead of the night. The elderly curator of the Louvre has been murdered inside the museum, his body covered in baffling symbols. Blockbuster perfection.... A gleefully erudite suspense novel.",
    cover_url:
      "https://m.media-amazon.com/images/I/513jDWxi4nL._SX329_BO1,204,203,200_.jpg",
    total_pages: 320,
    created_at: new Date(),
  },
  {
    id: randomUUID(),
    name: "Pride and Prejudice",
    author: "Jane Austen",
    summary:
      "A classic novel following the story of Elizabeth Bennet as she navigates issues of manners, upbringing, morality, education, and marriage in the society of the landed gentry of the British Regency.",
    cover_url:
      "https://m.media-amazon.com/images/I/41WrRUbuQ0L._SY344_BO1,204,203,200_QL70_ML2_.jpg",
    total_pages: 432,
    created_at: new Date(),
  },
  {
    id: randomUUID(),
    name: "To Kill a Mockingbird",
    author: "Harper Lee",
    summary:
      "Set in the 1930s in the fictional town of Maycomb, Alabama, the story explores the irrationality of adult attitudes towards race and class in the Deep South of the United States, as depicted through the eyes of a young girl named Scout Finch.",
    cover_url:
      "https://a-static.mlcdn.com.br/800x560/to-kill-a-mockingbird/livrariainternacional/242448/21e8c3719e641ffeaeabbe508c05f24d.jpeg",
    total_pages: 336,
    created_at: new Date(),
  },
  {
    id: randomUUID(),
    name: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    summary:
      "Set in the Roaring Twenties, the novel explores themes of decadence, idealism, resistance to change, social upheaval, and excess, creating a portrait of the Jazz Age or the Roaring Twenties that has been described as a cautionary tale regarding the American Dream.",
    cover_url:
      "https://m.media-amazon.com/images/I/51ypJxZ7hVL._SY344_BO1,204,203,200_QL70_ML2_.jpg",
    total_pages: 180,
    created_at: new Date(),
  },
];

export const categoriesWithBooks: CategoriesOnBooks[] = [
  {
    book_id: books.filter((b) => b.name === "Da Vinci Code")[0].id,
    categoryId: categories.filter((c) => c.name === "Fiction")[0].id,
  },
  {
    book_id: books.filter((b) => b.name === "Pride and Prejudice")[0].id,
    categoryId: categories.filter((c) => c.name === "Romance")[0].id,
  },
  {
    book_id: books.filter((b) => b.name === "To Kill a Mockingbird")[0].id,
    categoryId: categories.filter((c) => c.name === "Fiction")[0].id,
  },
  {
    book_id: books.filter((b) => b.name === "The Great Gatsby")[0].id,
    categoryId: categories.filter((c) => c.name === "Fiction")[0].id,
  },
];
