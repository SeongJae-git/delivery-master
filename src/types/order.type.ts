export interface OrderType {
    order_no: number; // PK
    order_uuid: string; // UUID패턴 예시 > 1604b772-adc0-4212-8a90-81186c57f598
    order_time: string; // 주문시간
    receipt_time: string; // 접수시간
    receipt_status: string; // 접수상태(yes/no/cancel/requesting)

    product_no: number; // product 테이블의 productNo FK
    orderby: number; // user 테이블의 userNo FK
    destination: string; // user 테이블의 addr FK
}

/**
 * 주문 전 있어야 할 정보들 > 어떤물건인지(product) + 어떤놈이 시켰는지(user)
 *
 * 이미 로그인 된 상태여야 함. > AuthGuard 사전 차단
 *
 * 주문을 함 > 테이블 삽입 > UUID생성, 현재시간, 접수시간 빼고, 상태 requesting, 상품번호, 시킨놈, 주소
 */
