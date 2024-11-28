import { colors } from "../../../config/theme";

export const screenAdsStyles = {
  mainBox: {
    bgcolor: colors.white,
    p: { xs: 0, sm: 2 },
    borderRadius: 5,
    height: { xs: "82vh", md: "76vh" },
    overflow: "auto",
    "::-webkit-scrollbar": {
      display: "none",
    },
  },

  grid: { p: 2 },
  mainContainer: {
    backgroundColor: colors.white,
    borderRadius: "20px",
    padding: { xs: "18px", sm: "45px" },
  },
  titleContainer: {
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    alignItems: "start",
    justifyContent: "space-between",
  },
  title: {
    fontSize: "22px",
    fontWeight: "600",
    whiteSpace: "nowrap",
  },
  subTitle: {
    fontSize: "14px",
    color: colors.lightGreen,
    fontWeight: "500",
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
      color: colors.searchInputColor,
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
    "& .MuiOutlinedInput-root fieldset": {
      display: "none",
    },
    "& .MuiOutlinedInput-root input": {
      padding: 0,
    },
  },
  menuItem: {
    color: colors.searchInputColor,
    fontSize: "17px",
    fontWeight: "400",
    textWrap: "nowrap",
  },
  gridSpacing: { xs: 1, sm: 2, md: 1, lg: 2 },
};
