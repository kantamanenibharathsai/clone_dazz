import AddIcon from "@mui/icons-material/Add";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ClearIcon from "@mui/icons-material/Clear";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  Box,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
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
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { colors, hex2rgba } from "../../../config/theme";
import { getAdminDashboardData } from "../../../redux/reducers/adminReducers/dashboardSlice";
import {
  deleteScreen,
  deleteScreenGroup,
  getScreenGroupData,
  getScreensData,
  updateGroupData,
} from "../../../redux/reducers/adminReducers/screenSlice";
import { AppDispatch, RootState } from "../../../redux/store";
import { useRoutePermissions } from "../../../utils/useRoutePermissions";
import { formateDate } from "../../../utils/utils";
import { cardLayoutPlacedHolderImage, layOutDelete } from "../../common/assets";
import { CustomButton } from "../../common/customButton/CustomButton";
import DashBoardIndicator from "../../common/dashboardIndicator/DashBoardIndicator";
import DadzsDropzone from "../../common/dropZone/DadzDropZone";
import { InputField } from "../../common/inputField/InputField";
import { ModalStyled } from "../../common/modal/CommonModal";
import {
  ads,
  deleteIcon,
  editIcon,
  profile,
  profileTick,
  searchIcon,
  settingsIcon,
} from "../assets/Index";
import { screenStyles } from "./ScreenStyles";
import AddNew from "./addNew/AddNew";
import { addScreenStyles } from "./newScreen/AddScreenStyles";

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
];
const screenHeaders = [
  "Screen Name",
  "Description",
  "Currently Playing",
  "Screen Price",
];
const groupHeaders = [
  "Group Name",
  "Description",
  "Total Screens",
  "Currently Playing",
  "Created At",
];
interface IState {
  activeId: null | number;
  mediaFile: File[] | string[];
}
const Screens = () => {
  const permission = useRoutePermissions();
  const [disableBtn, setDisableBtn] = useState(false);
  const [selectInput, setSelectInput] = useState("desc");
  const [selectGroup, setSelectGroup] = useState("desc");
  const [searchInput, setSearchInput] = useState("");
  const [searchGroupInput, setSearchGroupInput] = useState("");
  const [toggleTable, setToggleTable] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchPage, setSearchPage] = useState(1);
  const [searchGroupPage, setSearchGroupPage] = useState(1);
  const [currentGroupPage, setCurrentGroupPage] = useState(1);
  const [groupModal, setGroupModal] = useState(false);
  const [activeId, setActiveId] = useState<IState["activeId"]>(null);
  const [headers, setHeaders] = useState(screenHeaders);
  const [mediaFile, setMediaFile] = useState<IState["mediaFile"]>([]);
  const [updateGroup, setUpdateGroup] = useState({
    id: 0,
    value: "",
    error: "",
  });
  const { screenData, screenGroupData, pagination, message, loading } =
    useSelector((state: RootState) => state.ScreensSlice);
  const { token } = useSelector((state: RootState) => state.Auth);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleCreateScreen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event: SelectChangeEvent) => {
    if (toggleTable) {
      setSelectGroup(event.target.value);
      dispatch(
        getScreenGroupData({
          searchGroupInput,
          page: searchGroupInput ? searchGroupPage : currentGroupPage,
          sort: event.target.value,
        })
      );
    } else {
      setSelectInput(event.target.value as string);
      dispatch(
        getScreensData({
          searchInput,
          page: searchInput ? searchPage : currentPage,
          sort: event.target.value,
        })
      );
    }
  };
  const handleSearchInput = (input: string) => {
    if (toggleTable) {
      setSearchGroupInput(input);
    } else {
      setSearchInput(input);
    }
  };
  const handleRemoveSearchInput = () => {
    if (toggleTable) {
      setSearchGroupInput("");
    } else {
      setSearchInput("");
    }
  };
  const handleGroup = () => {
    if (!toggleTable) {
      setToggleTable(true);
      setHeaders(groupHeaders);
      dispatch(
        getScreenGroupData({
          page: currentGroupPage,
          searchGroupInput,
          sort: selectGroup,
        })
      );
    }
  };
  const handleAll = () => {
    if (toggleTable) {
      setToggleTable(false);
      setHeaders(screenHeaders);
      dispatch(
        getScreensData({
          page: currentPage,
          searchInput,
          sort: selectInput,
        })
      );
    }
  };
  const handleOpenDelete = (screenId: number) => {
    setDeleteModal(true);
    setActiveId(screenId);
  };
  const handleCloseDelete = async () => {
    if (disableBtn) return;
    setDisableBtn(true);
    if (toggleTable) {
      const response = await dispatch(
        deleteScreenGroup({
          screenGroupId: activeId,
          page: searchGroupInput ? searchGroupPage : currentGroupPage,
          searchGroupInput,
          sort: selectGroup,
        })
      );
      response.payload?.statusCode === "200" && setDeleteModal(false);
    } else {
      const response = await dispatch(
        deleteScreen({
          screenId: activeId,
          page: searchInput ? searchPage : currentPage,
          searchInput,
          sort: selectInput,
        })
      );
      response.payload?.statusCode === "200" && setDeleteModal(false);
    }
    setDisableBtn(false);
    setActiveId(null);
  };
  const handlePagination = (newPage: number) => {
    if (toggleTable) {
      setCurrentGroupPage(newPage);
      dispatch(
        getScreenGroupData({
          page: newPage,
          sort: selectGroup,
        })
      );
    } else {
      setCurrentPage(newPage);
      dispatch(getScreensData({ page: newPage, sort: selectInput }));
    }
  };
  const handleSearchPagination = (newPage: number) => {
    if (toggleTable) {
      setSearchGroupPage(newPage);
      dispatch(
        getScreenGroupData({
          page: newPage,
          searchGroupInput,
          sort: selectGroup,
        })
      );
    } else {
      setSearchPage(newPage);
      dispatch(
        getScreensData({ page: newPage, searchInput, sort: selectInput })
      );
    }
  };
  const calculateAmount = (amount: number) => {
    const amountString = amount.toString();

    if (amountString.length >= 6 && amountString.length < 7) {
      return `${
        Number(amountString) > 100000
          ? amountString.slice(0, 2).split("").join(".")
          : amountString.slice(0, 1)
      } L`;
    } else if (amountString.length > 6 && amountString.length <= 7) {
      return `${amountString.slice(0, 2)} L`;
    } else if (amountString.length >= 8 && amountString.length < 9) {
      return `${
        Number(amountString) > 10000000
          ? amountString.slice(0, 2).split("").join(".")
          : amountString.slice(0, 1)
      } Cr`;
    } else if (amountString.length > 8 && amountString.length <= 9) {
      return `${amountString.slice(0, 2)} Cr`;
    } else {
      return `${Number(amountString).toLocaleString()}`;
    }
  };
  const handleGroupModal = (id: number, name: string) => {
    setUpdateGroup({ id: id, value: name, error: "" });
    setGroupModal(!groupModal);
  };
  const handleGroupInput = (value: string) => {
    setUpdateGroup({ ...updateGroup, value: value, error: "" });
  };
  const handleUpdateGroup = async () => {
    const regex = /^[a-zA-Z]{3,}$/;
    if (disableBtn) return;
    setDisableBtn(true);
    if (regex.test(updateGroup.value)) {
      const response = await dispatch(
        updateGroupData({
          screenGroupId: updateGroup.id,
          groupName: updateGroup.value,
          file: mediaFile,
          page: searchGroupInput ? searchGroupPage : currentGroupPage,
          searchGroupInput,
          sort: selectGroup,
        })
      );
      if (response.payload?.statusCode === "200") {
        setMediaFile([]);
        setUpdateGroup({ id: 0, value: "", error: "" });
        setGroupModal(false);
      }
    } else {
      setUpdateGroup({
        ...updateGroup,
        error: !updateGroup.value ? "Please enter a name" : "Invalid Name",
      });
    }
    setDisableBtn(false);
  };
  const handleUpload = (file: File[]) => {
    setMediaFile(file);
  };
  useEffect(() => {
    const search = toggleTable ? searchGroupInput : searchInput;
    if (search.length === 0) {
      toggleTable
        ? dispatch(
            getScreenGroupData({
              page: currentGroupPage,
              searchGroupInput,
              sort: selectGroup,
            })
          )
        : dispatch(
            getScreensData({
              page: currentPage,
              searchInput,
              sort: selectInput,
            })
          );
    } else {
      const searchData = setTimeout(() => {
        toggleTable
          ? dispatch(
              getScreenGroupData({
                page: searchGroupPage,
                searchGroupInput,
                sort: selectGroup,
              })
            )
          : dispatch(
              getScreensData({
                page: searchPage,
                searchInput,
                sort: selectInput,
              })
            );
      }, 1000);
      return () => clearTimeout(searchData);
    }
    // eslint-disable-next-line
  }, [searchInput, searchGroupInput, dispatch]);
  const { data, error } = useSelector(
    (state: RootState) => state.AdminDashboardSlice
  );
  useEffect(() => {
    dispatch(getAdminDashboardData());
  }, [dispatch]);
  const getDataFromAPI = (title: string) => {
    const getValue = (
      value?: number | undefined,
      change?: string | undefined,
      icon?: string
    ) => {
      return {
        value,
        percentage: change ? calculatePercentage(change) : undefined,
        icon: icon
          ? icon.slice(icon.indexOf("(") + 1, icon.indexOf(")"))
          : undefined,
      };
    };
    switch (title) {
      case "Online Screens":
        return getValue(
          data?.onlineScreens,
          data?.onlineScreenChange,
          data?.onlineScreenChange
        );
      case "Offline Screens":
        return getValue(
          data?.offlineScreens,
          data?.offlineScreenChange,
          data?.offlineScreenChange
        );
      case "Total Screens":
        return getValue(data?.totalScreens);
      default:
        return { value: undefined, percentage: undefined, icon: undefined };
    }
  };
  const calculatePercentage = (
    change: string | undefined
  ): number | undefined => {
    const parsedChange = parseFloat(change ?? "");
    return isNaN(parsedChange) ? undefined : parsedChange;
  };
  const handleSceenGroupSetting = (
    groupName: string,
    screenGropuId: number
  ) => {
    navigate(`/Screens/settings/${screenGropuId}`,{state:groupName});
  };
  const handleCloseGroup = () => {
    setGroupModal(false);
    setMediaFile([]);
  };
  return (
    <Box sx={screenStyles.mainContainer}>
      <ModalStyled open={open} onClose={handleClose}>
        <AddNew handleClose={handleClose} />
      </ModalStyled>
      <ModalStyled
        open={deleteModal}
        isClose={false}
        isbgColor={colors.lightBlack}
      >
        <Box sx={screenStyles.modalBox}>
          <Box>
            <Typography sx={screenStyles.deleteAdsText}>
              Delete Screen
            </Typography>
            <Typography sx={screenStyles.areYouText}>
              Are you sure want to delete this screen?
            </Typography>
          </Box>
          <Box sx={screenStyles.buttonsBox}>
            <CustomButton
              bgcolor={colors.blueChalk}
              textColor={colors.black}
              width={128}
              onClick={() => setDeleteModal(false)}
            >
              Cancel
            </CustomButton>
            <CustomButton
              bgcolor={colors.validate}
              width={158}
              onClick={handleCloseDelete}
              endIcon={
                <Box
                  component={"img"}
                  src={layOutDelete}
                  sx={screenStyles.edit}
                />
              }
            >
              Delete
            </CustomButton>
          </Box>
        </Box>
      </ModalStyled>
      <ModalStyled open={groupModal} onClose={handleCloseGroup}>
        <Stack
          direction={"column"}
          gap={2}
          sx={addScreenStyles.groupModal.modalGroup}
        >
          <Typography sx={addScreenStyles.mediaModal.uploadText}>
            Update Group Name
          </Typography>
          <Box sx={addScreenStyles.groupModal.inputContainer}>
            <InputField
              inputProps={{
                placeholder: `Group Name`,
                name: "groupName",
                value: updateGroup.value,
                onChange: (event) => handleGroupInput(event.target.value),
                helperText: (
                  <Typography sx={addScreenStyles.error}>
                    {updateGroup.error}
                  </Typography>
                ),
                error: updateGroup.error ? true : false,
                sx: { width: "100%" },
              }}
            />
          </Box>

          <DadzsDropzone
            uploadFileSetter={(file: File[]) => handleUpload(file)}
            uploadFiles={mediaFile}
            boxStyle={{ sx: { height: "180px" } }}
          />

          <CustomButton
            sx={addScreenStyles.groupModal.addBtn}
            onClick={() => handleUpdateGroup()}
          >
            submit
          </CustomButton>
        </Stack>
      </ModalStyled>
      <Grid container sx={screenStyles.container}>
        {loading ? (
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
        ) : error ? (
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
        ) : (
          dummyData.map((item) => (
            <Grid
              item
              xs={12}
              sm={6}
              lg={4}
              padding={{ xs: 3.5, lg: 2, xl: 3.5 }}
              key={item.id}
            >
              <DashBoardIndicator
                title={item.title}
                value={getDataFromAPI(item.title).value}
                image={item.img}
                percentage={getDataFromAPI(item.title).percentage}
                icon={getDataFromAPI(item.title).icon}
                styles={{
                  borderRight: {
                    xs: "none",
                    sm: `1px solid ${
                      item.id === dummyData.length ||
                      item.id === dummyData.length - 1
                        ? "transparent"
                        : hex2rgba(colors.black, 0.1)
                    }`,
                    lg: `1px solid ${
                      item.id === dummyData.length
                        ? "transparent"
                        : hex2rgba(colors.black, 0.1)
                    }`,
                    xl: `1px solid ${
                      item.id === dummyData.length
                        ? "transparent"
                        : hex2rgba(colors.black, 0.1)
                    }`,
                  },
                }}
              />
            </Grid>
          ))
        )}
      </Grid>
      <Stack direction={"row"} gap={2} mb={3}>
        <CustomButton
          width={"140px"}
          sx={toggleTable ? screenStyles.tableBtn : screenStyles.activeTableBtn}
          onClick={handleAll}
        >
          All Screens
        </CustomButton>
        <CustomButton
          width="170px"
          sx={
            !toggleTable ? screenStyles.tableBtn : screenStyles.activeTableBtn
          }
          onClick={handleGroup}
        >
          Screen Groups
        </CustomButton>
        {permission.create && (
          <CustomButton
            sx={screenStyles.addBtn}
            endIcon={<AddIcon />}
            onClick={() => handleCreateScreen()}
          >
            Add New
          </CustomButton>
        )}
      </Stack>
      <Stack direction={"column"} sx={screenStyles.tableContainer}>
        <Stack direction={{ xs: "column", sm: "row" }} marginBottom={"25px"}>
          <ListItemText
            primary={!toggleTable ? "Screens" : "Screen Group"}
            secondary={`Total Screens - ${
              pagination?.totalItems ? pagination.totalItems : message
            }`}
            sx={screenStyles.listText}
          />
          <Box sx={screenStyles.textFieldContainer}>
            <TextField
              sx={screenStyles.textField}
              type="text"
              placeholder="Search"
              value={toggleTable ? searchGroupInput : searchInput}
              onChange={(event) => handleSearchInput(event.target.value)}
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
                      sx={{ opacity: searchInput ? 1 : 0 }}
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
                    value={toggleTable ? selectGroup : selectInput}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    IconComponent={KeyboardArrowDownIcon}
                  >
                    <MenuItem value="asc" sx={screenStyles.menuItem}>
                      Oldest
                    </MenuItem>
                    <MenuItem value="desc" sx={screenStyles.menuItem}>
                      Newest
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </Box>
        </Stack>
        <Box sx={screenStyles.tableMainContainer}>
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
          ) : (
            <TableContainer aria-label="customized table" sx={screenStyles.th}>
              <Table sx={{ minWidth: 820 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {headers.map((each, index) => (
                      <TableCell align="left" key={index}>
                        <Typography>{each}</Typography>
                      </TableCell>
                    ))}
                    <TableCell align="left">
                      <Typography>Action</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                {toggleTable ? (
                  <TableBody>
                    {screenGroupData!.length > 0 &&
                      screenGroupData?.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell align="left">
                            <Stack
                              direction={"row"}
                              gap={1}
                              alignItems={"center"}
                            >
                              <Box
                                component={"img"}
                                src={row.screenGroupImage}
                                onError={(event) =>
                                  (event.currentTarget.src =
                                    cardLayoutPlacedHolderImage)
                                }
                                sx={screenStyles.screenImg}
                              />
                              <Typography title={row.screenGroupName}>
                                {row.screenGroupName ?? "-"}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left" title={row.description}>
                            <Typography>{row.description ?? "-"}</Typography>
                          </TableCell>
                          <TableCell align="left">
                            <Typography>
                              {row.screenImagesCount ?? "-"}
                            </Typography>
                          </TableCell>
                          <TableCell align="left">
                            <Typography>
                              {row.currentlyPlaying ?? "-"}
                            </Typography>
                          </TableCell>
                          <TableCell align="left">
                            <Typography>
                              {row.createdAt ? formateDate(row.createdAt) : "-"}
                            </Typography>
                          </TableCell>
                          <TableCell align="left">
                            <Stack direction={"row"} alignItems={"center"}>
                              {permission.edit && (
                                <IconButton
                                  sx={screenStyles.editStyle}
                                  onClick={() =>
                                    handleGroupModal(
                                      row.id,
                                      row.screenGroupName
                                    )
                                  }
                                >
                                  <Box component={"img"} src={editIcon} />
                                </IconButton>
                              )}
                              <IconButton
                                sx={screenStyles.settingStyle}
                                onClick={() =>
                                  handleSceenGroupSetting(
                                    row.screenGroupName,
                                    row.id
                                  )
                                }
                              >
                                <Box component={"img"} src={settingsIcon} />
                              </IconButton>
                              {permission.delete && (
                                <IconButton
                                  sx={screenStyles.deleteStyle}
                                  onClick={() => handleOpenDelete(row.id)}
                                >
                                  <Box component={"img"} src={deleteIcon} />
                                </IconButton>
                              )}
                            </Stack>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                ) : (
                  <TableBody>
                    {screenData?.length! > 0 &&
                      screenData?.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell align="left">
                            <Stack
                              direction={"row"}
                              gap={1}
                              alignItems={"center"}
                            >
                              <Box
                                component={"img"}
                                src={row.images[0]?.url + "/" + token!}
                                onError={(event) =>
                                  (event.currentTarget.src =
                                    cardLayoutPlacedHolderImage)
                                }
                                sx={screenStyles.screenImg}
                              />
                              <Typography title={row.screenName}>
                                {row.screenName ?? "-"}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left" title={row.description}>
                            <Typography>{row.description ?? "-"}</Typography>
                          </TableCell>
                          <TableCell align="left">
                            <Typography>
                              {row.currentlyPlaying ?? "-"}
                            </Typography>
                          </TableCell>
                          <TableCell align="left">
                            <Typography>{row.screenPrice ?? "-"}</Typography>
                          </TableCell>
                          <TableCell align="left">
                            <IconButton
                              sx={screenStyles.settingStyle}
                              onClick={() =>
                                navigate(`/screens/edit/${row.id}`)
                              }
                            >
                              <Box component={"img"} src={settingsIcon} />
                            </IconButton>
                            {permission.delete && (
                              <IconButton
                                sx={screenStyles.deleteStyle}
                                onClick={() => handleOpenDelete(row.id)}
                              >
                                <Box component={"img"} src={deleteIcon} />
                              </IconButton>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          )}
        </Box>
        {!message && (
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent={"space-between"}
            gap={{ xs: 2, sm: "" }}
            alignItems={"center"}
            mt={3}
          >
            <Typography sx={screenStyles.paginationText}>
              Showing data 1 to{" "}
              {toggleTable
                ? screenGroupData && screenGroupData.length
                : screenData && screenData.length}{" "}
              of {pagination && calculateAmount(pagination.totalItems)} entries
            </Typography>
            {pagination?.totalPages && pagination?.totalPages > 1 && (
              <Pagination
                count={pagination?.totalPages}
                page={pagination?.currentPage}
                sx={screenStyles.paginationActiveColor}
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
        )}
      </Stack>
    </Box>
  );
};

export default Screens;
