import { colors } from "../../../config/theme";

export const logsStyles = {
  tableContainer: {
    mt: 5,
    borderRadius: "20px",
    bgcolor: colors.white,
    py: 3,
    px: { xs: 3, sm: 5 },
    boxSizing: "border-box",
  },
  inputMainBox: {
    display: "flex",
    width: "100%",
    flexDirection: { xs: "column", sm: "row" },
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 2,
  },
  inputBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: { xs: "column", sm: "row", md: "column", lg: "row" },
    gap: { xs: 1, sm: 2 },
  },
  datesMainBox: { display: "flex", gap: { xs: 1, sm: 3 }, flexWrap: "wrap" },
  tableBox: { display: "table", tableLayout: "fixed", width: "100%" },
  table: {
    minWidth: 750,
    "& .MuiTableCell-root": {
      color: colors.labelText,
      fontWeight: 500,
    },
    "& .MuiTableCell-root.MuiTableCell-head": {
      color: colors.lightGray,
    },
  },
  exportBtn: {
    "&.MuiButtonBase-root": {
      height: "45px",
      background: colors.alabaster,
      textTransform: "none",
      color: colors.uploadText,
    },
  },
  dateBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.textFieldBg,
    borderRadius: 4,
    height: 50,
    gap: 2,
    pl: 1,
    px: 2,
    width: "220px",
  },
  textField: {
    width: "300px",
    "& .MuiInputBase-input.MuiOutlinedInput-input": {
      fontWeight: 400,
    },
    "& .MuiOutlinedInput-notchedOutline": {
      display: "none",
    },
  },
  menuItem: {
    color: colors.lightGray,
    fontSize: "17px",
    fontWeight: "400",
    textWrap: "nowrap",
  },
  dateButtonsBox: {
    width: "100%",
    display: "flex",
    justifyContent: "end",
    "& .MuiButtonBase-root.MuiButton-root": {
      textTransform: "none",
    },
  },
  logsText: {
    "&.MuiListItemText-root": {
      "-webkit-flex": "none",
    },
    "& .MuiTypography-body1": {
      fontSize: { xs: "18px", md: "22px" },
      fontWeight: 600,
    },
    "& .MuiTypography-body2": {
      fontSize: { xs: "12px", md: "14px" },
      fontWeight: 500,
      mt: 1,
    },
  },
  resetBtn: {
    "&.MuiButtonBase-root": {
      textTransform: "none",
    },
  },
};
