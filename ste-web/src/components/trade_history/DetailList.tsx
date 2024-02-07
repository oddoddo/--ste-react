import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Box,
  ResponsiveValue,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { SDL11006_Output_List, SDL11010_Output } from "../../types/SDLTypes";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducers";
import TransactionDetailModal from "../modals/TransactionDetailModal";
import { useAppDispatch } from "../../store/configureStore";
import fetch_SDL11010 from "../../store/apis/sdl/SDL11010";
import DetailListRow from "./DetailListRow";

const DetailList: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const transactionDetailList = useSelector(
    (state: RootState) => state.stock.transactionDetailList
  );
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tableRef?.current) {
      tableRef.current.scrollTo({
        top: tableRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [transactionDetailList, tableRef]);

  const [sortOrder, setSortOrder] = useState({
    column: null,
    order: "asc", // or "desc" for descending
  });

  const headTable = useMemo(() => {
    return [
      {
        title: t("HistorySub.ConclusionTime"),
        width: "13%",
        tAlign: "center",
      },
      {
        title: t("HistorySub.Name"),
        tAlign: "center",
      },
      {
        title: t("HistorySub.Type"),
        width: "6%",
        tAlign: "center",
      },
      {
        title: t("HistorySub.Quantity"),
        width: "5%",
        tAlign: "center",
      },
      {
        title: t("HistorySub.SettledPrice"),
        width: "8%",
        tAlign: "center",
      },
      {
        title: t("HistorySub.TradingPrice"),
        width: "12%",
        tAlign: "center",
      },
      {
        title: t("HistorySub.Fees"),
        width: "6%",
        tAlign: "center",
      },
      {
        title: t("HistorySub.Settlement"),
        width: "12%",
        tAlign: "center",
      },
      {
        title: t("HistorySub.OrderTime"),
        width: "13%",
        tAlign: "center",
      },
      {
        title: t("HistorySub.TxID"),
        width: "10%",
        tAlign: "center",
      },
    ];
  }, [t]);

  const transactionDetailModal = useDisclosure();
  const [tr_id, setTrId] = useState<string | undefined>();
  const [transactionInfo, setTransactionItem] =
    useState<SDL11010_Output | null>(null);

  const getTransactionInfo = useCallback(
    (item: string) => {
      dispatch(
        fetch_SDL11010({
          txid: item,
        })
      )
        .unwrap()
        .then((res: SDL11010_Output) => {
          setTransactionItem(res);
          transactionDetailModal.onOpen();
        })
        .catch((e) => {});
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch]
  );

  useEffect(() => {
    if (!tr_id) return;
    getTransactionInfo(tr_id);
  }, [getTransactionInfo, tr_id]);

  const transactionViewHandler = useCallback((item: SDL11006_Output_List) => {
    setTrId(item.da_srvc_rqs_tr_id);
  }, []);

  return (
    <React.Fragment>
      <TransactionDetailModal
        txHash={tr_id}
        disclosure={transactionDetailModal}
        data={transactionInfo}
      />
      <TableContainer className="scrollbar" maxH={"618px"} ref={tableRef}>
        <Table variant="stripedlist" colorScheme="teal">
          <TableCaption>History</TableCaption>
          <Thead position="sticky" top={0} zIndex="docked">
            <Tr>
              {headTable.map(({ width, title, tAlign }, index) => (
                <Th
                  key={index}
                  width={width}
                  textAlign={
                    tAlign as ResponsiveValue<"left" | "center" | "right">
                  }
                >
                  {title}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {transactionDetailList?.length > 0 ? (
              transactionDetailList.map((item, key) => (
                <DetailListRow
                  item={item}
                  key={key}
                  onView={() => transactionViewHandler(item)}
                />
              ))
            ) : (
              <Tr>
                <Td colSpan={10}>
                  <Box
                    minHeight={200}
                    width={"100%"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    display={"flex"}
                    color={"Typo_Secondary_666"}
                  >
                    {t("HistorySub.NoHistory")}
                  </Box>
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
};

export default DetailList;
