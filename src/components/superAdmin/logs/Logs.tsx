import { Close } from "@mui/icons-material";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  ListItemText,
  Pagination,
  Popover,
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
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { colors } from "../../../config/theme";
import { exportLogs, getLogs } from "../../../redux/reducers/common/logsSlice";
import { useAppDispatch, useAppSelector } from "../../../utils/useRedux";
import {
  formateDateWithTime,
  formateDateWithTimeToGetData,
  showEntriesStats,
} from "../../../utils/utils";
import { InputField } from "../../common/inputField/InputField";
import { CalendarIcon, SearchIcon } from "../assets";
import { commonStyles } from "../common/CommonStyles";
import { logsStyles } from "./LogStyles";
const today = dayjs();
interface IState {
  searchInput: string;
  fromDate: Dayjs | null;
  toDate: Dayjs | null;
  page: number;
}
const Logs = () => {
  const [searchInput, setSearchInput] = useState<IState["searchInput"]>("");
  const [fromAnchorEl, setFromAnchorEl] = useState<HTMLButtonElement | null>(
    null
  );
  const [toAnchorEl, setToAnchorEl] = useState<HTMLButtonElement | null>(null);
  const fromOpen = Boolean(fromAnchorEl);
  const fromId = fromOpen ? "simple-popover" : undefined;
  const toOpen = Boolean(toAnchorEl);
  const toId = toOpen ? "simple-popover" : undefined;
  const [fromDate, setFromDate] = useState<IState["fromDate"]>(null);
  const [toDate, setToDate] = useState<IState["toDate"]>(null);
  const [currentPage, setCurrentPage] = useState<IState["page"]>(1);
  const { logs } = useAppSelector((state) => state.logs);
  const { data, pagination, loadingStatus, message } = logs;
  const dispatch = useAppDispatch();
  const handleSearchInput = (input: string) => {
    setSearchInput(input);
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
    if (dateType === "fromDate") {
      setFromDate(null);
    } else {
      setToDate(null);
    }
    handleClosePopover();
  };
  const handleFromDate = (newDate: Dayjs) => {
    setFromDate(newDate);
    handleClosePopover();
  };
  const handleToDate = (newDate: Dayjs) => {
    setToDate(newDate);
    handleClosePopover();
  };
  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };
  const handleExportLogs = () => {
    if (fromDate && toDate) {
      dispatch(
        exportLogs(
          `userName=${searchInput}&fromTime=${formateDateWithTimeToGetData(
            fromDate.toDate()
          )}&toTime=${formateDateWithTimeToGetData(toDate.toDate())}`
        )
      );
    } else if (fromDate) {
      dispatch(
        exportLogs(
          `userName=${searchInput}&fromTime=${formateDateWithTimeToGetData(
            fromDate.toDate()
          )}`
        )
      );
    } else if (toDate) {
      dispatch(
        exportLogs(
          `userName=${searchInput}&toTime=${formateDateWithTimeToGetData(
            toDate.toDate()
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
          `${searchInput && `userName=${searchInput}&`}page=${
            currentPage
          }&startDate=${formateDateWithTimeToGetData(
            fromDate.toDate()
          )}&endDate=${formateDateWithTimeToGetData(toDate.toDate())}`
        )
      );
    } else if (fromDate) {
      dispatch(
        getLogs(
          `${searchInput && `userName=${searchInput}&`}page=${
            currentPage
          }&startDate=${formateDateWithTimeToGetData(fromDate.toDate())}`
        )
      );
    } else if (toDate) {
      dispatch(
        getLogs(
          `${searchInput && `userName=${searchInput}&`}page=${
            currentPage
          }&endDate=${formateDateWithTimeToGetData(toDate.toDate())}`
        )
      );
    } else {
      dispatch(
        getLogs(
          `${searchInput && `userName=${searchInput}&`}page=${currentPage}`
        )
      );
    }
  };
  useEffect(() => {
    if (searchInput.length === 0) {
      handleGetData();
    } else {
      const debouncing = setTimeout(() => {
        handleGetData();
      }, 1500);
      return () => clearTimeout(debouncing);
    }
    // eslint-disable-next-line
  }, [currentPage, fromDate, searchInput, toDate]);
  return (
    <Box sx={logsStyles.tableContainer}>
      <Box sx={logsStyles.inputMainBox}>
        <ListItemText
          primary="Activity Logs"
          secondary={`Total Logs - ${logs.pagination?.totalItems}`}
          sx={logsStyles.logsText}
        />
        <InputField
          inputProps={{
            placeholder: "Search",
            type: "text",
            value: searchInput,
            onChange: (event) => handleSearchInput(event.target.value),
            sx: logsStyles.textField,
            InputProps: {
              startAdornment: (
                <Box
                  component={"img"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  src={SearchIcon}
                />
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Close
                    cursor={"pointer"}
                    onClick={handleRemoveSearchInput}
                    sx={{ visibility: searchInput ? "visible" : "hidden" }}
                  />
                </InputAdornment>
              ),
            },
          }}
        />
        <Box sx={logsStyles.datesMainBox}>
          <Box sx={logsStyles.dateBox}>
            <Typography sx={logsStyles.menuItem}>From : </Typography>
            <Typography>{fromDate?.format("DD/MM/YYYY") ?? "Date"}</Typography>
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
                  defaultValue={today}
                  disableFuture
                  value={fromDate}
                  onChange={handleFromDate}
                />
                <Stack direction={"row"} justifyContent={"right"}>
                  <Button
                    variant="text"
                    onClick={() => handleResetDate("fromDate")}
                    sx={logsStyles.resetBtn}
                  >
                    Reset
                  </Button>
                </Stack>
              </LocalizationProvider>
            </Popover>
          </Box>
          <Box sx={logsStyles.dateBox}>
            <Typography sx={logsStyles.menuItem}>To : </Typography>
            <Typography>{toDate?.format("DD/MM/YYYY") ?? "Date"}</Typography>
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
                  disableFuture
                  value={toDate}
                  onChange={handleToDate}
                />
                <Stack direction={"row"} justifyContent={"right"}>
                  <Button
                    variant="text"
                    onClick={() => handleResetDate("toDate")}
                    sx={logsStyles.resetBtn}
                  >
                    Reset
                  </Button>
                </Stack>
              </LocalizationProvider>
            </Popover>
          </Box>
        </Box>
        <Button
          disableElevation
          disableFocusRipple
          disableRipple
          disableTouchRipple
          sx={logsStyles.exportBtn}
          onClick={handleExportLogs}
          endIcon={<SystemUpdateAltIcon />}
        >
          Export
        </Button>
      </Box>
      <Box sx={logsStyles.tableBox}>
        <TableContainer aria-label="customized table">
          <Table sx={logsStyles.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Date</TableCell>
                <TableCell align="center">Category</TableCell>
                <TableCell align="center">Message</TableCell>
                <TableCell align="center">User</TableCell>
              </TableRow>
            </TableHead>
            {loadingStatus === "FULFILLED" ? (
              <TableBody>
                {data?.map((row: (typeof data)[0], index) => (
                  <TableRow key={index}>
                    <TableCell align="left">
                      {formateDateWithTime(row.createdat)}
                    </TableCell>
                    <TableCell align="center">{row.category}</TableCell>
                    <TableCell align="center">{row.message}</TableCell>
                    <TableCell
                      align="center"
                      sx={commonStyles.maxWidthForTableCell("300px")}
                    >
                      <Tooltip title={row.name}>
                        <Typography
                          fontWeight={"inherit"}
                          fontSize={"inherit"}
                          sx={commonStyles.ellipsisText()}
                        >
                          {row.name}
                        </Typography>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <caption>
                <Typography variant="h6" textAlign={"center"}>
                  {message}
                </Typography>
              </caption>
            )}
          </Table>
        </TableContainer>
      </Box>
      <Stack
        alignItems={"center"}
        direction={"row"}
        spacing={3}
        justifyContent={"space-between"}
        minHeight={"40px"}
        flexWrap={"wrap"}
      >
        {pagination?.totalPages! > 1 && (
          <>
            <Typography color={colors.lightGray} fontSize={14}>
              {showEntriesStats(
                pagination?.totalItems!,
                currentPage,
                pagination?.pageSize!
              )}
            </Typography>
            <Pagination
              count={pagination?.totalPages}
              page={currentPage}
              siblingCount={0}
              onChange={handlePageChange}
            />
          </>
        )}
      </Stack>
    </Box>
  );
};

export default Logs;
