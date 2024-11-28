import { colors, fonts } from "../../../config/theme";
import { hex2rgba } from "./../../../config/theme";

export const categoryStyles = {
  mainPaperContainer: {
    width: "100%",
    boxSizing: "border-box",
    minHeight: "550px",
    backgroundColor: colors.white,
    borderRadius: "20px",
    display: "flex",
    flexDirection: "column",
    rowGap: 6,
    p: 3,
    pb: 1,
  },
  header: {
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 2,
  },
  cardContainer: {
    mt: 0,
    display: "grid",
    placeItems: "center",
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
      fontFamily:fonts.secondary
    },
  },
  inputText: { "& input": { color: colors.black} },
  categoryModal: {
    display: "flex",
    flexDirection: "column",
    width: "80vw",
    maxWidth: "540px",
    height: "70vh",
    overflowY: "auto",
    maxHeight: "500px",
    p: { xs: 2, md: 4 },
    boxSizing: "border-box",
    justifyContent: "space-between",
  },
  titleText: {
    fontWeight: 500,
    fontSize: { xs: "20px", md: "24px" },
    color: colors.white,
  },
  nextSmallIcon: {
    backgroundColor: hex2rgba(colors.primary, 0.2),
    borderRadius: 1,
    p: 0.6,
  },
  defaultNextIcon: {
    backgroundColor: hex2rgba(colors.primary, 0.2),
    borderRadius: 1,
  },
};
export const screenGroupsStyles = {
  screenGroupModalStyle: {
    display: "flex",
    flexDirection: "column",
    width: "80vw",
    maxWidth: "540px",
    height: "85vh",
    maxHeight: "950px",
    overflowY: "scroll",
    "::-webkit-scrollbar": {
      display: "none",
    },
    p: { xs: 2, md: 4 },
    py: 0,
    boxSizing: "border-box",
    gap:1.5
  },
  screenFormModalStyles: {
    display: "flex",
    flexDirection: "column",
    width: "80vw",
    maxWidth: "540px",
    height: "85vh",
    maxHeight: "900px",
    overflowY: "scroll",
    "::-webkit-scrollbar": {
      display: "none",
    },
    p: { xs: 2, md: 4 },
    py: 0,
    boxSizing: "border-box",
    rowGap: 2,
  },
  tagAddBtn: {
    "&.MuiButtonBase-root": {
      textTransform: "none",
      background: colors.green,
      fontWeight: 700,
      fontSize: "13px",
      borderRadius: "70px",
    },
  },
  screenGroupCardContainer: {
    "& .MuiListItemText-primary": { fontWeight: 700 },
    "& p": {
      fontWeight: 700,
      color: hex2rgba(colors.black, 0.6),
    },
  },
};
