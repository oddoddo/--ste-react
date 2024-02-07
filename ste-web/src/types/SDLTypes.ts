/**********************
 ST 거래소 서비스 LAYOUT
  - 원장 채널 서비스
 Version : 0.2
********************/

import {
  ASKPRC_CNDT_CODE,
  ASKPRC_TYPE_CODE,
  DA_CCD_CODE,
  TRD_DL_CCD_CODE,
  DA_CN_CLSF_CODE,
  ORDR_CCD_CODE,
  ORDR_TYP_NM_CODE,
  PRGRS_ST_CCD_CODE,
  CRCT_CNCL_CCD_CODE,
  DA_CN_TR_CLSF_CODE,
  DA_TR_CCD_CODE,
} from "./CommonCodes";

/**
 * 서비스ID :	SDL00010 Input
 * 서비스명	: STO 매도주문
 * 프로토콜	: JSON Interface
 */
export type SDL00010_Input = {
  ordr_dt: string; //주문일자 YYYYMMDD
  ac_no: string; //계좌번호
  ac_pwd: string; //계좌비밀번호
  symbl: string; //종목코드
  askprc_typ_cd: ASKPRC_TYPE_CODE; //호가유형코드
  askprc_cndt_cd: ASKPRC_CNDT_CODE; //호가조건코드
  askprc_q: string; //호가수량
  askprc_prc: string; //호가가격
  mkt_id: string; //시장구분
  ordr_md_ccd: string; //매체구분
  mbr_cmpny_no: string; //회원번호
};

/**
 * 서비스ID :	SDL00010 Output
 * 서비스명	: STO 매도주문
 * 프로토콜	: JSON Interface
 */
export type SDL00010_Output = {
  ordr_no: string; //주문번호
  msg_cd: string; //메시지코드
  msg_cntnt: string; //메시지내용
};

/**
 * 서비스ID :	SDL00020 Input
 * 서비스명	: STO 매수주문
 * 프로토콜	: JSON Interface
 */
export type SDL00020_Input = {
  ordr_dt: string; //주문일자 YYYYMMDD
  ac_no: string; //계좌번호
  ac_pwd: string; //계좌비밀번호
  symbl: string; //종목코드
  askprc_typ_cd: ASKPRC_TYPE_CODE; //호가유형코드
  askprc_cndt_cd: ASKPRC_CNDT_CODE; //호가조건코드
  askprc_q: string; //호가수량
  askprc_prc: string; //호가가격
  mkt_id: string; //시장구분
  ordr_md_ccd: string; //매체구분
  mbr_cmpny_no: string; //	원번호
};

/**
 * 서비스ID :	SDL00020 Output
 * 서비스명	: STO 매수주문
 * 프로토콜	: JSON Interface
 */
export type SDL00020_Output = {
  ordr_no: string; //주문번호
  msg_cd: string; //메시지코드
  msg_cntnt: string; //메시지내용
};

/**
 * 서비스ID :	SDL00030 Input
 * 서비스명	: STO 정정주문
 * 프로토콜	: JSON Interface
 */
export type SDL00030_Input = {
  ordr_dt: string; //주문일자 YYYYMMDD
  ac_no: string; //계좌번호
  ac_pwd: string; //계좌비밀번호
  orgn_ordr_dt: string; //원주문일자 YYYYMMDD
  orgn_ordr_no: string; //원주문번호
  symbl: string; //종목코드
  askprc_typ_cd: ASKPRC_TYPE_CODE; //호가유형코드
  askprc_cndt_cd: ASKPRC_CNDT_CODE; //호가조건코드
  askprc_q: string; //호가수량
  askprc_prc: string; //호가가격
  mkt_id: string; //시장구분
  ordr_md_ccd: string; //매체구분
  mbr_cmpny_no: string; //회원번
};

/**
 * 서비스ID :	SDL00030 Output
 * 서비스명	: STO 정정주문
 * 프로토콜	: JSON Interface
 */
export type SDL00030_Output = {
  ordr_no: string; //주문번호
  msg_cd: string; //메시지코드
  msg_cntnt: string; //메시지내용
};

/**
 * 서비스 ID	SDL00040 Input
 * 서비스명	STO 취소주문
 * 프로토콜	JSON Interface
 */
export type SDL00040_Input = {
  ordr_dt: string; //주문일자 YYYYMMDD
  ac_no: string; //계좌번호
  ac_pwd: string; //계좌비밀번호
  orgn_ordr_dt: string; //원주문일자 YYYYMMDD
  orgn_ordr_no: string; //원주문번호
  symbl: string; //종목코드
  askprc_q: string; //호가수량
  mkt_id: string; //시장구분
  ordr_md_ccd: string; //매체구분
  mbr_cmpny_no: string; //회원번
};

