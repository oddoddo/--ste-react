import React, { useMemo } from "react";
import { Box, Flex, Td, Tr } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { DefaultNum } from "../header/Num";
import { formatDate, getUpDownColor } from "../../../utils";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { SDT0001H_Output_List } from "../../../types/SDTTypes";

export type DayHistoryRowProps = {
  item: SDT0001H_Output_List;
};

const DailyRow: React.FC<DayHistoryRowProps> = ({
  item,
}: DayHistoryRowProps) => {
  const { t } = useTranslation();
  const upDownColor = useMemo(() => {
    return getUpDownColor(item.da_bdy_cmpr);
  }, [item]);

  return (
    <Tr>
      <Td color={"Typo_Secondary_666"} w="15%">
        {formatDate(item.da_bsnss_dt)}
      </Td>
      <Td isNumeric>
        <DefaultNum
          size="12px"
          title={t("format.number", {
            value: item.da_cls_prc,
          })}
          color={upDownColor}
        />
      </Td>
      <Td isNumeric w="20%" pl={3}>
        <Flex width="100%" justifyContent="space-between" alignItems="center">
          <Box>
            {upDownColor === "HIGH" && (
              <TriangleUpIcon color={upDownColor} fontSize="15px" />
            )}
            {upDownColor === "LOW" && (
              <TriangleDownIcon color={upDownColor} fontSize="15px" />
            )}
          </Box>
          <DefaultNum
            size="12px"
            title={t("format.number", {
              value: item.da_bdy_cmpr,
            })}
            color={upDownColor}
          />
        </Flex>
      </Td>
      <Td isNumeric w="15%">
        <DefaultNum
          size="12px"
          title={
            t("format.number", {
              value: item.da_bdy_cmpr_r,
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }) + "%"
          }
          color={upDownColor}
        />
      </Td>
      <Td isNumeric>
        <DefaultNum
          size="12px"
          title={t("format.number", {
            value: item.da_acml_vlm,
          })}
          color={"NORMAL"}
        />
      </Td>
    </Tr>
  );
};

export default React.memo(DailyRow);
