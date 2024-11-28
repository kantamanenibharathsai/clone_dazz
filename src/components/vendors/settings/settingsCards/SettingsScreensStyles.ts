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
    width: "50px",
    height: "50px",
    display: "grid",
    placeItems: "center",
    cursor: "pointer",
  },
  maxWidth: { maxWidth: "100%", mt: "-5px" },
};
