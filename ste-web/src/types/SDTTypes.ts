/**********************
 ST 거래소 서비스 LAYOUT
 - 투자정보 채널 서비스
 Version : 0.1
 ********************/

import {
  BOOLEAN_TYPE,
  DA_BDY_CMPR_SMBL_CD,
  DA_CCLS_CODE,
  DA_LSTNG_CODE,
  DA_SORT_CD,
  IN_DWMY_DVD_CODE,
  MRKT_IDX_TYPE,
} from "./CommonCodes";

/**
 * 서비스ID :	SDT0001M
 * 서비스명	: STO 종목 현재가 조회
 * 프로토콜	: JSON Interface
 */
export type SDT0001M_Input = {
  in_da_shrt_cd: string; // 조회할 STO 종목 심볼
};

/**
 * 서비스ID :	SDT0001M Output
 * 서비스명	: STO 종목 현재가 조회
 * 프로토콜	: JSON Interface
 */
export type SDT0001M_Output = {
  da_symbl: string; //	STO 종목 심볼
  da_bsnss_dt: string; //	최종영업일
  da_fnl_ccls_tm: string; //	최종체결시간
  da_is_shrt_cd: string; //종목 숏 심볼
  da_hngl_is_nm: string; //	종목 한글명
  da_eng_is_nm: string; //	종목 영문명
  da_now_prc: string; //	현재가
  da_opn_prc: string; //	시가
  da_hgh_prc: string; //	고가
  da_lw_prc: string; //	저가
  da_bdy_cmpr_smbl: string; //	전일대비부호
  da_bdy_cmpr: string; //	전일대비
  da_bdy_cmpr_r: string; //	전일대비율
  da_acml_vlm: string; //	누적거래량
  da_acml_dl_amt: string; //	누적거래대금
  da_ulmt_prc: string; //	상한가
  da_llmt_prc: string; //	하한가
  da_std_prc: string; //	기준가
  da_s_ccls_sum_q: string; //	매도체결합계수량
  da_b_ccls_sum_q: string; //	매수체결합계수량
  da_s_ccls_cnt: string; //	매도체결건수
  da_b_ccls_cnt: string; //	매수체결건수
  da_bdy_cls_prc: string; //	전일종가
  da_bdy_acml_vlm: string; //	전일누적거래량
  da_bdy_acml_dl_amt: string; //	전일누적거래대금
  da_ccls_ccd: DA_CCLS_CODE; //	체결구분코드
  da_ccls_vlm: string; //	체결거래량
  da_ccls_dl_amt: string; //	체결거래금액
  da_ccls_s_q: string; //	체결매도수량
  da_ccls_b_q: string; //	체결매수수량
  da_ccls_strn: string; //	체결강도
  da_ccls_sq: string; //	체결일련번호
  da_data_sq: string; //	데이터일련번호
  da_gds_ccd: string; //	상품구분코드
  da_lstng_dt: string; //	상장일자
  da_lstng_ccd: DA_LSTNG_CODE; //	상장구분코드
  da_mkt_trd_q_unt: string; //	시장매매수량단위
  da_dl_spsn_f: BOOLEAN_TYPE; //	거래정지여부
  da_arng_trd_f: BOOLEAN_TYPE; //	정리매매여부
  da_crdt_ordr_psbl_f: BOOLEAN_TYPE; //	신용주문가능여부
  da_apnt_prc_askprc_cndt_ccd: string; //	지정가호가조건구분코드
  da_mkt_prc_askprc_cndt_ccd: string; //	시장가호가조건구분코드
  da_cndtl_apnt_prc_askprc_ccd: string; //	조건부지정가호가구분코드
  da_bst_apnt_prc_askprc_ccd: string; //	최유리지정가호가구분코드
  da_prcdt_apnt_prc_askprc_ccd: string; //	최우선지정가호가구분코드
  da_lp_ordr_psbl_f: BOOLEAN_TYPE; //	LP주문가능여부
  da_lstng_q: string; //	상장수량
  da_ccls_s_askprc: string; //	체결매도호가
  da_ccls_b_askprc: string; //	체결매수호가
  da_s_askprc_rv: string; //	매도호가잔량
  da_b_askprc_rv: string; //	매수호가잔량
  da_tl_s_askprc_rv: string; //	총매도호가잔량
  da_tl_b_askprc_rv: string; //	총매수호가잔량
  [key: string]: string; // 인덱스 시그니처
};

