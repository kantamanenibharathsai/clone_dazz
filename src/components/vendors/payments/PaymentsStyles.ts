import { colors, hex2rgba } from "../../../config/theme";
export const logsStyles = {
  tableContainer: {
    mt: 9,
    borderRadius: "20px",
    bgcolor: colors.white,
    py: 3,
    px: { xs: 3, sm: 5 },
    boxSizing: "border-box",
  },
  tableHeading: {
    fontSize: "clamp(1.375rem, 1.352rem + 0.1316vw, 1.5625rem)",
    fontWeight: 500,
  },
  inputMainBox: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    justifyContent: "end",
    gap: 2,
  },
  inputBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: { xs: "column", sm: "row", md: "row", lg: "row" },
    gap: { xs: 1, sm: 2 },
  },
  datesMainBox: {
    display: "flex",
    flexWrap: "wrap",
    gap: { xs: 1, sm: 2 },
  },
  tableBox: { display: "table", tableLayout: "fixed", width: "100%", mt: 2 },
  table: {
    minWidth: 750,
  },
  loadingBox: { textAlign: "center", my: 5, color: colors.validate },
  th: {
    "&.MuiTableCell-root,th": {
      color: colors.lightGray,
      borderBottom: `1px solid ${colors.validate}`,
    },
    "&.MuiTableCell-root,th,td": {
      padding: "0px",
      paddingY: "16px",
      fontSize: "14px",
      borderBottom: `1px solid ${colors.creamWhite}`,
    },
  },
  dateText: (isExist: Boolean) => ({
    width: isExist ? 100 : 40,
    transition: "0.5s",
    whiteSpace: "nowrap",
    overflow: "hidden",
  }),
  dateBox: {
    display: "flex",
    alignItems: "center",
    backgroundColor: colors.textFieldBg,
    borderRadius: 4,
    height: 55,
    gap: 2,
    pl: 1,
    px: 2,
  },
  textField: {
    width: "100%",
    height: 55,
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
  cellHeading: {
    fontWeight: 500,
    fontSize: "clamp(0.875rem, 0.8596rem + 0.0877vw, 1rem)",
    color: colors.lightGray,
  },
  upperCaseTableText: {
    fontWeight: 500,
    maxWidth: 200,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    textTransform: "uppercase",
    fontSize: "clamp(0.875rem, 0.8596rem + 0.0877vw, 1rem)",
  },
  statusText: (status: string) => ({
    color:
      status === "success"
        ? colors.green
        : status === "pending"
        ? colors.yellow
        : colors.validate,
    backgroundColor:
      status === "success"
        ? hex2rgba(colors.green, 0.38)
        : status === "pending"
        ? hex2rgba(colors.yellow, 0.38)
        : hex2rgba(colors.validate, 0.38),
    border: `1px solid ${
      status === "success"
        ? colors.green
        : status === "pending"
        ? colors.yellow
        : colors.validate
    }`,
    textTransform: "capitalize",
    width: "96px",
    height: "29px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "4px",
  }),
  capitalizeTableText: {
    fontWeight: 500,
    textTransform: "capitalize",
    fontSize: "clamp(0.875rem, 0.8596rem + 0.0877vw, 1rem)",
    width: 200,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  paginationBox: {
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    justifyContent: "end",
    gap: { xs: 2, sm: "" },
    alignItems: "center",
    mt: 3,
  },
  paginationActiveColor: {
    "& .MuiButtonBase-root.MuiPaginationItem-root.Mui-selected": {
      background: colors.primary,
      fontSize: "10px",
      color: colors.white,
      outline: "none",
      "&:hover": {
        background: colors.primary,
      },
    },
    "& .MuiButtonBase-root": {
      fontSize: "10px",
      border: "none",
      boxShadow: "0px 8.146788597106934px 16.293577194213867px 0px #00000014",
      background: colors.white,
      outline: "none",
      "&:hover": {
        background: colors.white,
      },
      borderRadius: "8px",
    },
    "& .MuiPaginationItem-root": {
      background: colors.white,
      height: "32px",
      borderRadius: "6px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
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
  flexWrapMainBox: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 2,
  },
};
