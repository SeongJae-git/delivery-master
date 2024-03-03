import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { UserType } from 'src/types/user.type';

export class SignInUserDTO implements UserType {
    @ApiProperty({ description: '이메일', example: 'example@test.mail' })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ description: '비밀번호', example: 'testpassword1234' })
    @IsNotEmpty()
    @IsString()
    password: string;
}
