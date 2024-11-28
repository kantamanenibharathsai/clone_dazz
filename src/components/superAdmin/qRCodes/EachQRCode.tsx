import {
  Close,
  KeyboardArrowDown,
  KeyboardArrowRight,
  KeyboardBackspaceOutlined,
} from "@mui/icons-material";
import {
  Box,
  FormControl,
  Grid,
  Icon,
  IconButton,
  InputAdornment,
  ListItemText,
  MenuItem,
  Pagination,
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
import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import { colors } from "../../../config/theme";
import { InputField } from "../../common/inputField/InputField";
import { ModalStyled } from "../../common/modal/CommonModal";
import { QrCodeImg, SearchIcon } from "../assets";
import { commonStyles } from "../common/CommonStyles";
import { qrCodeStyles } from "./QRcodesStyles";
interface TableData {
  name: string;
  memberEmail: string;
  phoneNo: string;
  date: string;
}
const tableData: TableData = {
  name: "Sample Name to check whether ellipsis is working or not",
  memberEmail: "Sample Email to check whether ellipsis is working or not",
  phoneNo: "+91-7795846258",
  date: "12/05/2024,6:47:89",
};
const existingDetails = {
  fullName: "Full Name",
  studentId: "Student ID",
  email: "Email Address",
  phone: "Phone Number",
  dob: "Date of Birth",
  education: "Educational Institution",
  course: "Course/Major",
  yearOfStudy: "Year Of Study",
  couponCode: "HLA 8GAL1B9ZX4",
  validTill: " 9/16/2023",
};
const sortingOptions = ["Newest", "Oldest"];
interface IState {
  searchInput: string;
  activeSortOption: string;
  activeViewId: number;
}
const QRCodes = () => {
  const [activeSortOption, setActiveSortOption] = useState<
    IState["activeSortOption"]
  >(sortingOptions[0]);
  const [searchInput, setSearchInput] = useState<IState["searchInput"]>("");
  const [activeViewId, setActiveViewId] = useState<IState["activeViewId"]>(-1);
  const handleCloseModal = () => setActiveViewId(-1);

  const handleChange = (event: SelectChangeEvent) => {
    setActiveSortOption(event.target.value);
  };
  const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) =>
    setSearchInput(event.target.value);
  const handleRemoveSearchInput = () => setSearchInput("");
  return (
    <>
      <Link to={"/QRCodes"}>
        <IconButton sx={qrCodeStyles.backButton}>
          <KeyboardBackspaceOutlined cursor={"pointer"} />
        </IconButton>
      </Link>
      <Box sx={qrCodeStyles.tableContainer}>
        <Box sx={qrCodeStyles.inputMainBox}>
          <ListItemText primary="QR Code Scans" sx={qrCodeStyles.logsText} />
          <InputField
            inputProps={{
              placeholder: "Search",
              type: "text",
              value: searchInput,
              onChange: handleSearchInput,
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
          <Box sx={qrCodeStyles.sortBox}>
            <Typography sx={qrCodeStyles.menuItem}>Sort By:</Typography>
            <FormControl sx={qrCodeStyles.sortFormControl}>
              <Select
                value={activeSortOption}
                onChange={handleChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                IconComponent={KeyboardArrowDown}
              >
                {sortingOptions.map((each) => (
                  <MenuItem key={each} value={each} sx={qrCodeStyles.menuItem}>
                    {each}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Box sx={qrCodeStyles.tableBox}>
          <TableContainer aria-label="customized table">
            <Table sx={qrCodeStyles.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="center">Member Email</TableCell>
                  <TableCell align="center">Phone No.</TableCell>
                  <TableCell align="center">Date/Time</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array(8)
                  .fill(tableData)
                  .map((row: TableData, index) => (
                    <TableRow key={index}>
                      <TableCell
                        align="left"
                        sx={commonStyles.maxWidthForTableCell("200px")}
                      >
                        <Tooltip title={row.name}>
                          <Typography
                            fontSize={"inherit"}
                            fontWeight={"inherit"}
                            sx={commonStyles.ellipsisText()}
                          >
                            {row.name}
                          </Typography>
                        </Tooltip>
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={commonStyles.maxWidthForTableCell("200px")}
                      >
                        <Tooltip title={row.memberEmail}>
                          <Typography
                            fontSize={"inherit"}
                            fontWeight={"inherit"}
                            sx={commonStyles.ellipsisText()}
                          >
                            {row.memberEmail}
                          </Typography>
                        </Tooltip>
                      </TableCell>
                      <TableCell align="center">{row.phoneNo}</TableCell>
                      <TableCell align="center">{row.date}</TableCell>
                      <TableCell align="center">
                        <Icon onClick={() => setActiveViewId(index)}>
                          <KeyboardArrowRight cursor={"pointer"} />
                        </Icon>
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
      <ModalStyled
        isbgColor={colors.modalBg}
        open={activeViewId !== -1}
        onClose={handleCloseModal}
      >
        <Box
          //   display={"flex"}
          //   flexDirection={"column"}
          //   rowGap={8}
          //   p={5}
          //   maxHeight={"80vw"}
          //   overflow={"auto"}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            rowGap: 8,
            p: { xs: 1, md: 3 },
            maxHeight: "85vh",
            width: "60vw",
            boxSizing: "border-box",
            maxWidth: "900px",
            overflow: "auto",
          }}
        >
          <Box display={"flex"} flexDirection={"column"} rowGap={2}>
            <Typography sx={qrCodeStyles.titleText}>
              Customer Details
            </Typography>
            <Grid container spacing={3}>
              {Object.values(existingDetails)
                .slice(0, 8)
                .map((each, index) => (
                  <Grid key={index} item xs={12} sm={6}>
                    <InputField
                      inputProps={{
                        sx: qrCodeStyles.textField,
                        value: each,
                        fullWidth: true,
                        InputProps: { readOnly: true },
                      }}
                    />
                  </Grid>
                ))}
            </Grid>
          </Box>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent={"space-between"}
            rowGap={3}
          >
            <Box component={"img"} src={QrCodeImg} />
            <Stack gap={3} width={"48%"}>
              <InputField
                inputProps={{
                  sx: qrCodeStyles.textField,
                  value: existingDetails.couponCode,
                  InputProps: { readOnly: true },
                }}
              />
              <Typography color={colors.white}>
                Valid Till:-{existingDetails.validTill}
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </ModalStyled>
    </>
  );
};

export default QRCodes;
