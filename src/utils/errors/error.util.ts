export class ErrorUtil {
    static assertCheck(condition: any, message: string) {
        if (!condition) {
            throw new Error(`assert error occurred! >> ${message}`);
        }
    }
}
// todo