/**
 * 서비스 ID	SDL00040 Output
 * 서비스명	STO 취소주문
 * 프로토콜	JSON Interface
 */
export type SDL00040_Output = {
  ordr_no: string; //주문번호
  msg_cd: string; //메시지코드
  msg_cntnt: string; //메시지내용
};

/**
 * 서비스 ID	SDL11001 Input
 * 서비스명	STO 계좌정보 조회
 * 프로토콜	JSON Interface
 */
export type SDL11001_Input = {
  da_ac_no: string; //계좌번호
  da_ac_pwd: string; //계좌비밀번호
};

/**
 * 서비스 ID	SDL11001 Output
 * 서비스명	STO 계좌정보 조회
 * 프로토콜	JSON Interface
 */
export type SDL11001_Output = {
  da_tl_tfnd: string; // 예수금
  da_tl_val_amt: string; // 총평가금액
  da_tl_val_pl: string; // 총평가손익
  da_tl_val_pl_r: string; // 총평가수익률
};

/**
 * 서비스 ID	SDL11002
 * 서비스명	STO 계좌 주식매수주문가능금액 조회
 * 프로토콜	JSON Interface
 */
export type SDL11002_Input = {
  da_ac_no: string;
  da_ac_pwd: string;
  da_symbl: string; //종목코드
};

/**
 * 서비스 ID	SDL11002 Output
 * 서비스명	STO 계좌 주식매수주문가능금액 조회
 * 프로토콜	JSON Interface
 */
export type SDL11002_Output = {
  da_tfnd: string; //예수금
  da_tl_hld_amt: string; //총보유금액
  da_ordr_psbl_amt: string; //주문가능금액
  da_o_amt_psbl_amt: string; //출금가능금액
};

/**
 * 서비스 ID	SDL11003 Input
 * 서비스명	STO 계좌 주식자산평가 조회
 * 프로토콜	JSON Interface
 */
export type SDL11003_Input = {
  da_ac_no: string; //계좌번호
  da_ac_pwd: string; //계좌비밀번호
  da_symbl?: string; //종목코드
};

/**
 * 서비스 ID	SDL11003 Output
 * 서비스명	STO 계좌 주식자산평가 조회
 * 프로토콜	JSON Interface
 */
export type SDL11003_Output = {
  da_thdy_rlztn_pl: string; //당일실현손익
  da_byng_amt_sum: string; //매입금액합계
  da_cnt: string; //건수
  array: SDL11003_Output_List[];
};

/**
 * 서비스 ID	SDL11003 Output List
 * 서비스명	STO 계좌 주식자산평가 조회
 * 프로토콜	JSON Interface
 */
export type SDL11003_Output_List = {
  da_is_cd: string; //종목코드
  da_is_nm: string; //종목명
  da_blnc_q: string; //잔고수량
  da_ordr_psbl_q: string; //주문가능수량
  da_byng_avr_prc: string; //매입평균가
  da_byng_amt: string; //매입금액
  da_invst_sgrvt_rt: string; //투자비중비율
  da_fee: string; //수수료
  da_svrl_tx: string; //제세금
  da_fee_r: string; //수수료율
  da_addt_amt: string; //가산금액
  da_s_amt: string; //매도금액
  da_s_q: string; //매도수량
  da_nccls_s_q: string; //미체결매도수량
  da_tdy_tld_pl_amt: string; //금일매매손익금액
  da_val_amt: string; //평가금액
  da_val_pl: string; //평가손익
  da_val_yld: string; //평가수익율
  da_now_prc: string; //현재가
};

/**
 * 서비스 ID	SDL11004
 * 서비스명	STO 평가손익 조회
 * 프로토콜	JSON Interface
 */
export type SDL11004_Input = {
  da_ac_no: string; //계좌번호
  da_ac_pwd: string; //계좌비밀번호
  da_nxt_key?: string; //다음키
  da_grid_cnt?: string; //요청갯수
};

/**
 * 서비스 ID	SDL11004 Output
 * 서비스명	STO 평가손익 조회
 * 프로토콜	JSON Interface
 */
export type SDL11004_Output = {
  da_nxt_key: string; //다음키
  da_grid_cnt: string; //그리드건수
  da_list: SDL11004_Output_List[]; //
};

