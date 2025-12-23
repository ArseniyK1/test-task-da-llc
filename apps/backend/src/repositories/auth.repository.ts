import { ITokenRepository } from '@test-task/contracts';

export class AuthRepository implements ITokenRepository {
  async saveTokenPair(userId: string, accessToken: string, refreshToken: string): Promise<void> {
    throw new Error('Not implemented');
  }

  async findByRefreshToken(refreshToken: string): Promise<{ userId: string; accessToken: string } | null> {
    throw new Error('Not implemented');
  }

  async findByAccessToken(accessToken: string): Promise<{ userId: string } | null> {
    throw new Error('Not implemented');
  }

  async revokeTokenPair(accessToken: string): Promise<void> {
    throw new Error('Not implemented');
  }

  async revokeAllUserTokens(userId: string): Promise<void> {
    throw new Error('Not implemented');
  }
}

