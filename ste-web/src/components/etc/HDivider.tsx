import React from "react";
import styled from "styled-components";

const HDivider: React.FC = () => {
  return <Divider>|</Divider>;
};
export default HDivider;
const Divider = styled.span`
  color: ${(props) => props.theme.colors.Line_Gray_BT_DD};
  padding: 0 5px;
`;
