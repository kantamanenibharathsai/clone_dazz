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
};
