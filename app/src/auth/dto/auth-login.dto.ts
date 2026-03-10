import { ApiProperty } from '@nestjs/swagger';
import {
  IsLowercase,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class AuthLoginDto {
  @ApiProperty({
    description: 'Email',
    example: 'coder@example.com',
  })
  @IsString({
    message: 'The email address must be a string',
  })
  @IsNotEmpty({ message: 'The email cannot be empty.' })
  @Matches(/\.com$/, { message: 'The email address must end in .com.' })
  @IsLowercase({
    message: 'The email must be written entirely in lowercase letters.',
  })
  email!: string;

  @ApiProperty({
    description: 'Password',
    example: 'Password1234',
  })
  @IsNotEmpty({ message: 'The password cannot be empty.' })
  @IsString({ message: 'The password address must be a string' })
  @MinLength(8, {
    message: 'The password must be at least 8 valid characters.',
  })
  @Matches(/(?=.*[a-z])/, {
    message: 'The password must contain at least one lowercase letter.',
  })
  @Matches(/(?=.*[A-Z])/, {
    message: 'The password must contain at least one uppercase letter.',
  })
  @Matches(/(?=.*\d)/, {
    message: 'The password must contain at least one number.',
  })
  password!: string;
}
