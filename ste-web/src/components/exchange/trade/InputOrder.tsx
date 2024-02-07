import React, { useMemo } from "react";
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  useNumberInput,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { stateStockPreviousDayPrice } from "../../../store/reducers/stockReducer";
import { getDownUnit } from "../../../hooks/useOrderBookUnit";

export enum OrderInputType {
  PRICE,
  VOLUME,
}
export type OrderInputProps = {
  inputType: OrderInputType;
  value: string;
  setValue: any;
  step?: number;
  isDisabled?: boolean;
};

const InputOrder: React.FC<OrderInputProps> = ({
  inputType = OrderInputType.PRICE,
  value,
  setValue,
  step = 1,
  isDisabled = false,
}) => {
  const { t } = useTranslation();
  const format = (val: string) => {
    return t("format.number", { value: val });
  };

  const stockPreviousDayPrice = useSelector(stateStockPreviousDayPrice);

  const { maxPrice, minPrice } = useMemo(() => {
    const up = stockPreviousDayPrice + 0.3 * stockPreviousDayPrice;
    const down = stockPreviousDayPrice - 0.3 * stockPreviousDayPrice;
    const max =
      inputType === OrderInputType.VOLUME
        ? Number.MAX_VALUE
        : Math.floor(up / step) * step;
    const min =
      inputType === OrderInputType.VOLUME ? 0 : Math.ceil(down / step) * step;
    return {
      maxPrice: max,
      minPrice: min,
    };
  }, [inputType, stockPreviousDayPrice, step]);

  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      value: format(value),
      step: step,
      defaultValue: 0,
      min: 0,
      max: maxPrice,
      precision: step,
      keepWithinRange: true,
      onChange: (valueAsString: string) => {
        if (
          inputType === OrderInputType.PRICE &&
          parseInt(value) > parseInt(valueAsString)
        ) {
          const dUnit = getDownUnit(value);
          if (dUnit) {
            setValue(dUnit);
          } else {
            setValue(valueAsString);
          }
        } else {
          setValue(valueAsString);
        }
      },
      clampValueOnBlur: false,
      onBlur: (a: any) => {
        if (inputType === OrderInputType.VOLUME) return;
        const v = parseInt(a.target.value.replace(/,/g, ""));
        if (minPrice > v) {
          setValue(minPrice.toString());
        } else if (maxPrice < v) {
          setValue(maxPrice.toString());
        } else {
          const i = Math.floor(v / step) * step;
          setValue(i.toString());
        }
      },
      isDisabled: isDisabled,
    });

  return (
    <InputGroup
      border={"solid 1px"}
      borderColor={"Line_Gray_BT_DD"}
      borderRadius={5}
      outline={"none"}
      style={isDisabled ? { opacity: 0.4 } : undefined}
    >
      <InputLeftElement pointerEvents="none" width="unset" pl={1}>
        <Text variant={"txt134"} whiteSpace={"nowrap"}>
          {inputType === OrderInputType.PRICE
            ? t("OrderSub.Price")
            : t("OrderSub.Quantity")}
        </Text>
      </InputLeftElement>
      <Input
        {...getInputProps()}
        border="none"
        textAlign="right"
        paddingLeft={39}
        paddingRight={100}
      />
      <InputRightElement width="100">
        <Text variant={"txt134"} whiteSpace={"nowrap"} width="4">
          {inputType === OrderInputType.PRICE ? t("WON") : t("JU")}
        </Text>
        <Button
          bg="white"
          border={"solid 1px"}
          borderLeftRadius={0}
          borderRightRadius={0}
          borderColor={"Line_Gray_BT_DD"}
          borderTop={"none"}
          borderBottom={"none"}
          fontSize={"20px"}
          _hover={{ bg: "#D2D2D2" }}
          _active={{ bg: "pink.300" }}
          padding={"0 0 0 0"}
          children="-"
          {...getDecrementButtonProps()}
          height={37}
        />
        <Button
          borderLeftRadius={0}
          borderRightRadius={5}
          bg="white"
          borderColor={"Line_Gray_BT_DD"}
          border={"none"}
          fontSize={"20px"}
          _hover={{ bg: "#D2D2D2" }}
          _active={{ bg: "green.300" }}
          children="+"
          padding={0}
          {...getIncrementButtonProps()}
          height={37}
        />
      </InputRightElement>
    </InputGroup>
  );
};

export default InputOrder;
