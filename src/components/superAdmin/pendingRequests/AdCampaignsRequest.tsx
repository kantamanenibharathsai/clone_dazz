import { Close, Done } from "@mui/icons-material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {
  Box,
  Button,
  Grid,
  Icon,
  IconButton,
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
  TypographyProps,
} from "@mui/material";
import moment from "moment";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { colors } from "../../../config/theme";
import {
  assignCampaignAndCallbackBack,
  campaignApproveAndRejectionBySuperAdmin,
  campaignStatusChangeByTeamMember,
  getCampaignDetails,
  getCampaignRequests,
  getTeamGroups,
  getTeamMembers,
} from "../../../redux/reducers/superAdmin/pendingRequests";
import { useAppDispatch, useAppSelector } from "../../../utils/useRedux";
import { useRoutePermissions } from "../../../utils/useRoutePermissions";
import { showEntriesStats } from "../../../utils/utils";
import { CustomButton } from "../../common/customButton/CustomButton";
import DadzDropZone from "../../common/dropZone/DadzDropZone";
import { InputField } from "../../common/inputField/InputField";
import { ModalStyled } from "../../common/modal/CommonModal";
import { commonStyles } from "../common/CommonStyles";
import { styles } from "./PendingStyles";
import { AdCampaignRequestAction, RegisterTitle } from "./types/Types";
const registerTitles: RegisterTitle[] = [
  {
    title: "Campaign Name",
    align: "left",
    minWidth: "130px",
    keyForBodyText: "campaignName",
  },
  {
    title: "Name",
    align: "center",
    minWidth: "130px",
    keyForBodyText: "name",
  },
  {
    title: "Screens",
    align: "center",
    minWidth: "100px",
    keyForBodyText: "screens",
  },
  {
    title: "Role",
    align: "center",
    minWidth: "100px",
    keyForBodyText: "role",
  },
  {
    title: "Price",
    align: "center",
    minWidth: "100px",
    keyForBodyText: "price",
  },
  {
    title: "Date",
    align: "center",
    minWidth: "100px",
    keyForBodyText: "date",
  },
  {
    title: "Action",
    align: "center",
    minWidth: "100px",
    keyForBodyText: "action",
  },
];
interface IState {
  activeAdCampaignsRequestId: number;
  rejectionReason: string;
  rejectionTextError: string;
  adCampaignRequestAction: AdCampaignRequestAction;
}
interface IProps {
  isCallback: boolean;
}

type FilterOptions =
  | "APPROVED"
  | "ACCEPTED"
  | "PENDING"
  | "ASSIGNED"
  | "REJECTED"
  | "DRAFT";

interface EachFilter {
  text: String;
  value: FilterOptions;
}

const superAdminCampaignFilters: EachFilter[] = [
  {
    text: "pending",
    value: "PENDING",
  },
  {
    text: "approved",
    value: "APPROVED",
  },
  {
    text: "accepted",
    value: "ACCEPTED",
  },
  {
    text: "rejected",
    value: "REJECTED",
  },
  {
    text: "assigned",
    value: "ASSIGNED",
  },
];

const superAdminCallbackFilters: EachFilter[] = [
  {
    text: "pending",
    value: "DRAFT",
  },
  {
    text: "accepted",
    value: "ACCEPTED",
  },
  {
    text: "rejected",
    value: "REJECTED",
  },
  {
    text: "assigned",
    value: "ASSIGNED",
  },
];

const teamMemberCampaignFilters: EachFilter[] = [
  {
    text: "pending",
    value: "ASSIGNED",
  },
  {
    text: "accepted",
    value: "ACCEPTED",
  },
  {
    text: "rejected",
    value: "REJECTED",
  },
];

const teamMemberCallbackFilters: EachFilter[] = [
  {
    text: "pending",
    value: "ASSIGNED",
  },
  {
    text: "accepted",
    value: "ACCEPTED",
  },
  {
    text: "rejected",
    value: "REJECTED",
  },
];

