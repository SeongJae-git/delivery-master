export interface UserType {
    user_no?: number; // PK
    email: string; // 아이디
    password?: string; // 비번
    name?: string; // 이름
    address?: string; // 배송받을 주소
    order_count?: number; // 총 주문 횟수
    point?: number; // 잔여 포인트
    seller?: boolean; // 판매자 자격 유무
}
