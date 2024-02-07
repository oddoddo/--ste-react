import React, { useCallback, useState } from "react";
import {
  Box,
  Checkbox,
  Collapse,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { ChevronRightIcon, ChevronUpIcon } from "@chakra-ui/icons";
import CheckSm from "../../../assets/images/common/check-sm.svg";
import TermsModal from "./TermsModal";
import { Term, useRegister } from "../RegisterProvider";

const TermsCheckboxes: React.FC = () => {
  const { terms, setTerms, isTermAllChecked } = useRegister();
  const [showTerms, setShowTerms] = useState(true);
  const [activeModalTerm, setActiveModalTerm] = useState<Term[]>([]);
  const modal = useDisclosure({
    onClose: () => {
      setActiveModalTerm([]);
      setTerms([...terms]);
    },
  });

  const handleAllCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const newCheckedState = e.target.checked;
    if (newCheckedState) {
      const ts = terms.filter((t) => !t.checked);
      setActiveModalTerm(ts);
      modal.onOpen();
    } else {
      setTerms([
        ...terms.map((t) => {
          t.checked = false;
          return t;
        }),
      ]);
    }
  };

  const handleTermCheck = useCallback(
    (termId: number) => {
      setTerms(
        terms.map((t) => {
          if (termId === t.id) t.checked = false;
          return t;
        })
      );
    },
    [terms, setTerms]
  );

  return (
    <VStack mt={"43px"} alignItems={"flex-start"}>
      <Box pos={"relative"} w={"100%"}>
        <Checkbox
          className="check-lg"
          size={"lg"}
          colorScheme="blue"
          display={"flex"}
          alignItems={"center"}
          isChecked={isTermAllChecked}
          onChange={handleAllCheck}
          sx={{
            ".chakra-checkbox__control": {
              width: "24px",
              height: "24px",
              mr: "8px",
              backgroundColor: "back_bg",
              borderColor: "gray9",
              borderWidth: "1px",
              borderRadius: "3px",
              transform: "translateY(1px)",
            },
            ".chakra-checkbox__control[data-checked]": {
              backgroundColor: "primary",
              borderColor: "primary",
            },
            ".chakra-checkbox__control[data-checked] svg": {
              transform: "scale(1.3)",
            },
          }}
        >
          <Text
            fontFamily="Noto Sans KR"
            fontWeight="400"
            fontSize="25px"
            color="black"
          >
            약관에 모두 동의
          </Text>
        </Checkbox>

        <Box
          pos={"absolute"}
          top={"7px"}
          right={"0"}
          className="icon-wrap"
          color={"Typo_Sub_B0"}
          transform={"scale(2)"}
        >
          {showTerms ? (
            <ChevronRightIcon onClick={() => setShowTerms(!showTerms)} />
          ) : (
            <ChevronUpIcon onClick={() => setShowTerms(!showTerms)} />
          )}
        </Box>
      </Box>

      <Collapse in={showTerms} animateOpacity style={{ width: "100%" }}>
        <VStack
          w={"100%"}
          pt={"27px"}
          borderTop={"1px solid"}
          borderColor={"inputLine2"}
          alignItems={"flex-start"}
          spacing={"7px"}
        >
          {terms.map((term) => (
            <Box
              className="check-sm"
              pos={"relative"}
              w={"100%"}
              mt={"1px"}
              key={term.id}
              style={{
                // height: term.height, // Apply dynamic height
                overflow: "hidden", // Hide overflow during transition
                transition: "height 0.5s ease-in-out", // Smooth transition for height
              }}
            >
              <Checkbox
                className="check-sm"
                isChecked={term.checked}
                onChange={(e) => {
                  e.stopPropagation();
                  if (term.checked) {
                    handleTermCheck(term.id);
                  } else {
                    setActiveModalTerm([term]);
                    modal.onOpen();
                  }
                }}
                sx={{
                  ".chakra-checkbox__control": {
                    width: "24px",
                    height: "24px",
                    backgroundColor: "back_bg",
                    backgroundImage: `url(${CheckSm})`,
                    backgroundSize: "18px",
                    borderColor: "back_bg",
                  },
                  ".chakra-checkbox__control[data-checked]": {
                    backgroundColor: "back_bg",
                    backgroundImage: `none`,
                    borderColor: "back_bg",
                  },
                  ".chakra-checkbox__control[data-checked] svg": {
                    color: "primary",
                    transform: "scale(1.3)",
                  },
                }}
              >
                <Text
                  fontSize={"19px"}
                  fontFamily={"Noto Sans KR"}
                  fontWeight={"400"}
                  color={"Typo_Secondary_666"}
                >
                  {term?.label}
                </Text>
              </Checkbox>
              <ChevronRightIcon
                pos={"absolute"}
                top={"-2px"}
                right={"-8px"}
                fontSize={"30px"}
                color={"Typo_Sub_B0"}
                cursor={"pointer"}
              />
            </Box>
          ))}
        </VStack>
      </Collapse>

      {/* 이 모달창만 디자인이 달라서 variant 안만들었습니다. */}
      {activeModalTerm?.length > 0 && (
        <TermsModal disclosure={modal} activeModalTerm={activeModalTerm} />
      )}
    </VStack>
  );
};

export default TermsCheckboxes;
