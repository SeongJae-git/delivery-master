type MatchFuncType = (param?: any) => any;

export class FunctionUtil {
    static match(value: any) {
        return {
            until: (condition: MatchFuncType, successCallback: MatchFuncType) => {
                return condition(value) ? this.matched(successCallback(value)) : this.match(value);
            },
            done: (successCallback: MatchFuncType) => {
                return successCallback(value);
            }
        };
    }
    private static matched(value: any) {
        return {
            until: () => this.matched(value),
            done: () => value
        };
    }
}

interface Match<T, V> {
    until: (pred: (a: T) => boolean, fn: (b: T) => V) => Match<T, V>;
    done: (fn: (a: T) => V) => V;
}

const matched = <V>(v: V) => {
    return {
        until: () => matched(v),
        done: () => v
    };
};

export const match = <T, V>(a: T): Match<T, V> => {
    return {
        until: (pred: (a: T) => boolean, fn: (a: T) => V) => (pred(a) ? matched(fn(a)) : match(a)),
        done: (fn: (a: T) => V) => fn(a)
    };
};

// rxjs의 pipe 활용, 하지만 해당 함수에서는 불필요하다 생각되어 기존 방식으로 롤백
// import { forkJoin, from, mergeMap, of } from 'rxjs';
// const [payload, redisRefreshToken] = await Promise.all([
//     await this.authService.verifyRefreshToken(refreshToken),
//     await this.redisService.getRedis(payload.user_no)
// ]);

// const result = from(this.authService.verifyRefreshToken(refreshToken)).pipe(
//     mergeMap((payload) => forkJoin([of(payload), from(this.redisService.getRedis(payload.user_no))]))
// );
// result.subscribe(([payload, redisRefreshToken]) => {
//     if (!redisRefreshToken || refreshToken !== redisRefreshToken) {
//         this.redisService.deleteRedis(payload.user_no);
//         throw new UnauthorizedException('Invalid authentication. Please log in again.');
//     }
// });
