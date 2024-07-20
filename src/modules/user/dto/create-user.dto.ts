import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';
import { IsEmailNotExist } from 'src/common/validations/email.not.exists.validation';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @IsEmailNotExist()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword(
    {
      minLength: 6,
      minUppercase: 1,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'Password should have 1 uppercase, 1 lowercase, 1 numeric and 1 special character.',
    },
  )
  password: string;

  role_id: number;
}
