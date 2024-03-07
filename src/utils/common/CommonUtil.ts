export class CommonUtil {
    constructor() {}

    static getCurrentTime() {
        const now = new Date();

        const year = now.getFullYear();
        const month = ('0' + (now.getMonth() + 1)).slice(-2);
        const day = ('0' + now.getDate()).slice(-2);

        const hours = ('0' + now.getHours()).slice(-2);
        const minutes = ('0' + now.getMinutes()).slice(-2);
        const seconds = ('0' + now.getSeconds()).slice(-2);

        const timeString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

        return timeString;
    }

    static generateUUID() {
        // v4방식의 uuid 생성, 버전표기와 변형자리 그냥 지우고 올랜덤으로 씀
        return 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'.replace(/[x]/g, function (c) {
            const r = (Math.random() * 16) | 0,
                v = c == 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }
}
