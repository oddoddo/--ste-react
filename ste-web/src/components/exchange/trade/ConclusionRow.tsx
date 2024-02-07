import React, { useMemo } from "react";
import { Image, Td, Tr } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { DefaultNum, NumberText } from "../header/Num";
import {
  formatTime,
  getMemberIcon,
  getTradeColor,
  getUpDownColor,
} from "../../../utils";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/reducers";
import { ConclusionItem } from "../../../types";

export type ConclusionRowProps = {
  item: ConclusionItem;
};

const ConclusionRow: React.FC<ConclusionRowProps> = ({
  item,
}: ConclusionRowProps) => {
  const { t } = useTranslation();
  const da_bdy_cls_prc = useSelector(
    (state: RootState) => state.stock.stock?.da_bdy_cls_prc
  );

  const { icon1, icon2 } = useMemo(() => {
    return {
      icon1: getMemberIcon(),
      icon2: getMemberIcon(),
    };
  }, []);

  return (
    <Tr>
      <Td w="15%">{formatTime(item.time)}</Td>
      <Td isNumeric>
        <NumberText
          size="12px"
          pre_val={Number(da_bdy_cls_prc)}
          val={item.price}
          color={"Typo_Secondary_666"}
        />
      </Td>
      <Td isNumeric w="15%">
        <DefaultNum
          size="12px"
          title={
            t("format.number", {
              value: item.rate,
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }) + "%"
          }
          color={getUpDownColor(item.rate)}
        />
      </Td>
      <Td isNumeric color={getTradeColor(item.da_ccls_ccd)}>
        {t("format.number", { value: item.volume })}
      </Td>
      <Td className="img">
        <Image src={icon1} h={15} />
      </Td>
      <Td className="img">
        <Image src={icon2} h={15} />
      </Td>
    </Tr>
  );
};

export default React.memo(ConclusionRow);
