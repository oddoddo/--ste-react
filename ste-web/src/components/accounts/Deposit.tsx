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
} from "@chakra-ui/react";
import TooltipCom from "components/tooltip/tooltip";
import ItemImage from "assets/images/items/item-logo.svg";
import { GrPowerReset } from "react-icons/gr";

function Deposit() {
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
      <VStack alignItems={"stretch"} spacing={"30px"}>
        {/* 입금 네트워크 */}
        <Box>
          <Flex alignItems={"center"}>
            <Text variant={"txt164"} mr={"5px"} color={"Typo_Secondary_666"}>
              입금 네트워크
            </Text>
            <TooltipCom label="가나다라마바사아자차" />
          </Flex>
          <Flex
            alignItems={"center"}
            gap={"15px"}
            w={"100%"}
            minH={"60px"}
            mt={"9px"}
            p={"20px 15px"}
            bg={"acc_bg"}
            borderRadius={"6px"}
          >
            <Text variant={"txt154"} color={"Typo_Sub_3A"}>
              Private ERC-20
            </Text>
            <Text
              as="span"
              variant={"txt137"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              h={"25px"}
              px={"15px"}
              bg={"HIGH"}
              borderRadius={"4px"}
              color={"white"}
            >
              입금불가 / 일시중단
            </Text>
          </Flex>
        </Box>

        {/* 입금 주소 생성하기 */}
        <Button variant="register62" onClick={handleCopyAddress}>
          입금 주소 생성하기
        </Button>

        {/* 입금 주소 */}
        <Box>
          <Flex alignItems={"center"}>
            <Text variant={"txt164"} mr={"5px"} color={"Typo_Secondary_666"}>
              입금주소
            </Text>
          </Flex>
          <Flex
            w={"100%"}
            h={"52px"}
            mt={"9px"}
            pl={"15px"}
            bg={"white"}
            border={"1px solid"}
            borderColor={"mocup_line"}
          >
            <Text
              variant={"txt155"}
              color={"black"}
              display={"flex"}
              alignItems={"center"}
              flexGrow={1}
              h={"100%"}
              borderRight={"1px solid"}
              borderColor={"mocup_line"}
            >
              0xlskng59ogufj3ckerxd5pr52fmeommej9jc6f5cvv
            </Text>
            <Button
              variant={"unStyled"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              w={"105px"}
              h={"100%"}
              bg={"check_bg"}
              borderLeft={"1px solid"}
              borderColor={"mocup_line"}
              borderRadius={"0"}
              _hover={{ bg: "searchWrap" }}
              color={"Typo_Secondary_666"}
              onClick={onOpen}
            >
              복사하기
            </Button>
          </Flex>
          <Text variant={"txt134"} mt={"15px"} color={"Dark_Red"}>
            * 최소 입금 수량은 1주 입니다. <br />* 입금 주소가 다르거나
            한국ST거래에서 지원하는 주소가 아닐 경우 입금이 되지 않습니다.{" "}
          </Text>
        </Box>

        {/* 입금안내 */}
        <Box>
          <Flex alignItems={"center"}>
            <Text variant={"txt164"} mr={"5px"} color={"Typo_Secondary_666"}>
              입금안내
            </Text>
          </Flex>
          <Box mt={"14px"} color={"Typo_Secondary_666"} lineHeight={"22px"}>
            <Text variant={"txt134"}>
              * 스마트팜1호 토큰은 네트워크 점검으로 인하여 입금 지원을 일시
              중단합니다.
            </Text>
            <Text variant={"txt134"}>
              * 안전한 송금 지원을 위한 조치로 많은 양해 부탁드립니다.
            </Text>
            <Text variant={"txt134"}>
              * 미래ST자산 2호 토큰은 현재 입금 서비스를 지원하지 않습니다.
            </Text>
          </Box>
        </Box>
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW={"460px"}>
          <ModalCloseButton />
          <ModalBody>
            <Heading variant={"hd225"}>
              에셋 ST1호 입금 주소가 복사되었습니다.
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

export default Deposit;