/**
 * 서비스 ID	SDL11004 Output List
 * 서비스명	STO 평가손익 조회
 * 프로토콜	JSON Interface
 */
export type SDL11004_Output_List = {
  da_is_cd: string; //종목코드
  da_is_nm: string; //종목명
  da_ordr_psbl_q: string; //주문가능수량
  da_avr_uprc: string; //평균단가
  da_now_prc: string; //현재가
  da_val_pl_amt: string; //평가손익
};

/**
 * 서비스 ID	SDL11008
 * 서비스명	STO 주문체결현황 조회
 * 프로토콜	JSON Interface
 */
export type SDL11008_Input = {
  da_ccd: DA_CCD_CODE; //구분코드
  da_cn_clsf: DA_CN_CLSF_CODE; //연속구분
  da_ac_no: string; //계좌번호
  da_ac_pwd: string; //계좌비밀번호
  da_ordr_no: string; //주문번호
  da_ordr_dt: string; //주문일자
  da_symbl: string; //종목코드
  da_nxt_key?: string; //다음키
  da_grid_cnt?: string; //요청갯수
};

/**
 * 서비스 ID	SDL11008 Output
 * 서비스명	STO 주문체결현황 조회
 * 프로토콜	JSON Interface
 */
export type SDL11008_Output = {
  da_ccd: DA_CCD_CODE; //구분코드
  da_cn_clsf: DA_CN_CLSF_CODE; //연속구분
  da_ac_no: string; //계좌번호
  da_ac_pwd: string; //계좌비밀번호
  da_ordr_no: string; //주문번호
  da_ordr_dt: string; //주문일자
  da_nxt_key: string; //다음키
  da_ac_nm: string; //계좌명
  da_is_no: string; //종목코드
  da_grid_cnt: string; //그리드건수
  array: SDL11008_Output_List[];
};

/**
 * 서비스 ID	SDL11008 Output LIST
 * 서비스명	STO 주문체결현황 조회 반복리스트
 * 프로토콜	JSON Interface
 */
export type SDL11008_Output_List = {
  orgn_ordr_no: DA_CCD_CODE; //원주문번호
  ordr_no: DA_CN_CLSF_CODE; //주문번호
  stnd_is_cd: string; //표준종목코드
  hngl_shrt_nm: string; //한글단축명
  trd_dl_ccd: TRD_DL_CCD_CODE; //매매거래구분코드
  trd_ccd_nm: string; //매매구분코드명
  ordr_ccd: ORDR_CCD_CODE; //주문구분코드
  ordr_clsf_nm: string; //주문구분명
  ordr_md_cd: string; //주문매체코드
  ordr_md_nm: string; //주문매체명
  ordr_q: string; //주문수량
  tl_ccls_q: string; //총체결수량
  nccls_q: string; //미체결수량
  ordr_uprc: string; //주문단가
  mkti_ccls_uprc: string; //장내체결단가
  ordr_yld: string; //주문수익율
  crct_cncl_ccd: CRCT_CNCL_CCD_CODE; //정정취소구분코드
  crct_cncl_clsf_nm: string; //정정취소구분명
  rfsl_rsn_cd: string; //거부사유코드
  rfsl_rsn_nm: string; //거부사유명
  dprt_nm: string; //부점명
  emp_nm: string; //사원명
  orgn_ordr_prc: string; //원주문가격
  ordr_tm: string; //주문시간
  ccls_tm: string; //체결시간
};

/**
 * 서비스 ID	SDL11006
 * 서비스명	STO 거래내역 조회
 * 프로토콜	JSON Interface
 */
export type SDL11006_Input = {
  da_ccd: DA_TR_CCD_CODE; //거래내역 구분코드
  da_ac_no: string; //계좌번호
  da_ac_pwd: string; //계좌비밀번호
  da_ordr_st_dt: string; //조회시작일자
  da_ordr_ed_dt: string; //조회종료일자
  da_cn_clsf: DA_CN_TR_CLSF_CODE; //연속구분
  da_nxt_key?: string; //다음키
  da_grid_cnt?: string; //요청갯수
};

/**
 * 서비스 ID	SDL11006 Output
 * 서비스명	STO 거래내역 조회
 * 프로토콜	JSON Interface
 */
export type SDL11006_Output = {
  da_ccd: DA_TR_CCD_CODE; //거래내역 구분코드
  da_ac_no: string; //계좌번호
  da_ac_pwd: string; //계좌비밀번호
  da_st_dt: string; //조회시작일자
  da_ed_dt: string; //조회종료일자
  da_cn_clsf: DA_CN_TR_CLSF_CODE; //연속구분
  da_nxt_key: string; //다음키
  da_grid_cnt: string; //그리드건수
  da_tot_cnt: string; //전체건수
  array: SDL11006_Output_List[];
};

