export class CheckUtil {
    static isString(v: string) {
        return typeof v === 'string';
    }

    static isObjectEquals(v: any, t: any) {
        return typeof v === typeof t;
    }

    static isOrderStatus(v: string) {
        return typeof v === 'string' && ['requesting', 'denied', 'accept', 'cancel'].includes(v);
    }

    static isNumber(v: number) {
        return typeof v === 'number';
    }
}
