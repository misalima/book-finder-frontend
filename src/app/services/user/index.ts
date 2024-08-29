import { IUser } from "@/types/user"
import { DefaultApi } from "../default"
import { IRegisterUser } from "@/types/registerUser";

const endpoint = '/app/user'
const resourceId = 'id'

export const ApiUser = new DefaultApi<IRegisterUser | IUser>(endpoint, resourceId);