import {
  ChevronLeft,
  ChevronRight,
  KeyboardArrowDown,
} from "@mui/icons-material";
import {
  Box,
  Checkbox,
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  MenuItem,
  Pagination,
  PaginationItem,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { ClearIcon } from "@mui/x-date-pickers";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { colors } from "../../../../config/theme";
import {
  IScreen,
  addScreen,
  deleteScreenFromGroup,
  getScreensData,
  notExistScreensData,
  screensSaveGroup,
} from "../../../../redux/reducers/adminReducers/screenSlice";
import { AppDispatch, RootState } from "../../../../redux/store";
import { displayAlert } from "../../../../utils/toastMessage";
import { useRoutePermissions } from "../../../../utils/useRoutePermissions";
import { layOutDelete } from "../../../common/assets";
import { CustomButton } from "../../../common/customButton/CustomButton";
import { UnCheckIcon, searchIcon } from "../../assets/Index";
import { screenStyles } from "../../screens/ScreenStyles";
import { logsStyles } from "../../settings/logs/logsStyles";
import { groupsStyles, playListSettingsStyles } from "./PlaylistSettingsStyles";
const tableRows = ["Screen Name", "Screen Tag", "Screen Location", "Status"];
const Screens = () => {
  const [selectInput, setSelectInput] = useState("desc");
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSelectScreen, setCurrentPageSelectScreen] = useState(1);
  const {
    screenData,
    pagination,
    message,
    loading,
    selectedScreensInGroup,
    notExistedScreens,
  } = useSelector((state: RootState) => state.ScreensSlice);
  const dispatch = useDispatch<AppDispatch>();
  const permissions = useRoutePermissions();
  const handleChange = (event: SelectChangeEvent) => {
    setSelectInput(event.target.value as string);
  };
  const [slectedScreens, setSelectedScreens] = useState<IScreen[]>([]);
  const {  groupId } = useParams();
  const groupName = useLocation();
  const handleSearchInput = (input: string) => {
    setSearchInput(input);
    setCurrentPage(1);
  };
  const handleRemoveSearchInput = () => {
    setSearchInput("");
  };
  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };
  const handleSelectScreenPageChange = (
    _: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPageSelectScreen(value);
  };
  const handleSelectScreen = async (screen: IScreen, isSelect: boolean) => {
    const newScreens = isSelect
      ? [...slectedScreens, screen]
      : slectedScreens.filter((item) => item.id !== screen.id);
    setSelectedScreens(newScreens);
    dispatch(addScreen(screen));
  };
  const handleDeleteScreen = async (screenId: number) => {
    const deleteScreen = await dispatch(deleteScreenFromGroup(screenId));
    if (deleteScreen.payload.statusCode === "200") {
      displayAlert(deleteScreen.payload.message, "success");
      handleGetnotExistScreens();
      handleGetScreens();
    }
  };
  const firstTableStatusJSX = (
    screenData: IScreen[] | null,
    loading: boolean,
    message: string | null
  ) => {
    if (screenData && screenData.length === 0) {
      if (message) {
        return <Typography color={colors.validate}>{message}</Typography>;
      } else {
        return <Typography>Data Not Found !!</Typography>;
      }
    } else if (loading) {
      return <CircularProgress />;
    } else {
      return false;
    }
  };
  const handleSaveGroup = async () => {
    const saveGroupDispatch = await dispatch(
      screensSaveGroup({ screenGroupId: groupId!, screens: slectedScreens })
    );
    if (saveGroupDispatch.payload.statusCode === "200") {
      displayAlert(saveGroupDispatch.payload.message, "success");
      handleGetnotExistScreens();
      handleGetScreens();
      setSelectedScreens([]);
    }
  };
  const handleGetnotExistScreens = async () => {
    return await dispatch(
      notExistScreensData({
        page: currentPage,
        searchInput: searchInput,
        notScreenGroupId: groupId!,
        sort: selectInput,
      })
    );
  };
  useEffect(() => {
    if (searchInput.length) {
      const debouncing = setTimeout(() => {
        handleGetnotExistScreens();
      }, 1500);
      return () => clearTimeout(debouncing);
    } else {
      handleGetnotExistScreens();
    }
    // eslint-disable-next-line
  }, [searchInput, currentPage, selectInput, dispatch]);
  const handleGetScreens = async () => {
    return await dispatch(
      getScreensData({
        page: currentPage,
        searchInput: searchInput,
        screenGroupId: groupId!,
        sort: selectInput,
      })
    );
  };
  useEffect(() => {
    if (searchInput.length) {
      const debouncing = setTimeout(() => {
        handleGetScreens();
      }, 1000);
      return () => clearTimeout(debouncing);
    } else {
      handleGetScreens();
    }
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <Box sx={groupsStyles.selectScreenBox}>
        <Typography sx={groupsStyles.cmrText}>{groupName.state}</Typography>
        <CustomButton endIcon={<KeyboardArrowDown />}>Screens</CustomButton>
      </Box>
      <Box sx={groupsStyles.tableMainBox}>
        <Box sx={groupsStyles.inputsMainBox}>
          <Box sx={groupsStyles.inputsBox}>
            <TextField
              sx={screenStyles.textField}
              value={searchInput}
              onChange={(event) => handleSearchInput(event.target.value)}
              type="text"
              placeholder="Search"
              InputProps={{
                startAdornment: (
                  <Box
                    component={"img"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    sx={screenStyles.textField.icon}
                    src={searchIcon}
                  />
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <ClearIcon
                      cursor={"pointer"}
                      onClick={handleRemoveSearchInput}
                      sx={{ Visibility: true ? "Visibility" : "hidden" }}
                    />
                  </InputAdornment>
                ),
              }}
            />
            <Box sx={screenStyles.sortContainer}>
              <Box sx={screenStyles.sortBox}>
                <Typography sx={screenStyles.menuItem}>Sort By :</Typography>
                <FormControl sx={screenStyles.sortFormControl}>
                  <Select
                    value={selectInput}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    IconComponent={KeyboardArrowDown}
                  >
                    <MenuItem value="asc" sx={screenStyles.menuItem}>
                      Ascending
                    </MenuItem>
                    <MenuItem value="desc" sx={screenStyles.menuItem}>
                      Descending
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box sx={playListSettingsStyles.tableBox}>
          <TableContainer
            aria-label="customized table"
            sx={groupsStyles.tableContainer}
          >
            <Table sx={playListSettingsStyles.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {tableRows.map((row, index: number) => (
                    <TableCell align="left" key={index}>
                      {row}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {firstTableStatusJSX(
                  notExistedScreens.screensData,
                  notExistedScreens.loading,
                  notExistedScreens.message
                ) && (
                  <TableRow>
                    <TableCell align="left" colSpan={4}>
                      <Box sx={{ display: "grid", placeItems: "center" }}>
                        <Typography>
                          {firstTableStatusJSX(
                            notExistedScreens.screensData,
                            notExistedScreens.loading,
                            notExistedScreens.message
                          )}
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
                {notExistedScreens.screensData &&
                  notExistedScreens.screensData.length > 0 &&
                  notExistedScreens.screensData.map((screen, index) => (
                    <TableRow key={index}>
                      <TableCell align="left">
                        <Box sx={groupsStyles.inlineFlexWithGap}>
                          {permissions.edit && (
                            <Checkbox
                              onChange={(
                                event: ChangeEvent<HTMLInputElement>
                              ) =>
                                handleSelectScreen(screen, event.target.checked)
                              }
                              checked={Boolean(
                                slectedScreens.find(
                                  (findScreen) => findScreen.id === screen.id
                                )
                              )}
                              icon={<UnCheckIcon />}
                            />
                          )}
                          <Typography
                            sx={groupsStyles.tableUpperCaseText}
                            title={screen.screenName}
                          >
                            {screen.screenName}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="left">
                        <Typography
                          component={"span"}
                          sx={groupsStyles.statusText(true)}
                          title={screen?.tags?.[0]}
                        >
                          {screen?.tags?.[0] ?? "-"}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography
                          sx={groupsStyles.tableNormalText}
                          title={screen.location}
                        >
                          {screen.location}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography
                          component={"span"}
                          sx={groupsStyles.statusText(!screen.status)}
                        >
                          {screen.status ? "Offline" : "Online"}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          {pagination?.totalPages && pagination?.totalPages > 1 && (
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
                      previous: ChevronLeft,
                      next: ChevronRight,
                    }}
                    {...item}
                  />
                )}
              />
            </Box>
          )}
        </Box>
      </Box>
      {permissions.edit && (
        <Box sx={groupsStyles.tableMainBox}>
          <Box sx={groupsStyles.selectTextBox}>
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: "clamp(1.1875rem, 1.1645rem + 0.1316vw, 1.375rem)",
              }}
            >
              Selected Screens
            </Typography>
            <Box sx={groupsStyles.flexWithGap}>
              <CustomButton
                bgcolor={colors.lightBlue}
                onClick={handleSaveGroup}
              >
                Save Group
              </CustomButton>
            </Box>
          </Box>
          <Box sx={playListSettingsStyles.tableBox}>
            <TableContainer
              aria-label="customized table"
              sx={playListSettingsStyles.tableContainer}
            >
              <Table
                sx={playListSettingsStyles.table}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    {tableRows.map((row, index: number) => (
                      <TableCell align="left" key={index}>
                        {index === 3 ? "action" : row}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {firstTableStatusJSX(screenData, loading, message) && (
                    <TableRow>
                      <TableCell align="left" colSpan={4}>
                        <Box sx={{ display: "grid", placeItems: "center" }}>
                          <Typography>
                            {firstTableStatusJSX(screenData, loading, message)}
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  )}
                  {screenData &&
                    screenData.length > 0 &&
                    screenData.map((screen, index) => (
                      <TableRow key={index}>
                        <TableCell align="left">
                          <Typography
                            sx={groupsStyles.tableUpperCaseText}
                            title={screen.screenName}
                          >
                            {screen.screenName}
                          </Typography>
                        </TableCell>
                        <TableCell align="left">
                          <Typography
                            component={"span"}
                            sx={groupsStyles.statusText(true)}
                            title={screen?.tags?.[0]}
                          >
                            {screen?.tags?.[0]}
                          </Typography>
                        </TableCell>
                        <TableCell align="left">
                          <Typography
                            sx={groupsStyles.tableNormalText}
                            title={screen.location}
                          >
                            {screen.location}
                          </Typography>
                        </TableCell>
                        <TableCell align="left">
                          {Boolean(
                            slectedScreens.find(
                              (findScreen) => findScreen.id === screen.id
                            )
                          ) || (
                            <IconButton
                              onClick={() => handleDeleteScreen(screen.id)}
                              sx={groupsStyles.iconButton}
                            >
                              <Box
                                component={"img"}
                                src={layOutDelete}
                                sx={playListSettingsStyles.deleteImg}
                              />
                            </IconButton>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            {selectedScreensInGroup.pagination?.totalPages &&
              selectedScreensInGroup.pagination?.totalPages > 1 && (
                <Box sx={logsStyles.paginationBox}>
                  <Pagination
                    count={selectedScreensInGroup.pagination?.totalPages}
                    onChange={handleSelectScreenPageChange}
                    page={currentPageSelectScreen}
                    sx={logsStyles.paginationActiveColor}
                    siblingCount={0}
                    renderItem={(item) => (
                      <PaginationItem
                        slots={{
                          previous: ChevronLeft,
                          next: ChevronRight,
                        }}
                        {...item}
                      />
                    )}
                  />
                </Box>
              )}
          </Box>
        </Box>
      )}
    </>
  );
};

export default Screens;
