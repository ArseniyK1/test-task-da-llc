import { IAuthService, ITokenPayload, ITokenPair } from "@test-task/contracts";
import { AuthRepository } from "../repositories";

export class AuthService implements IAuthService {
  constructor(private authRepository: AuthRepository) {}

  async generateTokenPair(userId: string): Promise<ITokenPair> {
    throw new Error("Not implemented");
  }

  async refreshToken(refreshToken: string): Promise<ITokenPair> {
    throw new Error("Not implemented");
  }

  async logout(accessToken: string): Promise<void> {
    throw new Error("Not implemented");
  }

  async validateAccessToken(token: string): Promise<ITokenPayload | null> {
    throw new Error("Not implemented");
  }
}
