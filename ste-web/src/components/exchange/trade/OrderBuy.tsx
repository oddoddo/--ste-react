import React, { useCallback, useEffect, useState } from "react";
import TooltipCom from "components/tooltip/tooltip";
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  IconButton,
  Spacer,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { AddIcon, CheckIcon } from "@chakra-ui/icons";
import InputOrder, { OrderInputType } from "./InputOrder";
import OrderDetailRow from "../history/OrderDetailRow";
import { useTranslation } from "react-i18next";
import ConfirmTradeModal from "../../modals/ConfirmTradeModal";
import InformationModal, {
  InformationType,
} from "../../modals/InformationModal";
import { TradeType } from "../../../types";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/reducers";
import { useMcaContext } from "../../../apis/mca/McaContext";
import { useUserInfo } from "../../../store/reducers/authReducer";
import { getNowDate } from "../../../utils";
import { SDL00020_Input, SDL11002_Input } from "../../../types/SDLTypes";
import { ASKPRC_CNDT_CODE, ASKPRC_TYPE_CODE } from "../../../types/CommonCodes";
import { useAppDispatch } from "../../../store/configureStore";
import { useQuickOrderBuyList } from "../../../hooks/useQuickOrderCallback";
import { useOrderBookUnit } from "../../../hooks/useOrderBookUnit";
import { SVC_CD } from "../../../types/InterfaceTypes";
import fetch_SDL11002 from "../../../store/apis/sdl/SDL11002";
import {
  stateStockEngName,
  stateStockName,
  stateStockNowPrice,
} from "../../../store/reducers/stockReducer";
import {
  isQuickBuyState,
  toggleQuickBuy,
} from "../../../store/reducers/extraReducer";
import { useAuthCheck } from "../../alert/CompleteTradeHelper";

