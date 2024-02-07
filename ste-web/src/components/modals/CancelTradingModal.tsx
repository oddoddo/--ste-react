import React from "react";
import {
  Box,
  Button,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from "@chakra-ui/react";
import { ModalProps, TradeType } from "../../types";
import { useTranslation } from "react-i18next";
import { TRD_DL_CCD_CODE } from "../../types/CommonCodes";

export type CancelProps = ModalProps & {
  tradeType: TRD_DL_CCD_CODE | undefined;
};

const CancelTradingModal: React.FC<CancelProps> = ({
  disclosure,
  tradeType,
  confirm,
}: CancelProps) => {
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
        <ModalBody>
          <Box>
            {tradeType === TRD_DL_CCD_CODE.BUY
              ? t("OrderSub.CancelQBUY")
              : t("OrderSub.CancelQSELL")}
          </Box>
        </ModalBody>
        <ModalFooter gap={2}>
          <Button onClick={onClose} className="btn-gray">
            {t("OrderSub.No")}
          </Button>
          <Button onClick={confirm}>{t("OrderSub.IllCancel")}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CancelTradingModal;
