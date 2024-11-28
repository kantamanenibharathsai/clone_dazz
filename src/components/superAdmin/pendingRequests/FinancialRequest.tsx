import { Close, Done } from "@mui/icons-material";
import {
  Icon,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { colors } from "../../../config/theme";
import { getCampaignRequests } from "../../../redux/reducers/superAdmin/pendingRequests";
import { useAppDispatch, useAppSelector } from "../../../utils/useRedux";
import { showEntriesStats } from "../../../utils/utils";
import { commonStyles } from "../common/CommonStyles";
import { styles } from "./PendingStyles";
import { RegisterTitle } from "./types/Types";
const registerTitles: RegisterTitle[] = [
  {
    title: "Campaign Name",
    align: "left",
    minWidth: "200px",
  },
  {
    title: "Screens",
    align: "center",
    minWidth: "100px",
  },
  {
    title: "Role",
    align: "center",
    minWidth: "100px",
  },
  {
    title: "Price",
    align: "center",
    minWidth: "100px",
  },
  {
    title: "Date",
    align: "center",
    minWidth: "100px",
  },
  {
    title: "Payment Received",
    align: "center",
    minWidth: "100px",
    maxWidth: "100px",
  },
  {
    title: "Status",
    align: "center",
    minWidth: "100px",
  },
];
const getIcon = (value: boolean) =>
  value ? (
    <Icon>
      <Done sx={styles.greenColor} />
    </Icon>
  ) : (
    <Icon>
      <Close sx={styles.redColor} />
    </Icon>
  );
interface IProps {
  isSales: boolean;
}
const getColor = (status: string) => {
  switch (status) {
    case "accepted":
      return colors.blue;
    case "rejected":
      return colors.validate;
    case "pending":
      return colors.yellow;
    default:
      return colors.grey;
  }
};
const FinancialRequest = ({ isSales }: IProps) => {
  const updatedRegisterTitles = registerTitles.filter(
    (each) => each.title !== "Status"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const { data, pagination } = useAppSelector(
    (state) => state.PendingRequestsSlice
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (isSales) {
      dispatch(
        getCampaignRequests(
          `salesRequest=${true}&page=${currentPage}`
        )
      );
    } else {
      dispatch(
        getCampaignRequests(`financialRequest=${true}&page=${currentPage}`)
      );
    }
  }, [dispatch, currentPage, isSales]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };
  return (
    <Stack
      sx={styles.contentContainer}
      justifyContent={"space-evenly"}
      spacing={3}
    >
      <Typography sx={styles.requestText}>
        {isSales ? "Sales" : "Financial"} Requests
      </Typography>
      {data.length > 0 ? (
        <>
          <TableContainer sx={styles.tableContainer}>
            <Table>
              <TableHead>
                <TableRow>
                  {(isSales ? updatedRegisterTitles : registerTitles).map(
                    (each, index) => (
                      <TableCell
                        key={`register-title-${index}`}
                        align={each.align}
                        sx={{
                          minWidth: each.minWidth,
                          maxWidth: each.maxWidth ?? "auto",
                          textWrap: each.maxWidth
                            ? "wrap !important"
                            : "no-wrap",
                        }}
                      >
                        {each.title}
                      </TableCell>
                    )
                  )}
                </TableRow>
              </TableHead>
              <TableCell colSpan={registerTitles.length} sx={{ padding: 0 }}>
                <div
                  style={{
                    borderTop: "1px solid #ddd",
                  }}
                />
              </TableCell>
              <TableBody sx={styles.tableBody}>
                {data.map((each, index) => (
                  <TableRow key={"pending-request-row" + index}>
                    <TableCell sx={commonStyles.maxWidthForTableCell("250px")}>
                      <Tooltip title={each.campaignName}>
                        <Typography
                          fontSize={"inherit"}
                          fontWeight={"inherit"}
                          sx={commonStyles.ellipsisText("calc(100% - 10px)")}
                        >
                          {each.campaignName}
                        </Typography>
                      </Tooltip>
                    </TableCell>
                    <TableCell align="center">{each.screenCount}</TableCell>
                    <TableCell align="center">
                      <Typography textTransform={"capitalize"}>
                        {each.roleName}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">₹{each.totalAmount}</TableCell>
                    <TableCell align="center">
                      {moment(each.updatedAt).format("DD/MM/YYYY")}
                    </TableCell>
                    <TableCell align="center">
                      {getIcon(each.paymentReceived)}
                    </TableCell>
                    {!isSales && (
                      <TableCell align="center">
                        <Typography
                          fontWeight={"inherit"}
                          color={getColor(each.status)}
                          textTransform={"capitalize"}
                        >
                          {each.status}
                        </Typography>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {pagination.totalPages > 1 && (
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Typography sx={styles.dataStats}>
                {showEntriesStats(
                  pagination.totalItems,
                  pagination.currentPage,
                  pagination.pageSize
                )}
              </Typography>
              {pagination.totalPages > 1 && (
                <Pagination
                  count={pagination.totalPages}
                  shape="rounded"
                  page={currentPage}
                  variant="outlined"
                  onChange={handlePageChange}
                />
              )}
            </Stack>
          )}
        </>
      ) : (
        <Typography sx={styles.NoDataStyle}>No Data found</Typography>
      )}
    </Stack>
  );
};

export default FinancialRequest;
