import { colors, hex2rgba } from "../../../config/theme";

export const paymentStyles = {
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
    flexWrap: "wrap",
    width: "100%",
    flexDirection: { xs: "column", sm: "row" },
    justifyContent: "end",
    gap: 3,
  },
  inputBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: { xs: "column", sm: "row", md: "column", lg: "row" },
    gap: { xs: 1, sm: 2 },
  },
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
    width: "220px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.textFieldBg,
    borderRadius: 4,
    height: 50,
    px: 2,
    boxSizing: "border-box",
  },
  textField: {
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
  acceptedText: {
    color: colors.green,
    backgroundColor: hex2rgba(colors.green, 0.38),
    width: "96px",
    height: "29px",
    border: `1px solid ${colors.green}`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "4px",
  },
  rejectedText: {
    color: colors.validate,
    backgroundColor: hex2rgba(colors.validate, 0.38),
    width: "96px",
    height: "29px",
    border: `1px solid ${colors.validate}`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "4px",
  },
  pendingText: {
    color: colors.yellow,
    backgroundColor: hex2rgba(colors.yellow, 0.38),
    width: "96px",
    height: "29px",
    border: `1px solid ${colors.yellow}`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "4px",
  },
  sortBox: {
    display: "flex",
    alignItems: "center",
  },
  sortFormControl: {
    "& .MuiInputBase-input.MuiOutlinedInput-input": {
      paddingRight: "24px",
      width: { xs: "40px", sm: "80px", md: "100px" },
    },
    "& .MuiOutlinedInput-root fieldset": {
      display: "none",
    },

    "& .MuiOutlinedInput-root input": {
      padding: 0,
    },
  },
};
