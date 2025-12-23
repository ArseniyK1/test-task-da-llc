export interface ITokenPayload {
  userId: string;
  type: "access" | "refresh";
}

export interface ITokenPair {
  accessToken: string;
  refreshToken: string;
}
