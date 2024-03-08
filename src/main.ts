import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as Sentry from '@sentry/node';

import { setupSwagger } from './config/swagger';
import { ErrorAlertInterceptor } from './middleware/interceptor/error.alert.interceptor';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const port = process.env.PORT;

    // App use setting
    // app.useGlobalInterceptors(new ErrorAlertInterceptor());
    app.use(cookieParser());
    app.useGlobalPipes(
        // DTO의 class-validation을 위해 글로벌 파이프 설정
        new ValidationPipe({
            whitelist: true,
            transform: true
        })
    );

    // App Init Process
    setupSwagger(app);
    Sentry.init({ dsn: process.env.SENTRY_DSN_URL });

    // Start Nest App
    await app.listen(port);
}
bootstrap();

/**
 * @TODO helmet 모듈 넣어볼것
 * @TODO morgan 모듈 넣어볼것 + nestjs 내장모듈 윈스턴 logger 써볼것
 * @TODO lodash 개념 확인해볼 것
 */
