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
import { ModalProps } from "../../types";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { RoutePath } from "../common/Routers";

export type LoginVerificationModalProp = ModalProps & {
  message?: string;
};

const LoginVerificationModal: React.FC<LoginVerificationModalProp> = ({
  disclosure: { isOpen, onClose },
  message,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
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
        <ModalBody>{message ? message : t("common.requireLogin")}</ModalBody>
        <ModalFooter gap={2}>
          <Button onClick={onClose} className="btn-gray">
            {t("OrderSub.Cancel")}
          </Button>
          <Button
            className="btn-confirm"
            onClick={() => {
              navigate(RoutePath.LOGIN, { state: { beforePath: pathname } });
            }}
          >
            {t("common.login")}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default LoginVerificationModal;
