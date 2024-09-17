interface IUpdateUser {
  id: string;
  username?: string;
  email?: string;
  password?: string;
  newPassword?: string;
  profile_visibility?: 0 | 1;
}
