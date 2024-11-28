import { Close, Done } from "@mui/icons-material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  Box,
  IconButton,
  Pagination,
  PaginationItem,
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
import { ChangeEvent, useEffect, useState } from "react";
import { colors } from "../../../config/theme";
import {
  getPendingRequests,
  updateRequests
} from "../../../redux/reducers/superAdmin/pendingRequests";
import { useAppDispatch, useAppSelector } from "../../../utils/useRedux";
import { useRoutePermissions } from "../../../utils/useRoutePermissions";
import { showEntriesStats, tokenWithUrl } from "../../../utils/utils";
import { CustomButton } from "../../common/customButton/CustomButton";
import { InputField } from "../../common/inputField/InputField";
import { ModalStyled } from "../../common/modal/CommonModal";
import { commonStyles } from "../common/CommonStyles";
import { styles } from "./PendingStyles";
import { RegisterTitle } from "./types/Types";
import { DummyUser } from "../../common/assets";

const registerTitles: RegisterTitle[] = [
  {
    title: "MEMBER NAME",
    align: "left",
    minWidth: "100px",
    keyForBodyText: "memberName",
  },
  {
    title: "MEMBER EMAIL",
    align: "left",
    minWidth: "100px",
    keyForBodyText: "memberEmail",
  },
  {
    title: "Phone No.",
    align: "center",
    minWidth: "100px",
    keyForBodyText: "phoneNo",
  },
  {
    title: "Role",
    align: "center",
    minWidth: "100px",
    keyForBodyText: "phoneNo",
  },
  {
    title: "Date",
    align: "center",
    minWidth: "100px",
    keyForBodyText: "phoneNo",
  },
  {
    title: "Action",
    align: "center",
    minWidth: "100px",
    keyForBodyText: "phoneNo",
  },
];
interface IState {
  activeRegisterRequestId: number;
  rejectionReason: string;
  rejectionTextError: string;
}

const RegisterRequest = () => {
  const [activeRegisterRequestId, setActiveRegisterRequestId] =
    useState<IState["activeRegisterRequestId"]>(-1);
  const [rejectionReason, setRejectionReason] =
    useState<IState["rejectionReason"]>("");
  const [rejectionTextError, setRejectionTextError] =
    useState<IState["rejectionTextError"]>("");
  const [currentPage, setCurrentPage] = useState(1);
  const { data,pagination } = useAppSelector((state) => state.PendingRequestsSlice);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getPendingRequests(`page=${currentPage}`));
  }, [dispatch, currentPage]);
  const permissions = useRoutePermissions();

  const registerRequestActionHandler = (id: number) => {
    setActiveRegisterRequestId(id);
  };

  const registerRequestAcceptHandler = async (userId:number) => {
    const userDetails = {
      userId:userId,
      status:'ACCEPTED',
      rejectionReason:''
    }
  const result = await dispatch(updateRequests(userDetails));
  if(result.meta.requestStatus === "fulfilled"){
    dispatch(getPendingRequests(`page=${currentPage}`));
  }
  }
  const rejectionTextHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setRejectionTextError("");
    setRejectionReason(event.target.value);
  };
  const registerRequestRejectionSubmission = async() => {
    if (rejectionReason.length !== 0) {
      const userData = {
        userId:activeRegisterRequestId,
        status:'REJECTED',
        rejectionReason:rejectionReason
      }
      const result = await dispatch(updateRequests(userData));
      if(result.meta.requestStatus === "fulfilled"){
        dispatch(getPendingRequests(`page=${currentPage}`));
        setActiveRegisterRequestId(-1);
      }
    } else {
      setRejectionTextError("Required");
    }
  };
  
  const handlePageChange = (event: React.ChangeEvent<unknown>, value:number) => {
    setCurrentPage(value);
  }
  const findRoleId = (roleId:number) => {
    switch (roleId) {
      case 6:
        return (
          <TableCell align="center">Super Admin</TableCell>
        );
      case 7:
        return <TableCell align="center">Admin</TableCell>
      case 8:
        return <TableCell align="center">Host</TableCell>
      case 9:
        return <TableCell align="center">User</TableCell>
      case 10:
        return <TableCell align="center">Vendor</TableCell>
      case 11:
        return <TableCell align="center">Investor</TableCell>
      case 12:
        return <TableCell align="center">AdAgency</TableCell>
    }
  }
  return (
    <>
      <Stack
        sx={styles.contentContainer}
        justifyContent={"space-evenly"}
        spacing={3}
      >
        <Typography sx={styles.requestText}>Pending Request</Typography>
        <TableContainer sx={styles.tableContainer}>
          <Table>
            <TableHead>
              <TableRow>
                {registerTitles
                  .slice(0, permissions.edit ? 6 : 5)
                  .map((each, index) => (
                    <TableCell
                      key={`register-title-${index}`}
                      align={each.align}
                    >
                      {each.title}
                    </TableCell>
                  ))}
              </TableRow>
            </TableHead>
            <TableCell colSpan={registerTitles.length} sx={{ padding: 0 }}>
            <div style={{
            borderTop: '1px solid #ddd',
          }} />
            </TableCell>
          {data.length===0 ? <TableRow>
                  <TableCell colSpan={5} align="center">
                    <Typography color={colors.validate}>
                      There are no data yet
                    </Typography>
                  </TableCell>
                </TableRow>: <TableBody sx={styles.tableBody}>
              {data
                .map((each, index) => (
                  <TableRow key={"pending-request-row" + index}>
                    <TableCell sx={commonStyles.maxWidthForTableCell("250px")}>
                      <Stack
                        direction={"row"}
                        spacing={1}
                        alignItems={"center"}
                      >
                        <Box
                          component="img"
                          src={each.image?tokenWithUrl(each.image):DummyUser}
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
                            #{index + 1 + " "}
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
                        >
                          {each.email}
                        </Typography>
                      </Tooltip>
                    </TableCell>
                    <TableCell align="center">{each.mobileNumber}</TableCell>
                    {findRoleId(each.roleId)}
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
                            onClick={() =>
                              registerRequestAcceptHandler(each.id)
                            }
                          >
                            <Done sx={styles.whiteColor} />
                          </IconButton>
                          <IconButton
                            sx={styles.rejectButtonContainer}
                            onClick={() =>
                              registerRequestActionHandler(each.id)
                            }
                          >
                            <Close sx={styles.whiteColor} />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>}
          </Table>
        </TableContainer>
        <Stack direction={"row"} justifyContent={"space-between"}>
         {pagination.totalPages>1 && <Typography sx={styles.dataStats}>
            {showEntriesStats(pagination.totalItems,pagination.currentPage,pagination.pageSize)}
          </Typography>}
           
         {pagination.totalPages>1&&<Pagination 
          count={pagination.totalPages} 
          shape="rounded" 
          page={currentPage} 
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
          />}
        </Stack>
      </Stack>
      <ModalStyled
        open={activeRegisterRequestId !== -1}
        isbgColor={colors.white}
        isClose={true}
        handleClose={() => setActiveRegisterRequestId(-1)}
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
              placeholder:"Mention here...",
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
            onClick={registerRequestRejectionSubmission}
          >
            Submit
          </CustomButton>
        </Stack>
      </ModalStyled>
    </>
  );
};

export default RegisterRequest;
