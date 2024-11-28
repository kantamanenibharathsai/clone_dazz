import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  ListItemText,
  MenuItem,
  Pagination,
  Popover,
  Select,
  SelectChangeEvent,
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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../../../config/theme";
import {
  changeCurrentPage,
  getSuperAdminPaymentsData,
  PaymentData,
} from "../../../redux/reducers/superAdmin/paymentsSlice";
import { AppDispatch, RootState } from "../../../redux/store";
import {
  formateDate,
  formateDateWithTimeToGetData,
} from "../../../utils/utils";
import { CalendarIcon, noImage } from "../assets";
import { commonStyles } from "../common/CommonStyles";
import { logsStyles } from "../logs/LogStyles";
import { paymentStyles } from "./paymentStyles";
const today = dayjs();

const sortingOptions = [
  "Newest",
  "Oldest",
  "Amount(Low To High)",
  "Amount(High To Low)",
];
const Payments = () => {
  const [fromAnchorEl, setFromAnchorEl] = useState<HTMLButtonElement | null>(
    null
  );
  const [toAnchorEl, setToAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [activeSortOption, setActiveSortOption] = useState<string>(
    sortingOptions[0]
  );

  const {
    paymentsData,
    currentPage,
    totalPages,
    totalElements,
    pageSize,
    loadingStatus,
  } = useSelector((store: RootState) => store.paymentsSlice);
  const { token } = useSelector((store: RootState) => store.Auth);
  const dispatch = useDispatch<AppDispatch>();

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
  const getStatusText = (status: string) => {
    switch (status) {
      case "success":
        return (
          <Stack direction={"row"} justifyContent={"center"}>
            <Box sx={paymentStyles.acceptedText}>{status}</Box>
          </Stack>
        );
      case "Cancelled":
        return (
          <Stack direction={"row"} justifyContent={"center"}>
            <Box sx={paymentStyles.rejectedText}>{status}</Box>
          </Stack>
        );
      default:
        return (
          <Stack direction={"row"} justifyContent={"center"}>
            <Box sx={paymentStyles.pendingText}>{status}</Box>
          </Stack>
        );
    }
  };

  const handleChange = (event: SelectChangeEvent<string>) => {
    setActiveSortOption(event.target.value);
  };

  const handleActiveOptions = useCallback(() => {
    let sort = "";
    let order = "";

    switch (activeSortOption) {
      case "Newest":
        order = "desc";
        break;
      case "Oldest":
        order = "asc";
        break;
      case "Amount(Low To High)":
        sort = "amount";
        order = "asc";
        break;
      case "Amount(High To Low)":
        sort = "amount";
        order = "desc";
        break;
      default:
        sort = "";
        order = "";
    }

    return { sort, order };
  }, [activeSortOption]);

  const getPaymentData = useCallback(() => {
    dispatch(
      getSuperAdminPaymentsData({
        pageNumber: currentPage,
        orderedBy: handleActiveOptions().order,
        sortBy: handleActiveOptions().sort,
        fromDate: fromDate
          ? moment(formateDateWithTimeToGetData(fromDate)).format("YYYY-MM-DD")
          : "",
        toDate: toDate
          ? moment(formateDateWithTimeToGetData(toDate)).format("YYYY-MM-DD")
          : "",
      })
    );
  }, [currentPage, fromDate, toDate, dispatch, handleActiveOptions]);

  useEffect(() => {
    getPaymentData();
  }, [getPaymentData]);

  const handleChangePagination = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    dispatch(changeCurrentPage(value));
  };

  const handleResetDate = (dateType: "from" | "to") => {
    if (dateType === "from") {
      setFromDate(null);
    } else {
      setToDate(null);
    }
    handleClosePopover();
  };

  const handleFromDate = (date: dayjs.Dayjs | null) => {
    if (date) {
      setFromDate(date.toDate());
      handleFilerDates(date.toDate(), toDate);
    }
  };

  const handleToDate = (date: dayjs.Dayjs | null) => {
    if (date) {
      setToDate(date.toDate());
      handleFilerDates(fromDate, date.toDate());
    }
  };

  const handleFilerDates = (startDate: Date | null, endDate: Date | null) => {
    if (startDate && endDate) {
      dispatch(
        getSuperAdminPaymentsData({
          pageNumber: 1,
          orderedBy: handleActiveOptions().order,
          sortBy: handleActiveOptions().sort,
          fromDate: startDate
            ? moment(formateDateWithTimeToGetData(startDate)).format(
                "YYYY-MM-DD"
              )
            : "",
          toDate: endDate
            ? moment(formateDateWithTimeToGetData(endDate)).format("YYYY-MM-DD")
            : "",
        })
      );
    }
  };

  return (
    <Box sx={paymentStyles.tableContainer}>
      <Box sx={paymentStyles.inputMainBox}>
        <ListItemText primary="Payments" sx={paymentStyles.logsText} />
        <Box sx={paymentStyles.dateBox}>
          <Typography sx={paymentStyles.menuItem}>From:</Typography>
          <Typography>{fromDate ? formateDate(fromDate) : "Date"}</Typography>
          <IconButton
            aria-describedby={fromAnchorEl ? "from-popover" : undefined}
            onClick={handleOpenFrom}
          >
            <CalendarIcon />
          </IconButton>
          <Popover
            id="from-popover"
            open={Boolean(fromAnchorEl)}
            anchorEl={fromAnchorEl}
            onClose={handleClosePopover}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                defaultValue={today}
                disableFuture
                value={dayjs(fromDate ?? today)}
                onChange={handleFromDate}
              />
              <Box sx={logsStyles.dateButtonsBox}>
                <Button onClick={handleClosePopover}>Close</Button>
                <Button onClick={() => handleResetDate("from")}>Reset</Button>
              </Box>
            </LocalizationProvider>
          </Popover>
        </Box>
        <Box sx={paymentStyles.dateBox}>
          <Typography sx={paymentStyles.menuItem}>To:</Typography>
          <Typography>{toDate ? formateDate(toDate) : "Date"}</Typography>
          <IconButton
            aria-describedby={toAnchorEl ? "to-popover" : undefined}
            onClick={handleOpenTo}
          >
            <CalendarIcon />
          </IconButton>
          <Popover
            id="to-popover"
            open={Boolean(toAnchorEl)}
            anchorEl={toAnchorEl}
            onClose={handleClosePopover}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                disableFuture
                value={dayjs(toDate ?? today)}
                onChange={handleToDate}
              />
              <Box sx={logsStyles.dateButtonsBox}>
                <Button onClick={handleClosePopover}>Close</Button>
                <Button onClick={() => handleResetDate("to")}>Reset</Button>
              </Box>
            </LocalizationProvider>
          </Popover>
        </Box>
        <Box sx={paymentStyles.sortBox}>
          <Typography sx={paymentStyles.menuItem}>Sort By:</Typography>
          <FormControl sx={paymentStyles.sortFormControl}>
            <Select
              value={activeSortOption}
              onChange={handleChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              IconComponent={KeyboardArrowDownIcon}
            >
              {sortingOptions.map((option) => (
                <MenuItem
                  key={option}
                  value={option}
                  sx={paymentStyles.menuItem}
                >
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box sx={paymentStyles.tableBox}>
        <TableContainer aria-label="customized table">
          <Table sx={paymentStyles.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Member Name</TableCell>
                <TableCell align="center">Payment ID</TableCell>
                <TableCell align="center">Amount</TableCell>
                <TableCell align="center">Transaction Date</TableCell>
                <TableCell align="center">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loadingStatus === "REJECTED" && (
                <TableRow>
                  <TableCell colSpan={5}>
                    <Box
                      sx={{
                        textAlign: "center",
                        my: 5,
                        color: colors.validate,
                      }}
                    >
                      <Typography>No Data Found!</Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
              {loadingStatus === "PENDING" && (
                <TableRow>
                  <TableCell colSpan={5}>
                    <Box
                      sx={{
                        textAlign: "center",
                        my: 5,
                        color: colors.validate,
                      }}
                    >
                      <CircularProgress />
                    </Box>
                  </TableCell>
                </TableRow>
              )}

              {loadingStatus === "FULFILLED" &&
                paymentsData?.map((row: PaymentData, index: number) => (
                  <TableRow key={index}>
                    <TableCell
                      align="left"
                      sx={commonStyles.maxWidthForTableCell("250px")}
                    >
                      <Stack
                        direction={"row"}
                        spacing={1}
                        alignItems={"center"}
                      >
                        <Box
                          component="img"
                          src={row?.image ? `${row?.image}/${token}` : noImage}
                          width={30}
                          height={30}
                          borderRadius={"5px"}
                        />
                        <Tooltip title={row.memberName}>
                          <Typography
                            fontSize={"inherit"}
                            fontWeight={"inherit"}
                            sx={commonStyles.ellipsisText()}
                          >
                            {row.memberName}
                          </Typography>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                    <TableCell align="center">
                      {row?.razorpayPaymentId}
                    </TableCell>
                    <TableCell align="center">{row.amount}</TableCell>
                    <TableCell align="center">
                      {moment(row.transactionDate).format(
                        "DD/MM/YYYY, h:mm:ss A"
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {getStatusText(row.paymentStatus)}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      {loadingStatus === "FULFILLED" && paymentsData && totalPages > 1 && (
        <Stack
          alignItems={"center"}
          direction={"row"}
          spacing={3}
          justifyContent={"space-between"}
          minHeight={"40px"}
          flexWrap={"wrap"}
        >
          <Typography>
            Showing {(currentPage - 1) * pageSize + 1} to{" "}
            {Math.min(currentPage * pageSize, totalElements)} of {totalElements}{" "}
            Entries
          </Typography>

          {loadingStatus === "FULFILLED" && paymentsData && totalPages > 1 && (
            <Pagination
              count={totalPages}
              page={currentPage}
              siblingCount={2}
              onChange={handleChangePagination}
            />
          )}
        </Stack>
      )}
    </Box>
  );
};

export default Payments;
