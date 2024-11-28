import { Close, KeyboardArrowRight } from "@mui/icons-material";
import {
  Box,
  Icon,
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
import { useState } from "react";
import { Link } from "react-router-dom";
import { colors } from "../../../config/theme";
import { InputField } from "../../common/inputField/InputField";
import { CalendarIcon, SearchIcon } from "../assets";
import { commonStyles } from "../common/CommonStyles";
import { qrCodeStyles } from "./QRcodesStyles";
const today = dayjs();
interface TableData {
  adCampaign: string;
  memberName: string;
  emailId: string;
  totalScans: number;
  createdAt: string;
}
const tableData: TableData = {
  adCampaign:
    "Sample Ad Campaign name to check whether ellipsis implemented or not",
  memberName: "Sample Name to check whether ellipsis implemented or not",
  emailId: "Sample Email to check whether ellipsis implemented or not",
  totalScans: 300,
  createdAt: "29/06/2024,11:04:53",
};

interface IState {
  searchInput: string;
  fromDate: Dayjs | null;
  toDate: Dayjs | null;
}
const QRCodes = () => {
  const [searchInput, setSearchInput] = useState<IState["searchInput"]>("");
  const [fromAnchorEl, setFromAnchorEl] = useState<HTMLButtonElement | null>(
    null
  );
  const [toDate, setToDate] = useState<IState["toDate"]>(null);
  const [fromDate, setFromDate] = useState<IState["fromDate"]>(null);
  const [toAnchorEl, setToAnchorEl] = useState<HTMLButtonElement | null>(null);
  const fromOpen = Boolean(fromAnchorEl);
  const fromId = fromOpen ? "simple-popover" : undefined;
  const toOpen = Boolean(toAnchorEl);
  const toId = toOpen ? "simple-popover" : undefined;
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

  return (
    <Box sx={qrCodeStyles.tableContainer}>
      <Box sx={qrCodeStyles.inputMainBox}>
        <ListItemText primary="Lead Campaign" sx={qrCodeStyles.logsText} />
        <InputField
          inputProps={{
            placeholder: "Search",
            type: "text",
            value: searchInput,
            onChange: (event) => handleSearchInput(event.target.value),
            sx: qrCodeStyles.textField,
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
        <Box sx={qrCodeStyles.datesMainBox}>
          <Box sx={qrCodeStyles.dateBox}>
            <Box sx={qrCodeStyles.dateFielDTextContainer}>
            <Typography sx={qrCodeStyles.menuItem}>From : </Typography>
            <Typography>{fromDate?.format("DD/MM/YYYY") ?? "Date"}</Typography>
            </Box>
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
                  onChange={(newValue) => {
                    setFromDate(newValue);
                    setFromAnchorEl(null);
                  }}
                />
              </LocalizationProvider>
            </Popover>
          </Box>
          <Box sx={qrCodeStyles.dateBox}>
            <Typography sx={qrCodeStyles.menuItem}>To : </Typography>
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
                  onChange={(newValue) => {
                    setToDate(newValue);
                    setToAnchorEl(null);
                  }}
                />
              </LocalizationProvider>
            </Popover>
          </Box>
        </Box>
      </Box>
      <Box sx={qrCodeStyles.tableBox}>
        <TableContainer aria-label="customized table">
          <Table sx={qrCodeStyles.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Ad_Campaign</TableCell>
                <TableCell align="center">Member_Name</TableCell>
                <TableCell align="center">Email_Id</TableCell>
                <TableCell align="center">Total_Scans</TableCell>
                <TableCell align="center">Created_Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array(8)
                .fill(tableData)
                .map((row: TableData, index) => (
                  <TableRow key={index}>
                    <TableCell sx={commonStyles.maxWidthForTableCell("150px")}>
                      <Tooltip title={row.adCampaign}>
                        <Typography
                          fontSize={"inherit"}
                          fontWeight={"inherit"}
                          sx={commonStyles.ellipsisText()}
                        >
                          {row.adCampaign}
                        </Typography>
                      </Tooltip>
                    </TableCell>
                    <TableCell sx={commonStyles.maxWidthForTableCell("200px")}>
                      <Tooltip title={row.memberName}>
                        <Typography
                          fontSize={"inherit"}
                          fontWeight={"inherit"}
                          sx={commonStyles.ellipsisText()}
                        >
                          {row.memberName}
                        </Typography>
                      </Tooltip>
                    </TableCell>
                    <TableCell sx={commonStyles.maxWidthForTableCell("175px")}>
                      <Tooltip title={row.emailId}>
                        <Typography
                          fontSize={"inherit"}
                          fontWeight={"inherit"}
                          sx={commonStyles.ellipsisText()}
                        >
                          {row.emailId}
                        </Typography>
                      </Tooltip>
                    </TableCell>
                    <TableCell align="center">{row.totalScans}</TableCell>
                    <TableCell>
                      <Stack direction={"row"} justifyContent={"space-between"}>
                        <Typography>{row.createdAt}</Typography>
                        <Link to={`/QRCodes/${index}`}>
                          <Icon>
                            <KeyboardArrowRight
                              cursor={"pointer"}
                              sx={qrCodeStyles.labelTextColor}
                            />
                          </Icon>
                        </Link>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
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
        <Typography color={colors.lightGray} fontSize={14}>
          Showing data 1 to 8 of 256K entries
        </Typography>
        <Pagination count={10} page={1} siblingCount={0} />
      </Stack>
    </Box>
  );
};

export default QRCodes;
