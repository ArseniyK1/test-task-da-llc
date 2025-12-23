import { IUser, IUserRepository } from "@test-task/contracts";

export class UserRepository implements IUserRepository {
  async create(user: Omit<IUser, "createdAt">): Promise<IUser> {
    throw new Error("Not implemented");
  }

  async findById(id: string): Promise<IUser | null> {
    throw new Error("Not implemented");
  }

  async updatePassword(id: string, password: string): Promise<void> {
    throw new Error("Not implemented");
  }

  async delete(id: string): Promise<void> {
    throw new Error("Not implemented");
  }
}
