AuthGuard, Jwt Token 적용

-   AccessToke, RefreshToken 적용
-   새로고침 토큰은 Redis에도 같이 저장되며 RefreshTokenRotation 적용

MariaDB 사용(NAS)

Redis 사용(NAS)

에러발생 Alert 관련

-   에러 이벤트 캐치 및 핸들링은 NestInterceptor 사용
-   Sentry 사용(에러 분석 통계)
-   Webhook 사용(에러발생시 디스코드로 알람)

Swagger 사용

-   ~/api-docs API 명세 표시
