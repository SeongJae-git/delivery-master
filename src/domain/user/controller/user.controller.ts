import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { SignInUserDTO } from '../dto/signin.user.dto';
import { SignUpUserDTO } from '../dto/signup.user.dto';

import { Request, Response } from 'express';
import { JwtRefreshGuard } from 'src/middleware/auth/guard/auth.jwt.refresh';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('/user')
@ApiTags('User API')
export class UserController {
    constructor(private readonly userService: UserService) {}

    /**
     * SignUpUserDTO 클래스를 파라미터로 받아 회원가입을 처리하는 컨트롤러 라우터로 사용하도록 한다.
     */
    @ApiOperation({
        summary: '회원가입',
        description: `입력한 정보를 바탕으로 새 계정을 생성합니다.`
    })
    @ApiBody({ type: SignUpUserDTO })
    @ApiResponse({ status: 201, description: '성공적으로 계정을 생성하였습니다.' })
    @ApiResponse({ status: 400, description: '필수 요청값이 누락되었습니다.' })
    @ApiResponse({ status: 401, description: '이미 존재하는 계정입니다.' })
    @Post('/signup')
    signUpUser(@Body() signUpUserDTO: SignUpUserDTO): Promise<void> {
        return this.userService.signUpUser(signUpUserDTO);
    }

    /**
     * SignInUserDTO 클래스를 파라미터로 받아 DB에 정보가 있는 유저의 로그인 처리를 하는 라우터로 사용하도록 한다.
     */
    @ApiOperation({
        summary: '로그인',
        description: `아이디와 패스워드를 검증하고, 일치하는 유저가 있을 시 해당 유저의 정보로 Access, Refresh 토큰을 
                      생성하여 httpOnly 속성의 쿠키에 담아 email(ID), name(이름)을 같이 반환합니다.`
    })
    @ApiBody({ type: SignInUserDTO })
    @ApiResponse({ status: 201, description: '로그인에 성공하여 각 토큰이 httponly 속성으로 쿠키에 등록되었습니다.' })
    @ApiResponse({ status: 400, description: '필수 요청값이 누락되었습니다.' })
    @ApiResponse({ status: 401, description: '존재하지 않는 계정입니다.' })
    @Post('/signin')
    async signInUser(@Body() signInUserDTO: SignInUserDTO, @Res({ passthrough: true }) res: Response) {
        const result = await this.userService.signInUser(signInUserDTO);

        res.cookie('accessToken', result.accessToken, { httpOnly: true, sameSite: 'none' });
        res.cookie('refreshToken', result.refreshToken, { httpOnly: true, sameSite: 'none' });

        return {
            message: 'All tokens have been successfully registered in cookies!',
            name: result.name,
            email: result.email
        };
    }

    /**
     * AccessToken이 만료되었을 때 쿠키에 RefreshToken정보를 담아 접근시켜 새로 발급받을 수 있도록 한다.
     */
    @ApiOperation({
        summary: 'AccessToken 재발급',
        description: `API와 통신하는 모든 로그인 된 유저는 AccessToken, RefreshToken을 HttpOnly속성 쿠키에 담고 다닙니다.
        AccessToken이 만료되었을 때 Redis서버의 RefreshToken과 비교하여 유효성 검증을 하고 새 AccessToken을 재발급하여 
        쿠키의 정보를 업데이트합니다.`
    })
    @ApiResponse({ status: 201, description: '성공적으로 인증 토큰 재발급이 완료되어 쿠키가 교체되었습니다.' })
    @ApiResponse({ status: 401, description: '모든 인증 토큰이 만료되었습니다. 재로그인이 필요합니다.' })
    @UseGuards(JwtRefreshGuard)
    @Post('/refresh')
    async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        const tokens = await this.userService.reissueToken(req.cookies['refreshToken']);

        res.cookie('accessToken', tokens['accessToken'], { httpOnly: true, sameSite: 'none' });
        res.cookie('refreshToken', tokens['refreshToken'], { httpOnly: true, sameSite: 'none' });

        return { message: 'Token reissue has been completed successfully.' };
    }
}
