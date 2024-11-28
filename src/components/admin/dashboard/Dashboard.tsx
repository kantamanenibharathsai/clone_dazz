import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ClearIcon from "@mui/icons-material/Clear";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputAdornment,
  ListItemText,
  MenuItem,
  Pagination,
  PaginationItem,
  Select,
  SelectChangeEvent,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { colors, hex2rgba } from "../../../config/theme";
import DashBoardIndicator from "../../common/dashboardIndicator/DashBoardIndicator";
import { ads, profile, profileTick, searchIcon } from "../assets/Index";
import { dashboardStyles } from "./DashboardStyles";
import { AppDispatch, RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getAdminDashboardData } from "../../../redux/reducers/adminReducers/dashboardSlice";
import { getScreensData } from "../../../redux/reducers/adminReducers/screenSlice";
import { screenStyles } from "../screens/ScreenStyles";
import moment from "moment";
import { cardLayoutPlacedHolderImage } from "../../common/assets";
const dummyData = [
  {
    id: 1,
    title: "Online Screens",
    img: profile,
    value: 15,
    percentage: 16,
  },
  {
    id: 2,
    title: "Offline Screens",
    img: profileTick,
    value: 60,
    percentage: 1,
  },
  {
    id: 3,
    title: "Total Screens",
    img: ads,
    value: 75,
  },
  {
    id: 4,
    title: "License Expired",
    img: profile,
    value: 16,
  },
  {
    id: 5,
    title: "License Nearing Expiry",
    img: profileTick,
    value: 60,
  },
];
const Dashboard = () => {
  const [selectInput, setSelectInput] = useState("desc");
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchPage, setSearchPage] = useState(1);
  const { screenData,pagination,message } =
    useSelector((state: RootState) => state.ScreensSlice);
  const token=useSelector((state: RootState) => state.Auth.token);
  const handleChange = (event: SelectChangeEvent) => {
    setSelectInput(event.target.value as string);
    dispatch(
      getScreensData({
        searchInput,
        page: searchInput?searchPage:currentPage,
        sort: event.target.value,
      })
    );
  };
  const handleSearchInput = (input: string) => {
        setSearchInput(input);
  };
  const handleRemoveSearchInput = () => {
    setSearchInput("");
  };
  const { data, loading, error } = useSelector(
    (state: RootState) => state.AdminDashboardSlice
  );
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getAdminDashboardData());
  }, [dispatch]);
  useEffect(()=>{
  let timeoutId: NodeJS.Timeout;
  const delayedDispatch = () => {
    dispatch(
      getScreensData({
        page: currentPage,
        searchInput,
        sort: selectInput,
      })
    );
  };
  timeoutId = setTimeout(delayedDispatch, 1000);
  return () => clearTimeout(timeoutId);
  },[dispatch, currentPage, searchInput, selectInput])
  const handleSearchPagination = (newPage: number) => {
      setSearchPage(newPage);
      dispatch(
        getScreensData({ page: newPage, searchInput, sort: selectInput })
      );
  };
  const handlePagination = (newPage: number) => {
      setCurrentPage(newPage);
      dispatch(
        getScreensData({ page: newPage, sort: selectInput })
      )
  };
  const getDataFromAPI = (title: string) => {
    const getValue = (value?: number | undefined, change?: string | undefined, icon?: string) => {
      return {
        value,
        percentage: change ? calculatePercentage(change) : undefined,
        icon: icon ? icon.slice(icon.indexOf("(") + 1, icon.indexOf(")")) : undefined,
      };
    };
    switch (title) {
      case "Online Screens":
        return getValue(data?.onlineScreens, data?.onlineScreenChange, data?.onlineScreenChange);
      case "Offline Screens":
        return getValue(data?.offlineScreens, data?.offlineScreenChange, data?.offlineScreenChange);
      case "Total Screens":
        return getValue(data?.totalScreens);
      case "License Expired":
        return getValue(data?.licenceExpired);
      case "License Nearing Expiry":
        return getValue(data?.licenceExpiringSoon);
      default:
        return { value: undefined, percentage: undefined, icon:undefined };
    }
  };
  const calculatePercentage = (change: string | undefined): number | undefined => {
    const parsedChange = parseFloat(change ?? "");
    return isNaN(parsedChange) ? undefined : parsedChange;
  };

  return (
    <Box sx={dashboardStyles.mainContainer}>
      <Grid container sx={dashboardStyles.cardContainer}>
      {loading && (
          <Grid
            item
            xs={12}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            padding={10}
          >
            <CircularProgress />
          </Grid>
        )}
        {error && (
          <Grid
            item
            xs={12}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            padding={10}
          >
            <Typography variant="h6" color="error">
              {error.toString()}
            </Typography>
          </Grid>
        )}
        {!loading &&
          !error && dummyData.map((eachData) => (
          <Grid
            item
            key={eachData.id}
            xs={12}
            sm={6}
            lg={4}
            padding={{ xs: 3.5, lg: 2, xl: 3.5 }}
          >
            <DashBoardIndicator
              title={eachData.title}
              value={getDataFromAPI(eachData.title).value}
              image={eachData.img}
              percentage={getDataFromAPI(eachData.title).percentage}
              icon={getDataFromAPI(eachData.title).icon}
              styles={{
                borderRight: {
                  xs: "none",
                  sm: `1px solid ${
                    eachData.id === dummyData.length ||
                    eachData.id === dummyData.length - 1 ||
                    eachData.id === dummyData.length - 3
                      ? "transparent"
                      : hex2rgba(colors.black, 0.1)
                  }`,
                  lg: `1px solid ${
                    eachData.id === dummyData.length ||
                    eachData.id === dummyData.length - 2
                      ? "transparent"
                      : hex2rgba(colors.black, 0.1)
                  }`,
                  xl: `1px solid ${
                    eachData.id === dummyData.length - 2 ||
                    eachData.id === dummyData.length
                      ? "transparent"
                      : hex2rgba(colors.black, 0.1)
                  }`,
                },
              }}
            />
          </Grid>
        ))}
      </Grid>
      <Stack direction={"column"} sx={dashboardStyles.tableContainer}>
        <Stack direction={{ xs: "column", sm: "row" }} marginBottom={"23px"}>
          <ListItemText
            primary={"Screens"}
            secondary={`Total Screens - ${pagination?.totalItems?pagination.totalItems:message}`}
            sx={dashboardStyles.listText}
          />
          <Box sx={dashboardStyles.textFieldContainer}>
            <TextField
              sx={dashboardStyles.textField}
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
                    sx={dashboardStyles.textField.icon}
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

            <Box sx={dashboardStyles.sortContainer}>
              <Box sx={dashboardStyles.sortBox}>
                <Typography sx={dashboardStyles.menuItem}>Sort By:</Typography>
                <FormControl sx={dashboardStyles.sortFormControl}>
                <Select
                    value={selectInput}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    IconComponent={KeyboardArrowDownIcon}
                  >
                    <MenuItem value="asc" sx={dashboardStyles.menuItem}>
                      Oldest
                    </MenuItem>
                    <MenuItem value="desc" sx={dashboardStyles.menuItem}>
                      Newest
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </Box>
        </Stack>
        <Box sx={dashboardStyles.mainTable}>
       {message ? (
          <Typography sx={screenStyles.errorMessage}>{message}</Typography>
          ) : loading ? (
            <Stack
              alignItems={"center"}
              justifyContent={"center"}
              height={"20vh"}
            >
              <CircularProgress />
            </Stack>
          ) : (<TableContainer aria-label="customized table" sx={dashboardStyles.th}>
            <Table sx={{ minWidth: 820 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Screen Name</TableCell>
                  <TableCell align="left">Orientation</TableCell>
                  <TableCell align="left">Currently Playing</TableCell>
                  <TableCell align="left">Screen Price</TableCell>
                  <TableCell align="left">Last Response</TableCell>
                  <TableCell align="center">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {screenData?.length! > 0 &&
                  screenData?.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell align="left" title={row.screenName}>
                    <Stack
                        direction={"row"}
                        gap={1}
                        alignItems={"center"}
                    >
                     <Box
                        component={"img"}
                        src={`row.images[0]${token}`}
                        onError={(event) =>
                        (event.currentTarget.src =
                          cardLayoutPlacedHolderImage)
                        }
                        sx={screenStyles.screenImg}
                        />
                      <Typography title={row.screenName}>
                        {row.screenName ? row.screenName : "-"}
                      </Typography>         
                    </Stack>
                    </TableCell>
                    <TableCell align="left" title={row.orientation}>
                      <Typography>{row.orientation?row.orientation : "-"}</Typography>
                    </TableCell>
                    <TableCell align="left" title={row.currentlyPlaying}>
                      <Typography>{row.currentlyPlaying?row.currentlyPlaying: "-"}</Typography>
                    </TableCell>
                    <TableCell align="left" title={row.screenPrice}>
                      <Typography>{row.screenPrice?row.screenPrice:"-"}</Typography>
                    </TableCell>
                    <TableCell align="left" title={moment(row.updatedAt).startOf('minute').fromNow()}>
                      <Typography>{row.updatedAt ? moment(row.updatedAt).startOf('minute').fromNow() : "-"}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        sx={
                          row.status
                            ? dashboardStyles.activeBtn
                            : dashboardStyles.inActiveBtn
                        }
                      >
                        {row.status ? "Active" : "Inactive"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        </Box>
        {!message && <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent={"space-between"}
          gap={{ xs: 2, sm: "" }}
          alignItems={"center"}
          mt={3}
        >
          <Typography sx={dashboardStyles.paginationText}>
            Showing data 1 to 8 of 256K entries
          </Typography>
          {pagination?.totalPages && pagination?.totalPages > 1 && (
              <Pagination
                count={pagination?.totalPages}
                page={pagination?.currentPage}
                onChange={(_, pageNumber) => {
                  searchInput
                    ? handleSearchPagination(pageNumber)
                    : handlePagination(pageNumber);
                }}
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
            )}
        </Stack>
      }
      </Stack>
    </Box>
  );
};

export default Dashboard;
