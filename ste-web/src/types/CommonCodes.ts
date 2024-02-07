/**********************
 ST 거래소 서비스 Common Codes
 Version : 0.1
 ********************/

/**
 * 체결구분코드
 */
export enum DA_CCLS_CODE {
  SELL = "1", // 매도
  BUY = "2", // 매수
}

/**
 * 호가유형코드
 */
export enum ASKPRC_TYPE_CODE {
  LIMITS = "00", //지정가
  MARKET_PRICE = "01", //시장가
}

/**
 * 호가조건코드
 */
export enum ASKPRC_CNDT_CODE {
  GENERAL = "00", //일반
  IOC = "01", //IOC
  FOK = "02", //FOK
}

/**
 * 구분코드
 */
export enum DA_CCD_CODE {
  TOTAL = "0", //전체
  TRADE_EXECUTED = "1", //체결
  NOT_TRADED = "2", //미체결
}

/**
 * 거래내역 구분코드
 */
export enum DA_TR_CCD_CODE {
  TOTAL = "0", //전체
  SELL = "1", //매도
  BUY = "2", //매수
  DEPOSIT = "3", //입금
  WITHDRAWALS = "4", //출금
}

/**
 * 연속구분
 */
export enum DA_CN_CLSF_CODE {
  EXISTS = "8", //있음
  NONE = "9", //없음
}

/**
 * 거래내역 연속구분
 */
export enum DA_CN_TR_CLSF_CODE {
  EXISTS = "Y", //있음
  NONE = "N", //없음
}

/**
 * 진행상태구분코드
 */
export enum PRGRS_ST_CCD_CODE {
  CONFIRMATION = "12", //체결확인
  CANCEL_1 = "08", //취소
  CANCEL_2 = "09", //취소
  CORRECTION_1 = "10", //정정
  CORRECTION_2 = "11", //정정
  CORRECTION_3 = "12", //정정
}

/**
 * 주문유형명
 */
export enum ORDR_TYP_NM_CODE {
  CASH_SELL = "01", //현금매도
  CASH_BUY = "02", //현금매수
}

/**
 * 주문구분코드
 */
export enum ORDR_CCD_CODE {
  LIMITS = "00", //지정가
  MARKET_PRICE = "03", //시장가
}

/**
 * 매매거래구분코드
 */
export enum TRD_DL_CCD_CODE {
  SELL = "1", //매도
  BUY = "2", //매수
}

/**
 * 정정취소구분코드
 */
export enum CRCT_CNCL_CCD_CODE {
  NEW = "1", //신규
  CORRECTION = "2", //정정
  CANCEL = "3", // 취소
}

/**
 * 상장구분코드
 */
export enum DA_LSTNG_CODE {
  NORMAL = "0", // 정상
  NEW = "1", // 신규상장
  DELISTING = "2", // 상장폐지
}

/**
 * 여부
 */
export enum BOOLEAN_TYPE {
  YES = "Y", // 예
  NO = "N", // 아니오
}

/**
 * 관심종목 시장 index
 */
export enum MRKT_IDX_TYPE {
  STO = "S", // STO 종목
  INDEX = "I", // 지수
}

/**
 * 일/주/월/년 조회 구분
 */
export enum IN_DWMY_DVD_CODE {
  DAY = "D", // 일별 조회
  WEEK = "W", // 주별 조회
  MONTH = "M", // 월별 조회
  YEAR = "Y", // 년별 조회
}

/**
 * 순위 정렬 기준
 */
export enum DA_SORT_CD {
  DEFAULT = "default", // 종목코드 ASC
  SORT_001 = "001", // 시가총액 DESC
  SORT_002 = "002", // 시가총액 ASC
  SORT_003 = "003", // 등락률 DESC
  SORT_004 = "004", // 등락률 ASC
  SORT_005 = "005", // 누적거래량 DESC
  SORT_006 = "006", // 누적거래량 ASC
  SORT_007 = "007", // N일전 종가대비 DESC
  SORT_008 = "008", // N일전 종가대비 ASC
}

export enum DA_BDY_CMPR_SMBL_CD {
  MAX_HIGH = "1", // 상한
  HIGH = "2", // 상승
  SAME = "3", // 보합
  MAX_LOW = "4", // 하한
  LOW = "5", // 하락
}
