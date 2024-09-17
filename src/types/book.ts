interface Author {
  id: string;
  name: string;
  createdAt: string;
}

interface Genre {
  id: string;
  name: string;
  createdAt: string;
}

interface Publisher {
  id: string;
  name: string;
  createdAt: string;
}

export interface IBook {
  id: string;
  isbn: string;
  title: string;
  subtitle: string;
  summary: string;
  cover_image: string;
  published_date: string; // Consider using Date type if you convert this in your code
  page_count: number;
  preview_link: string;
  info_link: string;
  authors: Author[];
  genres: Genre[];
  publisher: Publisher;
  status?: string;
}
