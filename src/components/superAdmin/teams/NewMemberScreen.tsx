import { Visibility, VisibilityOff } from "@mui/icons-material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CallIcon from "@mui/icons-material/Call";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import PersonRoundedIcon from "@mui/icons-material/Person";
import {
  Box,
  Card,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import React, { FormEvent, useState } from "react";
import { roles } from "../../../config/config";
import { colors } from "../../../config/theme";
import { signUpAction } from "../../../redux/reducers/auth";
import {
  assignMemberToGroup,
  getGroupMembers,
} from "../../../redux/reducers/superAdmin/teamsSlice";
import { useAppDispatch, useAppSelector } from "../../../utils/useRedux";
import { useRoutePermissions } from "../../../utils/useRoutePermissions";
import {
  checkEmailValidation,
  checkPhoneValidation,
  passwordRegex,
} from "../../../utils/utils";
import { CustomButton } from "./../../common/customButton/CustomButton";
import { InputField } from "./../../common/inputField/InputField";
import { teamStyles } from "./TeamStyles";

interface IState {
  showPassword: boolean;
  otpModal: boolean;
  form: {
    name: string;
    role: string;
    email: string;
    password: string;
    mobileNumber: string;
  };
  error: {
    name: string;
    email: string;
    password: string;
    mobileNumber: string;
  };
  touched: {
    name: boolean;
    email: boolean;
    password: boolean;
    mobileNumber: boolean;
  };
}
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

export const names = [
  { displayName: "User", roleId: roles.USER },
  { displayName: "Admin", roleId: roles.ADMIN },
  { displayName: "Host", roleId: roles.HOST },
  { displayName: "Vendor", roleId: roles.VENDERS },
  { displayName: "Investor", roleId: roles.INVESTORS },
  { displayName: "Ad Agency", roleId: roles.AD_AGENCY },
  { displayName: "Super Admin", roleId: roles.SUPER_ADMIN },
];

const NewMemberScreen = () => {
  const [showPassword, setShowPassword] =
    useState<IState["showPassword"]>(false);
  const [form, setForm] = useState<IState["form"]>({
    name: "",
    role: "9",
    email: "",
    password: "",
    mobileNumber: "",
  });
  const [errors, setErrors] = useState<IState["error"]>({} as IState["error"]);
  const [touched, setTouched] = useState<IState["touched"]>(
    {} as IState["touched"]
  );
  const { loading } = useAppSelector((state) => state.Auth);
  const { selectedGroupId, membersPagination } = useAppSelector(
    (state) => state.TeamsSlice
  );
  const dispatch = useAppDispatch();
  const permission = useRoutePermissions();
  const handleSelectChange = (event: SelectChangeEvent) => {
    const { value } = event.target;
    setForm((previous) => ({ ...previous, role: value }));
  };
  const validateField = () => {
    let errorObj = {} as IState["error"];
    let validNameField = /^(?:(?!.*\s{2,})[a-zA-Z][a-zA-Z ]*)?$/;
    let name = form.name;
    let email = form.email;
    let password = form.password;
    let mobileNumber = form.mobileNumber;

    if (!name) errorObj.name = "Name is required";
    else if (!validNameField.test(name)) errorObj.name = "Name is invalid";

    if (!email) errorObj.email = "Email is required";
    else if (checkEmailValidation(email)) errorObj.email = "Email is not valid";

    if (!password) errorObj.password = "Password is required";
    else if (!passwordRegex.test(password))
      errorObj.password =
        "Password must container one upper and lower case with number & special letter";

    if (!checkPhoneValidation(mobileNumber))
      errorObj.mobileNumber = "Mobile number is not valid";

    let errorsPresent = Object.keys(errorObj).length > 0;
    setErrors(errorObj);
    return errorsPresent;
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateField();
  };
  const handleInputBlur = (key: keyof typeof touched) => {
    validateField();
    setTouched((prev) => ({ ...prev, [key]: true }));
  };
  const handleAddMember = async (event: FormEvent) => {
    event.preventDefault();
    Object.keys(form).forEach((item) =>
      handleInputBlur(item as keyof typeof touched)
    );
    if (validateField()) return;
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("password", form.password);
    formData.append("mobileNumber", form.mobileNumber);
    formData.append("roleId", form.role);
    const { payload } = await dispatch(signUpAction(formData));
    if (payload.statusCode === "200") {
      const roleId = payload.data.roleId;
      const userId = payload.data.id;
      await dispatch(
        assignMemberToGroup({
          groupId: selectedGroupId as number,
          roleId: roleId,
          userId: userId,
        })
      );
      dispatch(
        getGroupMembers({
          groupId: selectedGroupId!.toString(),
          page: membersPagination.currentPageNumber.toString(),
          pageSize: membersPagination.pageSize.toString(),
        })
      );
    }
  };

  return (
    <Card
      sx={teamStyles.newMemberMainContainer}
      component={"form"}
      onSubmit={handleAddMember}
    >
      <Container maxWidth={"sm"}>
        <Grid container rowGap={2} columnSpacing={3}>
          <Grid item xs={12} sm={6} lg={6}>
            <InputField
              fieldName="Member Name"
              textProps={{
                sx: teamStyles.newMemberTextFieldProps,
              }}
              inputProps={{
                fullWidth: true,
                value: form.name,
                onChange: handleInputChange,
                onBlur: () => handleInputBlur("name"),
                name: "name",
                sx: teamStyles.newMemberInputProps,
                InputProps: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <PersonRoundedIcon />
                    </InputAdornment>
                  ),
                },
                inputProps: {
                  sx: teamStyles.newMemberInput,
                },
                error: touched.name && Boolean(errors.name),
                helperText: touched.name && errors.name,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <InputField
              fieldName="Member Email"
              textProps={{
                sx: teamStyles.newMemberTextFieldProps,
              }}
              inputProps={{
                value: form.email,
                onChange: handleInputChange,
                onBlur: () => handleInputBlur("email"),
                fullWidth: true,
                name: "email",
                inputProps: {
                  sx: teamStyles.newMemberInput,
                },
                sx: teamStyles.newMemberInputProps,
                InputProps: {
                  endAdornment: (
                    <InputAdornment position="start">
                      <EmailRoundedIcon />
                    </InputAdornment>
                  ),
                },
                error: touched.email && Boolean(errors.email),
                helperText: touched.email && errors.email,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <InputField
              fieldName="Mobile Number"
              textProps={{
                sx: teamStyles.newMemberTextFieldProps,
              }}
              inputProps={{
                fullWidth: true,
                value: form.mobileNumber,
                onChange: handleInputChange,
                onBlur: () => handleInputBlur("mobileNumber"),
                name: "mobileNumber",
                sx: teamStyles.newMemberInputProps,
                InputProps: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <CallIcon />
                    </InputAdornment>
                  ),
                },
                inputProps: {
                  sx: teamStyles.newMemberInput,
                },
                error: touched.mobileNumber && Boolean(errors.mobileNumber),
                helperText: touched.mobileNumber && errors.mobileNumber,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <Box>
              <Typography
                variant="body1"
                color="initial"
                sx={teamStyles.newMemberLabelText}
              >
                Select Role
              </Typography>
              <Select
                displayEmpty
                fullWidth
                value={form.role}
                onChange={handleSelectChange}
                input={<OutlinedInput />}
                sx={teamStyles.newMemberSelect}
                MenuProps={MenuProps}
                inputProps={{ "aria-label": "Without label" }}
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
          <Grid item xs={12} sm={6} lg={6}>
            <InputField
              fieldName="Login Password"
              textProps={{
                sx: teamStyles.newMemberTextFieldProps,
              }}
              inputProps={{
                value: form.password,
                name: "password",
                onChange: handleInputChange,
                onBlur: () => handleInputBlur("password"),
                type: showPassword ? "text" : "password",
                fullWidth: true,
                sx: teamStyles.newMemberInputProps,
                inputProps: {
                  sx: teamStyles.newMemberInput,
                },
                InputProps: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
                error: touched.password && Boolean(errors.password),
                helperText: touched.password && errors.password,
              }}
            />
          </Grid>
        </Grid>
      </Container>
      <Box sx={teamStyles.newMemberAddNewButtonContainer}>
        {permission.create && (
          <CustomButton
            width={"310px"}
            bgcolor={colors.primary}
            sx={teamStyles.newMemberAddNewButton}
            endIcon={loading ? <></> : <AddRoundedIcon />}
            type="submit"
          >
            {loading ? (
              <CircularProgress color="warning" size={"25px"} />
            ) : (
              "Add Member"
            )}
          </CustomButton>
        )}
      </Box>
    </Card>
  );
};

export default NewMemberScreen;
