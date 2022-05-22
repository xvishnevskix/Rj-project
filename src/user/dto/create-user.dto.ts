import {IsEmail, Length, Min} from 'class-validator';
export class CreateUserDto {
    @Length(3)
    fullName: string;

    @IsEmail(undefined, { message: 'Неверная почта'})
    email: string;

    @Length(6, 26, {message: 'Пароль должен быть минимум 6 символов'})
    password?: string;
}
