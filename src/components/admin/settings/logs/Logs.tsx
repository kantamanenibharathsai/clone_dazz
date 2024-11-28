import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ClearIcon from "@mui/icons-material/Clear";
import {
  Box,
  Button,
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
import React, { useState } from "react";
import { CalendarIcon } from "../../../host/assets";
import { searchIcon } from "../../assets/Index";
import { logsStyles } from "./logsStyles";
const today = dayjs();
const tableData = [
  {
    ScreenName: "JohnDoe",
    Orientation: "Landscape",
    PhoneNumber: "123-456-7890",
    Email: "johndoe@example.com",
    LastResponse: "2023-05-15",
    Status: "Active",
  },
  {
    ScreenName: "JaneSmith",
    Orientation: "Portrait",
    PhoneNumber: "987-654-3210",
    Email: "janesmith@example.com",
    LastResponse: "2023-06-20",
    Status: "Inactive",
  },
  {
    ScreenName: "AlexBrown",
    Orientation: "Landscape",
    PhoneNumber: "555-123-4567",
    Email: "alex.brown@example.com",
    LastResponse: "2023-06-10",
    Status: "Active",
  },
  {
    ScreenName: "SarahJones",
    Orientation: "Landscape",
    PhoneNumber: "222-333-4444",
    Email: "sarah.jones@example.com",
    LastResponse: "2023-05-30",
    Status: "Active",
  },
  {
    ScreenName: "MikeDavis",
    Orientation: "Portrait",
    PhoneNumber: "777-888-9999",
    Email: "mike.davis@example.com",
    LastResponse: "2023-06-25",
    Status: "Active",
  },
];

interface IState {
  searchInput: string;
}
const Dashboard = () => {
  const [searchInput, setSearchInput] = useState<IState["searchInput"]>("");
  const [fromAnchorEl, setFromAnchorEl] =
    React.useState<HTMLButtonElement | null>(null);
  const [toAnchorEl, setToAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
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
          <Box sx={logsStyles.datesMainBox}>
            <Box sx={logsStyles.dateBox}>
              <Typography sx={logsStyles.menuItem}>From : </Typography>
              <Typography>Date</Typography>
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
                  <DateCalendar defaultValue={today} disableFuture />
                  <Box sx={logsStyles.dateButtonsBox}>
                    <Button onClick={handleClosePopover}>Cancel</Button>
                    <Button>Done</Button>
                  </Box>
                </LocalizationProvider>
              </Popover>
            </Box>
            <Box sx={logsStyles.dateBox}>
              <Typography sx={logsStyles.menuItem}>To : </Typography>
              <Typography>Date</Typography>
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
                  <DateCalendar defaultValue={today} disableFuture />
                  <Box sx={logsStyles.dateButtonsBox}>
                    <Button onClick={handleClosePopover}>Cancel</Button>
                    <Button>Done</Button>
                  </Box>
                </LocalizationProvider>
              </Popover>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={logsStyles.tableBox}>
        <TableContainer aria-label="customized table" sx={logsStyles.th}>
          <Table sx={logsStyles.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Date</TableCell>
                <TableCell align="left">Category</TableCell>
                <TableCell align="left">Message</TableCell>
                <TableCell align="left">User</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell align="left">{row.ScreenName}</TableCell>
                  <TableCell align="left">{row.Orientation}</TableCell>
                  <TableCell align="left">{row.PhoneNumber}</TableCell>
                  <TableCell align="left">{row.Email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box sx={logsStyles.paginationBox}>
        <Pagination
          count={10}
          page={1}
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
    </Box>
  );
};

export default Dashboard;
