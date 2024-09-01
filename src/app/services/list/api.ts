import { IList } from "@/types/list";
import { DefaultApi } from "../default";
import { api } from "../api";

const endpoint = "/app/list";
const resourceId = "id";

class ListApi extends DefaultApi<IList> {
  constructor() {
    super(endpoint, resourceId);
  }

  getUserLists = async (userId: string): Promise<IList[]> => {
    const headers = await this.getHeaders();
    const { data } = await api.get<IList[]>(`${this.endpoint}/user/${userId}`, {
      headers,
    });
    return data;
  };
}


export const ApiList = new ListApi();
