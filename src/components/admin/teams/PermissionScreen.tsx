import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import PersonRoundedIcon from "@mui/icons-material/Person";
import {
  Box,
  Card,
  Checkbox,
  CircularProgress,
  Container,
  Grid,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { roles } from "../../../config/config";
import { colors } from "../../../config/theme";
import {
  updateMemberPermissionInAdmin,
  updateMemberPermissionInfoInAdmin,
  updateUserRoleInAdmin,
} from "../../../redux/reducers/adminReducers/teamSlice";
import { useAppDispatch, useAppSelector } from "../../../utils/useRedux";
import { useRoutePermissions } from "../../../utils/useRoutePermissions";
import { checked, unChecked } from "../assets/Index";
import { CustomButton } from "./../../common/customButton/CustomButton";
import { InputField } from "./../../common/inputField/InputField";
import { teamStyles } from "./TeamStyles";
const names = [
  { displayName: "User", roleId: roles.USER },
  { displayName: "Admin", roleId: roles.ADMIN },
  { displayName: "Host", roleId: roles.HOST },
  { displayName: "Vendor", roleId: roles.VENDERS },
  { displayName: "Investor", roleId: roles.INVESTORS },
  { displayName: "Ad Agency", roleId: roles.AD_AGENCY },
];
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const PermissionsScreen = () => {
  const {
    memberPermission,
    loading,
    selectedUserForPermission,
    memberPermissionError,
  } = useAppSelector((state) => state.ATeamsSlice);
  const permissionsList = memberPermission.permission;
  const [form, setForm] = useState({
    name: selectedUserForPermission.fullName,
    roleId: selectedUserForPermission.roleId,
    email: selectedUserForPermission.email,
  });
  const dispatch = useAppDispatch();
  const permission = useRoutePermissions();
  const handleChange = (event: SelectChangeEvent) => {
    const roleID = event.target.value;
    setForm((pre) => ({ ...pre, roleId: roleID }));
    dispatch(
      updateUserRoleInAdmin({
        roleId: roleID,
        userId: selectedUserForPermission.userId,
      })
    );
  };
  const handleCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.name;
    const moduleName = event.target.value;
    const state = event.target.checked;
    dispatch(
      updateMemberPermissionInfoInAdmin({
        key: key,
        name: moduleName,
        state: state,
      })
    );
  };
  const handleUpdatePermissions = () => {
    dispatch(
      updateMemberPermissionInAdmin({
        id: memberPermission.userId,
        permission: JSON.stringify(permissionsList),
      })
    );
  };
  return (
    <Grid container columnSpacing={3} rowSpacing={3}>
      <Grid item lg={4}>
        <Card sx={{ ...teamStyles.newMemberMainContainer, px: 2 }}>
          <Container>
            <Grid container rowGap={2} columnSpacing={3}>
              <Grid item xs={12} sm={6} lg={12}>
                <InputField
                  fieldName="Member Name"
                  textProps={{
                    sx: { ...teamStyles.newMemberTextFieldProps, ml: 0 },
                  }}
                  inputProps={{
                    fullWidth: true,
                    value: form.name,
                    name: "name",
                    sx: teamStyles.newMemberInputProps,
                    InputProps: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <PersonRoundedIcon />
                        </InputAdornment>
                      ),
                      readOnly: true,
                    },
                    inputProps: {
                      style: teamStyles.newMemberInput,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} lg={12}>
                <InputField
                  fieldName="Member Email"
                  textProps={{
                    sx: { ...teamStyles.newMemberTextFieldProps, ml: 0 },
                  }}
                  inputProps={{
                    value: form.email,
                    fullWidth: true,
                    name: "email",
                    inputProps: {
                      style: teamStyles.newMemberInput,
                    },
                    sx: teamStyles.newMemberInputProps,
                    InputProps: {
                      endAdornment: (
                        <InputAdornment position="start">
                          <EmailRoundedIcon />
                        </InputAdornment>
                      ),
                      readOnly: true,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} lg={12}>
                <Box>
                  <Typography
                    variant="body1"
                    color="initial"
                    sx={{ ...teamStyles.newMemberLabelText, ml: 0 }}
                  >
                    Select Role
                  </Typography>
                  <Select
                    fullWidth
                    value={form.roleId}
                    onChange={handleChange}
                    input={<OutlinedInput />}
                    sx={teamStyles.newMemberSelect}
                    MenuProps={MenuProps}
                  >
                    {names.map((item) => (
                      <MenuItem
                        key={item.roleId}
                        value={item.roleId}
                        sx={teamStyles.newMemberInput}
                      >
                        <Typography
                          variant="body1"
                          color="initial"
                          sx={teamStyles.newMemberInput}
                        >
                          {item.displayName}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
              </Grid>
            </Grid>
          </Container>
          {permission.edit && (
            <Box sx={{ ...teamStyles.newMemberAddNewButtonContainer, mt: 4 }}>
              <CustomButton
                width={"290px"}
                bgcolor={colors.primary}
                sx={teamStyles.newMemberAddNewButton}
                onClick={handleUpdatePermissions}
              >
                Update
              </CustomButton>
            </Box>
          )}
        </Card>
      </Grid>
      <Grid item lg={8}>
        <Card sx={{ borderRadius: "24px", px: 3, py: 5 }}>
          <Typography variant="body1" color="initial" sx={teamStyles.adminText}>
            {
              names.find(
                (item) =>
                  item.roleId.toString() === selectedUserForPermission.roleId
              )?.displayName
            }
          </Typography>
          <Box sx={teamStyles.tableMainContainer}>
            <Box textAlign={"center"}>
              {loading && <CircularProgress size={"25px"} />}
              {!loading && memberPermissionError && (
                <Typography fontSize={13} color={colors.validate}>
                  {memberPermissionError}
                </Typography>
              )}
            </Box>
            {!loading &&
              memberPermissionError.length === 0 &&
              permissionsList.length > 0 && (
                <TableContainer sx={{ borderRadius: "20px", mt: 2 }}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={teamStyles.tableHeading}>
                          Permissions
                        </TableCell>
                        <TableCell sx={teamStyles.tableHeading} align="left">
                          Create
                        </TableCell>
                        <TableCell sx={teamStyles.tableHeading} align="left">
                          View
                        </TableCell>
                        <TableCell sx={teamStyles.tableHeading} align="left">
                          Update
                        </TableCell>
                        <TableCell sx={teamStyles.tableHeading} align="left">
                          Delete
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {permissionsList
                        .filter(
                          (item) => item.moduleName.toLowerCase() !== "logout"
                        )
                        .map((item) => (
                          <TableRow
                            key={item.moduleName}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {item.moduleName}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              <Checkbox
                                icon={<Box component="img" src={unChecked} />}
                                checkedIcon={
                                  <Box component="img" src={checked} />
                                }
                                name="create"
                                value={item.moduleName}
                                checked={item.create}
                                onChange={handleCheckBox}
                              />
                            </TableCell>
                            <TableCell
                              component="th"
                              align="left"
                              scope="row"
                              sx={teamStyles.tableCell}
                            >
                              <Checkbox
                                icon={<Box component="img" src={unChecked} />}
                                checkedIcon={
                                  <Box component="img" src={checked} />
                                }
                                name="view"
                                value={item.moduleName}
                                checked={item.view}
                                onChange={handleCheckBox}
                              />
                            </TableCell>
                            <TableCell
                              component="th"
                              align="left"
                              scope="row"
                              sx={teamStyles.tableCellRole}
                            >
                              <Checkbox
                                icon={<Box component="img" src={unChecked} />}
                                checkedIcon={
                                  <Box component="img" src={checked} />
                                }
                                name="update"
                                value={item.moduleName}
                                checked={item.update}
                                onChange={handleCheckBox}
                              />
                            </TableCell>
                            <TableCell
                              component="th"
                              align="left"
                              scope="row"
                              sx={teamStyles.tableCell}
                            >
                              <Checkbox
                                icon={<Box component="img" src={unChecked} />}
                                checkedIcon={
                                  <Box component="img" src={checked} />
                                }
                                name="delete"
                                value={item.moduleName}
                                checked={item.delete}
                                onChange={handleCheckBox}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
};

export default PermissionsScreen;
