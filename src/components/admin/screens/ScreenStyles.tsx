import { colors, fonts, hex2rgba } from "../../../config/theme";
const commonBtns = {
  width: "30px",
  height: "30px",
  borderRadius: "4px",
  "& img": {
    width: "20px",
    height: "20px",
  },
};
export const screenStyles = {
  mainContainer: {
    maxWidth: 2000,
  },
  container: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: { xs: "10px", sm: "0px 30px" },
    mb: 4,
  },
  card: {
    boxSizing: "border-box",
    px: 1,
    minWidth: { xs: "fit-content", lg: "30%" },
    maxWidth: 250,
  },
  activeTableBtn: {
    height: "50px",
  },
  tableBtn: {
    height: "50px",
    bgcolor: colors.white,
    color: colors.black,
    "&:hover": {
      bgcolor: colors.white,
      color: colors.black,
    },
  },
  addBtn: { ml: "auto", height: "50px", width: "170px" },
  tableMainContainer: { display: "table", tableLayout: "fixed", width: "100%" },
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
    },
    "&.MuiTableCell-root,th,td": {
      padding: "0px",
      paddingY: "16px",
      fontSize: "14px",
      borderBottom: `1px solid ${colors.creamWhite}`,
      paddingRight: "10px",
      boxSizing: "border-box",
      "& p": {
        maxWidth: "150px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      },
    },
  },
  screenImg: { width: "30px", height: "30px", borderRadius: "5px" },
  listText: {
    minWidth: { md: "120px", lg: "150px" },
    textWrap: "nowrap",
    "& .MuiListItemText-primary": {
      fontSize: { xs: "20px", lg: "26px" },
      color: colors.black,
      fontWeight: "600",
    },
    "& .MuiListItemText-secondary": {
      fontSize: { xs: "12px", lg: "14px" },
      color: "green",
      fontWeight: "500",
    },
  },
  textField: {
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
  textFieldContainer: {
    width: { lg: "50%" },
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

  editStyle: {
    ...commonBtns,
    marginRight: "5px",
    bgcolor: hex2rgba(colors.lightGreen, 0.3),
    border: `1px solid ${colors.lightGreen}`,
  },
  settingStyle: {
    ...commonBtns,
    bgcolor: hex2rgba(colors.primary, 0.3),
    border: `1px solid ${colors.primary}`,
  },
  deleteStyle: {
    ...commonBtns,
    marginLeft: "5px",
    bgcolor: hex2rgba(colors.validate, 0.3),
    border: `1px solid ${colors.validate}`,
  },
  extraIconStyle:{
    ...commonBtns,
    marginLeft: "8px",
  },
  paginationText: {
    color: colors.grey,
    fontSize: { xs: "14px", sm: "12px", md: "16px" },
    textWrap: "nowrap",
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
  edit: { width: "100%", height: "100%" },
  errorMessage: { textAlign: "center", color: "red" },
  loading:{color:colors.activeColor}
};
