import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
export class CreateCatDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsEmail()
  email: string;

  @IsEnum(['INTERN', 'ADMIN', 'ENGINEER', 'USER'], {
    message: `role should be one of the INTERN - intern ADMIN - admin ENGINEER - engineer USER - user`,
  })
  role: 'INTERN' | 'ADMIN' | 'ENGINEER' | 'USER';
}
