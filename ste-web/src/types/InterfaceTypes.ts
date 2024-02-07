export type TransferData = {
  header: TransferHeader;
  body: RequestBody;
};

export type TransferRequestData = {
  header: TransferHeader;
  body: RequestBody;
};

export type TransferResponseSocketData = {
  header: TransferHeader;
  body: ResponseSocketBody;
};

export type TransferResponseData<T> = {
  header: TransferHeader;
  body: ResponseBody<T>;
};

export type ResponseBody<T> = {
  message: TransferMessage;
  output: T;
};

export type APIResponse<T> = {
  code: RES_CD;
  data?: T;
  message?: string;
};

export type TransferHeader = {
  rqrs_cd: RQRS_CD_CODE; //요청응답 구분코드	패킷에 타입을 설정
  svc_cd: string; //서비스 코드	호출 할 서비스코드
  guid: string; //GUID	패킷 별로 32Byte의 유니크한 값
  pub_ip: string; //공인 IP	패킷을 요청한 채널의 공인 IP
  pri_ip: string; //사설 IP	패킷을 요청한 채널의 사설 IP
  mac_addr: string; //Mac Address	패킷을 요청한 채널의 Mac Address
  loopback_info?: string; //
  conn_media_cd: string; //매체 코드	패킷을 요청한 채널의 매체코드
  tr_id?: string; // 실시간 종류
  tr_key?: string; //실시간 Key(Ex: 종목코드)
};

export type RequestBody = {
  input: any;
};

export type ResponseSocketBody = {
  message: TransferMessage;
  output: any;
};

export type TransferMessage = {
  rt_cd?: RT_CD_CODE;
  err_cd?: string;
  err_msg?: string;
};

export enum RT_CD_CODE {
  OK = "0",
  SYSTEM_ERROR = "1",
  AP_ERROR = "2",
  TIMEOUT = "3",
}

export enum RQRS_CD_CODE {
  REQUEST = "S",
  RESPONSE = "R",
  SUBSCRIBE = "1",
  UNSUBSCRIBE = "2",
  PUSH = "P",
}

export enum RUNTIME_TR_ID {
  ORDER_BOOK = "SDRSKXH1", //실시간 호가 tr_id
  STOCK_EXECUTION = "SDMSKXS3", // 전체 실시간 체결 tr_id
  MY_EXECUTION = "SDAN8882", // 나의 실시간 체결
}

export enum SVC_CD {
  SDL00010 = "SDL00010", //STO 매도주문
  SDL00020 = "SDL00020", //STO 매수주문
  SDL00030 = "SDL00030", //STO 정정주문
  SDL00040 = "SDL00040", //STO 취소주문
  SDL11001 = "SDL11001", //STO 계좌정보 조회
  SDL11002 = "SDL11002", //STO 주식매수주문가능금액 조회
  SDL11003 = "SDL11003", //STO 주식자산평가 조회
  SDL11004 = "SDL11004", //STO 평가손익 조회
  // SDL11005 = "SDL11005", //STO 주문체결현황 조회 (SDL11008 로 변경됨)
  SDL11006 = "SDL11006", //STO 거래내역 조회
  SDL11007 = "SDL11007", //STO 계좌 주식매도 주문가능 잔고 조회
  SDL11008 = "SDL11008", //STO 주문체결현황 조회
  SDL11010 = "SDL11010", //STO 트랜잭션 조회
  SDT0001M = "SDT0001M", //STO 종목 현재가 조회
  SDT0002M = "SDT0002M", //STO 종목 호가 조회
  SDT0003M = "SDT0003M", //STO 종목 리스트 검색
  SDT0001T = "SDT0001T", //STO 종목 틱/N틱 조회
  SDT0002T = "SDT0002T", //STO 종목 분틱 조회
  SDT0001H = "SDT0001H", //STO 종목 일/주/월/년 조회
  SDT0001I = "SDT0001I", //STO 종목 관심 조회
  SDT0001R = "SDT0001R", //STO 종목 순위 조회
  SDT1001M = "SDT1001M", //STO 지수 현재가 조회
  SDT1001T = "SDT1001T", //STO 지수 틱 조회
  SDT1001H = "SDT1001H", //STO 지수 일/주/월/년 조회
  SDT1002T = "SDT1002T", //STO 지수 분틱 조회
  SDT1002M = "SDT1002M", //STO 지수 정보 리스트 조회
  SDM10010 = "SDM10010", //STO 종목 현재가 조회 (MTS)
  SDM10020 = "SDM10020", //STO 종목 현재가 좌측하단 틱 조회 (MTS)
  SDM10050 = "SDM10050", //STO 종목 기업개요 (MTS)
  SDM10070 = "SDM10070", //STO 종목 관심 조회 (MTS)
  SDM10090 = "SDM10090", //STO 종목 현재가 조회2 (MTS)
  SDM10160 = "SDM10160", //STO 종목 현재가 중단 미니 차트 (MTS)
  SDM10170 = "SDM10170", //STO 종목 일/주/월/년 조회 (MTS)
}

export enum RES_CD {
  R0000 = "R0000", // 정상
  R0101 = "R0101", // 인증에 실패
  R0102 = "R0102", // 인증이 필요함
  R0201 = "R0201", // MCA ReadTimeout
  R0202 = "R0202", // MCA 전문 생성 오류
  R0203 = "R0203", // MCA 미정의 오류
  R0204 = "R0204", // MCA 결과 오류
  R0301 = "R0301", // 중복된 ID
  R0302 = "R0302", // 핸드폰본인인증 진행 오류
  R0303 = "R0303", // 중복된 DI
  R9998 = "R9998", // 암호화 오류
  R9999 = "R9999", // 서버 오류
}
