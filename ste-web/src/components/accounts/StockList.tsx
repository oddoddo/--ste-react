import React, { useState, useEffect } from "react";
import {
  Box,
  Input,
  Checkbox,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  FormControl,
  Button,
  Text,
  Image,
  Flex,
} from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { LuSearch } from "react-icons/lu";
import { VscDebugRestart } from "react-icons/vsc";
import ItemImage from "assets/images/items/item-logo.svg";

interface Stock {
  id: number;
  name: string;
  quantity: number;
  note: string;
}

function StockList() {
  const [searchText, setSearchText] = useState("");
  const [showOnlyAssets, setShowOnlyAssets] = useState(false);
  const [stocks, setStocks] = useState<Stock[]>([]);

  useEffect(() => {
    const dummyStocks: Stock[] = [
      { id: 1, name: "에셋 ST 1호", quantity: 100, note: "입금주소 생성" },
      { id: 2, name: "에셋 ST 2호", quantity: 50, note: "0xls…f5cv" },
      { id: 3, name: "미래 ST자산 2호", quantity: 75, note: "일시중단" },
      { id: 3, name: "미래 ST자산 2호", quantity: 75, note: "입출금 준비중" },
    ];
    setStocks(dummyStocks);
  }, []);

  const filterStocks = () => {
    if (!showOnlyAssets) {
      return stocks;
    }
    return stocks.filter((stock) => stock.quantity > 0);
  };

  const [isTriangleDown, setIsTriangleDown] = useState(true);

  const handleRefresh = () => {
    const updatedStocks: Stock[] = stocks.map((stock) => ({
      ...stock,
      quantity: Math.floor(Math.random() * 100),
    }));
    setStocks(updatedStocks);
    setIsTriangleDown(!isTriangleDown);
  };

  return (
    <Box className="acc_cont" width={"27%"} minW={"600px"}>
      <Box mb={4} display="flex" alignItems="center">
        <FormControl
          pos={"relative"}
          display={"flex"}
          alignItems={"center"}
          h={"52px"}
          border={"1px solid"}
          borderColor={"mocup_line"}
        >
          <Input
            placeholder="종목명 검색"
            value={searchText}
            border={"none"}
            onChange={(e) => setSearchText(e.target.value)}
            fontSize={"15px"}
            fontWeight={"500"}
            color={"Typo_929292"}
          />
          <Button
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            p={0}
            w={"48px"}
            h={"48px"}
            variant={"ghostSm"}
            fontSize={{ base: "20px", lg: "25px" }}
          >
            <LuSearch />
          </Button>
        </FormControl>
        <Checkbox
          isChecked={showOnlyAssets}
          onChange={() => setShowOnlyAssets(!showOnlyAssets)}
          flexShrink={0}
          w={"145px"}
          h={"52px"}
          pl={"14px"}
          ml="auto"
          border={"1px solid"}
          borderLeft={"none"}
          borderColor={"mocup_line"}
          bg={"check_bg"}
        >
          <Text variant={"txt155"} color={"Typo_Secondary_666"}>
            보유자산만
          </Text>
        </Checkbox>
      </Box>
      <Table variant="account">
        <colgroup>
          <col />
          <col style={{ width: "25%" }} />
          <col style={{ width: "25%" }} />
        </colgroup>
        <Thead>
          <Tr>
            <Th>종목명</Th>
            <Th>
              보유수량{" "}
              <IconButton
                icon={
                  isTriangleDown ? <TriangleDownIcon /> : <TriangleUpIcon />
                }
                aria-label="새로 고침"
                size="xs"
                onClick={handleRefresh}
                variant={"ghostSm"}
              />
            </Th>
            <Th textAlign={"right"}>
              <Button variant={"ghostSm"}>
                <VscDebugRestart />
              </Button>
            </Th>{" "}
          </Tr>
        </Thead>
        <Tbody>
          {filterStocks().map((stock, index) => (
            <Tr key={index}>
              <Td>
                <Flex alignItems={"center"}>
                  <Image
                    src={ItemImage}
                    alt={ItemImage}
                    w={"24px"}
                    h={"24px"}
                    mr={"10px"}
                  />{" "}
                  {stock.name}
                </Flex>
              </Td>
              <Td isNumeric>{stock.quantity} 주</Td>
              <Td color="black">{stock.note}</Td>
              {/* Green, black, Line_Gray_BT_DD,  HIGH */}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

export default StockList;
