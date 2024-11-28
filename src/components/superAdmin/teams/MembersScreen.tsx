import { Box, Pagination, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import moment from "moment";
import { useState } from "react";
import { colors } from "../../../config/theme";
import {
  deleteMemberFromGroup,
  getGroupMembers,
  getMemberPermission,
  updateActiveTab,
  updateMembersPagination,
  updateUserPermissionInfo,
} from "../../../redux/reducers/superAdmin/teamsSlice";
import { useAppDispatch, useAppSelector } from "../../../utils/useRedux";
import { useRoutePermissions } from "../../../utils/useRoutePermissions";
import {
  handleCardLayoutPlaceHolder,
  tokenWithUrl,
} from "../../../utils/utils";
import { CustomButton } from "../../common/customButton/CustomButton";
import { ModalStyled } from "../../common/modal/CommonModal";
import { DeleteIconImg, EditIconImg } from "../assets/index";
import { layOutStyles, teamStyles } from "./TeamStyles";

interface IState {
  deleteModal: {
    open: boolean;
    id: number | null;
  };
  currentPage: number;
}

const MembersScreen = () => {
  const { members, membersPagination, selectedGroupId, membersErrorMsg } =
    useAppSelector((state) => state.TeamsSlice);
  const [deleteModal, setDeleteModal] = useState<IState["deleteModal"]>({
    id: null,
    open: false,
  });
  const dispatch = useAppDispatch();
  const permission = useRoutePermissions();
  const handlePaginationChange = (page: number) => {
    dispatch(updateMembersPagination(page));
    if (selectedGroupId)
      dispatch(
        getGroupMembers({
          groupId: selectedGroupId.toString(),
          page: membersPagination.currentPageNumber.toString(),
          pageSize: membersPagination.pageSize.toString(),
        })
      );
  };
  const handleDelete = (value: number) => {
    setDeleteModal({ id: value, open: true });
  };
  const handleCloseModal = () => {
    setDeleteModal({ id: null, open: false });
  };
  const handleEdit = (userId: number) => {
    dispatch(getMemberPermission({ userId: userId }));
    const user = members.find((item) => item.userId === userId);
    dispatch(
      updateUserPermissionInfo({
        email: user!.email,
        fullName: user!.fullName,
        roleId: user!.roleId.toString(),
        userId: user!.userId.toString(),
      })
    );
    dispatch(updateActiveTab(3));
  };
  const handleConfirmDeleteGroup = async () => {
    const { payload } = await dispatch(
      deleteMemberFromGroup(deleteModal.id as number)
    );
    if (payload.statusCode === "200")
      dispatch(
        getGroupMembers({
          groupId: selectedGroupId!.toString(),
          page: membersPagination.currentPageNumber.toString(),
          pageSize: membersPagination.pageSize.toString(),
        })
      );
    setDeleteModal({ id: null, open: false });
  };

  return (
    <>
      <ModalStyled
        open={deleteModal.open}
        isClose={false}
        isbgColor={colors.lightBlack}
        onClose={handleCloseModal}
      >
        <Box sx={layOutStyles.modalBox}>
          <Box>
            <Typography sx={layOutStyles.deleteAdsText}>
              Delete Account
            </Typography>
            <Typography sx={layOutStyles.areYouText}>
              Are you sure want to delete this user?
            </Typography>
          </Box>
          <Box sx={layOutStyles.buttonsBox}>
            <CustomButton
              bgcolor={colors.blueChalk}
              textColor={colors.black}
              width={128}
              onClick={handleCloseModal}
            >
              Cancel
            </CustomButton>
            <CustomButton
              bgcolor={colors.validate}
              width={158}
              onClick={handleConfirmDeleteGroup}
            >
              Delete
            </CustomButton>
          </Box>
        </Box>
      </ModalStyled>
      <Box sx={teamStyles.tableMainContainer} component={Paper}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={teamStyles.tableHeading}>Member Name</TableCell>
                <TableCell sx={teamStyles.tableHeading} align="left">
                  MEMBER EMAIL
                </TableCell>
                <TableCell sx={teamStyles.tableHeading} align="left">
                  Role
                </TableCell>
                <TableCell sx={teamStyles.tableHeading} align="left">
                  Created
                </TableCell>
                <TableCell sx={teamStyles.tableHeading} align="left">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {membersErrorMsg === "" && members.length > 0 ? (
                members.map((row) => (
                  <TableRow
                    key={row.groupMemberId}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Box sx={teamStyles.userImageContainer}>
                        <Box
                          component="img"
                          src={tokenWithUrl(row.image)}
                          sx={teamStyles.userImage}
                          alt={row.fullName}
                          onError={handleCardLayoutPlaceHolder}
                        />
                        <Typography
                          variant="body1"
                          color="initial"
                          sx={teamStyles.tableCell}
                        >
                          {row.fullName}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell
                      component="th"
                      align="left"
                      scope="row"
                      sx={teamStyles.tableCell}
                    >
                      {row.email}
                    </TableCell>
                    <TableCell
                      component="th"
                      align="left"
                      scope="row"
                      sx={teamStyles.tableCellRole}
                    >
                      {row.roleName}
                    </TableCell>
                    <TableCell
                      component="th"
                      align="left"
                      scope="row"
                      sx={teamStyles.tableCell}
                    >
                      {moment(row.createdAt).format("DD/MM/YYYY, HH:MM:SS A")}
                    </TableCell>
                    <TableCell component="th" align="left" scope="row">
                      <Box sx={{ display: "flex", gap: 1.5 }}>
                        {permission.edit && (
                          <Box
                            component="img"
                            src={EditIconImg}
                            sx={{ cursor: "pointer" }}
                            onClick={() => handleEdit(row.userId)}
                          />
                        )}
                        {permission.delete && (
                          <Box
                            component="img"
                            src={DeleteIconImg}
                            sx={{ cursor: "pointer" }}
                            onClick={() => handleDelete(row.groupMemberId)}
                          />
                        )}
                        {!permission.delete && !permission.edit && "---"}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    align="left"
                    colSpan={5}
                    scope="row"
                  >
                    <Typography
                      color={colors.validate}
                      fontSize={13}
                      textAlign={"center"}
                    >
                      {membersErrorMsg}
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {membersPagination.totalPages > 1 ? (
          <Pagination
            sx={{ mt: 3 }}
            count={membersPagination.totalPages}
            page={membersPagination.currentPageNumber}
            color="primary"
            onChange={(_, page) => handlePaginationChange(page)}
          />
        ) : (
          <></>
        )}
      </Box>
    </>
  );
};

export default MembersScreen;
