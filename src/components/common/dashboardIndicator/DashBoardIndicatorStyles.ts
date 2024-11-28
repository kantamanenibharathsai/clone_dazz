import { colors, hex2rgba } from "../../../config/theme";

export const dashBoardIndicatorStyles = {
  indicatorMainContainer: {
    display: "flex",
    alignItems: "center",
    gap: 2.5,
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    overflow: "hidden",
  },
  imageStyle: {
    width: { xs: "85px", lg: "95px" },
    height: { xs: "85px", lg: "95px" },
    borderRadius: "100%",
    display: "grid",
    placeItems: "center",
    background: `linear-gradient(201.18deg, ${colors.greenGradientDark} 3.14%, ${colors.greenGradientLight} 86.04%)`,
  },
  avatarStyles: {
    width: { xs: "38px", lg: "45px" },
    height: { xs: "38px", lg: "45px" },
  },
  iconStyle: {
    width: "22px",
  },
  greenIconStyles: {
    color: colors.green,
  },
  redIconStyles: {
    color: colors.carmine,
  },
  title: {
    fontSize: "clamp(0.6875rem, 0.6406rem + 0.2679vw, 0.875rem)",
    fontWeight: "500",
    color: hex2rgba(colors.grey, 0.6),
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    width: "100%",
  },
  value: {
    fontSize: "clamp(1.375rem, 1.2188rem + 0.8929vw, 2rem)",
    fontWeight: "600",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    width: "100%",
  },
  percentageContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  greenColor: {
    color: colors.green,
  },
  blackColor: {
    color: hex2rgba(colors.black, 0.7),
  },
  percentage: {
    fontSize: "clamp(0.6875rem, 0.6338rem + 0.307vw, 1.125rem)",
    fontWeight: "700",
    display: "flex",
    alignItems: "center",
    width: "100%",
    overflow: "hidden",
  },
  percentageLable: {
    fontSize: "clamp(0.6875rem, 0.6338rem + 0.307vw, 1.125rem)",
    fontWeight: "400",
    color: hex2rgba(colors.black, 0.8),
    marginLeft: "5px",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    width: "100%",
  },
};
