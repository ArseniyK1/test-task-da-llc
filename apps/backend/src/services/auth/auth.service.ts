import { IAuthService, ITokenPayload, ITokenPair } from "@test-task/contracts";
import { AuthRepository } from "../../repositories";
import jwt from "jsonwebtoken";
import {
  ACCESS_TOKEN_EXPIRY,
  JWT_SECRET,
  REFRESH_TOKEN_EXPIRY,
} from "./constants";

export class AuthService implements IAuthService {
  constructor(private authRepository: AuthRepository) {}

  async generateTokenPair(userId: string): Promise<ITokenPair> {
    const accessToken = jwt.sign({ userId, type: "access" }, JWT_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRY,
    });

    const refreshToken = jwt.sign({ userId, type: "refresh" }, JWT_SECRET, {
      expiresIn: REFRESH_TOKEN_EXPIRY,
    });

    await this.authRepository.saveTokenPair(userId, accessToken, refreshToken);

    return { accessToken, refreshToken };
  }

  async refreshToken(refreshToken: string): Promise<ITokenPair> {
    let decoded: ITokenPayload;
    try {
      decoded = jwt.verify(refreshToken, JWT_SECRET) as ITokenPayload;
      if (decoded.type !== "refresh") {
        throw new Error("Неверный тип токена");
      }
    } catch (error) {
      throw new Error("Неверный токен обновления");
    }

    const tokenData = await this.authRepository.findByRefreshToken(
      refreshToken
    );
    if (!tokenData) {
      throw new Error("Токен обновления не найден или revoked");
    }

    await this.authRepository.revokeTokenPair(tokenData.accessToken);

    return await this.generateTokenPair(decoded.userId);
  }

  async logout(accessToken: string): Promise<void> {
    await this.authRepository.revokeTokenPair(accessToken);
  }

  async validateAccessToken(token: string): Promise<ITokenPayload | null> {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as ITokenPayload;
      if (decoded.type !== "access") {
        return null;
      }

      const tokenData = await this.authRepository.findByAccessToken(token);
      if (!tokenData) {
        return null;
      }

      return decoded;
    } catch (error) {
      return null;
    }
  }
}
