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
const ellipsis = {
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};
export const libraryStyles = {
  mainContainer: {
    flexDirection: { xs: "column", sm: "row" },
    alignItems: "center",
    justifyContent: "space-between",
    bgcolor: colors.white,
    borderRadius: "30px",
    boxSizing: "border-box",
    height: { xs: "fit-content", lg: "fit-content" },
    px: { xs: "20px", md: "15px", lg: "35px" },
    gap: { xs: 2, sm: 1 },
    py: { xs: 2, sm: 0 },
  },
  listText: {
    textWrap: "nowrap",
    minWidth: "fit-content",
    maxWidth: "fit-content",
    "& .MuiListItemText-primary": {
      fontSize: { xs: "20px", lg: "26px" },
      color: colors.black,
      fontWeight: "500",
      fontFamily: fonts.primary,
    },
    "& .MuiListItemText-secondary": {
      fontSize: { xs: "12px", lg: "14px" },
      color: colors.lightGreen,
      fontWeight: "500",
      fontFamily: fonts.primary,
    },
  },
  catCard:{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
    placeItems: "center",
    gridAutoRows: "60px",
    gridAutoFlow: "dense",
    flexGrow: 1,
  },
  menuItem: {
    color: colors.lightGray,
    fontSize: "17px",
    fontWeight: "400",
    textWrap: "nowrap",
    textTransform: "capitalize",
    width: "300px",
  },
  textFieldContainer: {
    width: { xs: "100%", sm: "40%" },
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    gap: 2,
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
      fontFamily: fonts.primary,
      color: colors.lightGrey,
      ml: 1,
    },
    icon: {
      height: "25px",
      width: "25px",
    },
  },
  tabs: {
    flex: 1,
    minWidth: "200px",
    display: "inline-flex",
    justifyContent: { xs: "start", sm: "center", lg: "space-evenly" },
    alignSelf: "center",
    alignItems: "center",
    gap: 1,
    overflow: "hidden",
    height: "100%",
  },
  tabsElement: function (index: number, tabNumber: number) {
    return {
      "&.MuiButtonBase-root": {
        textTransform: "none",
        height: { xs: "100px", sm: "100px", lg: "120px" },
        fontWeight: 500,
        borderRadius: 0,
        fontFamily: fonts.primary,
        fontSize: "clamp(0.75rem, 0.709rem + 0.2344vw, 0.9375rem)",
        color: tabNumber === index ? colors.primary : colors.black,
        borderBottom: `3px solid ${
          tabNumber === index ? colors.primary : colors.white
        }`,
      },
    };
  },
  uploadBtn: {
    width: { xs: "150px" },
    height: { xs: "43px" },
    fontWeight: 500,
    fontSize: { xs: "14px" },
  },
  card: {
    width: "145px",
    height: "60px",
    bgcolor: colors.white,
    borderRadius: "20px",
    cursor: "pointer",
    birthdayColor: { color: "#0EC5EA" },
    officeColor: { color: colors.primary },
    p: "20px",
    boxSizing: "border-box",
    "& p": {
      textTransform: "capitalize",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      overflow: "hidden",
    },
  },
  playBtn: {
    color: "white",
    position: "absolute",
    zIndex: "100",
  },
  editStyle: (color: string) => ({
    ...commonBtns,
    bgcolor: color,
    "&:hover": {
      bgcolor: hex2rgba(color, 0.8),
    },
  }),

  gridItem: {
    padding: { xs: "30px", md: "20px", lg: "30px" },
    boxSizing: "border-box",
  },
  cardMain: {
    flexDirection: "row",
    gap: 2,
    flexWrap: "wrap",
    justifyContent: {
      xs: "center",
      sm: "start",
    },
    bgcolor: colors.white,
    borderRadius: "30px",
    padding: "30px",
  },
  mediaMainBox: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    placeItems: "center",
    gridAutoRows: "300px",
    gridAutoFlow: "dense",
    flexGrow: 1,
  },
  cardCon: {
    maxHeight: "300px",
    width: "250px",
    borderRadius: "30px",
    cursor: "pointer",
    position: "relative",
    ".iconDiv": {
      transition: "opacity 0.7s",
      opacity: 0,
      position: "absolute",
      zIndex: "1",
      top: 0,
    },
    ".textDiv": {
      transition: "opacity 0.7s",
      opacity: 0,
      position: "absolute",
      zIndex: "1",
      bottom: "25px",
      left: "25px",
    },
    "&:hover": {
      ".iconDiv, .textDiv ": {
        opacity: 1,
      },
    },
  },
  cardText: {
    textWrap: "nowrap",
    maxHeight: "50px",
    "& .MuiListItemText-primary": {
      width: "200px",
      color: colors.white,
      fontWeight: "600",
      fontFamily: fonts.primary,
      ...ellipsis,
    },
    "& .MuiListItemText-secondary": {
      color: colors.lightGray,
      fontWeight: "600",
      fontFamily: fonts.primary,
      ...ellipsis,
    },
  },
  cardImg: {
    width: "250px",
    height: "250px",
    borderRadius: "30px",
  },

  modalGroup: {
    width: { xs: "90vw", sm: "75vw", md: "40vw" },
    display: "flex",
    bgcolor: colors.lightBlack,
    borderRadius: "30px",
    boxSizing: "border-box",
    px: { xs: 2, sm: 3 },
    py: 3,
  },
  inputContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  input: { width: "100%" },

  heading: {
    color: colors.white,
    fontWeight: 500,
    fontSize: "clamp(1.375rem, 1.3596rem + 0.0877vw, 1.5rem)",
  },
  addBtn: {
    width: "220px",
    height: "60px",
    ml: "auto",
    mr: "auto",
    mt: "20px",
    fontSize: "16px",
  },
  errorMsg: { height: "20px", textTransform: "lowercase" },
  error: {
    height: "20px",
    fontSize: "11px",
    color: colors.validate,
    px: "14px",
    mt: "3px",
  },
  noData: {
    bgcolor: colors.white,
    borderRadius: "30px",
    padding: "30px",
    "& p": {
      textAlign: "center",
      color: colors.validate,
    },
  },
  noDataText: {
    color: colors.validate,
    m: "20px",
    textWrap:"nowrap"
  },
};
