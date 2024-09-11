export interface IBook {
    id: string;
    isbn: string;
    title: string;
    subtitle?: string;
    summary?: string;
    cover_image?: string;
    published_date?: string;
    page_count?: number;
    preview_link?: string;
    info_link?: string;
    authors: string[];
    genres: string[];
    publisher: string;
}
