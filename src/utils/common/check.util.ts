export class CheckUtil {
    static isString(v: string) {
        return typeof v === 'string';
    }

    static isObjectEquals(v: any, t: any) {
        return typeof v === typeof t;
    }
}
