import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsLowercase,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class AuthRegisterDto {
  // ? Name
  @ApiProperty({
    example: 'John Doe',
    description: 'Full Name',
    type: 'string',
    required: true,
  })
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  @Length(2, 50, { message: 'Name must be between 2 and 50 characters' })
  name: string;

  // ? Email
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email',
    type: 'string',
    required: true,
  })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  @Matches(/\.com$/, { message: 'The email address must end in .com.' })
  @IsLowercase({
    message: 'The email must be written entirely in lowercase letters.',
  })
  email: string;

  // ? Password
  @ApiProperty({
    example: 'Password1234',
    description: 'Password',
    type: 'string',
    required: true,
  })
  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  @Length(6, 15, { message: 'Password must be between 6 and 15 characters' })
  @Matches(/(?=.*[a-z])/, {
    message: 'The password must contain at least one lowercase letter',
  })
  @Matches(/(?=.*[A-Z])/, {
    message: 'The password must contain at least one uppercase letter.',
  })
  @Matches(/(?=.*\d)/, {
    message: 'The password must contain at least one number.',
  })
  password: string;
}
