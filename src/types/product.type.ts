interface ProductType {
    productNo: number; // 상품번호 / pk
    name: string; // 상품명
    description: string; // 상품설명
    price: number; // 가격
    company: string; // 제조사 / company 테이블의 companyNo FK
}
