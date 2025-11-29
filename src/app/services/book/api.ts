import { IBook } from "@/types/book";
import { DefaultApi } from "../default";
import { api } from "@/app/services/api";
import { IBookInList } from "@/types/bookInList";

const endpoint = "/app/book";
const resourceId = "id";

class BookApi extends DefaultApi<IBook> {
  constructor() {
    super(endpoint, resourceId);
  }

  getBooksByTitle = async (title: string): Promise<IBook[]> => {
    const headers = await this.getHeaders();
    const { data } = await api.get<IBook[]>(
      `${this.endpoint}/search/title/${encodeURIComponent(title)}`,
      {
        headers,
      }
    );
    return data;
  };

  getBooksByList = async (listId: string): Promise<IBookInList[]> => {
    const headers = await this.getHeaders();
    const { data } = await api.get<IBookInList[]>(`${this.endpoint}/list/${listId}`, {
      headers,
    });
    return data;
  };

  addBookToList = async (bookId: string, listId: string): Promise<void> => {
    const headers = await this.getHeaders();
    await api.post(`${this.endpoint}/${bookId}/${listId}`, {}, { headers });
  };

  removeBookFromList = async (
    bookId: string,
    listId: string
  ): Promise<void> => {
    const headers = await this.getHeaders();
    await api.delete(`${this.endpoint}/${bookId}/${listId}`, { headers });
  };
}

export const ApiBook = new BookApi();
