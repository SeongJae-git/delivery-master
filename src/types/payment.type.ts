interface PaymentType {
    paymentNo: number; // PK
    amount: number; // 결제금액
    method: string; // 결제방식
    name: string; // 결제자 이름
    paymentTime: string; // 결제시간
    approval: string; // 승인여부(ok, denied, pending)

    orderUUID: string; // 주문 UUID 16자리 / order 테이블 orderUUID FK
}
