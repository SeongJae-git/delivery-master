interface CompanyType {
    companyNo: number; // PK
    name: string; // 상호명
    classification: string; // 분류(중식, 양식, 일식 등)
    description: string; // 회사 설명
    ceo: string; // 대표자 이름
    location: string; // 소재지
    businessNumber: string; // 사업자등록번호
}
