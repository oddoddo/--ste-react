import styled from "styled-components";
import { Box, Text } from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";

export const NumberText = ({
  pre_val = 0,
  val = 0,
  size,
  color = "#FFFFFF",
  percent = false,
  alt = "",
  fontWeight = undefined,
}: {
  pre_val?: number;
  val: number | string;
  size: string;
  color?: string;
  percent?: boolean;
  alt?: string;
  fontWeight?: number | undefined;
}) => {
  const { t } = useTranslation();
  const { numberValue, formatValue } = useMemo(() => {
    const formatValue = percent
      ? t("format.number", {
          value: val,
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }) + "%"
      : t("format.number", { value: val });

    return {
      numberValue: Number(val),
      formatValue,
    };
  }, [val, percent, t]);

  return (
    <>
      {pre_val === numberValue && (
        <DefaultNumWrapper
          fontSize={size}
          color={color}
          title={alt}
          fontWeight={fontWeight}
        >
          {formatValue}
        </DefaultNumWrapper>
      )}
      {pre_val < numberValue && (
        <UpNumWrapper fontSize={size} title={alt} fontWeight={fontWeight}>
          {formatValue}
        </UpNumWrapper>
      )}
      {pre_val > numberValue && (
        <DownNumWrapper fontSize={size} title={alt} fontWeight={fontWeight}>
          {formatValue}
        </DownNumWrapper>
      )}
    </>
  );
};
const UpNum = (props: { title: string; size: string; alt?: string }) => {
  return (
    <UpNumWrapper fontSize={props.size} title={props.alt}>
      {props.title}
    </UpNumWrapper>
  );
};

const DownNum = (props: { title: string; size: string; alt?: string }) => {
  return (
    <DownNumWrapper fontSize={props.size} title={props.alt}>
      {props.title}
    </DownNumWrapper>
  );
};

const DefaultNum = (props: {
  title: string;
  size: string;
  color: string;
  alt?: string;
}) => {
  return (
    <DefaultNumWrapper
      fontSize={props.size}
      color={props.color}
      title={props.alt}
    >
      {props.title}
    </DefaultNumWrapper>
  );
};

const SubscriptNum = (props: { title: string; size: string }) => {
  return (
    <SubscriptNumWrapper fontSize={props.size}>
      {props.title}
    </SubscriptNumWrapper>
  );
};

export const DirectionIcon = ({ val }: { val: string }) => {
  // da_bdy_cmpr_smbl Codes
  // 상한: '1'
  // 상승: '2'
  // 보합: '3'
  // 하한: '4'
  // 하락: '5'
  return (
    <Box width={"17px"}>
      {(val === "1" || val === "2") && <UpIcon />}
      {(val === "4" || val === "5") && <DownIcon />}
    </Box>
  );
};

const UpIcon = () => {
  return <TriangleUpIcon color="HIGH" fontSize="17px" />;
};

const DownIcon = () => {
  return <TriangleDownIcon color="LOW" fontSize="17px" />;
};

const Numtitle = (props: { title: string }) => {
  return <NumtitleWrapper>{props.title}</NumtitleWrapper>;
};

export type FontProps = {
  fontWeight?: number;
};

const NumtitleWrapper = styled(Text)<FontProps>`
  color: ${({ theme: { colors } }) => colors.Typo_Sub_B0};
  margin-right: 5px;
  font-size: 13px;
  font-weight: ${(props) => (props?.fontWeight ? props?.fontWeight : 400)};
`;

const DownNumWrapper = styled(Text)<FontProps>`
  color: ${({ theme: { colors } }) => colors.LOW};
  font-weight: ${(props) => (props?.fontWeight ? props?.fontWeight : 400)};
`;

const UpNumWrapper = styled(Text)<FontProps>`
  color: ${({ theme: { colors } }) => colors.HIGH};
  font-weight: ${(props) => (props?.fontWeight ? props?.fontWeight : 400)};
`;

const DefaultNumWrapper = styled(Text)<FontProps>`
  font-weight: ${(props) => (props?.fontWeight ? props?.fontWeight : 400)};
`;
const SubscriptNumWrapper = styled(Text)<FontProps>`
  color: ${({ theme: { colors } }) => colors.Typo_Sub_B0};
  margin-left: 3px;
  font-weight: ${(props) => (props?.fontWeight ? props?.fontWeight : 400)};
`;

export { UpNum, DownNum, DefaultNum, UpIcon, DownIcon, Numtitle, SubscriptNum };
