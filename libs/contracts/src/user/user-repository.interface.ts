import { IUser } from "./user.inteface";

export interface IUserRepository {
  create(user: Omit<IUser, "createdAt">): Promise<IUser>;
  findById(id: string): Promise<IUser | null>;
  updatePassword(id: string, password: string): Promise<void>;
  delete(id: string): Promise<void>;
}
