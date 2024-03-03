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
