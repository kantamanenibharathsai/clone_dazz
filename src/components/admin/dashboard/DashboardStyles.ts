import { SxProps } from "@mui/material";
import { colors, fonts, hex2rgba } from "../../../config/theme";

export const dashboardStyles = {
  mainContainer: {
    maxWidth: 2000,
  },
  cardContainer: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: { xs: "10px", sm: "0px 30px" },
    mb: 4,
  },

  mainTable: {
    display: "table",
    tableLayout: "fixed",
    width: "100%",
  },
  tableContainer: {
    borderRadius: "30px",
    bgcolor: colors.white,
    py: 3,
    px: { xs: 3, sm: 5 },
    boxSizing: "border-box",
  },
  th: {
    "&.MuiTableCell-root,th": {
      color: colors.lightGray,
      borderBottom: `1px solid ${colors.validate}`,
    },
    "&.MuiTableCell-root,th,td": {
      padding: "0px",
      paddingY: "16px",
      fontSize: "14px",
      fontWeight:500,
      borderBottom: `1px solid ${colors.creamWhite}`,
      paddingRight: "10px",
      boxSizing: "border-box",
      "& p":{
        maxWidth: "150px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }
    },
  },

  listText: {
    minWidth: "150px",
    textWrap: "nowrap",
    "& .MuiListItemText-primary": {
      fontSize: { xs: "20px", lg: "24px" },
      color: colors.black,
      fontWeight: "600",
    },
    "& .MuiListItemText-secondary": {
      fontSize: { xs: "12px", md: "14px" },
      color: "green",
      fontWeight: "600",
    },
  },
  textField: {
    width: { md: "50%" },
    "& .MuiOutlinedInput-root": {
      backgroundColor: colors.textFieldBg,
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
  paginationText: {
    color: colors.grey,
    fontSize: { xs: "14px", sm: "12px", md: "16px" },
    textWrap: "nowrap",
  },
  textFieldContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: { xs: "column", sm: "row" },
    gap: 2,
  },
  sortContainer: {
    display: "flex",
    alignItems: "center",
    border: 0,
    borderColor: "var(--dark-color)",
    backgroundColor: colors.textFieldBg,
    padding: "2px 15px",
    borderRadius: "10px",
  },
  sortBox: {
    display: "flex",
    alignItems: "center",
  },
  sortFormControl: {
    "& .MuiInputBase-input.MuiOutlinedInput-input": {
      paddingRight: "24px",
      width: { xs: "100px", sm: "80px", md: "50px", lg: "80px" },
    },
    "& .MuiOutlinedInput-root fieldset": {
      display: "none",
    },

    "& .MuiOutlinedInput-root input": {
      padding: 0,
    },
  },
  menuItem: {
    color: colors.lightGray,
    fontSize: "17px",
    fontWeight: "400",
    textWrap: "nowrap",
  },
  activeBtn: {
    bgcolor: hex2rgba(colors.lightGreen, 0.3),
    border: `1px solid ${colors.lightGreen}`,
    color: colors.lightGreen,
    width: "80px",
    textTransform: "none",
    fontFamily: fonts.primary,
    fontWeight: "5  00",
    height: "29px",
    ":hover": {
      bgcolor: hex2rgba(colors.lightGreen, 0.3),
    },
  },
  inActiveBtn: {
    bgcolor: hex2rgba(colors.validate, 0.3),
    border: `1px solid ${colors.validate}`,
    color: colors.validate,
    width: "80px",
    textTransform: "none",
    fontFamily: fonts.primary,
    fontWeight: "500",
    height: "29px",
    ":hover": {
      bgcolor: hex2rgba(colors.validate, 0.3),
    },
  },
} satisfies Record<string, SxProps>;
