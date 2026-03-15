import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  @MaxLength(250)
  @IsNotEmpty()
  email: string;
  @IsString()
  @MinLength(2)
  @IsNotEmpty()
  password: string;
}
