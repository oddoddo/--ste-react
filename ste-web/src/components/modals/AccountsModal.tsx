import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from "@chakra-ui/react";
import { ModalProps, WrapperProps } from "../../types";
import { useTranslation } from "react-i18next";

export type LoginVerificationModalProp = ModalProps & WrapperProps;

const CopyModal: React.FC<LoginVerificationModalProp> = ({
  disclosure: { isOpen, onClose },
  children,
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
        <ModalBody>{children}</ModalBody>
        <ModalFooter gap={2}>
          <Button onClick={onClose} className="btn-confirm">
            {t("common.ok")}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const WithdrawalModal: React.FC<LoginVerificationModalProp> = ({
  disclosure: { isOpen, onClose },
  children,
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
        <ModalBody>{children}</ModalBody>
        <ModalFooter gap={2}>
          <Button onClick={onClose} className="btn-confirm">
            {t("common.ok")}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export { CopyModal, WithdrawalModal };
