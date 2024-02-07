export type Item = {
  index: number; // 인덱스
  name: string; // 종목명
  issuer: string; // 발행사
  noti: string; // 알림
  price: number; // 현재가
  rate: number; // 등락률
  volume: number; // 거래량
  member: number; // 회원사
  prev_price?: number;
  prev_rate?: number;
  prev_volume?: number;
};

export type DashboardState = {
  items: Item[];
};