/**
 * 서비스ID :	SDT0002M
 * 서비스명	: STO 종목 호가 조회
 * 프로토콜	: JSON Interface
 */
export type SDT0002M_Input = {
  in_da_shrt_cd: string; // 조회할 STO 종목 심볼
};

/**
 * 서비스ID :	SDT0002M Output
 * 서비스명	: STO 종목 호가 조회
 * 프로토콜	: JSON Interface
 */
export type SDT0002M_Output = {
  da_symbl: string; //	STO 종목 심볼
  da_askprc_tm: string; //	호가시간
  da_askprc_sq: string; //	호가일련번호
  da_s1_askprc: string; //	매도1호가
  da_s2_askprc: string; //	매도2호가
  da_s3_askprc: string; //	매도3호가
  da_s4_askprc: string; //	매도4호가
  da_s5_askprc: string; //	매도5호가
  da_s6_askprc: string; //	매도6호가
  da_s7_askprc: string; //	매도7호가
  da_s8_askprc: string; //	매도8호가
  da_s9_askprc: string; //	매도9호가
  da_s10_askprc: string; //	매도10호가
  da_b1_askprc: string; //	매수1호가
  da_b2_askprc: string; //	매수2호가
  da_b3_askprc: string; //	매수3호가
  da_b4_askprc: string; //	매수4호가
  da_b5_askprc: string; //	매수5호가
  da_b6_askprc: string; //	매수6호가
  da_b7_askprc: string; //	매수7호가
  da_b8_askprc: string; //	매수8호가
  da_b9_askprc: string; //	매수9호가
  da_b10_askprc: string; //	매수10호가
  da_s1_askprc_rv: string; //	매도1호가잔량
  da_s2_askprc_rv: string; //	매도2호가잔량
  da_s3_askprc_rv: string; //	매도3호가잔량
  da_s4_askprc_rv: string; //	매도4호가잔량
  da_s5_askprc_rv: string; //	매도5호가잔량
  da_s6_askprc_rv: string; //	매도6호가잔량
  da_s7_askprc_rv: string; //	매도7호가잔량
  da_s8_askprc_rv: string; //	매도8호가잔량
  da_s9_askprc_rv: string; //	매도9호가잔량
  da_s10_askprc_rv: string; // 매도10호가잔량
  da_b1_askprc_rv: string; //	매수1호가잔량
  da_b2_askprc_rv: string; //	매수2호가잔량
  da_b3_askprc_rv: string; //	매수3호가잔량
  da_b4_askprc_rv: string; // 매수4호가잔량
  da_b5_askprc_rv: string; // 매수5호가잔량
  da_b6_askprc_rv: string; // 매수6호가잔량
  da_b7_askprc_rv: string; // 매수7호가잔량
  da_b8_askprc_rv: string; // 매수8호가잔량
  da_b9_askprc_rv: string; // 매수9호가잔량
  da_b10_askprc_rv: string; // 매수10호가잔량
  da_s1_askprc_rv_incrs_dcrs: string; // 매도1호가잔량증감
  da_s2_askprc_rv_incrs_dcrs: string; // 매도2호가잔량증감
  da_s3_askprc_rv_incrs_dcrs: string; // 매도3호가잔량증감
  da_s4_askprc_rv_incrs_dcrs: string; // 매도4호가잔량증감
  da_s5_askprc_rv_incrs_dcrs: string; // 매도5호가잔량증감
  da_s6_askprc_rv_incrs_dcrs: string; // 매도6호가잔량증감
  da_s7_askprc_rv_incrs_dcrs: string; // 매도7호가잔량증감
  da_s8_askprc_rv_incrs_dcrs: string; // 매도8호가잔량증감
  da_s9_askprc_rv_incrs_dcrs: string; // 매도9호가잔량증감
  da_s10_askprc_rv_incrs_dcrs: string; // 매도10호가잔량증감
  da_b1_askprc_rv_incrs_dcrs: string; // 매수1호가잔량증감
  da_b2_askprc_rv_incrs_dcrs: string; // 매수2호가잔량증감
  da_b3_askprc_rv_incrs_dcrs: string; // 매수3호가잔량증감
  da_b4_askprc_rv_incrs_dcrs: string; // 매수4호가잔량증감
  da_b5_askprc_rv_incrs_dcrs: string; // 매수5호가잔량증감
  da_b6_askprc_rv_incrs_dcrs: string; // 매수6호가잔량증감
  da_b7_askprc_rv_incrs_dcrs: string; // 매수7호가잔량증감
  da_b8_askprc_rv_incrs_dcrs: string; // 매수8호가잔량증감
  da_b9_askprc_rv_incrs_dcrs: string; // 매수9호가잔량증감
  da_b10_askprc_rv_incrs_dcrs: string; // 매수10호가잔량증감
  da_tl_s_askprc_rv: string; // 총매도호가잔량
  da_tl_s_askprc_rv_incrs_dcrs: string; // 총매도호가잔량증감
  da_tl_b_askprc_rv: string; // 총매수호가잔량
  da_tl_b_askprc_rv_incrs_dcrs: string; // 총매수호가잔량증감
  da_s1_askprc_cnt: string; // 매도1호가건수
  da_s2_askprc_cnt: string; // 매도2호가건수
  da_s3_askprc_cnt: string; // 매도3호가건수
  da_s4_askprc_cnt: string; // 매도4호가건수
  da_s5_askprc_cnt: string; // 매도5호가건수
  da_s6_askprc_cnt: string; // 매도6호가건수
  da_s7_askprc_cnt: string; // 매도7호가건수
  da_s8_askprc_cnt: string; // 매도8호가건수
  da_s9_askprc_cnt: string; // 매도9호가건수
  da_s10_askprc_cnt: string; // 매도10호가건수
  da_b1_askprc_cnt: string; // 매수1호가건수
  da_b2_askprc_cnt: string; // 매수2호가건수
  da_b3_askprc_cnt: string; // 매수3호가건수
  da_b4_askprc_cnt: string; // 매수4호가건수
  da_b5_askprc_cnt: string; // 매수5호가건수
  da_b6_askprc_cnt: string; // 매수6호가건수
  da_b7_askprc_cnt: string; // 매수7호가건수
  da_b8_askprc_cnt: string; // 매수8호가건수
  da_b9_askprc_cnt: string; // 매수9호가건수
  da_b10_askprc_cnt: string; // 매수10호가건수
  da_tl_s_askprc_cnt: string; // 총매도호가건수
  da_tl_b_askprc_cnt: string; // 총매수호가건수
};

