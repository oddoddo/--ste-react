import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { ModalProps, TradeType } from "../../types";
import { useTranslation } from "react-i18next";

export enum InformationType {
  PARAM_ERROR,
  INSUFFICIENCY,
}

export type InformationModalProps = ModalProps & {
  tradeType: TradeType;
  volume?: string;
  type?: InformationType;
  message?: string;
};

const InformationModal: React.FC<InformationModalProps> = ({
  disclosure: { isOpen, onClose },
  volume,
  tradeType,
  type = InformationType.INSUFFICIENCY,
  message,
}) => {
  const { t } = useTranslation();
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
        {type === InformationType.INSUFFICIENCY && (
          <ModalBody>
            {tradeType === TradeType.BUY
              ? t("OrderSub.NotEnoughBuy")
              : t("OrderSub.NotEnoughSell")}
            <br />
            {volume !== "0" && (
              <>
                <Text
                  as={"span"}
                  color={tradeType === TradeType.BUY ? "BUY" : "SELL"}
                >
                  {`${t("format.number", { value: volume })} ${t("JU")} ${
                    tradeType === TradeType.BUY ? t("Buy") : t("Sell")
                  }`}
                </Text>{" "}
                {t("OrderSub.Available")}
              </>
            )}
          </ModalBody>
        )}
        {type === InformationType.PARAM_ERROR && (
          <ModalBody>
            {message ? message : t("OrderSub.InvalidPrice")}
          </ModalBody>
        )}
        <ModalFooter>
          <Button onClick={onClose}>{t("common.ok")}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default InformationModal;
