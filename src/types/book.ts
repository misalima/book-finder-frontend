export interface IBook {
  id?: string;
  isbn: string;
  title: string;
  subtitle: string;
  summary: string;
  author: string;
  genre: string;
  page_count: number;
  published_date: string;
  publisher?: string;
  cover_image: string;
  ratings_number?: number;
  average_rating?: number;
}
