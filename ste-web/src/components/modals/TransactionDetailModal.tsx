import React, { ReactNode } from "react";
import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { ModalProps } from "../../types";
import styled from "styled-components";
import { CheckCircleIcon, WarningTwoIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";
import { formatTimestamp } from "utils";

export type TransactionDetailModalProps = ModalProps & {
  txHash?: string;
  data: any;
};

const TransactionDetailModal: React.FC<TransactionDetailModalProps> = ({
  txHash,
  disclosure,
  data,
}: TransactionDetailModalProps) => {
  const { t } = useTranslation();
  return (
    <Modal
      onClose={disclosure.onClose}
      isOpen={disclosure.isOpen}
      isCentered
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent maxWidth={800}>
        <ModalCloseButton />
        <ModalBody>
          <Text variant={"txt226"} textAlign="left" paddingBottom={15}>
            {t("TransactionInfo.TransactionDetails")}
          </Text>
          <SimpleGrid columns={2} templateColumns={"130px auto"}>
            <Row title={"Transaction Hash"}>{txHash ? txHash : ""}</Row>
            <Row title={"Status"}>
              <Flex alignItems="center" gap={2}>
                {data?.status === "success" ? (
                  <CheckCircleIcon color={"#00ff00"} />
                ) : (
                  <WarningTwoIcon color={"red"} />
                )}

                {data?.status}
              </Flex>
            </Row>
            <Row title={"Block"}>{data?.block}</Row>
            <Row title={"Timestamp"}>{formatTimestamp(data?.timestamp)}</Row>
            <Row title={"EventName"}>{data?.eventName}</Row>
            <Row title={"From"}>{data?.from}</Row>
            <Row title={"To"}>{data?.to}</Row>
            <Row title={"Value"}>
              {t("format.number", { value: data?.value })}
            </Row>
            <Row title={"GasPrice"}>
              {t("format.number", { value: data?.gasPrice })}
            </Row>
            <Row title={"GasUsed"}>
              {t("format.number", { value: data?.gasUsed })}
            </Row>
          </SimpleGrid>
        </ModalBody>
        <ModalFooter>
          <Button onClick={disclosure.onClose}>
            {t("TransactionInfo.Close")}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

type RowProps = {
  title: string;
  children: ReactNode;
};
const Row: React.FC<RowProps> = ({ title, children }: RowProps) => {
  return (
    <>
      <Text variant="txt124" textAlign="left">
        {title}
      </Text>
      <Content>{children}</Content>
    </>
  );
};
const Content = styled(Box)`
  display: flex;
  font-size: 12px;
  font-weight: 400;
`;

export default TransactionDetailModal;
