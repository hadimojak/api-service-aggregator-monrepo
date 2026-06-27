export class AuthResponseDto {
  accessToken!: string;
  refreshToken!: string;
  user!: {
    id: string;
    email: string;
    phoneNumber: string;
    role: string;
    isActive: boolean;
  };
}
