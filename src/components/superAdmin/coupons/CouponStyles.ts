import { colors, hex2rgba } from "../../../config/theme";

export const styles = {
  tableContainer: {
    ".MuiTableCell-root": {
      borderBottom: "none",
      color: "inherit",
      textWrap: "nowrap",
      pl: 0,
    },
    "& .MuiTableRow-head": {
      color: colors.lightGray,
    },
  },
  clientTableBody: {
    "& .MuiTableCell-body": {
      color: colors.labelText,
      fontSize: "clamp(0.75rem, 0.7346rem + 0.0877vw, 0.875rem)",
      fontWeight: 500,
      borderBottom: "1px solid #EEEEEE",
    },
    "& .MuiTableRow-root:last-child .MuiTableCell-body": {
      borderBottom: "none",
    },
  },
  contentContainer: {
    background: colors.white,
    p: { xs: 2, md: 4 },
    borderRadius: "15px",
  },
  clientText: {
    fontSize: "clamp(1rem, 0.9539rem + 0.2632vw, 1.375rem)",
    fontWeight: 600,
    mr: "auto",
  },
  whiteColor: {
    color: colors.white,
  },
  dataStats: {
    color: colors.lightGray,
    fontSize: "14px",
    fontWeight: 700,
  },
  listText: {
    minWidth: "150px",
    textWrap: "nowrap",
    "& .MuiListItemText-primary": {
      fontSize: { xs: "20px", md: "26px" },
      color: colors.black,
      fontWeight: "600",
    },
    "& .MuiListItemText-secondary": {
      fontSize: { xs: "12px", md: "16px" },
      color: "green",
      fontWeight: "500",
    },
  },
  textField: {
    width: { md: "300px" },
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
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
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
      width: { xs: "40px", sm: "80px", md: "100px" },
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
  outlinedBtn: {
    "&.MuiButtonBase-root": {
      width: 124,
      height: 38,
      border: `1.5px solid ${colors.primary}`,
      textTransform: "none",
      fontSize: "14px",
      borderRadius: "75px",
    },
  },
  headerContainer: {
    display: "flex",
    justifyContent: "right",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 1,
  },
  tableHolder: {
    display: "table",
    tableLayout: "fixed",
    width: "100%",
  },
  tableMinWidth: {
    minWidth: "850px",
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
    fontSize: "clamp(0.6875rem, 0.6645rem + 0.1316vw, 0.875rem)",
  },
  buttonsBox: { display: "flex", gap: 2 },
  addNewUserContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "75vw",
    maxWidth: "700px",
    bgcolor: colors.lightBlack,
    boxShadow: 24,
    borderRadius: 5,
    p: 4,
    height: "70vh",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    "::-webkit-scrollbar": {
      display: "none",
    },
  },
  titleText: {
    color: colors.white,
    fontWeight: 500,
    fontSize: { xs: "20px", md: "22px" },
    my: { xs: 2, md: 0 },
    textAlign: { xs: "center", md: "left" },
  },
  labelText: { color: colors.white, ml: -0.2, mr: 1 },
  customBtnCenter: { alignSelf: "center" },
  closeIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    background: colors.lightGray,
  },
  inputText: { "& input": { color: colors.black } },
  selectText: {
    "& .MuiInputBase-input": { color: colors.black },
  },
  unShadowMenu: {
    "& .MuiPaper-root": {
      boxShadow: "none",
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
};
