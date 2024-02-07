import styled from "styled-components";
import { Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import TooltipCom from "components/tooltip/tooltip";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducers";
import { useCallback, useEffect, useMemo } from "react";
import { SDL11001_Output } from "../../types/SDLTypes";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../store/configureStore";
import fetch_SDL11001 from "../../store/apis/sdl/SDL11001";
import { getTradeColor, getUpDownColor } from "../../utils";

const AssetStatus: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { account, accountNumberPassword } = useSelector(
    (state: RootState) => state.auth.userInfo
  );
  const myAsset = useSelector((state: RootState) => state.asset.my_asset);
  const { da_tl_tfnd, da_tl_val_amt, da_tl_val_pl, da_tl_val_pl_r } =
    useMemo(() => {
      if (myAsset) {
        return {
          ...myAsset,
        };
      }
      return {} as SDL11001_Output;
    }, [myAsset]);

  const getAccountInfo = useCallback(
    (account: string, accountNumberPassword: string) => {
      dispatch(
        fetch_SDL11001({
          da_ac_no: account,
          da_ac_pwd: accountNumberPassword,
        })
      );
    },
    [dispatch]
  );

  useEffect(() => {
    if (account && accountNumberPassword) {
      getAccountInfo(account, accountNumberPassword);
    }
  }, [account, accountNumberPassword, getAccountInfo]);

  return (
    <AssetStatusWrap
      h={"130px"}
      gridTemplateRows="repeat(2, 1fr)"
      gridTemplateColumns="430px repeat(2, 1fr)"
      gap={0}
    >
      <GridItem className="asset" rowSpan={2} colSpan={1}>
        <Flex alignItems={"center"}>
          <Text variant={"txt175"} color={"mocup_text"}>
            {t("AccountSub.TotalBalance")}
          </Text>
          <TooltipCom label={t("TooltipSub.TotalBalanceToolTip")} />
        </Flex>
        <Text variant={"txt445"} color={"black"}>
          {t("format.number", {
            value: Number(da_tl_val_amt || 0) + Number(da_tl_tfnd || 0),
          })}
        </Text>
      </GridItem>
      <GridItem
        className="rest"
        colSpan={1}
        borderRight={"1px solid"}
        borderBottom={"1px solid"}
      >
        <Flex alignItems={"center"}>
          <Text variant={"txt164"} color={"mocup_text"}>
            {t("AccountSub.MarketValue")}
          </Text>
          <TooltipCom label={t("TooltipSub.MarketValueToolTip")} />
        </Flex>
        <Text variant={"txt225"} color={"Typo_Sub_3A"}>
          {t("format.number", { value: da_tl_val_amt || 0 })}
        </Text>
      </GridItem>
      <GridItem className="rest" colSpan={1} borderBottom={"1px solid"}>
        <Flex alignItems={"center"}>
          <Text variant={"txt164"} color={"mocup_text"}>
            {t("AccountSub.PL")}
          </Text>
          <TooltipCom label={t("TooltipSub.TotalToolTip")} />
        </Flex>
        <Text
          variant={"txt225"}
          color={
            Number(da_tl_val_pl) > 0
              ? "HIGH"
              : Number(da_tl_val_pl) < 0
              ? "LOW"
              : ""
          }
        >
          {t("format.number", { value: da_tl_val_pl || 0 })}
        </Text>
      </GridItem>
      <GridItem className="rest" colSpan={1} borderRight={"1px solid"}>
        <Flex alignItems={"center"}>
          <Text variant={"txt164"} color={"mocup_text"}>
            {t("AccountSub.Deposit")}
          </Text>
        </Flex>
        <Text variant={"txt225"} color={"Typo_Sub_3A"}>
          {t("format.number", { value: da_tl_tfnd || 0 })}
        </Text>
      </GridItem>
      <GridItem className="rest" colSpan={1}>
        <Flex alignItems={"center"}>
          <Text variant={"txt164"} color={"mocup_text"}>
            {t("AccountSub.TotalPLpercent")}
          </Text>
          <TooltipCom label={t("TooltipSub.TotalPercentToolTip")} />
        </Flex>
        <Text variant={"txt225"} color={getUpDownColor(da_tl_val_pl)}>
          {t("format.number", {
            value: isNaN(Number(da_tl_val_pl_r)) ? "0" : da_tl_val_pl_r,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }) + " %"}
        </Text>
      </GridItem>
    </AssetStatusWrap>
  );
};

const AssetStatusWrap = styled(Grid)`
  .rest {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 40px;
    border-color: ${({ theme: { colors } }) => colors.Line_Gray_EE};
  }
  .asset {
    padding: 14px 40px 24px 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-right: 1px solid;
    border-color: ${({ theme: { colors } }) => colors.Line_Gray_EE};
  }
`;

export default AssetStatus;
