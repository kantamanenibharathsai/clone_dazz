import { useEffect, useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  MenuItem,
  Pagination,
  PaginationItem,
  Popover,
  Select,
  SelectChangeEvent,
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
import { logsStyles } from "../payments/PaymentsStyles";
import { formatDataYtoD, formateDate } from "../../../utils/utils";
import {
  getVendorPayments,
  LoadingStatus,
} from "../../../redux/reducers/vendorsReducer/vendors";
import { useAppDispatch, useAppSelector } from "../../../utils/useRedux";
import { displayAlert } from "../../../utils/toastMessage";
import { screenAdsStyles } from "../screenAds/ScreenAdsStyles";
import { KeyboardArrowDown } from "@mui/icons-material";
import moment from "moment";
interface IState {
  searchInput: string;
  anchorEl: HTMLButtonElement | null;
  date: Date | null;
  numberType: number;
  stringType: string;
}
const tableHeadings = [
  "Payment_Id",
  "Amount",
  "Payment_Date",
  "Transaction_Id",
  "Status",
];
const today = dayjs();
const Payments = () => {
  const [fromAnchorEl, setFromAnchorEl] =
    React.useState<IState["anchorEl"]>(null);
  const [toAnchorEl, setToAnchorEl] = React.useState<IState["anchorEl"]>(null);
  const [fromDate, setFromDate] = useState<IState["date"]>(null);
  const [toDate, setToDate] = useState<IState["date"]>(null);
  const [sortBy, setSortBy] = useState<IState["stringType"]>("");
  const fromOpen = Boolean(fromAnchorEl);
  const fromId = fromOpen ? "simple-popover" : undefined;
  const toOpen = Boolean(toAnchorEl);
  const toId = toOpen ? "simple-popover" : undefined;
  const [currentPage, setCurrentPage] = useState<IState["numberType"]>(1);
  const { paymentsData, loadingStatus, pagination, message } = useAppSelector(
    (state) => state.vendor.payments
  );
  const dispatch = useAppDispatch();
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
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };
  const handleFromDate = (event: Date) => {
    setFromDate(new Date(event));
    handleClosePopover();
    setCurrentPage(1);
  };
  const handleToDate = (event: Date) => {
    setToDate(new Date(event));
    handleClosePopover();
    setCurrentPage(1);
  };
  const handleChange = (event: SelectChangeEvent) => {
    setSortBy(event.target.value);
    setCurrentPage(1);
  };
  useEffect(() => {
    if (fromDate && toDate && fromDate?.getTime() > toDate?.getTime()) {
      displayAlert("From date must be less than to date", "error");
    } else {
      dispatch(
        getVendorPayments({
          fromDate: formatDataYtoD(fromDate),
          toDate: formatDataYtoD(toDate),
          page: currentPage,
          status: sortBy,
        })
      );
    }
  }, [dispatch, fromDate, toDate, currentPage, sortBy]);
  const dataStatusJSX = (status: LoadingStatus) => {
    if (paymentsData && paymentsData.length === 0)
      return <Typography>Data Not Found !!</Typography>;
    switch (status) {
      case "PENDING":
        return <CircularProgress />;
      case "REJECTED":
        return <Typography>{message}</Typography>;
      default: {
        return false;
      }
    }
  };
  return (
    <Box sx={logsStyles.tableContainer}>
      <Box sx={logsStyles.flexWrapMainBox}>
        <Typography sx={logsStyles.tableHeading}>Payments</Typography>
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
              </Typography>
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
            <Box sx={screenAdsStyles.sortContainer}>
              <Box sx={screenAdsStyles.sortBox}>
                <Typography sx={screenAdsStyles.menuItem}>Sort By:</Typography>
                <FormControl sx={screenAdsStyles.sortFormControl}>
                  <Select
                    value={sortBy}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    IconComponent={KeyboardArrowDown}
                  >
                    <MenuItem value="" sx={screenAdsStyles.menuItem}>
                      All
                    </MenuItem>
                    <MenuItem value="pending" sx={screenAdsStyles.menuItem}>
                      Pending
                    </MenuItem>
                    <MenuItem value="success" sx={screenAdsStyles.menuItem}>
                      Completed
                    </MenuItem>
                    <MenuItem value="rejected" sx={screenAdsStyles.menuItem}>
                      Cancelled
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
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
                paymentsData &&
                paymentsData.length > 0 &&
                paymentsData.map((payment, index) => (
                  <TableRow key={payment.id}>
                    <TableCell align="left">
                      <Typography
                        title={payment.id.toString()}
                        sx={logsStyles.upperCaseTableText}
                      >
                        {payment.id}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography
                        title={payment.amount.toString()}
                        sx={logsStyles.capitalizeTableText}
                      >
                        ₹ {payment.amount}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography
                        title={moment(payment.transactionDate).format("DD/MM/YYYY")}
                        sx={logsStyles.capitalizeTableText}
                      >
                        {moment(payment.transactionDate).format("DD/MM/YYYY")}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography
                        title={String(payment.razorpayPaymentId)}
                        sx={logsStyles.upperCaseTableText}
                      >
                        {payment.razorpayPaymentId}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography
                        title={payment.paymentStatus}
                        sx={logsStyles.statusText(payment.paymentStatus)}
                      >
                        {payment.paymentStatus === "success"
                          ? "Completed"
                          : payment.paymentStatus === "pending"
                          ? "Pending"
                          : "Cancelled"}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      {loadingStatus === "FULFILLED" &&
        pagination &&
        pagination.totalPages > 1 && (
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
export default Payments;
