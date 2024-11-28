import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Box,
  Card,
  CardContent,
  Divider,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputAdornment,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { roles } from "../../../config/config";
import { colors } from "../../../config/theme";
import {
  sendOtpEmailOrMobile,
  setUserData,
} from "../../../redux/reducers/auth";
import { emailSetter } from "../../../redux/reducers/common/forgotPasswordSlice";
import { updateProfile } from "../../../redux/reducers/common/profileSlice";
import { AppDispatch, RootState } from "../../../redux/store";
import Storage from "../../../utils/Storage";
import { useRoutePermissions } from "../../../utils/useRoutePermissions";
import { tokenWithUrl } from "../../../utils/utils";
import { settingsScreensStyles } from "../../investors/settings/settingsCards/SettingsScreensStyles";
import ChangePassword from "../changePassword/ChangePassword";
import { CustomButton } from "../customButton/CustomButton";
import { InputField } from "../inputField/InputField";
import { IOSSwitch } from "../iosSwitch/IosSwitch";
import { bannerSectionStyles } from "../landingPage/bannerSection/BannerSectionStyles";
import { ModalStyled } from "../modal/CommonModal";
import Otpverification from "./Otpverification";
import { styles } from "./ProfileCardStyles";
import { EditIcon, indiaIcon, noImage } from "./assets/assets";
import { IData, User, textFieldCommission, textFieldData } from "./constants";

interface IProfile {
  isEdit?: boolean;
}