/**
 * 서비스ID :	SDT0003M
 * 서비스명	: STO 종목 리스트 검색
 * 프로토콜	: JSON Interface
 */
export type SDT0003M_Input = {
  in_da_hngl_is_nm: string; // 한글종목명 검색명
};

/**
 * 서비스ID :	SDT0003M Output
 * 서비스명	: STO 종목 리스트 검색
 * 프로토콜	: JSON Interface
 */
export type SDT0003M_Output = {
  out_data_cnt: string; // 배열갯수
  Array_List: SDT0003M_Output_List[];
};

/**
 * 서비스ID :	SDT0003M Output List
 * 서비스명	: STO 종목 리스트 검색
 * 프로토콜	: JSON Interface
 */
export type SDT0003M_Output_List = {
  da_symbl: string; // STO 종목 심볼
  da_bsnss_dt: string; //	최종영업일
  da_hngl_is_nm: string; //	종목 한글명
  da_eng_is_nm: string; //	종목 영문명
  da_is_shrt_cd: string; // STO 숏 심볼
  da_dl_spsn_f: string; //상장페지여부
};

/**
 * 서비스ID :	SDT0001T
 * 서비스명	: STO 종목 틱/N틱 조회
 * 프로토콜	: JSON Interface
 */
export type SDT0001T_Input = {
  in_da_shrt_cd: string; //	조회할 STO 종목 심볼
  in_array_cnt: string; //	요청 갯수 MAX : 9999
  in_xtick: string; //	조회 틱 구분 1 : Tick 2~999 : N틱
  in_next_flag?: string; //	Next Flag 1 : Next key 존재 else : 첫조회
  in_next_key?: string; //	Next Key Default : 999999999999999999 in_next_flag == '1' : 수신받은 Next Key 값
};

