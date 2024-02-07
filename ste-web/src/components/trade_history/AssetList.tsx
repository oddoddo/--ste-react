import {
  Box,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducers";
import React, { useCallback, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../store/configureStore";
import fetch_SDL11003 from "../../store/apis/sdl/SDL11003";
import AssetListRow from "./AssetListRow";

const AssetList: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { account, accountNumberPassword } = useSelector(
    (state: RootState) => state.auth.userInfo
  );
  const my_assets = useSelector((state: RootState) => state.asset.my_assets);

  const getMyAssets = useCallback(() => {
    if (!account || !accountNumberPassword) return;
    dispatch(
      fetch_SDL11003({
        da_ac_no: account,
        da_ac_pwd: accountNumberPassword,
      })
    );
  }, [account, accountNumberPassword, dispatch]);

  const { array: assetList } = useMemo(() => {
    if (my_assets) {
      return my_assets;
    }
    return { array: [] };
  }, [my_assets]);

  useEffect(() => {
    if (account) {
      getMyAssets();
    }
  }, [account, getMyAssets]);

  return (
    <TableContainer className="scrollbar" maxH={"450px"}>
      <Table variant="stripedlist" colorScheme="teal">
        <TableCaption>보유자산 목록</TableCaption>
        <Thead>
          <Tr>
            <Th w={"19%"}>
              {t("AccountSub.Name")} <TriangleDownIcon />
            </Th>
            <Th w={"11%"}>
              {t("AccountSub.PL")} <TriangleUpIcon />
            </Th>
            <Th w={"11%"}>
              {t("AccountSub.PLPercent")} <TriangleDownIcon />
            </Th>
            <Th w={"12%"}>
              {t("AccountSub.AvgBuyPrice")} <TriangleDownIcon />
            </Th>
            <Th w={"9%"} textAlign={"center"}>
              {t("AccountSub.Balance")}
            </Th>
            <Th w={"12%"}>
              {t("AccountSub.Price")} <TriangleDownIcon />
            </Th>
            <Th w={"12%"}>
              {t("AccountSub.BuyAmount")} <TriangleDownIcon />
            </Th>
            <Th>
              {t("AccountSub.EstValue")} <TriangleDownIcon />
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {assetList?.length > 0 ? (
            assetList.map((item) => (
              <AssetListRow item={item} key={item.da_is_cd} />
            ))
          ) : (
            <Tr>
              <Td colSpan={10}>
                <Box
                  minHeight={200}
                  width={"100%"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  display={"flex"}
                  color={"Typo_Secondary_666"}
                >
                  {t("HistorySub.NoHistory")}
                </Box>
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default AssetList;
