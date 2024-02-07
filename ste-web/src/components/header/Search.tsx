import styled from "styled-components";
import { useTranslation } from "react-i18next";
import React, { SetStateAction, useCallback, useMemo, useState } from "react"; // Import useState
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { stateMenuColor } from "../../store/reducers/extraReducer";
import { RoutePath } from "../common/Routers";
import { useSymbolFilter } from "../../hooks/useSymbolFilter";
import { SDT0003M_Output_List } from "../../types/SDTTypes";

const Search = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isFocused, setIsFocused] = useState(false); // State to track focus
  const isWhiteHeader = useSelector(stateMenuColor);
  const [value, setValue] = useState("");
  const filterList = useSymbolFilter(value);

  const onChangeHandler = useCallback(
    (e: { target: { value: SetStateAction<string> } }) => {
      setValue(e.target.value as string);
    },
    []
  );

  const initialFocusRef = React.useRef<any>();

  const onClickHandler = useCallback(
    (symbol: string) => {
      const to = `${RoutePath.EXCHANGE}/${symbol}`;
      navigate(to, {
        state: { verified: true },
      });
    },
    [navigate]
  );

  const onFocusHandler = useCallback(() => {
    setIsFocused(true);
  }, []);

  const onBlurHandler = useCallback(() => {
    setTimeout(() => {
      setIsFocused(false);
    }, 100);
  }, []);

  return (
    <>
      <Popover
        isOpen={isFocused}
        autoFocus={false}
        returnFocusOnClose={false}
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <InputGroup w="270px">
            <InputLeftElement
              pointerEvents="none"
              children={
                <Search2Icon color={isWhiteHeader ? "primary" : "white"} />
              }
            />
            <SInput
              className={isWhiteHeader ? "white-header" : ""}
              ref={initialFocusRef}
              type="text"
              placeholder={t("search_holder")}
              onFocus={onFocusHandler}
              onBlur={onBlurHandler}
              onChange={onChangeHandler}
              value={value}
              autoComplete="off"
            />
          </InputGroup>
        </PopoverTrigger>
        <PopoverContent
          width="350px"
          boxShadow={
            "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px"
          }
        >
          <PopoverArrow />
          <PopoverBody>
            <TableContainer className="scrollbar" maxH={"300px"}>
              <Table size="sm" variant={"modal"}>
                <Thead
                  position="sticky"
                  top={0}
                  zIndex="docked"
                  bgColor={"white"}
                >
                  <Tr>
                    <Th w={"75%"} textAlign={"left"} pl="35px">
                      {t("SearchSub.StockName")}
                    </Th>
                    <Th>{t("SearchSub.Code")}</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {filterList && filterList?.length > 0 ? (
                    filterList?.map((i) => {
                      return (
                        <SearchResultRow
                          item={i}
                          key={i.da_is_shrt_cd}
                          onClickHandler={onClickHandler}
                        />
                      );
                    })
                  ) : (
                    <Tr borderBottom="1px solid rgba(34,36,38,.1)">
                      <Td colSpan={2}>
                        <Flex
                          justifyContent="center"
                          alignItems="center"
                          minHeight="80px"
                        >
                          {t("common.notFound")}
                        </Flex>
                      </Td>
                    </Tr>
                  )}
                </Tbody>
              </Table>
            </TableContainer>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
};

const SearchResultRow: React.FC<{
  item: SDT0003M_Output_List;
  onClickHandler: any;
}> = React.memo(({ item, onClickHandler }) => {
  const { i18n } = useTranslation();
  const { symbol, name } = useMemo(() => {
    return {
      symbol: item?.da_is_shrt_cd.trim() ?? "",
      name: i18n.language === "en" ? item.da_eng_is_nm : item.da_hngl_is_nm,
    };
  }, [item, i18n.language]);
  const onClick = useCallback(() => {
    onClickHandler(symbol);
  }, [symbol, onClickHandler]);

  return (
    <Tr
      cursor="pointer"
      onClick={onClick}
      _hover={{ bg: "login_BOXline_hover" }}
    >
      <Td pl="15px">{name}</Td>
      <Td>{symbol}</Td>
    </Tr>
  );
});

const SInput = styled(Input)`
  border-radius: 34px;
  border: 1px solid ${({ theme: { colors } }) => colors.SearchWrapperBorder};
  background: ${({ theme: { colors } }) => colors.SearchWrapperBG};
  box-sizing: border-box;
  font-size: 0.75rem;
  font-weight: 400;
  color: ${({ theme: { colors } }) => colors.white};

  &::placeholder {
    color: ${({ theme: { colors } }) => colors.primary_3};
  }

  &:hover {
    border: 1px solid ${({ theme: { colors } }) => colors.SearchWrapperBorder};
  }

  &:focus,
  &:focus-visible {
    border: 1px solid
      ${({ theme: { colors } }) => colors.SearchWrapperBorderFocus};
    background: ${({ theme: { colors } }) => colors.SearchWrapperFocusBG};
    &::placeholder {
      color: ${({ theme: { colors } }) => colors.Secondary_light};
    }
  }

  &.white-header {
    border-color: ${({ theme: { colors } }) => colors.S_Light};
    background: ${({ theme: { colors } }) => colors.Secondary_light};
    color: ${({ theme: { colors } }) => colors.primary};
    &:focus,
    &:focus-visible {
      box-shadow: none;
      &::placeholder {
        color: ${({ theme: { colors } }) => colors.primary_3};
      }
    }
  }
`;

export default Search;
