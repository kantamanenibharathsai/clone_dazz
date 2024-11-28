import { SxProps } from "@mui/material";
import { colors, fonts, hex2rgba } from "../../../config/theme";

export const teamStyles = {
  mainContainer: {
    display: "flex",
    justifyContent: "center",
    background: colors.white,
    alignItems: "center",
    width: { xs: "80%", sm: "50%", md: "50%", lg: "30%" },
    marginLeft: "auto",
    borderRadius: "10px",
    "& .MuiBox-root": {
      p: 0,
    },
  },
  tabText: {
    fontSize: "15px",
    fontWeight: "500",
    textTransform: "capitalize",
    padding: "5px 0px",
  },
  title: {
    color: colors.white,
    fontFamily: fonts.primary,
    fontSize: "clamp(1.0625rem, 0.9531rem + 0.625vw, 1.5rem)",
  },
  subContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    "& .MuiBox-root": {
      p: 0,
    },
    width: "100%",
    flexWrap: "wrap",
  },
  subTitle: {
    color: colors.black,
    fontFamily: fonts.primary,
    fontSize: "clamp(1.0625rem, 1.0156rem + 0.2679vw, 1.25rem)",
  },
  mainPaperContainer: {
    width: "100%",
    boxSizing: "border-box",
    minHeight: "550px",
    backgroundColor: colors.white,
    borderRadius: "20px",
    display: "flex",
    flexDirection: "column",
    rowGap: 2,
    p: 3,
  },
  header: {
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 2,
  },
  breadCrumbContainer: {
    display: "flex",
    flexWrap: "wrap",
    width: { xs: "100%", lg: "50%" },
    rowGap: 0,
  },
  activeBreadCrumbBtn: {
    "&.MuiButtonBase-root": {
      textTransform: "none",
      color: colors.black,
      fontWeight: 700,
      fontSize: { xs: "20px", md: "22px" },
      p: 0,
    },
    "&.MuiButtonBase-root:hover": {
      background: "none",
    },
  },
  inActiveBreadCrumbBtn: {
    "&.MuiButtonBase-root": {
      textTransform: "none",
      color: hex2rgba(colors.black, 0.6),
      fontWeight: 700,
      fontSize: { xs: "20px", md: "22px" },
      p: 0,
      px: 0.5,
    },
    "&.MuiButtonBase-root:hover": {
      background: "none",
    },
  },
  textFieldContainer: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "center",
    flexDirection: "row",
    gap: 2,
  },
  textField: {
    width: { md: "300px" },
    "& .MuiOutlinedInput-root": {
      backgroundColor: colors.modalBoxShadow,
      borderRadius: "10px",
      height: "50px",
      paddingLeft: "10px",
      "&:hover": {
        borderColor: "transparent",
        outline: "none",
      },
      "& .MuiOutlinedInput-notchedOutline": {
        border: "none",
      },
    },
    "& .MuiInputBase-input": {
      fontSize: "17px",
      fontWeight: "500",
      color: colors.lightGrey,
      ml: 1,
    },
    icon: {
      height: "25px",
      width: "25px",
    },
  },
  addNewBtn: {
    "&.MuiButtonBase-root": {
      textTransform: "none",
      borderRadius: "70px",
      fontWeight: 700,
      border: `1.5px solid ${colors.primary}`,
    },
  },
  inputText: {
    "& input": { color: hex2rgba(colors.uploadText, 0.7) },
    "& p": {
      color: colors.validate,
    },
  },
  categoryModal: {
    display: "flex",
    flexDirection: "column",
    width: "80vw",
    maxWidth: "540px",
    height: "70vh",
    maxHeight: "500px",
    p: { xs: 2, md: 4 },
    boxSizing: "border-box",
    justifyContent: "space-between",
  },
  groupScreenMainContainer: {
    p: 3,
    borderRadius: "20px",
    boxSizing: "border-box",
    minHeight: "100vh",
  },
  groupScreenSubContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  groupScreenButton: {
    border: `1.5px solid ${colors.primary}`,
    height: "38px",
  },
  addRoundedIcon: {
    color: colors.primary,
  },
  genreDataMapContainer: {
    display: "flex",
    gap: 2,
    flexWrap: "wrap",
    mt: 7,
  },
  modalTitleText: {
    fontWeight: 500,
    fontSize: { xs: "20px", md: "24px" },
    color: colors.white,
  },
  errImage: {
    color: colors.validate,
    fontSize: "11px",
    fontFamily: fonts.primary,
    pl: 1.5,
  },
  updateButtonGroup: {
    height: 48,
    width: 202,
    alignSelf: "center",
  },
  tableHeading: {
    color: colors.searchInputColor,
    textTransform: "uppercase",
    fontFamily: fonts.primary,
    fontWeight: 500,
  },
  tableCell: {
    color: colors.labelText,
    fontSize: "14px",
    fontFamily: fonts.primary,
    fontWeight: 500,
  },
  tableCellRole: {
    color: colors.lightGreen,
    fontSize: "14px",
    fontFamily: fonts.primary,
    fontWeight: 500,
    textTransform: "capitalize",
  },
  tableMainContainer: {
    display: "table",
    tableLayout: "fixed",
    width: "100%",
    borderRadius: "20px",
    p: 2,
    boxSizing: "border-box",
  },
  userImageContainer: {
    display: "flex",
    gap: 1,
    alignItems: "center",
  },
  userImage: {
    height: "30px",
    width: "30px",
    borderRadius: "15px",
  },
  newMemberMainContainer: {
    width: "100%",
    py: 7,
    px: 4,
    boxSizing: "border-box",
    direction: "flex",
    justifyContent: "center",
    borderRadius: "25px",
  },
  newMemberTextFieldProps: {
    mb: 0.5,
  },
  newMemberInputProps: {
    backgroundColor: colors.textFieldBg,
  },
  newMemberInput: {
    color: colors.uploadText,
    fontSize: "13px",
    fontFamily: fonts.primary,
  },
  newMemberLabelText: {
    fontWeight: 500,
    fontSize: "clamp(0.875rem, 0.8596rem + 0.0877vw, 1rem)",
    marginLeft: 1,
    mb: 0.5,
    "& .MuiOutlinedInput-input": {
      color: "red",
    },
  },
  newMemberSelect: {
    "&  .MuiOutlinedInput-input": {
      color: colors.uploadText,
      fontWeight: 500,
      fontFamily: fonts.primary,
    },
    height: "52px",
    borderRadius: "10px",
    border: `1px solid ${colors.creamWhite}`,
    backgroundColor: colors.textFieldBg,
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
  },
  newMemberAddNewButton: {
    color: colors.white,
    fontFamily: fonts.secondary,
    fontSize: "14px",
    fontWeight: 500,
    height: "48px",
  },
  newMemberAddNewButtonContainer: {
    display: "flex",
    justifyContent: "center",
    mt: 9,
  },
  adminText: {
    color: colors.black,
    fontFamily: fonts.secondary,
    fontSize: "20px",
    fontWeight: 500,
  },
} satisfies Record<string, SxProps>;

