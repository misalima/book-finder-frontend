export interface IUser {
  id?: string;
  email: string;
  username: string;
  profile_visibility: number;
  createdAt: string;
}

export function isIUser(obj: any): obj is IUser {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.id === "string" &&
    typeof obj.username === "string" &&
    typeof obj.email === "string" &&
    typeof obj.createdAt === "string" &&
    (obj.profile_visibility === 0 || obj.profile_visibility === 1)
  );
}