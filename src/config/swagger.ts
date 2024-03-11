import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
    const options = new DocumentBuilder()
        .setTitle('Delivery Master API Docs')
        .setVersion('1.0.0')
        .addCookieAuth('accessToken', {
            type: 'apiKey',
            in: 'cookie',
            name: 'accessToken',
            description: 'AccessToken Auth Cookie'
        })
        .build();

    const document = SwaggerModule.createDocument(app, options);

    // 첫 번째 파라미터 SwaggerUI를 마운트하는 경로를 지정할 수 있다.
    // 'api-docs' --> http://localhost:3000/api-docs
    SwaggerModule.setup('api-docs', app, document, {
        swaggerOptions: {
            withCredentials: true
        }
    });
}
