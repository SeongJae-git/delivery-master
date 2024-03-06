import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignUpUserDTO {
    @ApiProperty({ description: `이메일`, example: `example@test.mail` })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ description: `비밀번호`, example: `testpassword1234` })
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty({ description: `이름`, example: `김철수` })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ description: `주소`, example: `서울시 강북구 떡잎마을 00길 00-00 와르르멘션` })
    @IsNotEmpty()
    @IsString()
    address: string;
}
