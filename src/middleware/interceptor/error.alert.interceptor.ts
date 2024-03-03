import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { catchError, of } from 'rxjs';
import * as Sentry from '@sentry/minimal';
import { MessageBuilder, Webhook } from 'discord-webhook-node';

@Injectable()
export class ErrorAlertInterceptor implements NestInterceptor {
    intercept(_: ExecutionContext, next: CallHandler) {
        return next.handle().pipe(
            catchError((error: Error) => {
                // 고의로 발생시킨 특정 에러는 무시, 에러 목록은 환경변수에 정의되어있음
                if (process.env.IGNORE_ERRORS.split(',').includes(error.name)) {
                    return of(null);
                }

                // Sentry 에러 보냄
                Sentry.captureException(error);

                // Webhook 에러 보냄
                const hook = new Webhook(process.env.DISCORD_WEBHOOK_URL);
                const embed = new MessageBuilder()
                    .setTitle('Error Tracker Alert')
                    .addField('ErrorName', error.name)
                    .addField('ErrorDescription', error.message)
                    .setColor(16711680) // red
                    .setTimestamp();
                hook.setUsername(process.env.DISCORD_NAME);
                hook.send(embed);

                return of(error);
            })
        );
    }
}
