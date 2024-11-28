import { colors } from "../../../../config/theme";

export const qrCodeStyles = {
  mainContainer: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: { xs: "10px", sm: "20px 40px" },
    flex:5
  },
  positionContainer: {
    position: "absolute",
    top: "100%",
    left: "50%",
    transform: "translateX(-50%)",
    borderTop: `10px solid ${colors.chartTooltip}`,
    borderLeft: "10px solid transparent",
    borderRight: "10px solid transparent",
  },
  customTooltip: {
    bgcolor: colors.white,
    p: 1,
    borderRadius: 2,
    border: `1px solid ${colors.lighterWhitish}`,
  },
};
