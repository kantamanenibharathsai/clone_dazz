import { colors } from "../../../../config/theme";

export const screensOverViewStyles = {
  mainContainer: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: { xs: "10px", sm: "20px 40px" },
    flex:0.5
  },
  chartContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  detailsContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 2,
  },
  textContainer: {
    display: "flex",
    gap: 1,
    color:colors.selectText,
    fontSize:"16px",
    fontWeight:"400"
  },
};
