import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
  Input,
  Heading,
  Text,
  Flex,
  Container,
  VStack,
  FormControl,
  Button,
  ButtonGroup,
  Stack,
  VisuallyHidden,
} from "@chakra-ui/react";
import { MinusIcon, AddIcon, SearchIcon } from "@chakra-ui/icons";
import { LuSearch } from "react-icons/lu";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

const itemsPerPage = 1;

const SupportService: React.FC = () => {
  const Faqs = [
    {
      cate: "회원가입",
      title: "인증서를 갱신하라고 나오는데 어떻게 해야하나요?",
      content:
        "당사에 등록 해 두신 지정 단말기가 있으며 추가인증 서비스에 가입되어 있지 않은 경우로, 이러할 경우 지정되어 있지 않은 단말기에서의 인증서 (재)발급은 불가합니다. 즉, 기존에 등록되어 있는 단말기 지정 내역을 해지 하셔야 미지정 단말기에서도 인증서(재)발급이 가능합니다. (※ 단말기 지정해지는 지정되어 있는 단말기가 파손/교체 등의 이유로 접근이 불가하고 공동인증서가 없어 로그인이 불가한 부득이한 경우에 한함) 당사 고객센터(1588-6611)에서 본인 확인 후 단말기 지정 내역 해지 후 인증서 (재)발급 진행하시기 바랍니다.",
    },
    {
      cate: "계좌개설",
      title: "PC교체 후 공동 인증서 발급이 불가능한가요?",
      content: "lorem ipsum dolor sit amet consectetur adipisicing elit 2",
    },
    {
      cate: "계좌개설",
      title: "미성년자의 경우도 계좌개설 가능한가요?",
      content: "How to start using Chakra UI?",
    },
    {
      cate: "계좌개설",
      title:
        "개명이나 주민번호를 변경한 경우 한국ST거래의 인증서를 계속 이용할 수 있나요?",
      content: "How to start using Chakra UI?",
    },
    {
      cate: "계좌개설",
      title:
        "개명이나 주민번호를 변경한 경우 한국ST거래의 인증서를 계속 이용할 수 있나요?",
      content: "How to start using Chakra UI?",
    },
    {
      cate: "계좌개설",
      title:
        "개명이나 주민번호를 변경한 경우 한국ST거래의 인증서를 계속 이용할 수 있나요?",
      content: "How to start using Chakra UI?",
    },
  ];

  // Accordion
  const [selectedAccordionIndex, setSelectedAccordionIndex] = useState<
    number | null
  >(null);

  const handleAccordionButtonClick = (index: number) => {
    if (index === selectedAccordionIndex) {
      setSelectedAccordionIndex(null);
    } else {
      setSelectedAccordionIndex(index);
    }
  };

  // Pagination
  const data = Array.from({ length: 5 }, (_, index) => `Item ${index + 1}`); // 총 데이터
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지

  // 현재 페이지의 데이터 계산
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <Box bg={"white"}>
      <VStack
        spacing={4}
        pos={"relative"}
        pt={{ base: "43px", lg: "83px" }}
        pb={{ base: "28px", lg: "52px" }}
        bg={"back_bg"}
        _before={{
          content: '""',
          pos: "absolute",
          left: "50%",
          top: "0",
          bottom: "0",
          transform: "translateX(-50%)",
          w: "1400px",
          bg: "back_bg",
        }}
      >
        <Heading
          as="h1"
          size="xl"
          pos={"relative"}
          color="regiTxt1"
          variant={{ base: "hd285", lg: "hd385" }}
          letterSpacing={"-1.8px"}
        >
          자주 묻는 질문
        </Heading>
        <Text textAlign={"center"} pos={"relative"}>
          <Box as="span" display={{ base: "block", lg: "inline" }}>
            한국ST거래를 이용 중 불편한 점이나 궁금한 내용을{" "}
          </Box>
          빠르고 친절하게 해결해 드립니다.
        </Text>
        <FormControl
          display={"flex"}
          overflow={"hidden"}
          pos={"relative"}
          alignItems={"center"}
          justifyContent={"space-between"}
          maxW={"600px"}
          w={{ base: "calc(100% - 50px)", lg: "50%" }}
          h={{ base: "48px", lg: "68px" }}
          mx={"auto"}
          my={{ base: "10px", lg: "24px" }}
          borderRadius={"48px"}
          bg={"white"}
          border={"1px solid"}
          borderColor={"searchBoard"}
        >
          <Input
            placeholder="찾으실 검색어를 입력하세요."
            title="검색"
            type="search"
            flexGrow={"1"}
            h={"100%"}
            px={"30px"}
            border={"none"}
            fontSize={"15px"}
            fontWeight={"700"}
          />
          <Button
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            p={0}
            pos={"absolute"}
            top={{ base: "0", lg: "8px" }}
            right={{ base: "0", lg: "17px" }}
            w={"48px"}
            h={"48px"}
            variant={"ghostSm"}
            fontSize={{ base: "20px", lg: "30px" }}
          >
            <LuSearch />
          </Button>
        </FormControl>
      </VStack>
      <Container bg={"white"} pos={"relative"}>
        <ButtonGroup
          display={"flex"}
          flexWrap={"wrap"}
          // justifyContent={"space-between"}
          gap={"15px 9px"}
          mt={"5px"}
          border={"none"}
        >
          <Button variant="btnLine" className="active">
            전체
          </Button>
          <Button variant="btnLine">회원가입</Button>
          <Button variant="btnLine">계좌개설</Button>
          <Button variant="btnLine">입출금</Button>
          <Button variant="btnLine">토큰증권 입고</Button>
          <Button variant="btnLine">토큰증권 출고</Button>
          <Button variant="btnLine">주문방법</Button>
          <Button variant="btnLine">거래시간</Button>
          <Button variant="btnLine">체결확인</Button>
          <Button variant="btnLine">배당</Button>
          <Button variant="btnLine">청산/결산</Button>
          <Button variant="btnLine">서비스 문의</Button>
          <Button variant="btnLine">이벤트</Button>
          <Button variant="btnLine">기타</Button>
        </ButtonGroup>

        <Box mt={{ base: "50px", lg: "65px" }}>
          <Text variant={"txt154"}>
            전체 : 총{" "}
            <Text as="span" color={"Dark_Red"} variant={"fontS"}>
              68
            </Text>{" "}
            건
          </Text>
          {currentData.map((item, index) => (
            <Accordion
              key={index}
              allowMultiple
              width="100%"
              mt={"6px"}
              borderTop={"1.5px solid"}
              borderColor={"Typo_Sub_3A"}
            >
              {Faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  borderColor={"Line_Gray_EE"}
                  pl={{ base: "0", lg: "10px" }}
                  pr={{ base: "0", lg: "17px" }}
                  py={{ base: "0", lg: "8px" }}
                >
                  {({ isExpanded }) => (
                    <>
                      <AccordionButton
                        py="4"
                        px={0}
                        color={isExpanded ? "primary" : "Typo_Sub_3A"}
                        _hover={{ color: "primary" }}
                        onClick={() => handleAccordionButtonClick(index)}
                      >
                        <Stack
                          alignItems="flex-start"
                          w="100%"
                          direction={["column", "row"]}
                        >
                          <Flex align="center">
                            <Text
                              variant={{ base: "txt224", lg: "txt284" }}
                              w="30px"
                              color="primary"
                              mr="5px"
                              textAlign="left"
                              lineHeight="1.3"
                              fontFamily={"'ABeeZee', sans-serif"}
                            >
                              Q
                            </Text>
                            <Text variant={{ base: "txt154", lg: "txt174" }}>
                              {faq.cate}
                            </Text>
                          </Flex>
                          <Text
                            variant={{ base: "txt185", lg: "txt184" }}
                            maxH="54px"
                            overflow="hidden"
                            ml={{ base: "34px", lg: "92px" }}
                            textAlign="left"
                            color={"black"}
                          >
                            {faq.title}
                          </Text>
                        </Stack>
                        {isExpanded ? (
                          <MinusIcon fontSize="15px" color="black" />
                        ) : (
                          <AddIcon fontSize="15px" color="black" />
                        )}
                      </AccordionButton>
                      <AccordionPanel px={0} py={{ base: 2, lg: 9 }}>
                        <Flex>
                          <Text
                            variant={{ base: "txt224", lg: "txt284" }}
                            w={"30px"}
                            color={"black"}
                            mr={"5px"}
                            textAlign={"left"}
                            lineHeight={"1.3"}
                            flexShrink={0}
                            fontFamily={"'ABeeZee', sans-serif"}
                          >
                            A
                          </Text>
                          <Text
                            variant={{ base: "txt164", lg: "txt174" }}
                            color={"Typo_Secondary_666"}
                            pl={{ base: "0", lg: "160px" }}
                          >
                            당사에 등록 해 두신 지정 단말기가 있으며 추가인증
                            서비스에 가입되어 있지 않은 경우로, <br /> 이러할
                            경우 지정되어 있지 않은 단말기에서의 인증서
                            (재)발급은 불가합니다. <br />
                            <br /> 즉, 기존에 등록되어 있는 단말기 지정 내역을
                            해지 하셔야 미지정 단말기에서도 인증서(재)발급이
                            가능합니다. <br />
                            <br /> (※ 단말기 지정해지는 지정되어 있는 단말기가
                            파손/교체 등의 이유로 접근이 불가하고 공동인증서가
                            없어 로그인이 불가한 부득이한 경우에 한함) 당사
                            고객센터(1588-6611)에서 본인 확인 후 단말기 지정
                            내역 해지 후 인증서 (재)발급 진행하시기 바랍니다.
                          </Text>
                        </Flex>
                      </AccordionPanel>
                    </>
                  )}
                </AccordionItem>
              ))}
            </Accordion>
          ))}

          <Flex justify="center" mt={"37px"}>
            <ButtonGroup isAttached>
              <Button
                isDisabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                variant={"ghostSm"}
                mr={"10px"}
              >
                <MdArrowBack fontSize={"25px"} />
                <VisuallyHidden>이전</VisuallyHidden>
              </Button>
              {Array.from({ length: totalPages }, (_, index) => (
                <Button
                  key={index}
                  variant={currentPage === index + 1 ? "pageNavOn" : "pageNav"}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </Button>
              ))}
              <Button
                isDisabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                variant={"ghostSm"}
                ml={"10px"}
              >
                <MdArrowForward fontSize={"25px"} />
                <VisuallyHidden>다음</VisuallyHidden>
              </Button>
            </ButtonGroup>
          </Flex>
        </Box>
      </Container>
    </Box>
  );
};

export default SupportService;
