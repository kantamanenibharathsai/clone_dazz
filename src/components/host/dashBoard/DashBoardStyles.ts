import { colors } from "../../../config/theme";

export const dashboardStyles = {
  mainContainer: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: { xs: "10px", sm: "0px 30px" },
  },
  mapContainer: {
    height: "634px",
    px: 5,
    pb: 10,
    pt: 3,
    mt: 5,
    mb: 5,
    bgcolor: colors.white,
    boxSizing: "border-box",
    borderRadius: 5,
    "& h5": {
      fontSize: 22,
      fontWeight: 600,
      mb: 2,
    },
    "& iframe": {
      borderStyle: "none",
      width: "100%",
      height: "95%",
      borderRadius: "inherit",
    },
  },
};
