import { ITokenPair, ITokenPayload } from "./token.interface";

export interface IAuthService {
  generateTokenPair(userId: string): Promise<ITokenPair>;
  refreshToken(refreshToken: string): Promise<ITokenPair>;
  logout(accessToken: string): Promise<void>;
  validateAccessToken(token: string): Promise<ITokenPayload | null>;
}