/**
 * 서비스ID :	SDT0001T Output
 * 서비스명	: STO 종목 틱/N틱 조회
 * 프로토콜	: JSON Interface
 */
export type SDT0001T_Output = {
  out_data_cnt: string; //	배열갯수
  Array_List: SDT0001T_Output_List[]; // SDT0001T Output list
  next_flag: string; //	Next Data 여부 1:Next Data 있음
  next_key: string; // Next Key next_flag != '1' 일 경우 Default : 999999999999999999
};

/**
 * 서비스ID :	SDT0001T Output list
 * 서비스명	: STO 종목 틱/N틱 조회
 * 프로토콜	: JSON Interface
 */
export type SDT0001T_Output_List = {
  da_bsnss_dt: string; //	최종영업일
  da_fnl_ccls_tm: string; //	최종체결시간
  da_ccls_prc: string; //	체결가
  da_opn_prc: string; //	시가
  da_hgh_prc: string; //	고가
  da_lw_prc: string; //	저가
  da_bdy_cmpr_smbl: DA_BDY_CMPR_SMBL_CD; //	전일대비부호
  da_bdy_cmpr: string; //	전일대비
  da_bdy_cmpr_r: string; //	전일대비율
  da_acml_vlm: string; //	누적거래량
  da_acml_dl_amt: string; //	누적거래대금
  da_ccls_vlm: string; //	체결거래량
  da_ccls_dl_amt: string; //	체결거래대금
  da_ccls_ccd: DA_CCLS_CODE; //	체결구분코드
  da_s_askprc: string; //	체결매도호가
  da_b_askprc: string; //	체결매수호가
  da_same_tm_sq: string; //	동일시간일련번호
};

/**
 * 서비스ID :	SDT0002T
 * 서비스명	: STO 종목 분틱 조회
 * 프로토콜	: JSON Interface
 */
export type SDT0002T_Input = {
  in_da_shrt_cd: string; //	조회할 STO 종목 심볼
  in_array_cnt: string; //	요청 갯수 MAX : 9999
  in_fake_flag: string; //	실봉/허봉 구분	0 : 실봉, 1 : 허봉
  in_xtick: string; //	분주기	MAX : 360
  in_next_flag: string; //	Next Flag 0 : Default 조회 1 : Next 조회
  in_next_key: string; //	Next Key Default : 999999999999999999 in_next_flag == '1' : 수신받은 Next Key 값
};

/**
 * 서비스ID :	SDT0002T Output
 * 서비스명	: STO 종목 분틱 조회
 * 프로토콜	: JSON Interface
 */
export type SDT0002T_Output = {
  out_data_cnt: string; //	배열갯수
  Array_List: SDT0002T_Output_List[]; // SDT0002T Output list
  next_flag: string; //	Next Data 여부	1:Next Data 있음
  next_key: string; //	Next Key	"next_flag != '1' 일 경우 Default : 999999999999999999"
};

