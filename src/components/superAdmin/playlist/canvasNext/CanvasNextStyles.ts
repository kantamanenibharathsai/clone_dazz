import { colors } from "../../../../config/theme";
const ellipsis = {
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: "250px",
  paddingRight: "10px",
  boxSizing: "border-box",
};
export const canvasNextStyles = {
  shceduleButtonsBox:{
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },
  loadingTextBox:{ display: "grid", placeItems: "center" },
  textFieldBox:{
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 1,
  },
  totalItemsBox:{ display: "flex", alignItems: "center", gap: 1 },
  errorText: { height: 12, fontSize: 12, color: colors.validate, ml: 2 },
  screensText: {
    fontSize: "clamp(0.875rem, 0.7188rem + 0.5vw, 1rem)",
    fontWeight: 500,
  },
  adText: {
    color: colors.white,
    fontSize: "clamp(1rem, 0.8438rem + 0.5vw, 1.125rem)",
    mb: 3,
    mt: 8,
  },
  tableHeading: {
    fontWeight: 500,
    fontSize: "clamp(1.1875rem, 1.1645rem + 0.1316vw, 1.375rem)",
  },
  adMainBox: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,minMax(110px,1fr))",
    placeItems: "center",
    gridAutoRows: "120px",
    width: "100%",
    justifyContect: "center",
    alignItems: "center",
  },
  adBox: (isCurrent: boolean) => ({
    "&.MuiButtonBase-root.MuiListItemButton-root": {
      height: "100px",
      width: "100px",
      p: 0,
      outline: "4px solid",
      outlineColor: isCurrent ? colors.activeColor : "transparent",
      borderRadius: "10px",
    },
  }),
  adImage: { height: "100%", width: "100%", borderRadius: "10px" },
  adloader: (color: string) => ({
    width: "100%",
    mx: "auto",
    textAlign: "center",
    color: color,
  }),
  header: {
    height: "80px",
    bgcolor: colors.white,
    borderRadius: "40px",
  },
  tableContainer: {
    "&.MuiTableCell-root,th": {
      color: colors.lightGray,
    },
    "&.MuiTableCell-root,th,td": {
      padding: "0px",
      paddingY: "16px",
      fontSize: "14px",
      borderBottom: `1px solid ${colors.creamWhite}`,
      "& p": {
        ...ellipsis,
      },
    },
  },
  headerIcon: { width: "20px", height: "20px" },
  headerBtns: {
    ml: "auto",
    mr: "20px",
    width: "142px",
    height: "50px",
  },
  headerIconPublic: {
    mr: "20px",
    width: "142px",
    height: "50px",
  },
  tabs: {
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    gap: { xs: 1, sm: 5 },
    overflow: "hidden",
    height: "80px",
  },
  tabsElement: (index: number, tabNumber: number) => {
    return {
      "&.MuiButtonBase-root": {
        textTransform: "none",
        height: "80px",
        fontWeight: 500,
        borderRadius: 0,
        fontSize: "clamp(0.75rem, 0.709rem + 0.2344vw, 0.9375rem)",
        color: tabNumber === index ? colors.primary : colors.black,
        borderBottom: `3px solid ${
          tabNumber === index ? colors.primary : colors.white
        }`,
      },
    };
  },
  checkBoxMain: { display: "flex", gap: 0.5, alignItems: "center" },
  splitText: {
    color: colors.dawn,
    fontSize: "clamp(0.875rem, 0.8596rem + 0.0877vw, 1rem)",
  },
  tableBox: {
    display: "table",
    tableLayout: "fixed",
    width: "100%",
    bgcolor: colors.white,
  },
  table: { minWidth: 950 },
  deleteImg: { width: "100%", height: "100%" },
  modalMainBox: { width: { xs: 320, sm: 600, md: 800 }, borderRadius: 10 },
  scheduleText: {
    fontSize: "clamp(1.3125rem, 1.2971rem + 0.0877vw, 1.4375rem)",
    fontWeight: 500,
    color: colors.white,
    mb: "5%",
  },
  grid: {
    "& .MuiFormControl-root.MuiTextField-root .MuiOutlinedInput-root": {
      fontSize: "15px",
    },
  },
  tabBox: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: { xs: "center", lg: "space-between" },
    alignItems: "center",
    bgcolor: colors.white,
    borderRadius: "50px",
    pl: { xs: 0, sm: 8, md: 2, lg: 5 },
    py: { xs: 2, lg: 0 },
    px:2,
    gap: { xs: 1, lg: 0 },
  },
  buttonsButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  scheduleButton: { mx: "auto", mt: "5%" },
};
export const canvasGroupsStyles = {
  selectScreenBox: {
    mt: "5%",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tableContainer: {
    "&.MuiTableCell-root,th": {
      color: colors.lightGray,
    },
    "&.MuiTableCell-root,th,td": {
      padding: "0px",
      paddingY: "16px",
      fontSize: "14px",
      borderBottom: `1px solid ${colors.creamWhite}`,
    },
  },
  selectText: {
    color: colors.white,
    fontSize: "clamp(0.875rem, 0.8596rem + 0.0877vw, 1rem)",
  },
  checkBoxMain: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: { xl: "space-between" },
    gap: 5,
    mt: 5,
  },
  checkBox: {
    display: "flex",
    alignItems: "center",
    gap: 2,
    bgcolor: colors.white,
    p: 3,
    borderRadius: 4,
  },
  tableMainBox: { bgcolor: colors.white, p: 5, borderRadius: 8, mt: 5 },
  selectTextBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    pb: 3,
  },
  flexWithGap: { display: "flex", gap: 1, alignItems: "center" },
  iconButton: {
    borderRadius: 1,
    height: 35,
    width: 35,
    bgcolor: colors.validate,
    "&:hover": {
      bgcolor: colors.validate,
    },
  },
  statusText: (status: boolean) => ({
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: 150,
    bgcolor: !status ? colors.validate : colors.lightGreen,
    textAlign: "center",
    color: colors.white,
    py: 0.5,
    px: 5,
    borderRadius: 5,
  }),
  cmrText: {
    fontSize: "clamp(1.375rem, 1.352rem + 0.1316vw, 1.5625rem)",
    color: colors.white,
    fontWeight: 500,
  },
  inputsMainBox: {
    display: "flex",
    alignItems: "end",
    justifyContent: "end",
    gap: 1,
  },
  inputsBox: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 1,
    width: "100%",
  },
  mustBox: {
    display: "flex",
    alignItems: "center",
    gap: 1,
    "& p": { whiteSpace: "nowrap" },
  },
  inlineFlexWithGap: {
    display: "inline-flex",
    gap: 1,
    alignItems: "center",
  },
  tableUpperCaseText: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: 150,
    fontWeight: 500,
    textTransform: "uppercase",
    fontSize: "clamp(0.8125rem, 0.7971rem + 0.0877vw, 0.9375re",
  },
  tableNormalText: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: 150,
    fontWeight: 500,
    fontSize: "clamp(0.8125rem, 0.7971rem + 0.0877vw, 0.9375re",
  },
};
