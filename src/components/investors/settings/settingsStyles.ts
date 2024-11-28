import { colors } from "../../../config/theme";

export const settingStyles = {
  tabsMainBox: {
    width: "100%",
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    justifyContent: "end",
  },
  tabsBox: {
    width: { xs: 320, sm: 300 },
    display: "inline-flex",
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    gap: 1,
    bgcolor: colors.white,
    borderRadius: 4,
    overflow: "hidden",
    mr: 2,
  },
  listText: (tabNumber: number) => ({
    visibility: tabNumber === 1 ? "visible" : "hidden",
    minWidth: "150px",
    textWrap: "nowrap",
    "& .MuiListItemText-primary": {
      fontSize: { xs: "20px", md: "24px" },
      color: colors.white,
      fontWeight: "600",
    },
    "& .MuiListItemText-secondary": {
      fontSize: { xs: "12px", md: "14px" },
      color: "green",
      fontWeight: "600",
    },
  }),
  button: (isPresent: boolean) => ({
    "&.MuiButtonBase-root": {
      textTransform: "none",
      color: isPresent ? colors.primary : colors.black,
      fontWeight: 500,
      borderRadius: 0,
      height: 60,

      fontSize: "clamp(0.75rem, 0.709rem + 0.2344vw, 0.9375rem)",
      borderBottom: `3px solid ${isPresent ? colors.primary : colors.white}`,
    },
  }),
};
