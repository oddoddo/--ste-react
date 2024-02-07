import React from "react";
import { Box, HStack, Image, Text } from "@chakra-ui/react";
import PhraseTxt from "../../assets/images/login/phrase-txt.png";

const Phrase = () => {
  return (
    <Box
      display={{ base: "none", lg: "flex" }}
      flexDirection={"column"}
      alignItems={"center"}
      w={"50%"}
      pt={"145px"}
      background="#CFCFE0"
    >
      <HStack
        lineHeight="1.37"
        fontSize="35px"
        letterSpacing="-0.04em"
        color="Typo_Baic_W"
        textAlign="center"
      >
        <Image src={PhraseTxt} />
      </HStack>
      <Text
        lineHeight="1.65"
        fontWeight="400"
        fontSize="17px"
        textAlign="center"
        pt={"40px"}
        color={"#EFEEF6"}
      >
        한국ST거래는 신뢰와 전문성을 바탕으로 <br /> 투자자들에게 투명하고
        안전한 투자 환경을 제공합니다.
      </Text>
    </Box>
  );
};

export default Phrase;
