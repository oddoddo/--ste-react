import React, { useEffect, useState } from "react";
import { Box, Grid, SimpleGrid, Text, Flex } from "@chakra-ui/react";
import DashboardItem from "./DashboardItem";
import { SampleDataList } from "./DashboardData";
import { Item } from "./DashboardTypes";
import styled from "styled-components";

const DashboardList: React.FC = () => {
  const [dataList, setDataList] = useState<Item[]>(SampleDataList);
  const [time, setTime]: [number, Function] = useState(1);
  const [prev, setPrev] = useState<number[]>([]);

  useEffect(() => {
    const tick = setTimeout(() => {
      // Reflect previous results
      let tar: number[] = prev;
      while (tar.length > 0) {
        let r = tar[0];
        SampleDataList[r] = reflectPrev(SampleDataList[r]);
        tar.splice(0, 1);
      }
      // Change to random price
      let i = 0;
      while (i < 10) {
        const r = getRandom(0, 107);
        tar.push(r);
        SampleDataList[r] = changeData(SampleDataList[r]);
        i++;
      }

      setPrev(tar);
      setDataList(SampleDataList);
      setTime(time + 1);
    }, 3000);

    // eslint-disable-next-line consistent-return
    return () => clearTimeout(tick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time]);

  return (
    <React.Fragment>
      <Grid gap={0}>
        <DashboardHead>
          <Flex className="head-g">
            <Text variant={"txt125"} w={"25%"} color={"white"}>
              종목명
            </Text>
            <Text variant={"txt144"} w={"16%"} color={"white"}>
              발행사
            </Text>
            <Text variant={"txt145"} className="noti" w={"34px"}>
              알림
            </Text>
            <Text w={"14.5%"}>현재가</Text>
            <Text w={"14.5%"}>등락률</Text>
            <Text w={"15%"}>거래량</Text>
            <Text w={"8%"}>회원사</Text>
          </Flex>
          <Flex className="head-g">
            <Text variant={"txt125"} w={"25%"} color={"white"}>
              종목명
            </Text>
            <Text variant={"txt144"} w={"16%"} color={"white"}>
              발행사
            </Text>
            <Text variant={"txt145"} className="noti" w={"34px"}>
              알림
            </Text>
            <Text w={"14.5%"}>현재가</Text>
            <Text w={"14.5%"}>등락률</Text>
            <Text w={"15%"}>거래량</Text>
            <Text w={"8%"}>회원사</Text>
          </Flex>
          <Flex className="head-g">
            <Text variant={"txt125"} w={"25%"} color={"white"}>
              종목명
            </Text>
            <Text variant={"txt144"} w={"16%"} color={"white"}>
              발행사
            </Text>
            <Text variant={"txt145"} className="noti" w={"34px"}>
              알림
            </Text>
            <Text w={"14.5%"}>현재가</Text>
            <Text w={"14.5%"}>등락률</Text>
            <Text w={"15%"}>거래량</Text>
            <Text w={"8%"}>회원사</Text>
          </Flex>
        </DashboardHead>

        {dataList ? (
          <SimpleGrid columns={3} spacing={0}>
            {dataList.map((item: any) => (
              <DashboardItem key={item.index} value={item} />
            ))}
          </SimpleGrid>
        ) : (
          <Box mt={8}>
            <Text fontSize="lg">There is no data to display.</Text>
          </Box>
        )}
      </Grid>
    </React.Fragment>
  );
};
function reflectPrev(value: Item) {
  value.prev_price = value.price;
  value.prev_rate = value.rate;
  value.prev_volume = value.volume;
  return value;
}
function getRandom(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function changeData(value: Item) {
  value = reflectPrev(value);
  value.volume = value.volume + getRandom(1, 100);
  let prev_price: number = Math.floor(value.price / (value.rate / 100 + 1));
  // if (value.price < 10) {
  //   console.log(value);
  // }
  let c = changePrice(value.price, 0);
  value.price = value.price + c;
  value.rate =
    Math.round(((value.price - prev_price) / prev_price) * 100 * 100) / 100;
  // if (value.rate < -10 || value.rate > 10)
  //   console.log(
  //     prev_price,
  //     value.prev_rate,
  //     value.prev_price,
  //     "=>",
  //     c,
  //     value.price,
  //     value.rate
  //   );
  return value;
}
function changePrice(origin: number, count: number) {
  if (origin < 10) return 0;
  let max = Math.floor(origin * 0.05); // inside 5% of prev_price
  let c = Math.floor(Math.random() * (max * 2 + 1)) - max; // Random integer from -max to max
  if (origin > 5000) c = Math.floor(c / 10) * 10; // cut
  else if (origin > 200000) c = Math.floor(c / 100) * 100; // cut
  else if (origin > 500000) c = Math.floor(c / 1000) * 1000; // cut
  if (c === 0) {
    if (count < 10) c = changePrice(origin, count++);
    else c = 0;
  }
  return c;
}

const DashboardHead = styled(Box)`
  display: flex;
  height: 22px;
  line-height: 22px;
  padding: 0;
  .head-g {
    position: relative;
    flex: 1;
    box-sizing: border-box;
    /* border-right: 1px solid #5d5a7e; */
    background-color: ${({ theme: { colors } }) => colors.dashboardHeaderBg};
    color: ${({ theme: { colors } }) => colors.white};
    text-align: center;
    &::after {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      width: 1px;
      height: 100%;
      background-color: ${({ theme: { colors } }) => colors.Line_Gray_5d};
    }
    &:last-child::after {
      display: none;
    }
    > p {
      font-size: 12px;
      font-weight: 500;
    }
  }
`;

export default DashboardList;
