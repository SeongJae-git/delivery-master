export class AuthService {
    constructor() {}

    async generateAccessToken(): Promise<string> {}

    async generateRefreshToken(): Promise<string> {}

    async verifyPayload(): Promise<{[keys]: string, values:}> {}
}

/**
 * @todo
 * 토큰 발급하는부분 중복처리 좀 줄이려면 서비스 만들어서 모듈에 내보내면 좀 깔끔할듯.
 * 기존 jwtService -> authService 대체해서 사용하고 jwtService는 여기에다가 사용하는 것 어떤가?
 */