/**
 * 서비스ID :	SDT0002T Output list
 * 서비스명	: STO 종목 분틱 조회
 * 프로토콜	: JSON Interface
 */
export type SDT0002T_Output_List = {
  da_bsnss_dt: string; //	최종영업일
  da_fnl_ccls_tm: string; //	최종체결시간
  da_ccls_prc: string; //	체결가
  da_opn_prc: string; //	시가
  da_hgh_prc: string; //	고가
  da_lw_prc: string; //	저가
  da_bdy_cmpr_smbl: string; //	전일대비부호
  da_bdy_cmpr: string; //	전일대비
  da_bdy_cmpr_r: string; //	전일대비율
  da_acml_vlm: string; //	누적거래량
  da_acml_dl_amt: string; //	누적거래대금
  da_ccls_vlm: string; //	체결거래량
  da_ccls_dl_amt: string; //	체결거래대금
  da_ccls_ccd: DA_CCLS_CODE; //	체결구분코드
  da_s_askprc: string; //	체결매도호가
  da_b_askprc: string; //	체결매수호가
};

/**
 * 서비스ID :	SDT0001H
 * 서비스명	: STO 종목 일/주/월/년 조회
 * 프로토콜	: JSON Interface
 */
export type SDT0001H_Input = {
  in_da_shrt_cd: string; //	조회할 STO 종목 심볼
  in_array_cnt: string; //	요청 갯수 MAX : 9999
  in_dwmy_dvd_cd: IN_DWMY_DVD_CODE; //	일/주/월/년 조회 구분	"D : 일별 조회 W : 주별 조회 M : 월별 조회 Y : 년별 조회"
  in_next_flag: string; //	Next Flag	"0 : Default 조회 1 : Next 조회"
  in_next_key: string; //	Next Key	"Default : 99999999 in_next_flag == '1' : 수신받은 Next Key 값"
};

/**
 * 서비스ID :	SDT0001H Output
 * 서비스명	: STO 종목 일/주/월/년 조회
 * 프로토콜	: JSON Interface
 */
export type SDT0001H_Output = {
  out_data_cnt: string; // 배열갯수
  Array_List: SDT0001H_Output_List[]; // SDT0001H Output list
  next_flag: string; //	Next Data 여부	1:Next Data 있음
  next_key: string; //	Next Key	"next_flag != '1' 일 경우 Default : 99999999"
};

/**
 * 서비스ID :	SDT0001H Output list
 * 서비스명	: STO 종목 일/주/월/년 조회
 * 프로토콜	: JSON Interface
 */
export type SDT0001H_Output_List = {
  da_bsnss_dt: string; //	최종영업일
  da_cls_prc: string; //	종가
  da_opn_prc: string; //	시가
  da_hgh_prc: string; //	고가
  da_lw_prc: string; //	저가
  da_bdy_cmpr_smbl: string; //	전일대비부호
  da_bdy_cmpr: string; //	전일대비
  da_bdy_cmpr_r: string; //	전일대비율
  da_acml_vlm: string; //	누적거래량
  da_acml_dl_amt: string; //	누적거래대금
  da_fnl_s_askprc: string; //	체결매도호가
  da_fnl_b_askprc: string; //	체결매수호가
};
/**
 * 서비스ID :	SDT0001I
 * 서비스명	: STO 종목 관심 조회
 * 프로토콜	: JSON Interface
 */
export type SDT0001I_Input = {
  in_inter_cnt: string; //	관심종목 count	MAX : 100
  Array_List: SDT0001I_Input_List[]; // SDT0001I Input List
};

/**
 * 서비스ID :	SDT0001I Input List
 * 서비스명	: STO 종목 관심 조회
 * 프로토콜	: JSON Interface
 */
