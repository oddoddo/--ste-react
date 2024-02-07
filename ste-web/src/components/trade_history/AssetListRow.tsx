import React, { useMemo } from "react";
import { Td, Tr } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { getUpDownColor } from "../../utils";
import { SDL11003_Output_List } from "../../types/SDLTypes";

export type ConclusionRowProps = {
  item: SDL11003_Output_List;
};

const AssetListRow: React.FC<ConclusionRowProps> = ({
  item,
}: ConclusionRowProps) => {
  const { t } = useTranslation();
  const { plColor, nowColor } = useMemo(() => {
    return {
      plColor: getUpDownColor(item.da_val_pl),
      nowColor:
        Number(item.da_now_prc) < Number(item.da_byng_avr_prc)
          ? "LOW"
          : Number(item.da_now_prc) > Number(item.da_byng_avr_prc)
          ? "HIGH"
          : "",
    };
  }, [item]);

  return (
    <Tr>
      <Td>{item.da_is_nm}</Td>
      <Td color={plColor}>{t("format.number", { value: item.da_val_pl })}</Td>
      <Td color={plColor}>
        {t("format.number", {
          value: item.da_val_yld,
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }) + " %"}
      </Td>
      <Td>{t("format.number", { value: item.da_byng_avr_prc })}</Td>
      <Td>{t("format.number", { value: item.da_blnc_q })}</Td>
      <Td color={nowColor}>{t("format.number", { value: item.da_now_prc })}</Td>
      <Td>{t("format.number", { value: item.da_byng_amt })}</Td>
      <Td>{t("format.number", { value: item.da_val_amt })}</Td>
    </Tr>
  );
};

export default React.memo(AssetListRow);
