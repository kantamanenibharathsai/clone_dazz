import { useEffect, useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Pagination,
  PaginationItem,
  Popover,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { CalendarIcon } from "../../host/assets";
import { CustomButton } from "../../common/customButton/CustomButton";
import { colors } from "../../../config/theme";
import { logsStyles } from "../payments/PaymentsStyles";
import {
  formateDate,
  formateDateWithTime,
  formateDateWithTimeToGetData,
} from "../../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import {
  getVendorQrCodes,
  LoadingStatus,
} from "../../../redux/reducers/vendorsReducer/vendors";
import { displayAlert } from "../../../utils/toastMessage";
interface IState {
  searchInput: string;
  anchorEl: HTMLButtonElement | null;
  date: Date | null;
}
const tableHeadings = [
  "Discount_ID",
  "Discount_Type",
  "Discount_Amount",
  "Scanned_Date",
];
const today = dayjs();
const MyQrcodes = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [fromAnchorEl, setFromAnchorEl] =
    React.useState<IState["anchorEl"]>(null);
  const [toAnchorEl, setToAnchorEl] = React.useState<IState["anchorEl"]>(null);
  const [fromDate, setFromDate] = useState<IState["date"]>(null);
  const [toDate, setToDate] = useState<IState["date"]>(null);
  const { qrCodesData, pagination, loadingStatus } = useSelector(
    (state: RootState) => state.vendor
  );
  const dispatch = useDispatch<AppDispatch>();
  const fromOpen = Boolean(fromAnchorEl);
  const fromId = fromOpen ? "simple-popover" : undefined;
  const toOpen = Boolean(toAnchorEl);
  const toId = toOpen ? "simple-popover" : undefined;
  const handleOpenFrom = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFromAnchorEl(event.currentTarget);
  };
  const handleOpenTo = (event: React.MouseEvent<HTMLButtonElement>) => {
    setToAnchorEl(event.currentTarget);
  };
  const handleClosePopover = () => {
    setFromAnchorEl(null);
    setToAnchorEl(null);
  };
  const handleResetDate = (dateType: string) => {
    if (dateType === "from") {
      setFromDate(null);
    } else {
      setToDate(null);
    }
    handleClosePopover();
  };
  const handleFromDate = (event: Date) => {
    setFromDate(new Date(event));
    handleClosePopover();
  };
  const handleToDate = (event: Date) => {
    setToDate(new Date(event));
    handleClosePopover();
  };
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };
  useEffect(() => {
    if (fromDate && toDate && fromDate?.getTime() > toDate?.getTime()) {
      displayAlert("From date must be less than to date", "error");
    } else if (fromDate && toDate) {
      dispatch(
        getVendorQrCodes(
          `page=${currentPage}&startDate=${formateDateWithTimeToGetData(
            fromDate
          )}&endDate=${formateDateWithTimeToGetData(toDate)}`
        )
      );
    } else if (fromDate) {
      dispatch(
        getVendorQrCodes(
          `page=${currentPage}&startDate=${formateDateWithTimeToGetData(
            fromDate
          )}`
        )
      );
    } else if (toDate) {
      dispatch(
        getVendorQrCodes(
          `page=${currentPage}&endDate=${formateDateWithTimeToGetData(toDate)}`
        )
      );
    } else {
      dispatch(getVendorQrCodes(`page=${currentPage}`));
    }
  }, [currentPage, dispatch, fromDate, toDate]);
  const dataStatusJSX = (status: LoadingStatus) => {
    if (qrCodesData && qrCodesData.length === 0)
      return <Typography>Data Not Found !!</Typography>;
    switch (status) {
      case "PENDING":
        return <CircularProgress />;
      case "REJECTED":
        return <Typography>Something went wrong!!</Typography>;
      default: {
        return false;
      }
    }
  };
  return (
    <Box sx={logsStyles.tableContainer}>
      <Box sx={logsStyles.flexWrapMainBox}>
        <Typography sx={logsStyles.tableHeading}>My QR Codes</Typography>
        <Box sx={logsStyles.flexWrapMainBox}>
          <Box sx={logsStyles.datesMainBox}>
            <Box sx={logsStyles.dateBox}>
              <Typography sx={logsStyles.menuItem}>From : </Typography>
              <Typography sx={logsStyles.dateText(Boolean(fromDate))}>
                {fromDate ? formateDate(fromDate) : "Date"}
              </Typography>
              <IconButton aria-describedby={fromId} onClick={handleOpenFrom}>
                <CalendarIcon />
              </IconButton>
              <Popover
                id={fromId}
                open={fromOpen}
                anchorEl={fromAnchorEl}
                onClose={handleClosePopover}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateCalendar
                    value={dayjs(fromDate ?? today)}
                    disableFuture
                    onChange={handleFromDate}
                  />
                  <Box sx={logsStyles.dateButtonsBox}>
                    <Button onClick={handleClosePopover}>Close</Button>
                    <Button onClick={() => handleResetDate("from")}>
                      Reset
                    </Button>
                  </Box>
                </LocalizationProvider>
              </Popover>
            </Box>
            <Box sx={logsStyles.dateBox}>
              <Typography sx={logsStyles.menuItem}>To : </Typography>
              <Typography sx={logsStyles.dateText(Boolean(toDate))}>
                {toDate ? formateDate(toDate) : "Date"}
              </Typography>{" "}
              <IconButton aria-describedby={fromId} onClick={handleOpenTo}>
                <CalendarIcon />
              </IconButton>
              <Popover
                id={toId}
                open={toOpen}
                anchorEl={toAnchorEl}
                onClose={handleClosePopover}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateCalendar
                    value={dayjs(toDate ?? today)}
                    disableFuture
                    onChange={handleToDate}
                  />
                  <Box sx={logsStyles.dateButtonsBox}>
                    <Button onClick={handleClosePopover}>Close</Button>
                    <Button onClick={() => handleResetDate("to")}>Reset</Button>
                  </Box>
                </LocalizationProvider>
              </Popover>
            </Box>
            <CustomButton
              textColor={colors.black}
              width={120}
              borderradius={15}
              bgcolor={colors.textFieldBg}
            >
              Export
            </CustomButton>
          </Box>
        </Box>
      </Box>
      <Box sx={logsStyles.tableBox}>
        <TableContainer aria-label="customized table">
          <Table sx={logsStyles.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                {tableHeadings.map((heading, index) => (
                  <TableCell
                    align="left"
                    key={heading}
                    sx={logsStyles.cellHeading}
                  >
                    {heading}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {dataStatusJSX(loadingStatus) && (
                <TableRow>
                  <TableCell colSpan={4}>
                    <Box sx={logsStyles.loadingBox}>
                      {dataStatusJSX(loadingStatus)}
                    </Box>
                  </TableCell>
                </TableRow>
              )}
              {loadingStatus === "FULFILLED" &&
                qrCodesData &&
                qrCodesData.length > 0 &&
                qrCodesData.map((qrCode) => (
                  <TableRow key={qrCode.id}>
                    <TableCell align="left">
                      <Typography
                        title={qrCode.id.toString()}
                        sx={logsStyles.upperCaseTableText}
                      >
                        {qrCode.id}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography
                        title={qrCode.discountType}
                        sx={logsStyles.capitalizeTableText}
                      >
                        {qrCode.discountType}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography
                        title={qrCode.discountValue.toString()}
                        sx={logsStyles.capitalizeTableText}
                      >
                        ₹ {qrCode.discountValue}
                      </Typography>
                    </TableCell>
                    <TableCell align="left" sx={logsStyles.upperCaseTableText}>
                      <Typography
                        title={qrCode.createdAt}
                        sx={logsStyles.upperCaseTableText}
                      >
                        {formateDateWithTime(qrCode.createdAt)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      {loadingStatus === "FULFILLED" && pagination.totalPages > 1 && (
        <Box sx={logsStyles.paginationBox}>
          <Pagination
            count={pagination.totalPages}
            onChange={handlePageChange}
            page={currentPage}
            sx={logsStyles.paginationActiveColor}
            siblingCount={0}
            renderItem={(item) => (
              <PaginationItem
                slots={{
                  previous: ChevronLeftIcon,
                  next: ChevronRightIcon,
                }}
                {...item}
              />
            )}
          />
        </Box>
      )}
    </Box>
  );
};

export default MyQrcodes;