export type SDT0001I_Input_List = {
  in_mrkt_idx: MRKT_IDX_TYPE; //	관심종목 시장 index	"S : STO 종목 I : 지수"
  in_da_shrt_cd: string; //	조회 심볼 코드
};

/**
 * 서비스ID :	SDT0001I Output
 * 서비스명	: STO 종목 관심 조회
 * 프로토콜	: JSON Interface
 */
export type SDT0001I_Output = {
  out_data_cnt: string; // 배열갯수
  Array_List: SDT0001I_Output_List[]; // SDT0001I Output List
};

/**
 * 서비스ID :	SDT0001I Output List
 * 서비스명	: STO 종목 관심 조회
 * 프로토콜	: JSON Interface
 */
export type SDT0001I_Output_List = {
  da_symbl: string; //	심볼 코드
  da_bsnss_dt: string; //	최종영업일
  da_fnl_ccls_tm: string; //	최종체결시간
  da_hngl_is_nm: string; //	종목 한글명
  da_eng_is_nm: string; //	종목 영문명
  da_ccls_prc: string; //	현재가
  da_opn_prc: string; //	시가
  da_hgh_prc: string; //	고가
  da_lw_prc: string; //	저가
  da_bdy_cmpr_smbl: string; //	전일대비부호
  da_bdy_cmpr: string; //	전일대비
  da_bdy_cmpr_r: string; //	전일대비율
  da_acml_vlm: string; //	누적거래량
  da_acml_dl_amt: string; //	누적거래대금
  da_ulmt_prc: string; //	상한가
  da_llmt_prc: string; //	하한가
  da_std_prc: string; //	기준가
  da_s_ccls_sum_q: string; //	매도체결수량
  da_b_ccls_sum_q: string; //	매수체결수량
  da_s_ccls_cnt: string; //	매도체결건수
  da_b_ccls_cnt: string; //	매수체결건수
  da_bdy_cls_prc: string; //	전일종가
  da_bdy_acml_vlm: string; //	전일누적거래량
  da_bdy_acml_dl_amt: string; //	전일누적거래대금
  da_ccls_ccd: DA_CCLS_CODE; //	체결구분코드
  da_ccls_vlm: string; //	체결거래량
  da_ccls_dl_amt: string; //	체결거래대금
  da_ccls_s_q: string; //	체결매도수량
  da_ccls_b_q: string; //	체결매수수량
  da_ccls_strn: string; //	체결강도
  da_lstng_q: string; //	상장수량
  da_ccls_s_askprc: string; //	체결매도호가
  da_ccls_b_askprc: string; //	체결매수호가
  da_s_askprc_rv: string; //	매도호가잔량
  da_b_askprc_rv: string; //	매수호가잔량
  da_tl_s_askprc_rv: string; //	총매도호가잔량
  da_tl_b_askprc_rv: string; //	총매수호가잔량
};

/**
 * 서비스ID :	SDT0001R
 * 서비스명	: STO 종목 순위 조회
 * 프로토콜	: JSON Interface
 */
export type SDT0001R_Input = {
  in_da_indx_cd: string; // 지수코드 현재 미사용
  in_array_cnt: string; // 요청 갯수 MAX : 9999
  in_da_sort_cd: DA_SORT_CD; // 순위 정렬 기준 default : 종목코드 ASC 001 : 시가총액 DESC 002 : 시가총액 ASC 003 : 등락률 DESC 004 : 등락률 ASC 005 : 누적거래량 DESC 006 : 누적거래량 AS 007 : N일전 종가대비 DES 008 : N일전 종가대비 ASC
  in_next_flag: string; // Next Flag 0 : Default 조회 1 : Next 조회
  in_next_key: string; // Next Key Default : 9999 in_next_flag == '1' : 수신받은 Next Key 값
};

/**
 * 서비스ID :	SDT0001R Output
 * 서비스명	: STO 종목 순위 조회
 * 프로토콜	: JSON Interface
 */
