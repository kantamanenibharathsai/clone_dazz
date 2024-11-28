import { SxProps } from "@mui/material";
import { colors, fonts } from "../../../config/theme";

export const styles = {
  profileCardMainContainer: {
    display: "flex",
    justifyContent: "center",
    position: "relative",
    mt: 13,
    height: {
      xs: "100%",
    },
  },
  cardContainer: {
    width: {
      xs: "90%",
      sm: "80%",
      md: "85%",
      lg: "65%",
    },
    borderRadius: "30px",
  },
  cardContent: {
    pt: "135px",
  },
  userImageContainer: {
    display: "flex",
    justifyContent: "center",
  },
  userImage: {
    position: "absolute",
    top: {
      xs: "-60px",
      sm: "-70px",
      md: "-80px",
      lg: "-90px",
    },
    height: "166px",
    width: "166px",
    borderRadius: "50%",
    border: "10px solid #EAF5EF",
  },
  uploadProfileTextContainer: {
    display: "flex",
    justifyContent: "center",
    gap: 2,
    alignItems: "center",
  },
  uploadProfileText: {
    color: colors.uploadText,
    fontWeight: 500,
    fontSize: "14px",
    cursor: "pointer",
    fontFamily: fonts.secondary,
  },
  divider: {
    border: `1.5px solid ${colors.uploadText}`,
    height: "10px",
  },
  removeText: {
    color: colors.validate,
    fontWeight: 500,
    fontSize: "14px",
    cursor: "pointer",
    fontFamily: fonts.secondary,
  },
  gridMainContainer: {
    mt: 1.5,
  },
  labelText: {
    fontWeight: 500,
    color: colors.labelText,
    fontSize: "14px",
    mb: 0.5,
    ml: 0,
    fontFamily: fonts.primary,
  },
  mobileLabelText: {
    fontWeight: 500,
    color: colors.labelText,
    fontSize: "14px",
    mb: 0.5,
    fontFamily: fonts.primary,
  },
  inputMainContainer: {
    display: "flex",
    gap: 1,
  },

  phoneImageContainer: {
    backgroundColor: colors.textFieldBg,
    display: "flex",
    gap: 0.5,
    justifyContent: "center",
    alignItems: "center",
    p: 1,
    border: `1px solid ${colors.creamWhite}`,
    width: "85px",
    borderRadius: "10px",
    flexGrow: 0.2,
    height: "32px",
  },
  indianFlagIcon: {
    height: "20px",
    width: "32px",
  },
  textfield: {
    "& fieldset": { border: "none" },
    "& .MuiInputBase-root": {
      color: colors.uploadText,
      fontFamily: fonts.primary,
    },
  },
  textfieldInputProps: {
    border: `1.5px solid ${colors.creamWhite}`,
    borderRadius: "10px",
    backgroundColor: colors.textFieldBg,
    display: "flex",
    flexGrow: 1,
    height: "50px",
  },
  saveButtonContainer: {
    mt: 4,
    display: "flex",
    justifyContent: "center",
  },
  saveButton: {
    width: "238px",
    height: "48px",
    backgroundColor: colors.primary,
    color: colors.white,
    borderRadius: "70px",
    textTransform: "capitalize",
    fontFamily: fonts.secondary,
    "&:hover": {
      backgroundColor: colors.primary,
      color: colors.white,
    },
  },
  changePasswordText: {
    color: colors.uploadText,
    textAlign: "center",
    fontWeight: 500,
    fontSize: "15px",
    fontFamily: fonts.secondary,
    mt: 3,
    cursor: "pointer",
  },
  tabsStyles: {
    minHeight: "55px",
  },
  tabIndicatorProps: {
    width: "17% !important",
    marginLeft: "7%",
  },
  formHelperText: {
    color: colors.validate,
    fontSize: "12px",
    ml: 1.5,
  },
  inputAdornment: {
    cursor: "pointer",
  },
  settingsMainContainer: {
    display: "flex",
    justifyContent: "center",
  },
  authenticationText: {
    color: colors.black,
    fontWeight: 500,
    fontSize: "14px",
    fontFamily: fonts.primary,
    mt: 3,
  },
  toggleSwitchContainer: {
    pl: {
      xs: "10%",
      sm: "8%",
      md: "8.5%",
      lg: "8%",
    },
  },
  switch: {
    m: 1,
    width: "48px",
    height: "24px",
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 20,
      height: 20,
    },
  },
  selectField: {
    height: "50px",
    borderRadius: "10px",
    "& fieldset": {
      border: `1.5px solid ${colors.creamWhite}`,
      "& :hover": {
        border: `1.5px solid ${colors.creamWhite}`,
      },
    },
    "&:hover .MuioulinedInput-notchedOutline": {
      border: `1.5px solid ${colors.creamWhite}`,
    },
    "&.Mui-focused .MuioulinedInput-notchedOutline": {
      border: `1.5px solid ${colors.creamWhite}`,
    },

    backgroundColor: colors.textFieldBg,
    "& .MuiInputBase-root": {
      color: colors.uploadText,
      fontFamily: fonts.primary,
    },
  },

  changePasswordScreenContainer: {
    mt: 2,
  },
  changePasswordContainer: {
    mt: 2,
    p: 2,
  },
} satisfies Record<string, SxProps>;