const AdCampaignsRequest = ({ isCallback }: IProps) => {
  const isGroupMember = useAppSelector((state) => state.Auth.isGroupMember);
  const filterOptions = useMemo(() => {
    if (!isGroupMember)
      return isCallback ? superAdminCallbackFilters : superAdminCampaignFilters;
    return isCallback ? teamMemberCallbackFilters : teamMemberCampaignFilters;
  }, [isCallback]); //eslint-disable-line
  const [activeTeamGroupId, setActiveTeamGroupId] = useState(-1);
  const [activeTeamMember, setActiveTeamMember] = useState(-1);
  const [activeAdCampaignsRequestId, setActiveAdCampaignsRequestId] =
    useState<IState["activeAdCampaignsRequestId"]>(-1);
  const [adCampaignRequestAction, setAdCampaignRequestAction] =
    useState<IState["adCampaignRequestAction"]>(null);
  const [rejectionReason, setRejectionReason] =
    useState<IState["rejectionReason"]>("");
  const [rejectionTextError, setRejectionTextError] =
    useState<IState["rejectionTextError"]>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState<boolean>(false);
  const [mediaFiles, setMediaFiles] = useState<(File | string)[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterOptions>(
    filterOptions[0].value
  );

  const {
    data,
    pagination,
    teamGroupData,
    teamMembersData,
    campaignDetails,
    allApiStatus,
  } = useAppSelector((state) => state.PendingRequestsSlice);

  const dispatch = useAppDispatch();
  const permissions = useRoutePermissions();

  const getApiCalling = (status = "pending", page = currentPage) => {
    if (isCallback) {
      dispatch(
        getCampaignRequests(
          `callBackRequest=${true}&status=${status}&page=${page}`
        )
      );
    } else {
      dispatch(
        getCampaignRequests(
          `campaignRequest=${true}&status=${status.toLocaleLowerCase()}&page=${page}`
        )
      );
    }
  };

  const getApiCallingWhileUpdate = () => {
    let page = pagination.currentPage;
    if (
      pagination.totalPages === page &&
      data.length === 1 &&
      pagination.totalPages > 1
    )
      page = page - 1;
    getApiCalling(activeFilter.toLocaleLowerCase(), page);
  };

  useEffect(() => {
    dispatch(getTeamGroups());
    getApiCalling(activeFilter.toLocaleLowerCase(), 1);
  },[]);//eslint-disable-line

  useEffect(() => {
    if (activeTeamGroupId !== -1) dispatch(getTeamMembers(activeTeamGroupId));
  }, [activeTeamGroupId]); //eslint-disable-line
  
  useEffect(() => {
    if (allApiStatus.getCampaignDetails === "SUCCESS") {
      setMediaFiles(campaignDetails.mediaFiles.map((each) => each.image));
    }
  }, [allApiStatus.getCampaignDetails]); //eslint-disable-line

  const assignCampaignAndCallbackBackHandler = async () => {
    const result = await dispatch(
      assignCampaignAndCallbackBack({
        requestId: activeAdCampaignsRequestId,
        teamMemberId: activeTeamMember,
        isCallBack: isCallback,
        groupId: activeTeamGroupId,
      })
    );
    if (result.meta.requestStatus === "fulfilled") {
      setActiveAdCampaignsRequestId(-1);
      setIsAssignModalOpen(false);
      setActiveTeamGroupId(-1);
      setActiveTeamMember(-1);
      getApiCallingWhileUpdate();
    }
  };

  const adCampaignsApproveHandler = async (campId: number) => {
    const localCampaignDetails = {
      campaignId: campId,
      status: true,
      reason: "",
    };
    const result = await dispatch(
      campaignApproveAndRejectionBySuperAdmin(localCampaignDetails)
    );
    if (result.meta.requestStatus === "fulfilled") {
      setActiveAdCampaignsRequestId(-1);
      setAdCampaignRequestAction(null);
      getApiCallingWhileUpdate();
    }
  };
  const adCampaignsRejectionHandler = (campId: number) => {
    setActiveAdCampaignsRequestId(campId);
    setAdCampaignRequestAction("REJECT");
  };
  const rejectionTextHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setRejectionTextError("");
    setRejectionReason(event.target.value);
  };
  const adCampaignsRequestRejectionSubmission = async () => {
    if (rejectionReason.length > 0) {
      adCampaignAcceptAndRejectByMemberHandler(false);
    } else {
      setRejectionTextError("Required");
    }
  };
  const adCampaignsRequestActionHandler = (
    actionType: AdCampaignRequestAction,
    id: number
  ) => {
    setActiveAdCampaignsRequestId(id);
    setAdCampaignRequestAction(actionType);
    if (actionType === "ASSIGN") {
      setIsAssignModalOpen(true);
      setActiveTeamGroupId(-1);
      setActiveTeamMember(-1);
    } else if (actionType === "VIEW_DETAILS") {
      fillCampaignDetails(id);
    }
  };
  const onCloseAssignModal = () => setIsAssignModalOpen(false);
  const handlerModalClose = () => {
    setActiveAdCampaignsRequestId(-1);
    setAdCampaignRequestAction(null);
  };
  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
    getApiCalling(activeFilter.toLocaleLowerCase(), value);
  };
  const fillCampaignDetails = async (id: number) => {
    dispatch(getCampaignDetails(id));
  };
  const filterHandler = (event: SelectChangeEvent<FilterOptions>) => {
    setActiveFilter(event.target.value as FilterOptions);
    getApiCalling(event.target.value.toLocaleLowerCase(), 1);
  };
  const adCampaignAcceptAndRejectByMemberHandler = async (
    acceptStatus: boolean
  ) => {
    const result = await dispatch(
      campaignStatusChangeByTeamMember({
        mediaFiles,
        id: activeAdCampaignsRequestId,
        acceptStatus,
        isCallBack: isCallback,
        rejectedReason: rejectionReason,
      })
    );
    if (result.meta.requestStatus === "fulfilled") {
      setActiveAdCampaignsRequestId(-1);
      setAdCampaignRequestAction(null);
      setRejectionReason("");
      setRejectionTextError("");
      getApiCallingWhileUpdate();
    }
  };

  return (
    <>
      <Stack
        sx={styles.contentContainer}
        justifyContent={"space-evenly"}
        spacing={3}
      >
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography sx={styles.requestText}>
            {isCallback ? "Callback" : "Campaign"} Requests
          </Typography>
          <Box sx={{ width: "130px" }}>
            <Select
              fullWidth
              sx={{ textTransform: "capitalize" }}
              value={activeFilter}
              onChange={filterHandler}
            >
              {filterOptions.map((each) => (
                <MenuItem
                  sx={{ textTransform: "capitalize" }}
                  value={each.value}
                  key={each.value}
                >
                  {each.text}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Stack>
        {data.length > 0 ? (
          <>
            <TableContainer sx={styles.tableContainer}>
              <Table>
                <TableHead>
                  <TableRow>
                    {registerTitles.map((each, index) => (
                      <TableCell
                        key={`register-title-${index}`}
                        align={each.align}
                        sx={{
                          minWidth: each.minWidth,
                        }}
                      >
                        {each.title}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody sx={styles.tableBody}>
                  <TableCell
                    colSpan={registerTitles.length}
                    sx={{ padding: 0 }}
                  ></TableCell>
                  {data.map((each, index) => (
                    <TableRow key={"pending-request-row" + index}>
                      <TableCell
                        sx={commonStyles.maxWidthForTableCell("130px")}
                      >
                        <Tooltip title={each.campaignName}>
                          <Typography
                            fontSize={"inherit"}
                            fontWeight={"inherit"}
                            sx={commonStyles.ellipsisText("calc(100% - 10px)")}
                          >
                            {each.campaignName}
                          </Typography>
                        </Tooltip>
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={commonStyles.maxWidthForTableCell("130px")}
                      >
                        <Tooltip title={each.userName}>
                          <Typography
                            fontSize={"inherit"}
                            fontWeight={"inherit"}
                            sx={commonStyles.ellipsisText()}
                          >
                            {each.userName}
                          </Typography>
                        </Tooltip>
                      </TableCell>
                      <TableCell align="center">{each.screenCount}</TableCell>
                      <TableCell align="center">
                        <Typography textTransform={"capitalize"}>
                          {each.roleName}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">₹{each.totalAmount}</TableCell>
                      <TableCell align="center">
                        {moment(each.updatedAt).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell align="center">
                        <Stack
                          direction={"row"}
                          spacing={2}
                          alignItems={"center"}
                          justifyContent={"center"}
                        >
                          {!isCallback && activeFilter === "PENDING" && (
                            <>
                              <IconButton
                                disabled={each.status === "accepted"}
                                sx={
                                  each.status === "accepted"
                                    ? styles.disabledButton
                                    : styles.acceptButtonContainer
                                }
                                onClick={() =>
                                  adCampaignsApproveHandler(each.id)
                                }
                              >
                                <Done sx={styles.whiteColor} />
                              </IconButton>
                              <IconButton
                                disabled={each.status === "rejected"}
                                sx={
                                  each.status === "rejected"
                                    ? styles.disabledButton
                                    : styles.rejectButtonContainer
                                }
                                onClick={() =>
                                  adCampaignsRejectionHandler(each.id)
                                }
                              >
                                <Close sx={styles.whiteColor} />
                              </IconButton>
                            </>
                          )}
                          {!isGroupMember &&
                            activeFilter !== "ASSIGNED" &&
                            activeFilter !== "ACCEPTED" &&
                            activeFilter !== "REJECTED" && (
                              <Button
                                variant="contained"
                                sx={styles.assignButton}
                                onClick={() =>
                                  adCampaignsRequestActionHandler(
                                    "ASSIGN",
                                    each.id
                                  )
                                }
                              >
                                Assign
                              </Button>
                            )}
                          <Icon
                            sx={styles.pointer}
                            onClick={() =>
                              adCampaignsRequestActionHandler(
                                "VIEW_DETAILS",
                                each.id
                              )
                            }
                          >
                            <KeyboardArrowRightIcon />
                          </Icon>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {pagination.totalPages > 1 && (
              <Stack direction={"row"} justifyContent={"space-between"}>
                <Typography sx={styles.dataStats}>
                  {showEntriesStats(
                    pagination.totalItems,
                    pagination.currentPage,
                    pagination.pageSize
                  )}
                </Typography>
                {pagination.totalPages > 1 && (
                  <Pagination
                    count={pagination.totalPages}
                    shape="rounded"
                    page={currentPage}
                    variant="outlined"
                    onChange={handlePageChange}
                  />
                )}
              </Stack>
            )}
          </>
        ) : (
          <Typography sx={styles.NoDataStyle}>No Data found</Typography>
        )}
      </Stack>
      <ModalStyled
        open={adCampaignRequestAction === "REJECT"}
        isbgColor={colors.white}
        isClose={true}
        handleClose={handlerModalClose}
      >
        <Stack
          justifyContent={"space-evenly"}
          sx={styles.reasonForRejectionModal}
        >
          <Typography sx={styles.reasonForRejectionText}>
            Reason for Rejection
          </Typography>
          <InputField
            fieldName="Description"
            inputProps={{
              onChange: rejectionTextHandler,
              placeholder: "Mention here...",
              multiline: true,
              rows: 7,
              fullWidth: true,
              helperText: (
                <Typography height={12}>{rejectionTextError}</Typography>
              ),
              error: Boolean(rejectionTextError),
            }}
            textProps={styles.descriptionText as TypographyProps}
          />
          <CustomButton
            width={138}
            sx={{ height: 48, alignSelf: "center" }}
            bgcolor={colors.primary}
            onClick={adCampaignsRequestRejectionSubmission}
          >
            Submit
          </CustomButton>
        </Stack>
      </ModalStyled>
      <ModalStyled
        open={adCampaignRequestAction === "VIEW_DETAILS"}
        isbgColor={colors.white}
        isClose={true}
        handleClose={handlerModalClose}
      >
        <Stack sx={styles.campaignDetails} spacing={2}>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Typography sx={styles.requestText} mt={3}>
              Campaign Details{" "}
              <Typography
                component={"span"}
                fontSize={14}
                color={colors.lightGray}
                fontWeight={700}
                ml={1}
              >
                {moment(campaignDetails.updatedAt).format("DD/MM/YYYY")}
              </Typography>
            </Typography>
            {!isCallback &&
              permissions.edit &&
              activeFilter !== "ACCEPTED" &&
              activeFilter !== "REJECTED" &&
              !isGroupMember && (
                <Button
                  sx={{ ...styles.assignButton, mt: 3, mr: 3 }}
                  onClick={() =>
                    adCampaignsRequestActionHandler(
                      "ASSIGN",
                      activeAdCampaignsRequestId
                    )
                  }
                >
                  Assign
                </Button>
              )}
          </Stack>
          <Grid container spacing={2.5} rowSpacing={3} width={"98%"}>
            <Grid
              item
              xs={12}
              sm={6}
              paddingRight={"10px"}
              boxSizing={"border-box"}
            >
              <InputField
                fieldName={"Campaign Name"}
                inputProps={{
                  fullWidth: true,
                  value: campaignDetails.campaignName,
                  InputProps: { readOnly: true },
                  sx: {
                    input: { color: colors.uploadText, fontWeight: 700 },
                  },
                }}
                textProps={{
                  sx: styles.readonlyFieldLabels as TypographyProps,
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              paddingRight={"10px"}
              boxSizing={"border-box"}
            >
              <InputField
                fieldName={"Member Name"}
                inputProps={{
                  fullWidth: true,
                  value: campaignDetails.memberName,
                  InputProps: { readOnly: true },
                  sx: {
                    input: { color: colors.uploadText, fontWeight: 700 },
                  },
                }}
                textProps={{
                  sx: styles.readonlyFieldLabels as TypographyProps,
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              paddingRight={"10px"}
              boxSizing={"border-box"}
            >
              <InputField
                fieldName={"Screens"}
                inputProps={{
                  fullWidth: true,
                  value: campaignDetails.totalScreens,
                  InputProps: { readOnly: true },
                  sx: {
                    input: { color: colors.uploadText, fontWeight: 700 },
                  },
                }}
                textProps={{
                  sx: styles.readonlyFieldLabels as TypographyProps,
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              paddingRight={"10px"}
              boxSizing={"border-box"}
            >
              <InputField
                fieldName={"Price"}
                inputProps={{
                  fullWidth: true,
                  value: campaignDetails.totalAmount,
                  InputProps: { readOnly: true },
                  sx: {
                    input: { color: colors.uploadText, fontWeight: 700 },
                  },
                }}
                textProps={{
                  sx: styles.readonlyFieldLabels as TypographyProps,
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              paddingRight={"10px"}
              boxSizing={"border-box"}
            >
              <InputField
                fieldName={"Ad Type"}
                inputProps={{
                  fullWidth: true,
                  value: campaignDetails.adTypeName,
                  InputProps: { readOnly: true },
                  sx: {
                    input: { color: colors.uploadText, fontWeight: 700 },
                  },
                }}
                textProps={{
                  sx: styles.readonlyFieldLabels as TypographyProps,
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              paddingRight={"10px"}
              boxSizing={"border-box"}
            >
              {campaignDetails.genres.length < 2 ? (
                <InputField
                  fieldName={"Genre"}
                  inputProps={{
                    fullWidth: true,
                    value: campaignDetails.genres
                      .map((each) => each.genreName)
                      .join(""),
                    InputProps: { readOnly: true },
                    sx: {
                      input: { color: colors.uploadText, fontWeight: 700 },
                    },
                  }}
                  textProps={{
                    sx: styles.readonlyFieldLabels as TypographyProps,
                  }}
                />
              ) : (
                <Select
                  sx={{ fontWeight: 700 }}
                  value={campaignDetails.genres[0].id}
                >
                  {campaignDetails.genres.map((each) => (
                    <MenuItem
                      sx={{ fontWeight: 700 }}
                      value={each.id}
                      key={"genre" + each.id}
                    >
                      {each.genreName}
                    </MenuItem>
                  ))}
                </Select>
              )}
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              paddingRight={"10px"}
              boxSizing={"border-box"}
            >
              <InputField
                fieldName={"Pricing Modal"}
                inputProps={{
                  fullWidth: true,
                  value: campaignDetails.pricingModelName,
                  InputProps: { readOnly: true },
                  sx: {
                    input: { color: colors.uploadText, fontWeight: 700 },
                  },
                }}
                textProps={{
                  sx: styles.readonlyFieldLabels as TypographyProps,
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              paddingRight={"10px"}
              boxSizing={"border-box"}
            >
              {campaignDetails.categories.length < 2 ? (
                <InputField
                  fieldName={"Genre"}
                  inputProps={{
                    fullWidth: true,
                    value: campaignDetails.categories
                      .map((each) => each.categoryName)
                      .join(""),
                    InputProps: { readOnly: true },
                    sx: {
                      input: { color: colors.uploadText, fontWeight: 700 },
                    },
                  }}
                  textProps={{
                    sx: styles.readonlyFieldLabels as TypographyProps,
                  }}
                />
              ) : (
                <>
                  <Typography fontSize={14} fontWeight={700} mb={1}>
                    Categories
                  </Typography>
                  <Select
                    fullWidth
                    sx={{ fontWeight: 700 }}
                    value={campaignDetails.categories[0].id}
                  >
                    {campaignDetails.categories.map((each) => (
                      <MenuItem
                        sx={{ fontWeight: 700 }}
                        value={each.id}
                        key={"category" + each.id}
                      >
                        {each.categoryName}
                      </MenuItem>
                    ))}
                  </Select>
                </>
              )}
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              paddingRight={"10px"}
              boxSizing={"border-box"}
            >
              {campaignDetails.subCategories.length < 2 ? (
                <InputField
                  fieldName={"Sub Categories"}
                  inputProps={{
                    fullWidth: true,
                    value: campaignDetails.subCategories
                      .map((each) => each.subCategoryName)
                      .join(""),
                    InputProps: { readOnly: true },
                    sx: {
                      input: { color: colors.uploadText, fontWeight: 700 },
                    },
                  }}
                  textProps={{
                    sx: styles.readonlyFieldLabels as TypographyProps,
                  }}
                />
              ) : (
                <>
                  <Typography fontSize={14} fontWeight={700} mb={1}>
                    Sub Categories
                  </Typography>
                  <Select
                    fullWidth
                    sx={{ fontWeight: 700 }}
                    value={campaignDetails.subCategories[0].id}
                  >
                    {campaignDetails.subCategories.map((each) => (
                      <MenuItem
                        sx={{ fontWeight: 700 }}
                        value={each.id}
                        key={"category" + each.id}
                      >
                        {each.subCategoryName}
                      </MenuItem>
                    ))}
                  </Select>
                </>
              )}
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              paddingRight={"10px"}
              boxSizing={"border-box"}
            >
              <InputField
                fieldName={"Location"}
                inputProps={{
                  fullWidth: true,
                  value: campaignDetails.locationName,
                  InputProps: { readOnly: true },
                  sx: {
                    input: { color: colors.uploadText, fontWeight: 700 },
                  },
                }}
                textProps={{
                  sx: styles.readonlyFieldLabels as TypographyProps,
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              paddingRight={"10px"}
              boxSizing={"border-box"}
            >
              <InputField
                fieldName={"Slots"}
                inputProps={{
                  fullWidth: true,
                  value: campaignDetails.slot,
                  InputProps: { readOnly: true },
                  sx: {
                    input: { color: colors.uploadText, fontWeight: 700 },
                  },
                }}
                textProps={{
                  sx: styles.readonlyFieldLabels as TypographyProps,
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              paddingRight={"10px"}
              boxSizing={"border-box"}
            >
              {campaignDetails.screenGroups.length < 2 ? (
                <InputField
                  fieldName={"Screen Groups"}
                  inputProps={{
                    fullWidth: true,
                    value: campaignDetails.screenGroups
                      .map((each) => each.screenGroupName)
                      .join(""),
                    InputProps: { readOnly: true },
                    sx: {
                      input: { color: colors.uploadText, fontWeight: 700 },
                    },
                  }}
                  textProps={{
                    sx: styles.readonlyFieldLabels as TypographyProps,
                  }}
                />
              ) : (
                <>
                  <Typography fontSize={14} fontWeight={700} mb={1}>
                    Screen Groups
                  </Typography>
                  <Select
                    fullWidth
                    sx={{ fontWeight: 700 }}
                    value={campaignDetails.screenGroups[0].id}
                  >
                    {campaignDetails.screenGroups.map((each) => (
                      <MenuItem
                        sx={{ fontWeight: 700 }}
                        value={each.id}
                        key={"category" + each.id}
                      >
                        {each.screenGroupName}
                      </MenuItem>
                    ))}
                  </Select>
                </>
              )}
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              paddingRight={"10px"}
              boxSizing={"border-box"}
            >
              {campaignDetails.screens.length < 2 ? (
                <InputField
                  fieldName={"Screens"}
                  inputProps={{
                    fullWidth: true,
                    value: campaignDetails.screens
                      .map((each) => each.screenName)
                      .join(""),
                    InputProps: { readOnly: true },
                    sx: {
                      input: { color: colors.uploadText, fontWeight: 700 },
                    },
                  }}
                  textProps={{
                    sx: styles.readonlyFieldLabels as TypographyProps,
                  }}
                />
              ) : (
                <>
                  <Typography fontSize={14} fontWeight={700} mb={1}>
                    Screens
                  </Typography>
                  <Select
                    fullWidth
                    sx={{ fontWeight: 700 }}
                    value={campaignDetails.screens[0].id}
                  >
                    {campaignDetails.screens.map((each) => (
                      <MenuItem
                        sx={{ fontWeight: 700 }}
                        value={each.id}
                        key={"screens" + each.id}
                      >
                        {each.screenName}
                      </MenuItem>
                    ))}
                  </Select>
                </>
              )}
            </Grid>
            <Grid item xs={12}>
              <Typography
                color={colors.uploadText}
                fontWeight={700}
                fontSize={14}
                mb={1}
              >
                Media Files
              </Typography>
              <DadzDropZone
                uploadFiles={mediaFiles}
                uploadFileSetterWithEdit={setMediaFiles}
                isAcceptMultiple={true}
                readonly={isCallback}
                boxStyle={{ width: "130px !important", height: "130px" }}
              />
            </Grid>
          </Grid>
          {permissions.edit &&
            activeFilter !== "ACCEPTED" &&
            activeFilter !== "REJECTED" && (
              <Grid
                container
                justifyContent={"space-between"}
                width={"100%"}
                spacing={2}
              >
                <Grid item xs={12} sm={6} mb={2}>
                  <Button
                    onClick={() =>
                      isGroupMember
                        ? adCampaignsRejectionHandler(
                            activeAdCampaignsRequestId
                          )
                        : adCampaignAcceptAndRejectByMemberHandler(false)
                    }
                    fullWidth
                    variant="contained"
                    sx={{
                      ...styles.rejectCampaignBtn,
                      opacity:
                        isGroupMember && campaignDetails.approvedStatus
                          ? 0.2
                          : 1,
                    }}
                    startIcon={<Close />}
                    disableElevation
                    disabled={isGroupMember && campaignDetails.approvedStatus}
                  >
                    Reject
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    onClick={() =>
                      adCampaignAcceptAndRejectByMemberHandler(true)
                    }
                    fullWidth
                    variant="contained"
                    sx={styles.acceptCampaign}
                    startIcon={<Done />}
                    disableElevation
                  >
                    Accept
                  </Button>
                </Grid>
              </Grid>
            )}
        </Stack>
      </ModalStyled>
      <ModalStyled
        open={isAssignModalOpen}
        isbgColor="white"
        onClose={onCloseAssignModal}
      >
        <Stack
          width={444}
          minHeight={350}
          justifyContent={"space-around"}
          p={5}
          boxSizing={"border-box"}
          spacing={4}
        >
          <Typography fontSize={24} color={colors.lightBlack} fontWeight={500}>
            Assign
          </Typography>
          <Stack spacing={1}>
            <Typography fontSize={14}>Choose Group to Assign</Typography>
            <Select
              value={activeTeamGroupId}
              onChange={(event) => {
                setActiveTeamGroupId(event.target.value as number);
                setActiveTeamMember(-1);
              }}
            >
              <MenuItem value={-1}>Select Group</MenuItem>
              {teamGroupData.map((each, index) => (
                <MenuItem key={index} value={each.id}>
                  {each.groupName}
                </MenuItem>
              ))}
            </Select>
          </Stack>
          <Stack spacing={1}>
            <Typography fontSize={14}>Choose Team Member</Typography>
            <Select
              value={activeTeamMember}
              onChange={(event) => {
                setActiveTeamMember(event.target.value as number);
              }}
            >
              <MenuItem value={-1}>Select Team Member</MenuItem>
              {teamMembersData.map((each, index) => (
                <MenuItem key={index} value={each.id}>
                  {each.memberName}
                </MenuItem>
              ))}
            </Select>
          </Stack>
          <Button
            variant="contained"
            disableElevation
            disableFocusRipple
            disableRipple
            disableTouchRipple
            sx={styles.nextBtn}
            disabled={activeTeamGroupId === -1 || activeTeamMember === -1}
            onClick={assignCampaignAndCallbackBackHandler}
          >
            Submit
          </Button>
        </Stack>
      </ModalStyled>
    </>
  );
};

export default AdCampaignsRequest;