export type SDT0001R_Output = {
  out_data_cnt: string; //	배열갯수
  Array_List: SDT0001R_Output_List[]; // SDT0001R Output List
  next_flag: string; //	Next Data 여부	1:Next Data 있음
  next_key: string; //	Next Key	"next_flag != '1' 일 경우 Default : 9999"
};

/**
 * 서비스ID :	SDT0001R Output List
 * 서비스명	: STO 종목 순위 조회
 * 프로토콜	: JSON Interface
 */
export type SDT0001R_Output_List = {
  da_rank: string; //	순위
  da_symbl: string; //	심볼 코드
  da_hngl_is_nm: string; //	종목 한글명
  da_eng_is_nm: string; //	종목 영문명
  da_now_prc: string; //	현재가
  da_opn_prc: string; //	시가
  da_hgh_prc: string; //	고가
  da_lw_prc: string; //	저가
  da_bdy_cmpr_smbl: string; //	전일대비부호
  da_bdy_cmpr: string; //	전일대비
  da_bdy_cmpr_r: string; //	전일대비율
  da_acml_vlm: string; //	누적거래량
  da_acml_dl_amt: string; //	누적거래대금
  da_std_prc: string; //	기준가
  da_s_ccls_sum_q: string; //	매도체결수량
  da_b_ccls_sum_q: string; //	매수체결수량
  da_bdy_cls_prc: string; //	전일종가
  da_bdy_acml_vlm: string; //	전일누적거래량
  da_bdy_acml_dl_amt: string; //	전일누적거래대금
  da_ccls_strn: string; //	체결강도
  da_lstng_q: string; //	상장수량
  da_opn_prc_tl_amt: string; //	시가총액
  da_n_bdy_cmpr: string; //	N일전 종가대비
};