const ProfileCard: React.FC<IProfile> = () => {
  const { user } = useSelector((store: RootState) => store.Auth);
  const {
    fullName,
    email,
    mobileNumber,
    organizationName,
    twoStepVerificationEnabled,
    id,
    roleId,
    commission,
    amountOrPercentage,
    image,
  } = user;
  const permissions = useRoutePermissions();

  const [userUpdatedData, setUserUpdatedData] = useState<User>({
    name: fullName,
    email: email,
    organization: organizationName,
    phone: mobileNumber,
    commission: commission,
    commissionValue: amountOrPercentage ?? "",
    twoStepVerification: twoStepVerificationEnabled,
  });
  const [isEmailVerified, setIsEmailVerified] = useState<boolean>(false);
  const [errors, setErrors] = useState<Partial<User>>({
    name: "",
    email: "",
    organization: "",
    phone: "",
  });
  const [isOtp, setIsOtp] = useState(false);
  const [uploadImage, setUploadImage] = useState<File | string>(image ?`${image}` : "");
  const [editFields, setEditFields] = useState<string[]>([]);
  const [isChangePassword, setIsChangePassword] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const refs: { [key in keyof User]?: React.RefObject<HTMLInputElement> } = {
    name: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    phone: useRef<HTMLInputElement>(null),
    organization: useRef<HTMLInputElement>(null),
  };

  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = (event.target.files as FileList)[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      setUploadImage(file);
    } else {
      setUploadImage("");
    }
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserUpdatedData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const getInputData = () => {
    if (
      roleId === roles.USER ||
      roleId === roles.ADMIN ||
      roleId === roles.SUPER_ADMIN ||
      roleId === roles.VENDERS
    ) {
      return textFieldData;
    } else {
      return textFieldCommission;
    }
  };

  const getValidate = (value: string) => {
    const namePattern = /^[a-zA-Z\s]+$/;
    const emailRegex = /^\S+@[a-z0-9.-]+\.[a-z]{2,}$/;
    const mobileNumberPattern = /^\d{10}$/;

    switch (value) {
      case "name":
        return namePattern.test(userUpdatedData.name)
          ? ""
          : "Please Enter Valid Name";
      case "email":
        return emailRegex.test(userUpdatedData.email)
          ? ""
          : "Please Enter valid Email";
      case "phone":
        return mobileNumberPattern.test(userUpdatedData.phone)
          ? ""
          : "Please Enter Valid Phone No.";
      case "organization":
        return userUpdatedData?.organization?.trim() === ""
          ? "Please Enter Organization Name"
          : "";
      default:
        return "";
    }
  };
  const handleEdit = (label: string) => {
    if (!editFields.includes(label)) {
      setEditFields((prev) => [...prev, label]);
      refs[label]?.current?.focus();
    }
  };
  const handleRemoveImage = () => {
    setUploadImage("");
    handleEdit("removeImage");
  };

  const handleEmailVerified = async () => {
    setIsEmailVerified(true);
    getFormData();
  };
  const getFormData = async () => {
    const formData = new FormData();
    formData.append("name", userUpdatedData.name);
    formData.append("email", userUpdatedData.email);
    formData.append("mobileNumber", userUpdatedData.phone);
    formData.append("organizationName", userUpdatedData.organization || "");
    formData.append("userId", String(id));
    formData.append(
      "twoStepVerificationEnabled",
      String(userUpdatedData.twoStepVerification)
    );
    if (uploadImage) {
      formData.append("image", uploadImage);
    } else {
      formData.append("removeProfilePhoto", String(true));
    }

    const updateDispatch = await dispatch(updateProfile(formData));
    if (updateDispatch.payload.status) {
      Storage.set("user", updateDispatch.payload.data);
      dispatch(setUserData());
      window.location.reload();
    }
    setIsEmailVerified(false);
  };

  const onSubmit = () => {
    const error: Partial<User> = {
      name: getValidate("name"),
      email: getValidate("email"),
      phone: getValidate("phone"),
      organization: getValidate("organization"),
    };
    if (Object.values(error).some((error) => error)) {
      setErrors(error);
    } else {
      if (userUpdatedData.email !== email && !isEmailVerified) {
        setIsOtp(true);
        dispatch(emailSetter({ emailOrmobile: userUpdatedData.email }));
        dispatch(sendOtpEmailOrMobile(userUpdatedData.email));
      } else {
        getFormData();
      }
      setErrors({
        name: "",
        email: "",
        organization: "",
        phone: "",
      });
    }
  };
  const handleClose = () => {
    setIsOtp(false);
  };
  const handleSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserUpdatedData((prev: User) => ({
      ...prev,
      twoStepVerification: event.target.checked,
    }));
  };
  const handleChangePassword = () => {
    setIsChangePassword(true);
  };
  const handleGoBack = () => {
    setIsChangePassword(false);
  };
  return isChangePassword ? (
    <Box>
      <Box sx={settingsScreensStyles.titleContainer}>
        <Box sx={settingsScreensStyles.iconContainer} onClick={handleGoBack}>
          <ArrowBackIcon />
        </Box>
        <Typography sx={settingsScreensStyles.title}>Settings</Typography>
      </Box>
      <Box sx={styles.changePasswordContainer}>
        <ChangePassword />
      </Box>
    </Box>
  ) : (
    <>
      {" "}
      <Box sx={styles.profileCardMainContainer}>
        <Card sx={styles.cardContainer}>
          <CardContent sx={styles.cardContent}>
            <Box sx={styles.userImageContainer}>
              <Box
                component="img"
                src={
                  uploadImage
                    ? typeof uploadImage === "string"
                      ? tokenWithUrl(uploadImage)
                      : URL.createObjectURL(uploadImage)
                    : noImage
                }
                sx={styles.userImage}
                onError={({ currentTarget }) => {
                  currentTarget.src = noImage;
                }}
              />
            </Box>

            <Box sx={styles.uploadProfileTextContainer}>
              <Box component={"label"} htmlFor="imageInput">
                <Typography
                  variant="body1"
                  color="initial"
                  sx={styles.uploadProfileText}
                  display={permissions.edit ? "block" : "none"}
                  onClick={() => handleEdit("uploadProfile")}
                >
                  Upload Profile
                </Typography>
                <Box
                  component={"input"}
                  type="file"
                  id="imageInput"
                  onChange={handleImage}
                  accept="image/*"
                  hidden
                />
              </Box>
              <Divider
                sx={{
                  ...styles.divider,
                  display: permissions.edit ? "block" : "none",
                }}
              />
              <Typography
                variant="body1"
                color="initial"
                sx={{
                  ...styles.removeText,
                  color: Boolean(uploadImage)
                    ? colors.carmine
                    : colors.searchInputColor,
                }}
                onClick={handleRemoveImage}
                display={permissions.edit ? "block" : "none"}
              >
                Remove
              </Typography>{" "}
            </Box>
            <Box sx={styles.gridMainContainer}>
              <Grid container width={"90%"} columnSpacing={2} m={"auto"}>
                {getInputData().map((each: IData) => (
                  <Grid
                    key={each.id}
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    lg={6}
                    height={"76px"}
                    mt={2}
                  >
                    {each.label === "Phone" && (
                      <Typography
                        variant="body1"
                        color="initial"
                        sx={styles.mobileLabelText}
                      >
                        {each.label}
                      </Typography>
                    )}
                    <Box
                      sx={
                        each.label === "Phone"
                          ? styles.inputMainContainer
                          : undefined
                      }
                    >
                      {each.label === "Phone" && (
                        <Box sx={styles.phoneImageContainer}>
                          <Box
                            component="img"
                            src={indiaIcon}
                            sx={styles.indianFlagIcon}
                          />
                          <Typography variant="body1" color="initial">
                            +91
                          </Typography>
                          <ExpandMoreIcon />
                        </Box>
                      )}

                      <InputField
                        fieldName={each.label !== "Phone" ? each.label : ""}
                        textProps={{ sx: styles.labelText }}
                        boxProps={{ sx: { flexGrow: 0.8 } }}
                        inputProps={{
                          variant: "outlined",
                          fullWidth: true,
                          disabled: !editFields.includes(each.name),
                          value: userUpdatedData[each.name],
                          sx: styles.textfield,
                          name: each.name,
                          inputRef: refs[each.name],
                          onChange: handleChangeInput,
                          type: "text",
                          error: !!errors[each.name],
                          helperText:
                            each.name !== "phone" && errors[each.name],
                          InputProps: {
                            sx: styles.textfieldInputProps,
                            endAdornment: (
                              <InputAdornment
                                position="end"
                                sx={styles.inputAdornment}
                                onClick={() => handleEdit(each.name)}
                              >
                                {each.name !== "commissionValue" &&
                                  each.name !== "commission" &&
                                  permissions.edit && (
                                    <Box component="img" src={EditIcon} />
                                  )}
                              </InputAdornment>
                            ),
                          },
                        }}
                      />
                    </Box>
                    <FormHelperText sx={styles.formHelperText}>
                      {each.name === "phone" && errors.phone}
                    </FormHelperText>
                  </Grid>
                ))}
              </Grid>
              {(roleId === roles.SUPER_ADMIN ||
                roleId === roles.HOST ||
                roleId === roles.AD_AGENCY ||
                roleId === roles.INVESTORS) &&
                permissions.edit && (
                  <Box sx={styles.toggleSwitchContainer}>
                    <Typography
                      variant="body1"
                      color="initial"
                      sx={styles.authenticationText}
                    >
                      Two Factor-Authentication (2FA)
                    </Typography>
                    <FormControlLabel
                      control={
                        <IOSSwitch
                          sx={styles.switch}
                          checked={userUpdatedData.twoStepVerification}
                          onChange={handleSwitch}
                        />
                      }
                      label=""
                    />
                  </Box>
                )}
            </Box>
            <Box sx={styles.saveButtonContainer}>
              <CustomButton
                sx={{
                  color: colors.white,
                  display: permissions.edit ? "block" : "none",
                }}
                bgcolor={colors.primary}
                onClick={onSubmit}
                width={"238px"}
                disabled={editFields.length === 0}
              >
                Save profile
              </CustomButton>
            </Box>
            <Typography
              variant="body1"
              color="initial"
              sx={styles.changePasswordText}
              onClick={handleChangePassword}
              display={permissions.edit ? "block" : "none"}
            >
              Change Password ?
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <ModalStyled
        isClose={true}
        handleClose={handleClose}
        isbgColor={colors.lightBlack}
        open={isOtp}
      >
        <Box sx={bannerSectionStyles.modalBox}>
          <Otpverification
            handleCloseModal={handleClose}
            handleEmailVerified={handleEmailVerified}
          />
        </Box>
      </ModalStyled>
    </>
  );
};

export default ProfileCard;
