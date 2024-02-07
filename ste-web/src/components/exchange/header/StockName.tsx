import styled from "styled-components";
import { Box, Heading, HStack, Image, Text } from "@chakra-ui/react";
import ItemImage from "assets/images/items/item-logo.svg";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/reducers";
import { SDT0001M_Output } from "../../../types/SDTTypes";
import Search from "./Search";
import { useTranslation } from "react-i18next";
import { saveViewHistory } from "../../../store/reducers/viewHistoryReducer";

const StockName = () => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const stock = useSelector((state: RootState) => state.stock.stock);

  const { da_is_shrt_cd, da_hngl_is_nm, da_eng_is_nm } = useMemo(() => {
    if (stock) {
      return stock;
    }
    return {} as SDT0001M_Output;
  }, [stock]);

  useEffect(() => {
    if (!stock) return;
    dispatch(
      saveViewHistory({
        code: stock?.da_is_shrt_cd?.trim(),
        name_en: stock?.da_eng_is_nm?.trim(),
        name_kr: stock?.da_hngl_is_nm?.trim(),
      })
    );
  }, [dispatch, stock]);

  return (
    <ItemNameWrap spacing="12px">
      <Image src={ItemImage} alt={ItemImage} />
      <Box className="title">
        <HStack alignItems="center" spacing="10px">
          <Heading as="h2" size="md" whiteSpace={"nowrap"}>
            {i18n.language === "en" ? da_eng_is_nm : da_hngl_is_nm}
          </Heading>
          <Text className="connector" mt="-3px">
            {da_is_shrt_cd}
          </Text>
          <Search />
        </HStack>
        <Text className="field">
          {i18n.language === "en" ? da_hngl_is_nm : da_eng_is_nm}
        </Text>
      </Box>
    </ItemNameWrap>
  );
};

const ItemNameWrap = styled(HStack)`
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  img {
    display: block;
    width: 2.375rem;
    height: 2.375rem;
  }
  .title {
    margin-top: 5px;
  }
  h2 {
    color: ${({ theme: { colors } }) => colors.secondary_light};
    font-size: 1.375rem;
    font-weight: 600;
  }
  .connector {
    color: ${({ theme: { colors } }) => colors.S_Light};
    font-size: 1.0625rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
  .field {
    color: ${({ theme: { colors } }) => colors.secondary_light};
    font-size: 0.8625rem;
    font-weight: 500;
    line-height: 1.1;
    opacity: 0.7;
  }
`;

export default StockName;
