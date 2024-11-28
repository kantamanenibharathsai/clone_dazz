import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ClearIcon from "@mui/icons-material/Clear";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Pagination,
  PaginationItem,
  Popover,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../../../../config/theme";
import {
  formateDate,
  formateDateWithTime,
  formateDateWithTimeToGetData,
} from "../../../../utils/utils";
import { CustomButton } from "../../../common/customButton/CustomButton";
import { CalendarIcon, searchIcon } from "../../assets";
import { logsStyles } from "./logsStyles";
import {
  exportLogs,
  getLogs,
  LoadingStatus,
} from "../../../../redux/reducers/common/logsSlice";
import { AppDispatch, RootState } from "../../../../redux/store";
import { displayAlert } from "../../../../utils/toastMessage";
const today = dayjs();
interface IState {
  searchInput: string;
  anchorEl: HTMLButtonElement | null;
  date: Date | null;
}
const tableRows = ["Date", "Category", "Message", "User"];
const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState<IState["searchInput"]>("");
  const [fromAnchorEl, setFromAnchorEl] = useState<IState["anchorEl"]>(null);
  const [toAnchorEl, setToAnchorEl] = useState<IState["anchorEl"]>(null);
  const [fromDate, setFromDate] = useState<IState["date"]>(null);
  const [toDate, setToDate] = useState<IState["date"]>(null);
  const { data, pagination, loadingStatus, message } = useSelector(
    (state: RootState) => state.logs.logs
  );
  const dispatch = useDispatch<AppDispatch>();
  const fromOpen = Boolean(fromAnchorEl);
  const fromId = fromOpen ? "simple-popover" : undefined;
  const toOpen = Boolean(toAnchorEl);
  const toId = toOpen ? "simple-popover" : undefined;
  const handleSearchInput = (input: string) => {
    setSearchInput(input.trim());
    setCurrentPage(1);
  };
  const handleRemoveSearchInput = () => {
    setSearchInput("");
  };
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
    setCurrentPage(1);
  };
  const handleToDate = (event: Date) => {
    setToDate(new Date(event));
    handleClosePopover();
    setCurrentPage(1);
  };
  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const handleExportLogs = () => {
    if (fromDate && toDate) {
      dispatch(
        exportLogs(
          `userName=${searchInput}&fromTime=${formateDateWithTimeToGetData(
            fromDate
          )}&toTime=${formateDateWithTimeToGetData(toDate)}`
        )
      );
    } else if (fromDate) {
      dispatch(
        exportLogs(
          `userName=${searchInput}&fromTime=${formateDateWithTimeToGetData(
            fromDate
          )}`
        )
      );
    } else if (toDate) {
      dispatch(
        exportLogs(
          `userName=${searchInput}&toTime=${formateDateWithTimeToGetData(
            toDate
          )}`
        )
      );
    } else {
      dispatch(exportLogs(`userName=${searchInput}`));
    }
  };
  const handleGetData = () => {
    if (fromDate && toDate) {
      dispatch(
        getLogs(
          `userName=${searchInput}&page=${currentPage}&startDate=${formateDateWithTimeToGetData(
            fromDate
          )}&endDate=${formateDateWithTimeToGetData(toDate)}`
        )
      );
    } else if (fromDate) {
      dispatch(
        getLogs(
          `userName=${searchInput}&page=${currentPage}&startDate=${formateDateWithTimeToGetData(
            fromDate
          )}`
        )
      );
    } else if (toDate) {
      dispatch(
        getLogs(
          `userName=${searchInput}&page=${currentPage}&endDate=${formateDateWithTimeToGetData(
            toDate
          )}`
        )
      );
    } else {
      dispatch(getLogs(`userName=${searchInput}&page=${currentPage}`));
    }
  };
  useEffect(() => {
    if (fromDate && toDate && fromDate?.getTime()! > toDate?.getTime()) {
      displayAlert("From date must be less than to date", "error");
    } else if (searchInput.length === 0) {
      handleGetData();
    } else {
      const debouncing = setTimeout(() => {
        handleGetData();
      }, 1500);
      return () => clearTimeout(debouncing);
    }
    // eslint-disable-next-line
  }, [currentPage, fromDate, searchInput, toDate]);
  const dataStatusJSX = (status: LoadingStatus) => {
    if (data && data.length === 0)
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
      <Box sx={logsStyles.inputMainBox}>
        <Box sx={logsStyles.inputBox}>
          <TextField
            fullWidth
            sx={logsStyles.textField}
            type="text"
            placeholder="Search"
            value={searchInput}
            onChange={(event) => handleSearchInput(event.target.value)}
            InputProps={{
              startAdornment: (
                <Box
                  component={"img"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  sx={logsStyles.textField.icon}
                  src={searchIcon}
                />
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <ClearIcon
                    cursor={"pointer"}
                    onClick={handleRemoveSearchInput}
                    sx={{ opacity: searchInput ? 1 : 0 }}
                  />
                </InputAdornment>
              ),
            }}
          />
        </Box>
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
                  <Button onClick={() => handleResetDate("from")}>Reset</Button>
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
          <CustomButton
            onClick={handleExportLogs}
            textColor={colors.black}
            width={120}
            borderradius={15}
            bgcolor={colors.textFieldBg}
          >
            Export
          </CustomButton>
        </Box>
      </Box>
      <Box sx={logsStyles.tableBox}>
        <TableContainer aria-label="customized table">
          <Table sx={logsStyles.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                {tableRows.map((row) => (
                  <TableCell align="left" key={row} sx={logsStyles.cellHeading}>
                    {row}
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
                data &&
                data.length > 0 &&
                data.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell align="left">
                      <Typography
                        title={formateDateWithTime(log.createdat)}
                        sx={logsStyles.unpperCaseTableText}
                      >
                        {formateDateWithTime(log.createdat)}
                      </Typography>
                    </TableCell>

                    <TableCell align="left">
                      <Typography
                        title={log.category}
                        sx={logsStyles.capitalizeTableText}
                      >
                        {log.category}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography
                        title={log.message}
                        sx={logsStyles.capitalizeTableText}
                      >
                        {log.message}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography
                        title={log.name}
                        sx={logsStyles.capitalizeTableText}
                      >
                        {log.name}
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

export default Dashboard;