/**
 * 서비스 ID	SDL11006 Output LIST
 * 서비스명	STO 거래내역 조회 반복리스트
 * 프로토콜	JSON Interface
 */
export type SDL11006_Output_List = {
  da_ccls_tm: string; //체결시간 YYYYMMDDHHMMSSmmm
  da_shrt_symbl: string; //단축종목코드
  da_hngl_shrt_nm: string; //한글종목명
  da_trd_ccd: DA_TR_CCD_CODE; //거래구분코드
  da_q: string; //수량
  da_uprc: string; //단가
  da_dl_fee_amt: string; //수수료
  da_ordr_dt: string; //주문일자 YYYYMMDD
  da_ordr_tm: string; //주문시간 HHMMSSmmm
  da_srvc_rqs_tr_id: string; //스마트컨트랙트주소
};

/**
 * 서비스 ID	SDL11007 Input
 * 서비스명	STO 매도주문가능조회
 * 프로토콜	JSON Interface
 */
export type SDL11007_Input = {
  da_ac_no: string; //계좌번호
  da_ac_pwd: string; //계좌비밀번호
  da_symbl: string; //심볼
};

/**
 * 서비스 ID	SDL11007 Output
 * 서비스명	STO 매도주문가능조회
 * 프로토콜	JSON Interface
 */
export type SDL11007_Output = {
  da_tl_hld_blnc: string; //총보유잔고
  da_ordr_psbl_blnc: string; //주문가능잔고
  da_o_amt_psbl_blnc: string; //출금가능잔고
};

/**
 * 서비스 ID	SDL11010
 * 서비스명	STO 트랜잭션 조회
 * 프로토콜	JSON Interface
 */
export type SDL11010_Input = {
  txid: string; // 트랜잭션
};

/**
 * 서비스 ID	SDL11010 Output
 * 서비스명	STO 트랜잭션 조회
 * 프로토콜	JSON Interface
 */
export type SDL11010_Output = {
  status: string;
  block: number;
  timestamp: number;
  eventName: string;
  from: string;
  to: string;
  value: string;
  gasPrice: string;
  gasUsed: number;
};

/**
 * 서비스 ID	실시간 전문
 * 서비스명	실시간 주문확인 및 체결
 * 프로토콜	Structure 프로토콜
 */
export type SDAN8882_Input = {
  rl_tm_cd: string; //실시간 코드
  rl_tm_key: string; //실시간 KEY
};

export type SDAN8882_Output = {
  rl_tm_cd: string; //실시간 코드
  rl_tm_key: string; //실시간 Key
  prgrs_st_ccd: PRGRS_ST_CCD_CODE; //진행상태구분코드
  ordr_typ_nm: ORDR_TYP_NM_CODE; //주문유형명
  orgn_ordr_no: string; //원주문번호
  is_cd: string; //종목코드
  shrt_is_cd: string; //단축종목코드
  is_eng_nm: string; //영문종목명
  is_nm: string; //종목명
  ordr_q: string; //주문수량
  ordr_prc: string; //주문가격
  ordr_ccd: ORDR_CCD_CODE; //주문구분코드
  ordr_clsf_nm: string; //주문구분명
  crdt_typ_cd: string; //신용유형코드
  crdt_typ_cd_nm: string; //신용유형코드명
  ln_dt: string; //대출일자
  bskt_no: string; //바스켓번호
  ordr_md_cd: string; //주문매체코드
  ordr_md_cd_nm: string; //주문매체코드명
  ordr_no: string; //주문번호
  ordr_tm: string; //주문시간
  trd_dl_ccd: TRD_DL_CCD_CODE; //매매거래구분코드
  ccls_tm: string; //체결시간
  ccls_q: string; //체결수량
  ccls_prc: string; //체결가격
  crct_cncl_cnfr_q: string; //정정취소확인수량
  rfsl_rsn_cd: string; //거부사유코드
  acml_ccls_q: string; //누적체결수량
  avr_uprc: string; //평균단가
  nccls_q: string; //미체결수량
  hndl_dt: string; //처리일자
  hndl_sq: string; //처리일련번호
  orgn_ordr_q: string; //원주문수량
  orgn_ordr_prc: string; //원주문가격
  filler: string; //FILLER
};
