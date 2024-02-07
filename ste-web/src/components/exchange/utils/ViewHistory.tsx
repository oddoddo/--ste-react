import React, { useEffect, useState } from "react";
import { CloseButton, Flex, HStack, Slide, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeViewHistory,
  StockInfo,
  useViewHistoryList,
} from "../../../store/reducers/viewHistoryReducer";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "../../common/Routers";
import { useTranslation } from "react-i18next";
import { stateStockCode } from "../../../store/reducers/stockReducer";

const ViewHistory: React.FC = () => {
  const { t } = useTranslation();
  const [isOpen, setOpen] = useState(false);
  const code = useSelector(stateStockCode);
  const list = useViewHistoryList(code);

  useEffect(() => {
    if (!list) {
      setOpen(false);
    } else {
      setOpen(list.length > 0);
    }
  }, [list]);

  return (
    <>
      <Slide in={isOpen} direction="bottom" style={{ zIndex: 10 }}>
        <HStack
          bg="historyBG"
          height="33px"
          p="8px 60px"
          overflow="hidden"
          gap="5px"
        >
          <Text mt="2px" mr="7px" variant="txt105" color="historyTxt">
            {t("exchange.recent")}
          </Text>
          {list.map((i) => (
            <StockButton data={i} key={i.code} />
          ))}
        </HStack>
      </Slide>
    </>
  );
};

export default React.memo(ViewHistory);

const StockButton: React.FC<{ data: StockInfo }> = React.memo(({ data }) => {
  const { name_kr, name_en, code } = data;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const onClickHandler = () => {
    navigate(`${RoutePath.EXCHANGE}/${code}`, { state: { verified: true } });
  };
  const onCloseHandler: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    dispatch(removeViewHistory(code));
  };

  return (
    <Flex
      alignItems="center"
      padding="4px 4px 2px 8px"
      onClick={onClickHandler}
      cursor="pointer"
      borderRadius="4px"
      borderColor="historyBtnBG"
      height="23px"
      borderWidth="1px"
      bg="white"
      color="white"
      _hover={{ bg: "historyBtnHBG" }}
    >
      <Text variant="txt105" color="historyBtnTxt" fontSize={10}>
        {i18n.language === "en" ? name_en : name_kr}
      </Text>
      <CloseButton
        width="14px"
        fontSize="8px"
        height="14px"
        color="historyBtnClose"
        borderRadius={5}
        bg="white"
        onClick={onCloseHandler}
        ml="5px"
        mb="2px"
      />
    </Flex>
  );
});
