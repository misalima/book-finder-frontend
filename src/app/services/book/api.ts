import { IBook } from "@/types/book";
import { DefaultApi } from "../default";
import {api} from "@/app/services/api";

const endpoint = "/app/book";
const resourceId = "id";

class BookApi extends DefaultApi<IBook> {
    constructor() {
        super(endpoint, resourceId);
    }

    getBooksByTitle = async (title: string): Promise<IBook[]> => {
        const headers = await this.getHeaders();
        const { data } = await api.get<IBook[]>(`${this.endpoint}/search/title/${encodeURIComponent(title)}`, {
            headers,
        });
        return data;
    };
}

export const ApiBook = new BookApi();
