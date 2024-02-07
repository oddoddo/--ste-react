import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { Box } from "@chakra-ui/react";

const StarFill = () => (
  <Box
    display={"inline-block !important"}
    verticalAlign={"middle"}
    m="-3px 5px 0 0"
  >
    <AiFillStar name="star" color="F9BF03" fontSize={"14px"} />
  </Box>
);
const StarGray = () => (
  <Box
    display={"inline-block !important"}
    verticalAlign={"middle"}
    m="-3px 5px 0 0"
  >
    <AiFillStar
      name="star"
      display={"inline-block !important"}
      color="e7e8eb"
      fontSize={"14px"}
    />
  </Box>
);

export { StarFill, StarGray };