const OrderBuy: React.FC = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const confirmTradeModal = useDisclosure();
  const insufficientBalanceModal = useDisclosure();
  const { onRequest } = useMcaContext();
  const isEnabledQuickBuy: boolean = useSelector(isQuickBuyState);
  const code = useSelector((state: RootState) => state.stock.code);
  const clickPrice = useSelector((state: RootState) => state.stock.clickPrice);
  const stockName = useSelector(stateStockName);
  const stockEngName = useSelector(stateStockEngName);
  const stockNowPrice = useSelector(stateStockNowPrice);
  const [selectVolume, setSelectVolume] = useState("0");
  const [selectPrice, setSelectPrice] = useState<string>(
    stockNowPrice.toString()
  );
  const orderUnit = useOrderBookUnit(selectPrice);
  const { account, accountNumberPassword } = useUserInfo();
  const { checkLogin } = useAuthCheck();

  useEffect(() => {
    if (parseInt(selectPrice) === 0) setSelectPrice(stockNowPrice.toString());
  }, [stockNowPrice, selectPrice]);

  /**
   * 주문가능금액
   */
  const da_ordr_psbl_amt = useSelector((state: RootState) =>
    parseInt(state.stock.availableBalance.da_ordr_psbl_amt)
  );
  const [informationModalType, setInformationModalType] =
    useState<InformationType>(InformationType.INSUFFICIENCY);
  const { quickOrderList, totalBalance } = useQuickOrderBuyList(
    isEnabledQuickBuy,
    selectVolume
  );

  /**
   * 주문가능금액 조회
   */
  const fetchSDL11002 = useCallback(() => {
    if (!account) return;
    if (!accountNumberPassword) return;
    if (!code) return;
    const input: SDL11002_Input = {
      da_ac_no: account,
      da_ac_pwd: accountNumberPassword,
      da_symbl: code,
    };
    dispatch(fetch_SDL11002(input));
  }, [dispatch, code, account, accountNumberPassword]);

  const [available, setAvailable] = useState("0");

  const onBuyHandler = useCallback(() => {
    if (checkLogin()) return;

    const amt = da_ordr_psbl_amt;
    const p = parseFloat(selectPrice);
    const v = parseFloat(selectVolume);

    if (v > 0) {
      if (isEnabledQuickBuy) {
        if (amt < totalBalance) {
          setInformationModalType(InformationType.INSUFFICIENCY);
          setAvailable("0");
          insufficientBalanceModal.onOpen();
          return;
        }
      } else {
        if (amt < p * v) {
          const a = Math.floor(amt / p);
          setAvailable(a.toString());
          setInformationModalType(InformationType.INSUFFICIENCY);
          insufficientBalanceModal.onOpen();
          return;
        }
      }
      confirmTradeModal.onOpen();
    } else {
      setInformationModalType(InformationType.PARAM_ERROR);
      insufficientBalanceModal.onOpen();
    }
  }, [
    confirmTradeModal,
    da_ordr_psbl_amt,
    selectVolume,
    selectPrice,
    insufficientBalanceModal,
    isEnabledQuickBuy,
    totalBalance,
    checkLogin,
  ]);

  /**
   * 일반 지정가 매수 Input 생성
   */
  const getInput = useCallback((): SDL00020_Input | undefined => {
    if (account && accountNumberPassword) {
      return {
        ordr_dt: getNowDate(),
        ac_no: account,
        ac_pwd: accountNumberPassword,
        symbl: code,
        askprc_typ_cd: ASKPRC_TYPE_CODE.LIMITS,
        askprc_cndt_cd: ASKPRC_CNDT_CODE.GENERAL,
        askprc_q: selectVolume,
        askprc_prc: selectPrice,
        mkt_id: "1",
        ordr_md_ccd: "H1",
        mbr_cmpny_no: "00030",
      };
    }
  }, [account, accountNumberPassword, selectVolume, selectPrice, code]);

  const getQuickInput = useCallback(() => {
    if (!quickOrderList) return [];
    return quickOrderList.map((i) => {
      return {
        ordr_dt: getNowDate(),
        ac_no: account,
        ac_pwd: accountNumberPassword,
        symbl: code,
        askprc_typ_cd: ASKPRC_TYPE_CODE.LIMITS,
        askprc_cndt_cd: ASKPRC_CNDT_CODE.GENERAL,
        askprc_q: i.volume.toString(),
        askprc_prc: i.price.toString(),
        mkt_id: "1",
        ordr_md_ccd: "H1",
        mbr_cmpny_no: "00030",
      };
    });
  }, [account, accountNumberPassword, code, quickOrderList]);

  const confirmOKHandler = useCallback(() => {
    confirmTradeModal.onClose();
    if (!onRequest) return;

    if (isEnabledQuickBuy) {
      getQuickInput().forEach((i) => {
        onRequest(SVC_CD.SDL00020, i);
      });
      setSelectVolume("0");
    } else {
      onRequest(SVC_CD.SDL00020, getInput());
    }
  }, [
    confirmTradeModal,
    onRequest,
    getInput,
    getQuickInput,
    isEnabledQuickBuy,
  ]);

  const allInHandler = useCallback(() => {
    const price = parseInt(selectPrice);
    if (price) {
      setSelectVolume(Math.floor(da_ordr_psbl_amt / price).toString());
    } else {
      const now = stockNowPrice;
      if (!isEnabledQuickBuy) setSelectPrice(now.toString());
      setSelectVolume(Math.floor(da_ordr_psbl_amt / now).toString());
    }
  }, [stockNowPrice, selectPrice, da_ordr_psbl_amt, isEnabledQuickBuy]);

  useEffect(() => {
    if (!clickPrice) return;
    if (isEnabledQuickBuy) return;
    setSelectPrice(clickPrice?.value);
  }, [clickPrice, isEnabledQuickBuy]);

  useEffect(() => {
    if (!account) return;
    if (!accountNumberPassword) return;
    if (!code) return;
    fetchSDL11002();
  }, [account, accountNumberPassword, code, fetchSDL11002]);

  return (
    <>
      <Flex verticalAlign={"middle"} alignItems={"center"} mb={2}>
        <Flex>
          <Heading
            as="h3"
            size="md"
            fontSize={15}
            fontWeight={500}
            fontFamily={"Spoqa Han Sans Neo"}
          >
            {t("QuickOrder")}
          </Heading>
          <TooltipCom label={t("QuickOrderInfo")} />
        </Flex>
        <Spacer />
        <Button
          variant={isEnabledQuickBuy ? "gr" : "grOff"}
          size="xs"
          rightIcon={<CheckIcon mt={-0.5} />}
          onClick={() => {
            dispatch(toggleQuickBuy());
            setSelectPrice("0");
          }}
        >
          Quick
        </Button>
      </Flex>

      <Flex alignItems={"center"} mt={"20px"}>
        <Text variant={"txt114"} color="Typo_Secondary_666">
          {t("OrderSub.Orderable")}
        </Text>
        <Spacer />
        <Text variant={"txt145"} color="black">
          {t("format.number", { value: da_ordr_psbl_amt })}
        </Text>
        <Text variant={"txt144"} ml={1.5} color="Typo_Secondary_666">
          {t("WON")}
        </Text>
        <IconButton
          isDisabled={true}
          variant="outlinePlus"
          aria-label="add"
          fontSize="11px"
          ml={2}
          borderColor={"Line_Gray_BT_DD"}
          icon={<AddIcon />}
        />
      </Flex>

      <Stack spacing={2} mt={3}>
        <InputOrder
          inputType={OrderInputType.PRICE}
          value={selectPrice}
          step={orderUnit}
          setValue={setSelectPrice}
          isDisabled={isEnabledQuickBuy}
        />
        <InputOrder
          inputType={OrderInputType.VOLUME}
          value={selectVolume}
          setValue={setSelectVolume}
        />
      </Stack>
      <Flex justifyContent={"flex-end"} mt={1}>
        <Button
          variant={"outline"}
          size="xs"
          fontSize="11px"
          onClick={allInHandler}
        >
          100%
        </Button>
      </Flex>

      <Box mt={2.5}>
        {isEnabledQuickBuy && (
          <>
            <Text variant={"txt114"} color="Typo_Secondary_666">
              {t("OrderDetail")}
            </Text>
            <Stack mt={1} spacing={0.5}>
              {quickOrderList &&
                quickOrderList.length > 0 &&
                quickOrderList.map((item: any, key: number) => (
                  <OrderDetailRow
                    key={key}
                    volume={item.volume}
                    price={item.price}
                    tradeType={TradeType.BUY}
                  />
                ))}
              <Text
                variant={"txt104"}
                mt={2}
                textAlign={"right"}
                color={"Typo_Sub_B0"}
              >
                {t("OrderSub.QuickOrderDetail")}
              </Text>
            </Stack>
            <Divider mt={1} mb={7} borderColor={"Line_Gray_EE"} />
          </>
        )}

        <Flex alignItems={"center"} mt={2}>
          <Text variant={"txt124"} color="Typo_Secondary_666">
            {t("OrderSub.Total")}
          </Text>
          <TooltipCom label={""} />
          <Spacer />
          <Flex>
            <Text variant={"txt165"} color={"BUY"}>
              {t("format.number", {
                value: isEnabledQuickBuy
                  ? totalBalance
                  : Number(selectPrice) * Number(selectVolume),
              })}
            </Text>
            <Text variant={"txt164"} ml={1.5} color={"BUY"}>
              {t("WON")}
            </Text>
          </Flex>
        </Flex>
        <Button variant="buy" onClick={onBuyHandler}>
          {t("Buy")}
        </Button>
      </Box>

      <ConfirmTradeModal
        disclosure={confirmTradeModal}
        tradeType={TradeType.BUY}
        confirm={confirmOKHandler}
        volume={selectVolume}
        price={selectPrice}
        stockName={i18n.language === "en" ? stockEngName : stockName}
        isQuick={isEnabledQuickBuy}
        orderList={quickOrderList}
        totalBalance={totalBalance}
      />
      <InformationModal
        disclosure={insufficientBalanceModal}
        tradeType={TradeType.BUY}
        volume={available}
        type={informationModalType}
      />
    </>
  );
};

export default OrderBuy;
