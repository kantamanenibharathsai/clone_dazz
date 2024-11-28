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
  addScreen,
  deleteScreenFromGroup,
  getSelectedScreensInGroup,
  IScreen,
  notExistScreensData,
  screensSaveGroup,
} from "../../../../redux/reducers/adminReducers/screenSlice";
import { AppDispatch, RootState } from "../../../../redux/store";
import { displayAlert } from "../../../../utils/toastMessage";
import { searchIcon, UnCheckIcon } from "../../../admin/assets/Index";
import { logsStyles } from "../../../admin/settings/logs/logsStyles";
import { layOutDelete } from "../../../common/assets";
import CommonAlertModal from "../../../common/commonAlertModal/CommonAlertModal";
import { CustomButton } from "../../../common/customButton/CustomButton";
import { screenStyles } from "../../screens/ScreenStyles";
import { canvasNextStyles } from "../canvasNext/CanvasNextStyles";
import { groupsStyles, playListSettingsStyles } from "./PlaylistSettingsStyles";
const tableRows = ["Screen Name", "Screen Tag", "Screen Location", "Status"];
interface IState {
  numberType: number;
  stringType: string;
  booleanType: boolean;
}
const Screens = () => {
  const [selectInput, setSelectInput] = useState<IState["stringType"]>("desc");
  const [searchInput, setSearchInput] = useState<IState["stringType"]>("");
  const [currentPage, setCurrentPage] = useState<IState["numberType"]>(1);
  const [currentPageSelectScreen, setCurrentPageSelectScreen] =
    useState<IState["numberType"]>(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] =
    useState<IState["booleanType"]>(false);
  const { selectedScreensInGroup, notExistedScreens } = useSelector(
    (state: RootState) => state.ScreensSlice
  );
  const dispatch = useDispatch<AppDispatch>();
  const handleChange = (event: SelectChangeEvent) => {
    setSelectInput(event.target.value as string);
  };
  const [slectedScreens, setSelectedScreens] = useState<IScreen[]>([]);
  const [currentScreen, setCurrentScreen] = useState<IScreen | null>(null);

  const { groupId } = useParams();
  const { state: groupName } = useLocation();
  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };
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
  const handleSetCurrentScreen = (screen: IScreen) => {
    setCurrentScreen(screen);
    setIsDeleteModalOpen(true);
  };
  const handleDeleteScreenFromAD = async () => {
    const removeScreenDispatch = await dispatch(
      deleteScreenFromGroup(currentScreen?.id)
    );
    if (removeScreenDispatch.payload.statusCode === "200") {
      setIsDeleteModalOpen(false);
      displayAlert(removeScreenDispatch.payload.message as string, "success");
      handleGetnotExistScreens();
      handleGetScreens();
    } else {
      displayAlert(removeScreenDispatch.payload as string, "error");
    }
  };
  const firstTableStatusJSX = (
    screenData: IScreen[] | null,
    loading: boolean,
    message: string | null
  ) => {
    if (screenData && screenData.length === 0) {
      if (message) {
        return <Typography>{message}</Typography>;
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
      setTimeout(() => {
        window.location.reload();
      }, 500);
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
    await dispatch(
      getSelectedScreensInGroup({
        page: currentPageSelectScreen,
        screenGroupId: groupId!,
      })
    );
    await slectedScreens.forEach((screen) => dispatch(addScreen(screen)));
  };
  useEffect(() => {
    if (searchInput.length) {
      const debouncing = setTimeout(() => {
        handleGetScreens();
      }, 1500);
      return () => clearTimeout(debouncing);
    } else {
      handleGetScreens();
    }
    // eslint-disable-next-line
  }, [dispatch, currentPageSelectScreen]);
  return (
    <>
      <CommonAlertModal
        isModalOpen={isDeleteModalOpen}
        deleteTitle={"Screen"}
        descriptionContent={"screen"}
        handleCancelModal={handleCloseDeleteModal}
        handleActionModal={handleDeleteScreenFromAD}
      />
      <Box sx={groupsStyles.selectScreenBox}>
        <Typography sx={groupsStyles.cmrText}>{groupName}</Typography>
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
                      sx={{
                        visibility:
                          searchInput.length > 0 ? "visible" : "hidden",
                      }}
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
                      <Box sx={canvasNextStyles.loadingTextBox}>
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
                          <Checkbox
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                              handleSelectScreen(screen, event.target.checked)
                            }
                            checked={Boolean(
                              slectedScreens.find(
                                (findScreen) => findScreen.id === screen.id
                              )
                            )}
                            icon={<UnCheckIcon />}
                          />
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
          {notExistedScreens.pagination?.totalPages &&
            notExistedScreens.pagination?.totalPages > 1 && (
              <Box sx={logsStyles.paginationBox}>
                <Pagination
                  count={notExistedScreens.pagination.totalPages}
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
      <Box sx={groupsStyles.tableMainBox}>
        <Box sx={groupsStyles.selectTextBox}>
          <Typography sx={canvasNextStyles.tableHeading}>
            Selected Screens
          </Typography>
          <Box sx={groupsStyles.flexWithGap}>
            <CustomButton
              disabled={Boolean(slectedScreens.length === 0)}
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
            <Table sx={playListSettingsStyles.table} aria-label="simple table">
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
                {firstTableStatusJSX(
                  selectedScreensInGroup.screensData,
                  selectedScreensInGroup.loading,
                  selectedScreensInGroup.message
                ) && (
                  <TableRow>
                    <TableCell align="left" colSpan={4}>
                      <Box sx={canvasNextStyles.loadingTextBox}>
                        <Typography>
                          {firstTableStatusJSX(
                            selectedScreensInGroup.screensData,
                            selectedScreensInGroup.loading,
                            selectedScreensInGroup.message
                          )}
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
                {selectedScreensInGroup.screensData &&
                  selectedScreensInGroup.screensData.length > 0 &&
                  selectedScreensInGroup.screensData.map((screen, index) => (
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
                            onClick={() => handleSetCurrentScreen(screen)}
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
    </>
  );
};

export default Screens;
