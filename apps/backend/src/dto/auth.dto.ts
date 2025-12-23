export class SignInDto {
  id: string;
  password: string;
}

export class SignUpDto {
  id: string;
  password: string;
}

export class RefreshTokenDto {
  refreshToken: string;
}

export class AuthResponseDto {
  accessToken: string;
  refreshToken: string;
}

