import { Heading, Tooltip, Flex } from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";

const TooltipCom = (props: { label: string }) => {
  return (
    <Tooltip
      alignItems={"center"}
      hasArrow
      label={props.label}
      placement="right"
      mx={2}
      p={"15px"}
      bg="Typo_Sub_3A"
      fontWeight={400}
      fontSize={12}
      borderRadius={3}
    >
      <InfoIcon color="Typo_Sub_B0" ml={1} mt={0} />
    </Tooltip>
  );
};

export default TooltipCom;
