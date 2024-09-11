import { IBook } from "@/types/book";
import { DefaultApi } from "../default";

const endpoint = "/app/book";
const resourceId = "id";

export const ApiBook = new DefaultApi<IBook>(
  endpoint,
  resourceId
);
