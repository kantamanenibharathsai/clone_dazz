import { colors } from "../../../../config/theme";

export const settingsScreensStyles = {
  titleContainer: {
    display: "flex",
    alignItems: "center",
    gap: 2,
    mt: { xs: 0, sm: -8 },
    ml: 1.2,
  },
  title: {
    color: colors.white,
    fontSize: "25px",
    fontWeight: "500",
  },
  iconContainer: {
    background: colors.white,
    borderRadius: "50%",
    width: "35px",
    height: "35px",
    display: "grid",
    placeItems: "center",
    cursor: "pointer",
    position: "relative",
    left: "10px",
  },
  maxWidth: { maxWidth: "100%", mt: "-5px" },
  tabsContainer: {
    "&.MuiTabs-root": {
      background: colors.white,
      width: { xs: "350px", md: "390px" },
      borderRadius: "70px",
      mt: 2,
    },
    "& .MuiTabs-flexContainer": {
      justifyContent: "center",
      height: "65px",
    },
    "& .MuiButtonBase-root.MuiTab-root:not(.Mui-selected)": {
      color: colors.black,
      textTransform: "none",
      fontSize: { xs: "10px", md: "12px" },
    },
    "& .MuiButtonBase-root.MuiTab-root": {
      textTransform: "none",
      fontSize: { xs: "10px", md: "12px" },
    },
  },
};

export const pricesStyles = {
  formBox: {
    width: "100%",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    background: colors.white,
    borderRadius: 5,
    boxSizing: "border-box",
    p: 5,
    rowGap: 3,
    mt: 2,
  },
};
