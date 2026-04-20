export class CreateUserDto {
  email: string;
  passwordPlain: string; // Идва чистата парола от формата за регистрация
  firstName: string;
  lastName: string;
  phone?: string;
}