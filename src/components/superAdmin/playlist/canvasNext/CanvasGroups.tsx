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
import { LoadingStatus } from "../../../../redux/reducers/common/logsSlice";
import {
  addGroupToAdGroups,
  getExistGroupsInAd,
  getNotExistGroupsInAd,
  IGroup,
  removeScreenOrGroupFromAd,
  saveGroupsToAd,
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
import moment from "moment";
const tableRows = [
  "Group Name",
  "Description",
  "Total Screens",
  "Currently Playing",
  "Created At",
];
interface IProps {
  adId: number | null;
}
interface IState {
  numberType: number;
  stringType: string;
  booleanType: boolean;
}
const CanvasGroups: React.FC<IProps> = ({ adId }) => {
  const { existGroupsInAd, notExistGroupsInAd } = useSelector(
    (state: RootState) => state.canvasNextSlice
  );
  const [selectInput, setSelectInput] = useState<IState["stringType"]>("desc");
  const [searchInput, setSearchInput] = useState<IState["stringType"]>("");
  const [firstTableCurrentPage, setFristTableCurrentPage] =
    useState<IState["numberType"]>(1);
  const [secondTableCurrentPage, setSecondTableCurrentPage] =
    useState<IState["numberType"]>(1);
  const [currentScreen, setCurrentScreen] = useState<IGroup | null>(null);
  const [selectedGroups, setSelectedGroups] = useState<IGroup[]>([]);
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

  const handleSelectGroup = async (group: IGroup, isSelect: boolean) => {
    const newGroups = isSelect
      ? [...selectedGroups, group]
      : selectedGroups.filter((item) => item.id !== group.id);
    setSelectedGroups(newGroups);
    dispatch(addGroupToAdGroups(group));
  };

  const firstTableStatusJSX = (
    screenData: IGroup[] | null,
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
  const handleSaveGroup = async () => {
    const saveGroupDispatch = await dispatch(
      saveGroupsToAd({ playlistAdId: adId, groups: selectedGroups })
    );
    if (saveGroupDispatch.payload.statusCode === "200") {
      displayAlert(saveGroupDispatch.payload.message, "success");
      handleGetGroups();
      handleGetnotExistGroups();
      setSelectedGroups([]);
      setFristTableCurrentPage(1);
      setSecondTableCurrentPage(1);
    } else {
      displayAlert(saveGroupDispatch.payload.message, "error");
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
        isScreen: false,
      })
    );
    if (removeScreenDispatch.payload.statusCode === "200") {
      setIsDeleteModalOpen(false);
      displayAlert(removeScreenDispatch.payload.message as string, "success");
      handleGetnotExistGroups();
      handleGetGroups();
    } else {
      displayAlert(removeScreenDispatch.payload as string, "error");
    }
  };
  const handleSetCurrentGroup = (group: IGroup) => {
    setCurrentScreen(group);
    setIsDeleteModalOpen(true);
  };
  const handleGetnotExistGroups = async () => {
    return await dispatch(
      getNotExistGroupsInAd({
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
        handleGetnotExistGroups();
      }, 1500);
      return () => clearTimeout(debouncing);
    } else {
      handleGetnotExistGroups();
    }
    // eslint-disable-next-line
  }, [searchInput, firstTableCurrentPage, selectInput, dispatch, adId]);
  const handleGetGroups = async () => {
    await dispatch(
      getExistGroupsInAd({
        page: secondTableCurrentPage,
        adId: adId,
        sort: selectInput,
      })
    );
    await selectedGroups.forEach((group) =>
      dispatch(addGroupToAdGroups(group))
    );
  };
  useEffect(() => {
    handleGetGroups();
    // eslint-disable-next-line
  }, [dispatch, secondTableCurrentPage, adId]);
  return (
    <>
      <CommonAlertModal
        isModalOpen={isDeleteModalOpen}
        deleteTitle={"Group"}
        descriptionContent={"group"}
        handleCancelModal={handleCloseDeleteModal}
        handleActionModal={handleDeleteScreenFromAD}
      />
      <Box sx={canvasGroupsStyles.tableMainBox}>
        <Box sx={canvasGroupsStyles.inputsMainBox}>
          <Box sx={canvasGroupsStyles.inputsBox}>
            <Typography sx={canvasNextStyles.tableHeading}>
              Screen Groups
            </Typography>
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
                        sx={{ visibility: searchInput.length>0 ? "visible" : "hidden" }}
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
                  {tableRows.map((row) => (
                    <TableCell align="left" key={row}>
                      {row}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {firstTableStatusJSX(
                  notExistGroupsInAd.groupsData,
                  notExistGroupsInAd.loadingStatus,
                  notExistGroupsInAd.message
                ) && (
                  <TableRow>
                    <TableCell align="left" colSpan={5}>
                      <Box sx={canvasNextStyles.loadingTextBox}>
                        <Typography>
                          {firstTableStatusJSX(
                            notExistGroupsInAd.groupsData,
                            notExistGroupsInAd.loadingStatus,
                            notExistGroupsInAd.message
                          )}
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
                {notExistGroupsInAd.groupsData &&
                  notExistGroupsInAd.groupsData.length > 0 &&
                  notExistGroupsInAd.groupsData.map((group) => (
                    <TableRow key={group.id}>
                      <TableCell align="left">
                        <Box sx={canvasGroupsStyles.inlineFlexWithGap}>
                          <Checkbox
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                              handleSelectGroup(group, event.target.checked)
                            }
                            checked={Boolean(
                              selectedGroups.find(
                                (findScreen) => findScreen.id === group.id
                              )
                            )}
                            icon={<UnCheckIcon />}
                          />
                          <Typography
                            sx={canvasGroupsStyles.tableUpperCaseText}
                            title={group.screenGroupName}
                          >
                            {group.screenGroupName}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="left">
                        <Typography
                          sx={canvasGroupsStyles.tableNormalText}
                          title={group.description ?? "-"}
                        >
                          {group.description ?? "-"}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography
                          sx={canvasGroupsStyles.tableNormalText}
                          title={group.screenImagesCount.toString() ?? ""}
                        >
                          {group.screenImagesCount}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography
                          sx={canvasGroupsStyles.tableNormalText}
                          title={group.currentlyPlaying ?? "-"}
                        >
                          {group.currentlyPlaying ?? "-"}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography
                          sx={canvasGroupsStyles.tableNormalText}
                          title={
                            group.createdAt ? moment(group.createdAt).format('DD/MM/YYYY') : "-"
                          }
                        >
                          {group.createdAt ? moment(group.createdAt).format('DD/MM/YYYY') : "-"}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          {notExistGroupsInAd.pagination?.totalPages &&
            notExistGroupsInAd.pagination?.totalPages > 1 && (
              <Box sx={logsStyles.paginationBox}>
                <Pagination
                  count={notExistGroupsInAd.pagination.totalPages}
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
            Selected Groups Screen
          </Typography>
          <Box sx={canvasNextStyles.totalItemsBox}>
            <Typography sx={canvasNextStyles.screensText}>
              {existGroupsInAd.pagination?.totalItems ?? 0} Groups
            </Typography>
            <CustomButton
              bgcolor={colors.lightBlue}
              onClick={handleSaveGroup}
              disabled={Boolean(selectedGroups.length === 0)}
            >
              Save Groups
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
                  {tableRows.map((row) => (
                    <TableCell align="left" key={row}>
                      {row}
                    </TableCell>
                  ))}
                  <TableCell align="left">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {firstTableStatusJSX(
                  existGroupsInAd.groupsData,
                  existGroupsInAd.loadingStatus,
                  existGroupsInAd.message
                ) && (
                  <TableRow>
                    <TableCell align="left" colSpan={6}>
                      <Box sx={canvasNextStyles.loadingTextBox}>
                        <Typography>
                          {firstTableStatusJSX(
                            existGroupsInAd.groupsData,
                            existGroupsInAd.loadingStatus,
                            existGroupsInAd.message
                          )}
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
                {existGroupsInAd.groupsData &&
                  existGroupsInAd.groupsData.length > 0 &&
                  existGroupsInAd.groupsData.map((group) => (
                    <TableRow key={group.id}>
                      <TableCell align="left">
                        <Typography
                          sx={canvasGroupsStyles.tableNormalText}
                          title={group.screenGroupName}
                        >
                          {group.screenGroupName}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography
                          sx={canvasGroupsStyles.tableNormalText}
                          title={group.description ?? "-"}
                        >
                          {group.description ?? "-"}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography
                          sx={canvasGroupsStyles.tableNormalText}
                          title={group.screenImagesCount.toString() ?? ""}
                        >
                          {group.screenImagesCount}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography
                          sx={canvasGroupsStyles.tableNormalText}
                          title={group.currentlyPlaying ?? "-"}
                        >
                          {group.currentlyPlaying ?? "-"}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography
                          sx={canvasGroupsStyles.tableNormalText}
                          title={
                            group.createdAt ? moment(group.createdAt).format('DD/MM/YYYY') : "-"
                          }
                        >
                          {group.createdAt ? moment(group.createdAt).format('DD/MM/YYYY') : "-"}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        {Boolean(
                          selectedGroups.find(
                            (findScreen) => findScreen.id === group.id
                          )
                        ) || (
                          <IconButton
                            onClick={() => handleSetCurrentGroup(group)}
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
          {existGroupsInAd.pagination?.totalPages &&
            existGroupsInAd.pagination?.totalPages > 1 && (
              <Box sx={logsStyles.paginationBox}>
                <Pagination
                  count={existGroupsInAd.pagination?.totalPages}
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

export default CanvasGroups;
