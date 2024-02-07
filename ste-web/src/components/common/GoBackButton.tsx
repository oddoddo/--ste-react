import React from "react";
import { IconButton } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/icons";
import { SlArrowLeft } from "react-icons/sl";

const GoBackButton: React.FC<{ onPrevScreen: () => void }> = ({
  onPrevScreen,
}) => {
  return (
    <IconButton
      aria-label="Back Button"
      onClick={() => onPrevScreen()}
      display={{ base: "block", lg: "none" }}
      w={"30px"}
      h={"30px"}
      bg={"transparent"}
      position={"absolute"}
      top={"-32px"}
      left={"17px"}
      icon={
        <Icon boxSize={9}>
          <SlArrowLeft />
        </Icon>
      }
    />
  );
};

export default GoBackButton;
