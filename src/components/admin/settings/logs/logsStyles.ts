import { colors } from "../../../../config/theme";

export const logsStyles = {
  tableContainer: {
    mt: 9,
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
    justifyContent: "end",
  },
  inputBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: { xs: "column", sm: "row", md: "column", lg: "row" },
    gap: { xs: 1, sm: 2 },
  },
  datesMainBox: { display: "flex", gap: { xs: 1, sm: 3 } },
  tableBox: {
    display: "table",
    tableLayout: "fixed",
    width: "100%",
  },
  th: {
    "&.MuiTableCell-root,th": {
      color: colors.lightGray,
    },
    "&.MuiTableCell-root,th,td": {
      padding: "0px",
      paddingY: "16px",
      fontSize: "14px",
      borderBottom: `1px solid ${colors.creamWhite}`,
      paddingRight:"15px",
      boxSizing: "border-box",
      maxWidth: "150px",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  },
  table: { minWidth: 750 },

  dateBox: {
    display: "flex",
    alignItems: "center",
    backgroundColor: colors.textFieldBg,
    borderRadius: 4,
    height: 50,
    gap: 2,
    pl: 1,
    px: 2,
  },
  textField: {
    width: "100%",
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
};
