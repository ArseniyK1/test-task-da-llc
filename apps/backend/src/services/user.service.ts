import { IUser, IUserService } from "@test-task/contracts";
import { UserRepository } from "../repositories";

export class UserService implements IUserService {
  constructor(private userRepository: UserRepository) {}

  async register(
    id: string,
    password: string
  ): Promise<{ user: IUser; accessToken: string; refreshToken: string }> {
    throw new Error("Not implemented");
  }

  async login(
    id: string,
    password: string
  ): Promise<{ accessToken: string; refreshToken: string }> {
    throw new Error("Not implemented");
  }

  async getUserById(id: string): Promise<IUser | null> {
    throw new Error("Not implemented");
  }
}
