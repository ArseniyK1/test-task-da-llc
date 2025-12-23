export interface ITokenRepository {
  saveTokenPair(
    userId: string,
    accessToken: string,
    refreshToken: string
  ): Promise<void>;
  findByRefreshToken(
    refreshToken: string
  ): Promise<{ userId: string; accessToken: string } | null>;
  findByAccessToken(accessToken: string): Promise<{ userId: string } | null>;
  revokeTokenPair(accessToken: string): Promise<void>;
  revokeAllUserTokens(userId: string): Promise<void>;
}
