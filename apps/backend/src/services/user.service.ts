import { IUser, IUserService } from "@test-task/contracts";
import { UserRepository } from "../repositories";
import { AuthService } from "./auth/auth.service";
import bcrypt from "bcrypt";

export class UserService implements IUserService {
  constructor(
    private userRepository: UserRepository,
    private authService: AuthService
  ) {}

  async register(
    id: string,
    password: string
  ): Promise<{ user: IUser; accessToken: string; refreshToken: string }> {
    if (!this.isValidId(id)) {
      throw new Error("Неверный формат ID. Должен быть email или телефон");
    }

    const existingUser = await this.userRepository.findById(id);
    if (existingUser) {
      throw new Error("Пользователь уже существует");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userRepository.create({
      id,
      password: hashedPassword,
    });

    const { accessToken, refreshToken } =
      await this.authService.generateTokenPair(user.id);

    return { user, accessToken, refreshToken };
  }

  async login(
    id: string,
    password: string
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error("Неверные учетные данные");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error("Неверные учетные данные");
    }

    const { accessToken, refreshToken } =
      await this.authService.generateTokenPair(user.id);

    return { accessToken, refreshToken };
  }

  async getUserById(id: string): Promise<IUser | null> {
    return await this.userRepository.findById(id);
  }

  private isValidId(id: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\d\s\+\-\(\)]+$/;

    return (
      emailRegex.test(id) ||
      (phoneRegex.test(id) && id.replace(/\D/g, "").length >= 10)
    );
  }
}