export type SDRSKXH1_Output = {
  RL_TM_KEY: string; //실시간키
  ASKPRC_RCP_TM: string; //호가수신시간
  S_ASKPRC1: string; //매도호가1
  B_ASKPRC1: string; //매수호가1
  S_ASKPRC_RV1: string; //매도호가잔량1
  B_ASKPRC_RV1: string; //매수호가잔량1
  S_JBFR_CMPR_Q1: string; //매도호가잔량증감1
  B_JBFR_CMPR_Q1: string; //매수호가잔량증감1
  S_ASKPRC2: string; //매도호가2
  B_ASKPRC2: string; //매수호가2
  S_ASKPRC_RV2: string; //매도호가잔량2
  B_ASKPRC_RV2: string; //매수호가잔량2
  S_JBFR_CMPR_Q2: string; //매도호가잔량증감2
  B_JBFR_CMPR_Q2: string; //매수호가잔량증감2
  S_ASKPRC3: string; //매도호가3
  B_ASKPRC3: string; //매수호가3
  S_ASKPRC_RV3: string; //매도호가잔량3
  B_ASKPRC_RV3: string; //매수호가잔량3
  S_JBFR_CMPR_Q3: string; //매도호가잔량증감3
  B_JBFR_CMPR_Q3: string; //매수호가잔량증감3
  S_ASKPRC4: string; //매도호가4
  B_ASKPRC4: string; //매수호가4
  S_ASKPRC_RV4: string; //매도호가잔량4
  B_ASKPRC_RV4: string; //매수호가잔량4
  S_JBFR_CMPR_Q4: string; //매도호가잔량증감4
  B_JBFR_CMPR_Q4: string; //매수호가잔량증감4
  S_ASKPRC5: string; //매도호가5
  B_ASKPRC5: string; //매수호가5
  S_ASKPRC_RV5: string; //매도호가잔량5
  B_ASKPRC_RV5: string; //매수호가잔량5
  S_JBFR_CMPR_Q5: string; //매도호가잔량증감5
  B_JBFR_CMPR_Q5: string; //매수호가잔량증감5
  S_ASKPRC6: string; //매도호가6
  B_ASKPRC6: string; //매수호가6
  S_ASKPRC_RV6: string; //매도호가잔량6
  B_ASKPRC_RV6: string; //매수호가잔량6
  S_JBFR_CMPR_Q6: string; //매도호가잔량증감6
  B_JBFR_CMPR_Q6: string; //매수호가잔량증감6
  S_ASKPRC7: string; //매도호가7
  B_ASKPRC7: string; //매수호가7
  S_ASKPRC_RV7: string; //매도호가잔량7
  B_ASKPRC_RV7: string; //매수호가잔량7
  S_JBFR_CMPR_Q7: string; //매도호가잔량증감7
  B_JBFR_CMPR_Q7: string; //매수호가잔량증감7
  S_ASKPRC8: string; //매도호가8
  B_ASKPRC8: string; //매수호가8
  S_ASKPRC_RV8: string; //매도호가잔량8
  B_ASKPRC_RV8: string; //매수호가잔량8
  S_JBFR_CMPR_Q8: string; //매도호가잔량증감8
  B_JBFR_CMPR_Q8: string; //매수호가잔량증감8
  S_ASKPRC9: string; //매도호가9
  B_ASKPRC9: string; //매수호가9
  S_ASKPRC_RV9: string; //매도호가잔량9
  B_ASKPRC_RV9: string; //매수호가잔량9
  S_JBFR_CMPR_Q9: string; //매도호가잔량증감9
  B_JBFR_CMPR_Q9: string; //매수호가잔량증감9
  S_ASKPRC10: string; //매도호가10
  B_ASKPRC10: string; //매수호가10
  S_ASKPRC_RV10: string; //매도호가잔량10
  B_ASKPRC_RV10: string; //매수호가잔량10
  S_JBFR_CMPR_Q10: string; //매도호가잔량증감10
  B_JBFR_CMPR_Q10: string; //매수호가잔량증감10
  S_ASKPRC_TL_Q: string; //총매도호가잔량
  B_ASKPRC_TL_Q: string; //총매수호가잔량
  S_JBFR_CMPR_TL_Q: string; //총매도호가잔량증감
  B_JBFR_CMPR_TL_Q: string; //총매수호가잔량증감
  SMTM_ASKPRC_CCD: string; //동시호가구분코드
  SHRT_CD: string; //단축코드
};

export type SDMSKXS3_Output = {
  RL_TM_KEY: string; //40	실시간키
  CCLS_TM: string; //6	체결시간
  BDY_CMPR_CCD: DA_BDY_CMPR_SMBL_CD; //1	전일대비구분코드
  BDY_CMPR_P2: string; //11	전일대비
  UP_DWN_R_P2: string; //7	등락율 P2
  NOW_PRC_P2: string; //11	현재가
  OPN_PRC: string; //11	시가
  HGH_PRC: string; //11	고가
  LW_PRC: string; //11	저가
  OPN_PRC_BDY_CMPR_UP_DWN_R_P2: string; //7	시가전일대비등락율 P2
  HGH_PRC_BDY_CMPR_UP_DWN_R_P2: string; //7	고가전일대비등락율 P2
  LW_PRC_BDY_CMPR_UP_DWN_R_P2: string; //7	저가전일대비등락율 P2
  CCLS_CLSF: DA_CCLS_CODE; //1	체결구분 1:매도 2:매수
  CCLS_Q: string; //10	체결수량
  ACML_VLM: string; //12	누적거래량
  ACML_DL_TW_AMT: string; //22	누적거래대금
  CCLS_STRN_P2: string; //10	체결강도
  S_ASKPRC_TL_Q: string; //12	매도호가총수량
  B_ASKPRC_TL_Q: string; //12	매수호가총수량
  MKT_CLSF_INFO: string; //2	장구분정보
  SHRT_CD: string; //6	단축코드
  SAME_TM_SQ: string; // 동일시간일련번호
};
