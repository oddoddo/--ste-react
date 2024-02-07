import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormLabel,
  Input,
  VStack,
  SlideFade,
} from "@chakra-ui/react";

function SignUpForm() {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const isStepVisible = (step: number) => {
    return currentStep >= step;
  };

  return (
    <Container centerContent p={4}>
      <VStack spacing={4} align="stretch">
        <SlideFade offsetY="-20px" in={isStepVisible(1)}>
          <FormControl
            id="username"
            display={isStepVisible(1) ? "block" : "none"}
          >
            <FormLabel>아이디</FormLabel>
            <Input type="text" />
          </FormControl>
        </SlideFade>

        <SlideFade offsetY="-20px" in={isStepVisible(2)}>
          <Box display={isStepVisible(2) ? "block" : "none"}>
            <FormControl id="password">
              <FormLabel>비밀번호</FormLabel>
              <Input type="password" />
            </FormControl>
            <FormControl id="confirm-password">
              <FormLabel>비밀번호 확인</FormLabel>
              <Input type="password" />
            </FormControl>
          </Box>
        </SlideFade>

        <SlideFade offsetY="-20px" in={isStepVisible(3)}>
          <FormControl id="terms" display={isStepVisible(3) ? "block" : "none"}>
            <Checkbox>약관 동의</Checkbox>
          </FormControl>
        </SlideFade>

        <Box>
          {currentStep < 3 && (
            <Button colorScheme="teal" onClick={nextStep}>
              다음
            </Button>
          )}
          {currentStep === 3 && <Button colorScheme="green">가입 완료</Button>}
        </Box>
      </VStack>
    </Container>
  );
}

export default SignUpForm;
