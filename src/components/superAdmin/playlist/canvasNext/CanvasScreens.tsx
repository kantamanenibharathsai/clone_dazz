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
import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../../../../config/theme";
import { IScreen } from "../../../../redux/reducers/adminReducers/screenSlice";
import { LoadingStatus } from "../../../../redux/reducers/common/logsSlice";
import {
  addScreenToAdScreens,
  getExistScreensInAd,
  getNotExistScreensInAd,
  removeScreenOrGroupFromAd,
  saveScreensToAd,
} from "../../../../redux/reducers/superAdmin/CanvasNextSlice";
import { AppDispatch, RootState } from "../../../../redux/store";
import { displayAlert } from "../../../../utils/toastMessage";
import { searchIcon, UnCheckIcon } from "../../../admin/assets/Index";
import { logsStyles } from "../../../admin/settings/logs/logsStyles";
import { layOutDelete } from "../../../common/assets";
import CommonAlertModal from "../../../common/commonAlertModal/CommonAlertModal";
import { CustomButton } from "../../../common/customButton/CustomButton";
import { screenStyles } from "../../screens/ScreenStyles";
import { canvasGroupsStyles, canvasNextStyles } from "./CanvasNextStyles";
const tableRows = ["Screen Name", "Screen Tag", "Screen Location", "Status"];
interface IProps {
  adId: number | null;
}
interface IState {
  numberType: number;
  stringType: string;
  booleanType: boolean;
}
const CanvasScreens: React.FC<IProps> = ({ adId }) => {
  const { existScreensInAd, notExistScreensInAd } = useSelector(
    (state: RootState) => state.canvasNextSlice
  );
  const [selectInput, setSelectInput] = useState<IState["stringType"]>("desc");
  const [searchInput, setSearchInput] = useState<IState["stringType"]>("");
  const [firstTableCurrentPage, setFristTableCurrentPage] =
    useState<IState["numberType"]>(1);
  const [secondTableCurrentPage, setSecondTableCurrentPage] =
    useState<IState["numberType"]>(1);
  const [currentScreen, setCurrentScreen] = useState<IScreen | null>(null);
  const [selectedScreens, setSelectedScreens] = useState<IScreen[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] =
    useState<IState["booleanType"]>(false);
  const dispatch = useDispatch<AppDispatch>();
  const handleChange = (event: SelectChangeEvent) => {
    setSelectInput(event.target.value);
  };
  const handleSearchInput = (input: string) => {
    setSearchInput(input);
    setFristTableCurrentPage(1);
  };
  const handleRemoveSearchInput = () => {
    setSearchInput("");
  };
  const handleFirstTablePageChange = (
    _: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setFristTableCurrentPage(value);
  };
  const handleSecondTablePageChange = (
    _: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setSecondTableCurrentPage(value);
  };
  const handleSelectScreen = async (screen: IScreen, isSelect: boolean) => {
    const newScreens = isSelect
      ? [...selectedScreens, screen]
      : selectedScreens.filter((item) => item.id !== screen.id);
    setSelectedScreens(newScreens);
    dispatch(addScreenToAdScreens(screen));
  };
  const firstTableStatusJSX = (
    screenData: IScreen[] | null,
    loadingStatus: LoadingStatus,
    message: string | null
  ) => {
    if (loadingStatus === "PENDING") {
      return <CircularProgress />;
    } else if (
      (screenData && screenData.length === 0) ||
      loadingStatus === "REJECTED"
    ) {
      return <Typography>{message}</Typography>;
    } else {
      return false;
    }
  };
  const handleSaveScreens = async () => {
    const saveScreensDispatch = await dispatch(
      saveScreensToAd({ playlistAdId: adId, screens: selectedScreens })
    );
    if (saveScreensDispatch.payload.statusCode === "200") {
      displayAlert(saveScreensDispatch.payload.message, "success");
      handleGetnotExistScreens();
      handleGetScreens();
      setSelectedScreens([]);
      setSecondTableCurrentPage(1);
      setFristTableCurrentPage(1);
    } else {
      displayAlert(saveScreensDispatch.payload.message, "error");
    }
  };
  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };
  const handleDeleteScreenFromAD = async () => {
    const removeScreenDispatch = await dispatch(
      removeScreenOrGroupFromAd({
        playlistAdId: adId,
        removeItemId: currentScreen?.id,
        isScreen: true,
      })
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
  const handleSetCurrentScreen = (screen: IScreen) => {
    setCurrentScreen(screen);
    setIsDeleteModalOpen(true);
  };
  const handleGetnotExistScreens = async () => {
    return await dispatch(
      getNotExistScreensInAd({
        page: firstTableCurrentPage,
        searchInput: searchInput,
        adId: adId,
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
  }, [searchInput, firstTableCurrentPage, selectInput, dispatch, adId]);
  const handleGetScreens = async () => {
    await dispatch(
      getExistScreensInAd({
        page: secondTableCurrentPage,
        adId: adId,
        sort: selectInput,
      })
    );
    await selectedScreens.forEach((screen) =>
      dispatch(addScreenToAdScreens(screen))
    );
  };
  useEffect(() => {
    handleGetScreens();
    // eslint-disable-next-line
  }, [dispatch, secondTableCurrentPage, adId]);
  return (
    <>
      <CommonAlertModal
        isModalOpen={isDeleteModalOpen}
        deleteTitle={"Screen"}
        descriptionContent={"screen"}
        handleCancelModal={handleCloseDeleteModal}
        handleActionModal={handleDeleteScreenFromAD}
      />
      <Box sx={canvasGroupsStyles.tableMainBox}>
        <Box sx={canvasGroupsStyles.inputsMainBox}>
          <Box sx={canvasGroupsStyles.inputsBox}>
            <Typography sx={canvasNextStyles.tableHeading}>Screen</Typography>
            <Box sx={canvasNextStyles.textFieldBox}>
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
                        sx={{ visibility: searchInput.length > 0 ? "visible" : "hidden" }}
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
        </Box>
        <Box sx={canvasNextStyles.tableBox}>
          <TableContainer
            aria-label="customized table"
            sx={canvasGroupsStyles.tableContainer}
          >
            <Table sx={canvasNextStyles.table} aria-label="simple table">
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
                  notExistScreensInAd.screensData,
                  notExistScreensInAd.loadingStatus,
                  notExistScreensInAd.message
                ) && (
                  <TableRow>
                    <TableCell align="left" colSpan={4}>
                      <Box sx={canvasNextStyles.loadingTextBox}>
                        <Typography>
                          {firstTableStatusJSX(
                            notExistScreensInAd.screensData,
                            notExistScreensInAd.loadingStatus,
                            notExistScreensInAd.message
                          )}
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
                {notExistScreensInAd.screensData &&
                  notExistScreensInAd.screensData.length > 0 &&
                  notExistScreensInAd.screensData.map((screen, index) => (
                    <TableRow key={index}>
                      <TableCell align="left">
                        <Box sx={canvasGroupsStyles.inlineFlexWithGap}>
                          <Checkbox
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                              handleSelectScreen(screen, event.target.checked)
                            }
                            checked={Boolean(
                              selectedScreens.find(
                                (findScreen) => findScreen.id === screen.id
                              )
                            )}
                            icon={<UnCheckIcon />}
                          />
                          <Typography
                            sx={canvasGroupsStyles.tableUpperCaseText}
                            title={screen.screenName}
                          >
                            {screen.screenName}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="left">
                        <Typography
                          component={"span"}
                          sx={canvasGroupsStyles.statusText(true)}
                          title={screen?.tags?.[0]}
                        >
                          {screen?.tags?.[0] ?? "-"}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography
                          sx={canvasGroupsStyles.tableNormalText}
                          title={screen.location}
                        >
                          {screen.location}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography
                          component={"span"}
                          sx={canvasGroupsStyles.statusText(!screen.status)}
                        >
                          {screen.status ? "Offline" : "Online"}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          {notExistScreensInAd.pagination?.totalPages &&
            notExistScreensInAd.pagination?.totalPages > 1 && (
              <Box sx={logsStyles.paginationBox}>
                <Pagination
                  count={notExistScreensInAd.pagination.totalPages}
                  onChange={handleFirstTablePageChange}
                  page={firstTableCurrentPage}
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
      <Box sx={canvasGroupsStyles.tableMainBox}>
        <Box sx={canvasGroupsStyles.selectTextBox}>
          <Typography sx={canvasNextStyles.tableHeading}>
            Selected Screens
          </Typography>
          <Box sx={canvasNextStyles.totalItemsBox}>
            <Typography sx={canvasNextStyles.screensText}>
              {existScreensInAd.pagination?.totalItems ?? 0} Screens
            </Typography>
            <CustomButton
              bgcolor={colors.lightBlue}
              onClick={handleSaveScreens}
              disabled={Boolean(selectedScreens.length === 0)}
            >
              Save Screens
            </CustomButton>
          </Box>
        </Box>
        <Box sx={canvasNextStyles.tableBox}>
          <TableContainer
            aria-label="customized table"
            sx={canvasNextStyles.tableContainer}
          >
            <Table sx={canvasNextStyles.table} aria-label="simple table">
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
                  existScreensInAd.screensData,
                  existScreensInAd.loadingStatus,
                  existScreensInAd.message
                ) && (
                  <TableRow>
                    <TableCell align="left" colSpan={4}>
                      <Box sx={canvasNextStyles.loadingTextBox}>
                        <Typography>
                          {firstTableStatusJSX(
                            existScreensInAd.screensData,
                            existScreensInAd.loadingStatus,
                            existScreensInAd.message
                          )}
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
                {existScreensInAd.screensData &&
                  existScreensInAd.screensData.length > 0 &&
                  existScreensInAd.screensData.map((screen, index) => (
                    <TableRow key={index}>
                      <TableCell align="left">
                        <Typography
                          sx={canvasGroupsStyles.tableUpperCaseText}
                          title={screen.screenName}
                        >
                          {screen.screenName}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography
                          component={"span"}
                          sx={canvasGroupsStyles.statusText(true)}
                          title={screen?.tags?.[0]}
                        >
                          {screen?.tags?.[0]}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography
                          sx={canvasGroupsStyles.tableNormalText}
                          title={screen.location}
                        >
                          {screen.location}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        {Boolean(
                          selectedScreens.find(
                            (findScreen) => findScreen.id === screen.id
                          )
                        ) || (
                          <IconButton
                            onClick={() => handleSetCurrentScreen(screen)}
                            sx={canvasGroupsStyles.iconButton}
                          >
                            <Box
                              component={"img"}
                              src={layOutDelete}
                              sx={canvasNextStyles.deleteImg}
                            />
                          </IconButton>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          {existScreensInAd.pagination?.totalPages &&
            existScreensInAd.pagination?.totalPages > 1 && (
              <Box sx={logsStyles.paginationBox}>
                <Pagination
                  count={existScreensInAd.pagination?.totalPages}
                  onChange={handleSecondTablePageChange}
                  page={secondTableCurrentPage}
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

export default CanvasScreens;
