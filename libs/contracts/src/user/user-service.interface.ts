import { IUser } from "./user.inteface";

export interface IUserService {
  register(
    id: string,
    password: string
  ): Promise<{ user: IUser; accessToken: string; refreshToken: string }>;
  login(
    id: string,
    password: string
  ): Promise<{ accessToken: string; refreshToken: string }>;
  getUserById(id: string): Promise<IUser | null>;
}
