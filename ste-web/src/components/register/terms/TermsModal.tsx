import {
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { ModalProps } from "../../../types";
import { Term } from "../RegisterProvider";

export type TermsModalProps = ModalProps & {
  step?: number;
  activeModalTerm: Term[];
};

const TermsModal: React.FC<TermsModalProps> = ({
  disclosure,
  activeModalTerm,
}) => {
  const [isReading, setReading] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const [focusTerm, setFocusTerm] = useState<Term | undefined>(undefined);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    setCount(0);
    setReading(false);
    if (activeModalTerm && activeModalTerm.length > 0) {
      setFocusTerm(activeModalTerm[0]);
    }
  }, [activeModalTerm]);

  const handler = () => {
    const container = ref.current;
    if (!container) return;
    if (
      container.scrollHeight - container.scrollTop ===
      container.clientHeight
    ) {
      setReading(true);
    }
  };

  useEffect(() => {
    setReading(false);
    if (ref.current) {
      ref.current.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [focusTerm]);

  useEffect(() => {
    if (disclosure.isOpen) {
      setTimeout(() => {
        if (ref.current) {
          const container = ref.current;
          container?.addEventListener("scroll", handler);
        }
      }, 1);
    } else {
      ref?.current?.removeEventListener("scroll", handler);
    }
  }, [disclosure.isOpen]);

  const onAgreeHandler = () => {
    if (!focusTerm) return;
    focusTerm.checked = true;
    const idx = count + 1;
    if (activeModalTerm.length > idx) {
      setCount(idx);
      setFocusTerm(activeModalTerm[idx]);
    } else {
      disclosure.onClose();
    }
  };

  const onRejectHandler = () => {
    if (!focusTerm) return;
    focusTerm.checked = false;
    const idx = count + 1;
    if (activeModalTerm.length > idx) {
      setCount(idx);
      setFocusTerm(activeModalTerm[idx]);
    } else {
      disclosure.onClose();
    }
  };

  const onPrevHandler = () => {
    if (!focusTerm) return;
    const idx = count - 1;
    if (activeModalTerm.length > idx) {
      setCount(idx);
      setFocusTerm(activeModalTerm[idx]);
    }
  };

  const { visiblePrevBtn, visibleRejectBtn } = useMemo(() => {
    return {
      visiblePrevBtn:
        activeModalTerm.length > 1 &&
        count > 0 &&
        activeModalTerm.length > count &&
        focusTerm?.required === true,
      visibleRejectBtn: !focusTerm?.required,
    };
  }, [count, activeModalTerm, focusTerm]);

  return (
    <Modal
      blockScrollOnMount={true}
      isOpen={disclosure.isOpen}
      onClose={disclosure.onClose}
      scrollBehavior="inside"
      closeOnOverlayClick={false}
      isCentered
    >
      <ModalContent maxHeight="530px">
        <ModalHeader p={"30px 30px 0 30px"}>
          <Heading
            as={"h2"}
            fontFamily="Noto Sans KR"
            fontWeight="500"
            fontSize="25px"
            textAlign={"left"}
            color={"regiTxt1"}
          >
            {focusTerm?.label}
          </Heading>
          <Text
            as={"strong"}
            display={"block"}
            mt="14px"
            fontFamily="Noto Sans KR"
            fontWeight="500"
            fontSize="20px"
            textAlign={"left"}
            color={"Typo_Secondary_666"}
          >
            개인 신용 정보 수집이용 동의
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        {/* <ModalBody>{activeModalTerm?.modalContent}</ModalBody> */}
        <ModalBody
          p={"20px 30px 30px 30px"}
          fontFamily="Noto Sans KR"
          fontWeight="300"
          fontSize="16px"
          textAlign={"left"}
          color={"Typo_Secondary_666"}
          lineHeight={"1.5"}
          ref={ref}
        >
          <VStack gap={4}>
            <p>
              본인은 SK텔레콤(주)(이하 ‘회사’라 합니다)가 제공하는
              본인확인서비스(이하 ‘서비스’라 합니다)를 이용하기 위해, 다음과
              같이 ‘회사’가 본인의 개인정보를 수집/이용하고, 개인정보의 취급을
              위탁하는 것에 동의합니다.
            </p>
            <p>
              1. 수집항목- 이용자의 성명,이동전화번호, 가입한 이동전화 회사,
              생년월일, 성별- 연계정보(CI), 중복가입확인정보(DI)- 이용자가
              이용하는 웹사이트 또는 Application 정보, 이용일시- 내외국인 여부-
              가입한 이동전화회사 및 이동전화브랜드
            </p>
            <p>
              2. 이용목적- 이용자가 웹사이트 또는 Application에 입력한
              본인확인정보의 정확성 여부 확인(본인확인서비스 제공)- 해당
              웹사이트 또는 Application에 연계정보(CI)/중복가입확인정보(DI)
              전송- 서비스 관련 상담 및 불만 처리 등- 이용 웹사이트/Application
              정보 등에 대한 분석 및 세분화를 통한, 이용자의 서비스 이용 선호도
              분석
            </p>
            <p>
              3. 개인정보의 보유기간 및 이용기간- 이용자가 서비스를 이용하는
              기간에 한하여 보유 및 이용. 다만, 아래의 경우는 제외- 법령에서
              정하는 경우 해당 기간까지 보유(상세 사항은 회사의
              개인정보취급방침에 기재된 바에 따름)
            </p>
            <p>
              4. 본인확인서비스 제공을 위한 개인정보의
              취급위탁수탁자NICE평가정보(주),(주)다날,(주)드림시큐리티,SCI평가정보(주),NHN한국사이버결제(주),(주)KG모빌리언스,코리아크레딧뷰로(주),한국모바일인증(주)취급위탁
              업무본인확인정보의 정확성 여부 확인(본인확인서비스 제공),
              연계정보(CI)/중복가입확인정보(DI) 생성 및 전송, 서비스 관련 상담
              및 불만 처리, 휴대폰인증보호 서비스, 이용자의 서비스 이용 선호도
              분석정보 제공관련 시스템 구축 광고매체 연동 및 위탁영업 등
            </p>
            <p>
              ※수탁자의 상세 개인정보 취급 위탁 내용은 각 수탁자가 정하는 절차와
              방법에 따라 수탁자 홈페이지 등에 게시된 수탁자의 개인정보 취급방침
              및 제3자 제공 동의 방침 등에 따릅니다.
            </p>
          </VStack>
        </ModalBody>
        <ModalFooter py={7}>
          {visiblePrevBtn && (
            <Button onClick={onPrevHandler} width="30px">
              이전
            </Button>
          )}
          {visibleRejectBtn && (
            <Button onClick={onRejectHandler} width="30px">
              동의 거부
            </Button>
          )}
          <Button isDisabled={!isReading} onClick={onAgreeHandler}>
            동의
            {activeModalTerm.length > 1
              ? ` (${count + 1}/${activeModalTerm.length})`
              : ""}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default TermsModal;
