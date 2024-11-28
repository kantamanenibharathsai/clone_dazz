import { Close, Done } from "@mui/icons-material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  Box,
  IconButton,
  MenuItem,
  Pagination,
  PaginationItem,
  Select,
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
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { colors } from "../../../config/theme";
import {
  BeResponse,
  getHostMediaData,
  updateHostMediaRequest,
} from "../../../redux/reducers/superAdmin/HostAdsSlice";
import { useAppDispatch, useAppSelector } from "../../../utils/useRedux";
import { useRoutePermissions } from "../../../utils/useRoutePermissions";
import { showEntriesStats, tokenWithUrl } from "../../../utils/utils";
import { DummyUser } from "../../common/assets";
import { CustomButton } from "../../common/customButton/CustomButton";
import { InputField } from "../../common/inputField/InputField";
import { ModalStyled } from "../../common/modal/CommonModal";
import { commonStyles } from "../common/CommonStyles";
import { styles } from "./PendingStyles";

interface IState {
  activeHostAdRequestId: number;
  rejectionReason: string;
  rejectionTextError: string;
}

const HostAdsRequest = () => {
  const [activeHostAdRequestId, setActiveHostAdRequestId] =
    useState<IState["activeHostAdRequestId"]>(-1);
  const [isRejectionModalOpen, setIsRejectionModalOpen] = useState(false);
  const [isViewDetailsModalOpen, setIsViewDetailsModalOpen] = useState(false);
  const [rejectionReason, setRejectionReason] =
    useState<IState["rejectionReason"]>("");
  const [rejectionTextError, setRejectionTextError] =
    useState<IState["rejectionTextError"]>("");
  const [selectedObj, setSelectedObj] = useState<null | BeResponse>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const { allApiErrors, allApiStatus, pagination, pendingMediaData } =
    useAppSelector((state) => state.HostAdsSlice);

  const handlePause = () => {
    videoRef.current && videoRef.current.pause();
  };

  const handlePlay = () => {
    videoRef.current && videoRef.current.play();
  };
  const token = useAppSelector((state) => state.Auth.token);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getHostMediaData(1));
  }, [pagination.currentPage]); //eslint-disable-line

  useEffect(() => {
    if (allApiStatus.update === "SUCCESS") {
      dispatch(getHostMediaData(1));
      setIsRejectionModalOpen(false);
    }
  }, [allApiStatus.update]);//eslint-disable-line

  const permissions = useRoutePermissions();

  const rejectionTextHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setRejectionTextError("");
    setRejectionReason(event.target.value);
  };
  const hostAdAcceptHandler = (id: number) => {
    setActiveHostAdRequestId(-1);
    dispatch(updateHostMediaRequest({ id, type: "Approved" }));
  };

  const rejectionSubmission = () => {
    console.log("entered");
    if (rejectionReason.length === 0) {
      setRejectionTextError("Required");
      return;
    }
    dispatch(
      updateHostMediaRequest({ id: activeHostAdRequestId, type: "Rejected" })
    );
  };

  const hostAdRejectionHandler = (id: number) => {
    setActiveHostAdRequestId(id);
    setIsRejectionModalOpen(true);
  };

  const actionClickHandler = (id: number) => {
    const localSelectedObj = pendingMediaData.filter(
      (each) => each.id === id
    )[0];
    setSelectedObj(localSelectedObj);
    setActiveHostAdRequestId(id);
    setIsViewDetailsModalOpen(true);
  };

  const rejectionModalCloseHandler = () => setIsRejectionModalOpen(false);
  const detailsModalCloseHandler = () => setIsViewDetailsModalOpen(false);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    dispatch(getHostMediaData(value));
  };
  return (
    <>
      <Stack
        sx={styles.contentContainer}
        justifyContent={"space-evenly"}
        spacing={3}
      >
        <Typography sx={styles.requestText}>Host Ads Request</Typography>
        <TableContainer sx={styles.tableContainer}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">Member Name</TableCell>
                <TableCell align="center">Member Email</TableCell>
                <TableCell align="center">No. Of Screens</TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableCell colSpan={5} sx={{ padding: 0 }}>
              <div
                style={{
                  borderTop: "1px solid #ddd",
                }}
              />
            </TableCell>
            {allApiErrors.getApi.length !== 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography color={colors.validate}>
                    {allApiErrors.getApi}
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              <TableBody sx={styles.tableBody}>
                {pendingMediaData.map((each, index) => (
                  <TableRow key={"pending-request-row" + index}>
                    <TableCell sx={commonStyles.maxWidthForTableCell("250px")}>
                      <Stack
                        direction={"row"}
                        spacing={1}
                        alignItems={"center"}
                      >
                        <Box
                          component="img"
                          src={
                            each.userImage
                              ? tokenWithUrl(each.userImage)
                              : DummyUser
                          }
                          width={30}
                          height={30}
                          borderRadius={"5px"}
                        />
                        <Tooltip title={each.fullName}>
                          <Typography
                            fontSize={"inherit"}
                            fontWeight={"inherit"}
                            sx={commonStyles.ellipsisText("calc(100% - 50px)")}
                          >
                            {each.fullName}
                          </Typography>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                    <TableCell sx={commonStyles.maxWidthForTableCell("200px")}>
                      <Tooltip title={each.email}>
                        <Typography
                          fontSize={"inherit"}
                          fontWeight={"inherit"}
                          sx={commonStyles.ellipsisText("calc(100% - 0px)")}
                          textAlign={"center"}
                        >
                          {each.email}
                        </Typography>
                      </Tooltip>
                    </TableCell>
                    <TableCell align="center">
                      <Typography
                        fontSize={"inherit"}
                        fontWeight={"inherit"}
                        textAlign={"center"}
                      >
                        {each.screenNames.length}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      {moment(each.createdAt).format("DD/MM/YYYY")}
                    </TableCell>
                    {permissions.edit && (
                      <TableCell align="center">
                        <Stack
                          direction={"row"}
                          spacing={1}
                          alignItems={"center"}
                          justifyContent={"center"}
                        >
                          <IconButton
                            sx={styles.acceptButtonContainer}
                            onClick={() => hostAdAcceptHandler(each.id)}
                          >
                            <Done sx={styles.whiteColor} />
                          </IconButton>
                          <IconButton
                            sx={styles.rejectButtonContainer}
                            onClick={() => hostAdRejectionHandler(each.id)}
                          >
                            <Close sx={styles.whiteColor} />
                          </IconButton>
                          <IconButton
                            onClick={() => actionClickHandler(each.id)}
                          >
                            <ChevronRightIcon />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>
        <Stack direction={"row"} justifyContent={"space-between"}>
          {pagination.totalPages > 1 && (
            <Typography sx={styles.dataStats}>
              {showEntriesStats(
                pagination.totalItems,
                pagination.currentPage,
                pagination.pageSize
              )}
            </Typography>
          )}

          {pagination.totalPages > 1 && (
            <Pagination
              count={pagination.totalPages}
              shape="rounded"
              page={pagination.currentPage}
              variant="outlined"
              onChange={handlePageChange}
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
      </Stack>
      <ModalStyled
        open={isRejectionModalOpen}
        isbgColor={colors.white}
        isClose={true}
        handleClose={rejectionModalCloseHandler}
      >
        <Stack
          justifyContent={"space-evenly"}
          sx={styles.reasonForRejectionModal}
          mt={-2}
        >
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "clamp(1.125rem, 1.0943rem + 0.1754vw, 1.375rem);",
            }}
          >
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
            onClick={rejectionSubmission}
          >
            Submit
          </CustomButton>
        </Stack>
      </ModalStyled>
      <ModalStyled
        open={isViewDetailsModalOpen}
        isbgColor={colors.white}
        isClose={true}
        handleClose={detailsModalCloseHandler}
      >
        <Stack
          justifyContent={"space-evenly"}
          maxWidth={600}
          mt={-2}
          width={"80vw"}
          boxSizing={"border-box"}
          p={3}
          gap={2}
        >
          <Box>
            <Typography fontSize={14} fontWeight={700} mb={1}>
              Screen Details
            </Typography>
            <Select value={selectedObj?.screenNames[0]} fullWidth>
              {selectedObj?.screenNames.map((each, index) => (
                <MenuItem key={each + index} value={each}>
                  {each}
                </MenuItem>
              ))}
            </Select>
          </Box>
          {selectedObj?.fileType?.includes("image") ? (
            <Box
              component={"img"}
              src={`${selectedObj.url}/${token}`}
              sx={styles.hostAdImage}
            />
          ) : (
            <video
              ref={videoRef}
              src={`${selectedObj?.url}/${token}`}
              width={"100%"}
              controls
              onPlay={handlePlay}
              onPause={handlePause}
              autoPlay
            ></video>
          )}
        </Stack>
      </ModalStyled>
    </>
  );
};

export default HostAdsRequest;
