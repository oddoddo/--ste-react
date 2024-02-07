import styled from "styled-components";

export interface OrderBookItemProps {
  item: OrderBookItemValue;
}

export interface OrderBookItemValue {
  value1: number;
  value2: string;
}

const OrderNum: React.FC<OrderBookItemProps> = ({
  item,
}: OrderBookItemProps) => {
  return <ItemNum>{item.value1}</ItemNum>;
};

const ItemNum = styled.div`
  position: relative;
  text-align: right;
  font-size: 15px;
  font-weight: 400;
  line-height: 15px;
`;

export default OrderNum;
