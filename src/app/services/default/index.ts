import { api } from "../api";
import { getSession } from "next-auth/react";

export class DefaultApi<T> {
  constructor(protected endpoint: string, protected resourceId: string) {}

  protected async getHeaders() {
    const session = await getSession();
    return session ? { Authorization: `Bearer ${session?.accessToken}` } : {};
  }

  listAll = async (): Promise<T[]> => {
    const headers = await this.getHeaders();
    const { data } = await api.get<T[]>(`${this.endpoint}/`, { headers });
    return data;
  };

  create = async (formData: T): Promise<T> => {
    const headers = await this.getHeaders();
    const { data } = await api.post<T>(`${this.endpoint}`, formData, {
        headers,
    });
    
    return data;
  };

  createWithCredentials = async (formData: T): Promise<T> => {
    const headers = await this.getHeaders();
    const { data } = await api.post<T>(`${this.endpoint}`, formData, {
      headers,
    });
    return data;
  };

  findOne = async (id: string): Promise<T> => {
    const headers = await this.getHeaders();
    if (id === "0" || id === "") {
      const A = {} as T;
      return A;
    }
    const { data } = await api.get<T>(`${this.endpoint}/${id}`, { headers });
    return data;
  };

  update = async (formData: T): Promise<T> => {
    const headers = await this.getHeaders();
    const id = (formData as any)[this.resourceId];
    const { data } = await api.put<T>(`${this.endpoint}/${id}`, formData, {
      headers,
    });
    return data;
  };

  remove = async (id: string): Promise<T> => {
    const headers = await this.getHeaders();
    const { data } = await api.put<T>(
      `${this.endpoint}/${id}`,
      {
        ativo: false,
      },
      { headers }
    );
    return data;
  };

  delete = async (id: string): Promise<T> => {
    const headers = await this.getHeaders();
    const { data } = await api.delete<T>(`${this.endpoint}/${id}`, { headers });
    return data;
  };
}
