import { IUser } from "@/types/user"
import { DefaultApi } from "../default"

const endpoint = '/app/user'
const resourceId = 'id'

export const ApiUser = new DefaultApi<IUser>(endpoint, resourceId);