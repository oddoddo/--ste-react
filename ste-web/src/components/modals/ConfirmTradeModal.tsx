import React from "react";
import {
  Box,
  Button,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import ItemImage from "../../assets/images/items/item-logo.svg";
import styled from "styled-components";
import { ModalProps, TradeType } from "../../types";
import { useTranslation } from "react-i18next";
import { OrderBookQuickItemData } from "../../hooks/useQuickOrderCallback";
import OrderDetailRow from "../exchange/history/OrderDetailRow";

export type ConfirmTradeModalProps = ModalProps & {
  tradeType: TradeType;
  price: string;
  volume: string;
  stockName: string;
  isQuick?: boolean;
  orderList?: OrderBookQuickItemData[];
  totalBalance?: number;
};

const ConfirmTradeModal: React.FC<ConfirmTradeModalProps> = ({
  disclosure,
  tradeType,
  confirm,
  price,
  volume,
  stockName,
  isQuick = false,
  orderList = [],
  totalBalance = 0,
}: ConfirmTradeModalProps) => {
  const { t } = useTranslation();
  const { isOpen, onClose } = disclosure;

  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      isCentered
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody pb={"30px"}>
          <VStack spacing={3}>
            <Image src={ItemImage} w={"68px"} alt="alert" />
            <Box>
              {stockName}{" "}
              {tradeType === TradeType.BUY ? (
                <span className="red">{t("Buy")}</span>
              ) : (
                <span className="blue">{t("Sell")}</span>
              )}
            </Box>
          </VStack>
          <ModalDetail>
            <li>
              <strong className="dt">{t("OrderSub.OrderQuantity")}</strong>
              <p className="dd">
                {t("format.number", { value: volume })} <span>{t("JU")}</span>
              </p>
            </li>
            <li>
              <strong className="dt">{t("OrderSub.OrderPrice")}</strong>
              {isQuick ? (
                <Stack mt={1} spacing={0.3} w={210}>
                  {orderList &&
                    orderList.length > 0 &&
                    orderList.map((item: any, key: number) => (
                      <OrderDetailRow
                        key={key}
                        volume={item.volume}
                        price={item.price}
                        tradeType={tradeType}
                      />
                    ))}
                </Stack>
              ) : (
                <p className="dd">
                  {t("format.number", { value: price })} <span>{t("WON")}</span>
                </p>
              )}
            </li>
            <li>
              <strong className="dt">{t("OrderSub.Total")}</strong>
              <p className={tradeType === TradeType.BUY ? "dd red" : "dd blue"}>
                {t("format.number", {
                  value: isQuick
                    ? totalBalance
                    : Number(price) * Number(volume),
                }) +
                  " " +
                  t("WON")}
              </p>
            </li>
          </ModalDetail>
        </ModalBody>
        <ModalFooter gap={2}>
          <Button onClick={onClose} className="btn-gray">
            {t("OrderSub.Cancel")}
          </Button>
          {tradeType === TradeType.BUY ? (
            <Button onClick={confirm} className="btn-red">
              {t("Buy")}
            </Button>
          ) : (
            <Button onClick={confirm} className="btn-blue">
              {t("Sell")}
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmTradeModal;
export const ModalDetail = styled.ul`
  margin-top: 30px;
  > li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    .dt {
      font-size: 16px;
      font-weight: 500;
      color: ${({ theme: { colors } }) => colors.Typo_Sub_B0};
    }
    .dd {
      font-size: 17px;
      font-weight: 500;
      color: ${({ theme: { colors } }) => colors.black};
      &.red {
        color: ${({ theme: { colors } }) => colors.HIGH};
      }
      &.blue {
        color: ${({ theme: { colors } }) => colors.LOW};
      }
      span {
        color: ${({ theme: { colors } }) => colors.Typo_Sub_B0};
      }
    }
  }
`;