export const layOutStyles = {
  edit: { width: "100%", height: "100%" },
  innerMain: {
    display: "flex",
    height: 160,
    width: "100%",
    gap: 2,
    borderRadius: 2,
  },
  image: { height: "100%", width: "50%", borderRadius: 5 },
  contentBox: {
    display: "flex",
    width: "50%",
    flexDirection: "column",
    gap: 0.5,
  },
  title: {
    fontSize: "clamp(0.875rem, 0.8596rem + 0.0877vw, 1rem)",
    fontWeight: 600,
    fontFamily: fonts.primary,
    color: colors.black,
    pr: 1,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  date: {
    color: colors.stormDust,
    fontWeight: 500,
    fontSize: "clamp(0.875rem, 0.8596rem + 0.0877vw, 1rem)",
    fontFamily: fonts.primary,
  },
  iconsBox: { display: "flex", gap: "4%", mt: 1 },
  layOutMainBox: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
    mt: 2,
  },
  layOutBox: { display: "flex", alignItems: "center", gap: { xs: 0, sm: 1 } },
  layOutText: {
    color: colors.stormDust,
    fontWeight: 500,
    fontSize: "clamp(0.875rem, 0.8596rem + 0.0877vw, 1rem)",
    fontFamily: fonts.primary,
    whiteSpace: "nowrap",
  },
  modalBox: {
    width: { xs: 300, sm: 550, md: 650 },
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    alignItems: "center",
    justifyContent: "space-between",
  },
  deleteAdsText: {
    color: colors.white,
    fontSize: "clamp(1.1875rem, 1.1645rem + 0.1316vw, 1.375rem)",
  },
  areYouText: {
    color: colors.white,
    fontWeight: 500,
    fontFamily: fonts.primary,
    fontSize: "clamp(0.6875rem, 0.6645rem + 0.1316vw, 0.875rem)",
  },
  buttonsBox: { display: "flex", gap: 2 },
};

export const teamVerifyStyles = {
  closeButton: {
    position: "absolute",
    top: "20px",
    right: "20px",
    "&.MuiButtonBase-root": {
      backgroundColor: "white",
      color: "black",
      width: 30,
      height: 30,
    },
  },
  verificationText: {
    fontSize: "clamp(1.125rem, 1.0943rem + 0.1754vw, 1.375rem)",
    fontWeight: "600",
    textAlign: "left",
    color: "white",
  },
  verificationLabel: {
    fontSize: "clamp(0.625rem, 0.5943rem + 0.1754vw, 0.875rem)",
    fontWeight: "500",
    color: hex2rgba(colors.white, 0.5),
  },
  otpDigitContainer: {
    fontSize: "clamp(1.25rem, 1.2116rem + 0.2193vw, 1.5625rem);",
    px: "clamp(0.9375rem, 0.9114rem + 0.1491vw, 1.15rem);",
    width: "clamp(2.8125rem, 2.6743rem + 0.7895vw, 3.9375rem)",
    height: "clamp(3rem, 2.8388rem + 0.9211vw, 4.3125rem);",
    borderRadius: "11.04px ",
    border: "2.76px solid",
    backgroundColor: hex2rgba(colors.white, 0.9),
  },
  notReceiveYet: {
    fontSize: "clamp(0.9375rem, 0.8991rem + 0.2193vw, 1.25rem)",
    color: colors.grey,
  },
  resend: {
    textDecoration: "underline",
    color: colors.activeColor,
    cursor: "pointer",
  },
  verifyOtpBtn: {
    color: "white",
    fontWeight: 600,
    padding: "10px, 16px, 10px, 20px",
    width: "clamp(12.5rem, 10.2069rem + 13.1034vw, 22rem)",
    height: "60px",
    textTransform: "none",
    alignSelf: "center",
  },
};
