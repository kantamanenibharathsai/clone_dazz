import { colors } from "../../../config/theme";

export const settingsStyles = {
  mainContainer: {
    display: "flex",
    justifyContent: "center",
    background: colors.white,
    alignItems: "center",
    width: { xs: "80%", sm: "40%", md: "50%", lg: "25%", xl: "20%" },
    marginLeft: "auto",
    borderRadius: "10px",
  },
  tabText: {
    fontSize: "15px",
    fontWeight: "500",
    textTransform: "capitalize",
    padding: "5px 0px",
  },
  iconContainer: {
    background: colors.white,
    borderRadius: "50%",
    width: "50px",
    height: "50px",
    display: "grid",
    placeItems: "center",
    cursor: "pointer",
    // background: colors.white,
    // width: "40px",
    // height: "40px",
    // borderRadius: "50%",
    // display: "flex",
    // alignItems: "center",
    // justifyContent: "center",
    // cursor: "pointer",
    "&:hover": {
      background: colors.white,
      "& svg": {
        color: colors.primary,
        
      },
    },
  },
  backBtnWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    mb: 2,
  },
};
