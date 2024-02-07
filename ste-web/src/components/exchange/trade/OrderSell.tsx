import React, { useCallback, useEffect, useState } from "react";
import TooltipCom from "components/tooltip/tooltip";
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Spacer,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
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
import { SDL00020_Input, SDL11007_Input } from "../../../types/SDLTypes";
import { ASKPRC_CNDT_CODE, ASKPRC_TYPE_CODE } from "../../../types/CommonCodes";
import { useAppDispatch } from "../../../store/configureStore";
import { useOrderBookUnit } from "../../../hooks/useOrderBookUnit";
import { useQuickOrderSellList } from "../../../hooks/useQuickOrderCallback";
import { SVC_CD } from "../../../types/InterfaceTypes";
import fetch_SDL11007 from "../../../store/apis/sdl/SDL11007";
import { stateStockNowPrice } from "../../../store/reducers/stockReducer";
import {
  isQuickSellState,
  toggleQuickSell,
} from "../../../store/reducers/extraReducer";
import { useAuthCheck } from "../../alert/CompleteTradeHelper";

const OrderSell: React.FC = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const confirmTradeModal = useDisclosure();
  const insufficientBalanceModal = useDisclosure();
  const { onRequest } = useMcaContext();
  const isEnabledQuickSell: boolean = useSelector(isQuickSellState);
  const stockName = useSelector((state: RootState) => state.stock.stockName);
  const stockEngName = useSelector(
    (state: RootState) => state.stock.stockEngName
  );
  const stockNowPrice = useSelector(stateStockNowPrice);
  const [selectVolume, setSelectVolume] = useState("0");
  const [selectPrice, setSelectPrice] = useState(stockNowPrice.toString());
  const orderUnit = useOrderBookUnit(selectPrice);
  const code = useSelector((state: RootState) => state.stock.code);
  const clickPrice = useSelector((state: RootState) => state.stock.clickPrice);
  const { account, accountNumberPassword } = useUserInfo();
  /**
   * 매도가능보유수량
   */
  const da_ordr_psbl_blnc = useSelector((state: RootState) =>
    parseInt(state.stock.availableForSell.da_ordr_psbl_blnc)
  );
  const [informationModalType, setInformationModalType] =
    useState<InformationType>(InformationType.INSUFFICIENCY);
  const { quickOrderList, totalBalance } = useQuickOrderSellList(
    isEnabledQuickSell,
    selectVolume
  );
  const { checkLogin } = useAuthCheck();

  useEffect(() => {
    if (parseInt(selectPrice) === 0) setSelectPrice(stockNowPrice.toString());
  }, [stockNowPrice, selectPrice]);

  const fetchSDL11007 = useCallback(() => {
    if (!account) return;
    if (!accountNumberPassword) return;
    if (!code) return;
    const input: SDL11007_Input = {
      da_ac_no: account,
      da_ac_pwd: accountNumberPassword,
      da_symbl: code,
    };
    dispatch(fetch_SDL11007(input));
  }, [dispatch, code, account, accountNumberPassword]);

  const [available, setAvailable] = useState("0");

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

    if (isEnabledQuickSell) {
      getQuickInput().forEach((i) => {
        onRequest(SVC_CD.SDL00010, i);
      });
      setSelectVolume("0");
    } else {
      onRequest(SVC_CD.SDL00010, getInput());
    }
  }, [
    confirmTradeModal,
    onRequest,
    getInput,
    getQuickInput,
    isEnabledQuickSell,
  ]);

  const onSellHandler = useCallback(() => {
    if (checkLogin()) return;

    const v = parseFloat(selectVolume);
    if (!(v > 0)) {
      setInformationModalType(InformationType.PARAM_ERROR);
      insufficientBalanceModal.onOpen();
      return;
    }
    if (v > da_ordr_psbl_blnc) {
      setAvailable("0");
      setInformationModalType(InformationType.INSUFFICIENCY);
      insufficientBalanceModal.onOpen();
      return;
    }

    confirmTradeModal.onOpen();
  }, [
    confirmTradeModal,
    insufficientBalanceModal,
    da_ordr_psbl_blnc,
    selectVolume,
    checkLogin,
  ]);

  const allInHandler = useCallback(() => {
    const price = parseInt(selectPrice);
    if (price) {
      setSelectVolume(Math.floor(da_ordr_psbl_blnc).toString());
    } else {
      if (!isEnabledQuickSell) setSelectPrice(stockNowPrice.toString());
      setSelectVolume(Math.floor(da_ordr_psbl_blnc).toString());
    }
  }, [stockNowPrice, selectPrice, da_ordr_psbl_blnc, isEnabledQuickSell]);

  useEffect(() => {
    if (!clickPrice) return;
    if (isEnabledQuickSell) return;
    setSelectPrice(clickPrice?.value);
  }, [clickPrice, isEnabledQuickSell]);

  useEffect(() => {
    if (!account) return;
    if (!accountNumberPassword) return;
    if (!code) return;
    fetchSDL11007();
  }, [account, accountNumberPassword, code, fetchSDL11007]);

  return (
    <>
      <ConfirmTradeModal
        disclosure={confirmTradeModal}
        tradeType={TradeType.SELL}
        confirm={confirmOKHandler}
        volume={selectVolume}
        price={selectPrice}
        stockName={i18n.language === "en" ? stockEngName : stockName}
        isQuick={isEnabledQuickSell}
        orderList={quickOrderList}
        totalBalance={totalBalance}
      />
      <InformationModal
        disclosure={insufficientBalanceModal}
        tradeType={TradeType.SELL}
        volume={available}
        type={informationModalType}
      />
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
          variant={isEnabledQuickSell ? "gr" : "grOff"}
          size="xs"
          rightIcon={<CheckIcon mt={-0.5} />}
          onClick={() => {
            dispatch(toggleQuickSell());
            setSelectPrice("0");
          }}
        >
          Quick
        </Button>
      </Flex>
      <Flex alignItems={"center"} mt={"20px"}>
        <Text variant={"txt114"} color="Typo_Secondary_666">
          {t("OrderSub.Balance")}
        </Text>
        <Spacer />
        <Text variant={"txt145"} color="black">
          {t("format.number", { value: da_ordr_psbl_blnc })}
        </Text>
        <Text variant={"txt144"} ml={1.5} color="Typo_Secondary_666">
          {t("JU")}
        </Text>
      </Flex>
      <Stack spacing={2} mt={3}>
        <InputOrder
          inputType={OrderInputType.PRICE}
          value={selectPrice}
          setValue={setSelectPrice}
          isDisabled={isEnabledQuickSell}
          step={orderUnit}
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
        {isEnabledQuickSell && (
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
                    tradeType={TradeType.SELL}
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
            <Text variant={"txt165"} color={"LOW"}>
              {t("format.number", {
                value: isEnabledQuickSell
                  ? totalBalance
                  : Number(selectPrice) * Number(selectVolume),
              })}
            </Text>
            <Text variant={"txt164"} ml={1} color={"LOW"}>
              {t("WON")}
            </Text>
          </Flex>
        </Flex>

        <Button variant="sell" onClick={onSellHandler}>
          {t("Sell")}
        </Button>
      </Box>
    </>
  );
};

export default OrderSell;
