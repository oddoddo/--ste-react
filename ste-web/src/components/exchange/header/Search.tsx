import React, { SetStateAction, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { ChevronDownIcon, Search2Icon } from "@chakra-ui/icons";
import {
  Flex,
  HStack,
  IconButton,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Tab,
  Table,
  TableContainer,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import fetch_SDT0003M from "../../../store/apis/sdt/SDT0003M";
import { useAppDispatch } from "../../../store/configureStore";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "../../common/Routers";
import { useSymbolFilter } from "../../../hooks/useSymbolFilter";
import { SDT0003M_Output_List } from "../../../types/SDTTypes";
import FavoriteIcon from "../../button/Favorite";

const Search: React.FC = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isOpen, onToggle, onClose } = useDisclosure();
  const [value, setValue] = useState("");
  const filterList = useSymbolFilter(value);
  const onChangeHandler = useCallback(
    (e: { target: { value: SetStateAction<string> } }) => {
      setValue(e.target.value as string);
    },
    []
  );

  const getSymbolList = useCallback(() => {
    dispatch(
      fetch_SDT0003M({
        in_da_hngl_is_nm: "",
      })
    );
  }, [dispatch]);

  useEffect(() => {
    getSymbolList();
  }, [getSymbolList]);

  const codeChangeHandler = useCallback(
    (code: string) => {
      navigate(`${RoutePath.EXCHANGE}/${code}`, { state: { verified: true } });
      onClose();
    },
    [navigate, onClose]
  );

  return (
    <Popover
      placement="bottom"
      isOpen={isOpen} // isOpen
      onClose={onClose}
      closeOnBlur={true}
      isLazy
    >
      <PopoverTrigger>
        <IconButton
          minW="0"
          w="16px"
          h="16px"
          px="0"
          bg="transparent"
          borderRadius="2px"
          border="1px"
          borderColor="#4D4A6D"
          color="#9390BA"
          outline="none"
          aria-label="more"
          onClick={onToggle}
          icon={<ChevronDownIcon />}
        />
      </PopoverTrigger>
      <PopoverContent
        w={360}
        h={232}
        p={0}
        boxShadow={
          "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px"
        }
      >
        <PopoverArrow />
        <PopoverHeader p={0}>
          <SearchWrap>
            <Search2Icon />
            <Input
              type="text"
              placeholder={t("SearchSub.Search")}
              value={value}
              onChange={onChangeHandler}
              focusBorderColor="transparent"
              pl={0}
              mr={5}
            />
            <PopoverCloseButton size="m" />
          </SearchWrap>
        </PopoverHeader>

        <PopoverBody p="0 12px">
          <Tabs variant={"unstyled"}>
            <TabList>
              <Tab>{t("SearchSub.All")}</Tab>
              <Tab>{t("SearchSub.SOC")}</Tab>
              <Tab>{t("SearchSub.Agriculture")}</Tab>
              <Tab>{t("SearchSub.RealEstate")}</Tab>
              <Tab>{t("SearchSub.Music")}</Tab>
              <Tab>{t("SearchSub.Art")}</Tab>
              <Tab>{t("SearchSub.Interest")}</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <TableContainer className="scrollbar" maxH={"155px"}>
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
                      {filterList?.map((item) => (
                        <SymbolRow
                          item={item}
                          key={item.da_is_shrt_cd}
                          codeChangeHandler={codeChangeHandler}
                        />
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

const SymbolRow: React.FC<{
  item: SDT0003M_Output_List;
  codeChangeHandler: any;
}> = React.memo(({ item, codeChangeHandler }) => {
  const { i18n } = useTranslation();
  return (
    <Tr
      cursor="pointer"
      onClick={() => codeChangeHandler(item.da_is_shrt_cd.toString().trim())}
    >
      <Td>
        <Flex height="100%" alignItems="flex-end">
          <FavoriteIcon
            symbol={item.da_is_shrt_cd.toString().trim()}
            size={13}
          />
          {i18n.language === "en" ? item.da_eng_is_nm : item.da_hngl_is_nm}
        </Flex>
      </Td>
      <Td>{item.da_is_shrt_cd}</Td>
    </Tr>
  );
});

const SearchWrap = styled(HStack)`
  align-items: center;
  padding: 0 10px 0 14px;
  border-bottom: 1px solid ${({ theme: { colors } }) => colors.Line_Gray_EE};
  background: ${({ theme: { colors } }) => colors.searchWrap};
  height: 42px;
  svg {
    color: ${({ theme: { colors } }) => colors.Typo_Sub_B0};
    &.close {
      transform: scale(0.8);
    }
  }
  input {
    font-size: 14px;
    font-weight: 400;
    outline: none;
    width: 100%;
    height: 100%;
    background-color: transparent;
    color: ${({ theme: { colors } }) => colors.black};
    border: none;
    &::placeholder {
      color: ${({ theme: { colors } }) => colors.Typo_Sub_B0};
    }
  }
`;

export default Search;
