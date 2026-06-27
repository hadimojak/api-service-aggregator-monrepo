import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { UserRole } from 'apps/user-service/src/entities/user.entity'; 

export class SignupDto {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsNotEmpty()
  @Matches(/^9\d{9}$/, {
    message: 'Phone number must start with 9 and be 10 digits',
  })
  phoneNumber!: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  password!: string;

  @IsEnum(UserRole)
  role: UserRole = UserRole.TENANT;
}
