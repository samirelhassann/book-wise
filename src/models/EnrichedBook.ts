export interface EnrichedBook {
  id: string;
  title: string;
  author: string;
  bookCoverImage: string;
  averageRating: number;
  numberOfRatings: number;
  categoryName: string;
  numberOfPages: number;
  avaliations: Array<Avaliation>;
}

export interface Avaliation {
  userName: string;
  userEmail: string;
  userImage?: string | null;
  rating: number;
  comment: string;
  date?: Date;
}
