import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^(9\d{9}|[\w.-]+@[\w.-]+\.\w+)$/, {
    message: 'Must be a valid email or phone number starting with 9 (10 digits)',
  })
  emailOrPhone!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}
