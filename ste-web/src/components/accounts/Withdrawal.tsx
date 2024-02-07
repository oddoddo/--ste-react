import React from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  Tooltip,
  VStack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import TooltipCom from "components/tooltip/tooltip";
import ItemImage from "assets/images/items/item-logo.svg";
import { GrPowerReset } from "react-icons/gr";
import { IoCloseCircle } from "react-icons/io5";

function Withdrawal() {
  const handleRefresh = () => {
    // 새로고침 버튼 클릭 시 수행할 동작을 구현하세요.
  };

  const handleCopyAddress = () => {};
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box className="acc_cont" flexGrow={1}>
      <Flex
        pos={"relative"}
        justifyContent={"space-between"}
        alignItems={"center"}
        mb={4}
        pb={"20px"}
        _after={{
          position: "absolute",
          content: "''",
          bottom: "-1px",
          left: "-30px",
          right: "-30px",
          height: "1px",
          bg: "Line_Gray_e9",
        }}
      >
        <Flex alignItems={"center"}>
          <Image
            src={ItemImage}
            alt={ItemImage}
            w={"30px"}
            h={"30px"}
            mr={"10px"}
          />
          <Heading variant={"hd205"}>
            에셋 ST 1호{" "}
            <Text
              as="span"
              variant={"txt155"}
              color="Typo_Secondary_666"
              fontFamily={"Spoqa Han Sans Neo"}
            >
              (A145766)
            </Text>
          </Heading>
        </Flex>
        <Button
          variant={"ghostSm"}
          onClick={handleRefresh}
          transform={"scale(1.3) scaleX(-1)"}
          color={"Typo_Sub_B0"}
        >
          <GrPowerReset />
        </Button>
      </Flex>
      <VStack alignItems={"stretch"} spacing={"10px"}>
        {/* 출금가능 수량 */}
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Text variant={"txt164"} mr={"5px"} color={"Typo_Secondary_666"}>
            출금가능 수량
          </Text>
          <Text
            variant={"txt165"}
            color={"black"}
            fontFamily={"Spoqa Han Sans Neo"}
          >
            100주
          </Text>
        </Flex>

        {/* 출금 수량 */}
        <Box>
          <Text variant={"txt134"} color={"Typo_Secondary_666"} mb={"4px"}>
            출금 수량
          </Text>

          <FormControl display={"flex"} flexDir={"column"}>
            <InputGroup display={"flex"} alignItems={"center"}>
              <Input
                variant={"outline2"}
                h={"52px"}
                placeholder="출금할 수량을 입력해주세요"
              />
              <InputRightElement
                color="Line_Gray_BT_DD"
                transform="scale(1.7) translate(-3px, 4px)"
              >
                <IoCloseCircle />
              </InputRightElement>
            </InputGroup>
            <Button variant={"outline2"} mt={"5px"} ml={"auto"}>
              최대
            </Button>
          </FormControl>
        </Box>

        {/* 받는 지값주소 */}
        <Box>
          <Text variant={"txt134"} color={"Typo_Secondary_666"} mb={"4px"}>
            받는 지값주소
          </Text>

          <FormControl display={"flex"} flexDir={"column"}>
            <InputGroup display={"flex"} alignItems={"center"}>
              <Input
                variant={"outline2"}
                h={"52px"}
                value={"0xskng59ogufj3ckerxd5pr52fmeommej9jc6f5cvv"}
              />
              <InputRightElement
                color="Line_Gray_BT_DD"
                transform="scale(1.7) translate(-3px, 4px)"
              >
                <IoCloseCircle />
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </Box>

        {/* 본인인증 */}
        <Box pt={"10px"}>
          <Text variant={"txt134"} color={"Typo_Secondary_666"} mb={"4px"}>
            본인인증
          </Text>
          <Button variant="register62" onClick={handleCopyAddress}>
            본인인증 확인
          </Button>
        </Box>

        {/* 출금안내 */}
        <Box
          mt={"14px"}
          color={"Typo_Secondary_666"}
          lineHeight={"22px"}
          pl={"8px"}
          textIndent={"-8px"}
        >
          <Text variant={"txt134"}>
            * 타인의 지시나 요청 등에 의해 본인 명의의 한국ST거래 계정을
            타인에게 대여시 <br /> 법적 처벌 대상이 될 수 있습니다.
          </Text>
          <Text variant={"txt134"}>
            * 출금 시, 반드시 해당 거래소 혹은 개인 지갑의 주소와 해당
            네트워크로의 입금을 지원하는지 <br /> 확인 후 출금하시기 바랍니다.
          </Text>
          <Text variant={"txt134"}>
            * 컨트랙트 출금인 경우 출금이 지연이 발생할 수 있습니다.
          </Text>
          <Text variant={"txt134"}>
            * 네트워크 환경에 따라 출금 시간이 다르니 출금 신청 후 출금상태를
            확인해주시기 바랍니다.
          </Text>
        </Box>

        {/* 출금수수료 */}
        <Flex
          justifyContent={"space-between"}
          mt={"6px"}
          pt={"12px"}
          borderTop={"1px solid"}
          borderColor={"Line_Gray_e9"}
        >
          <Text variant={"txt154"} color={"Typo_Secondary_666"} mb={"4px"}>
            출금수수료(부가세 포함)
          </Text>
          <Text
            variant={"txt165"}
            color={"black"}
            fontFamily={"Spoqa Han Sans Neo"}
          >
            1,000 원
          </Text>
        </Flex>

        <Button variant="register62" onClick={handleCopyAddress}>
          출금 신청
        </Button>
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW={"460px"}>
          <ModalCloseButton />
          <ModalBody>
            <Heading variant={"hd225"}>
              에셋 ST1호 출금 주소가 복사되었습니다.
            </Heading>
            <Text variant={"txt154"} color={"HIGH"} mt={"15px"}>
              *복사된 주소를 붙여넣기 한 후, 현재 주소와 동일한지 <br /> 한 번
              더 꼭 확인해 주세요.
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>확인</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default Withdrawal;
