import { colors, fonts } from "../../../config/theme";

const fontStatusColor = (status: string | undefined) => {
  switch (status) {
    case "accepted":
      return colors.lightGreen;
    case "pending":
      return colors.blue;
    case "rejected":
      return colors.carmine;
    default: {
      return colors.black;
    }
  }
};

export const layOutStyles = {
  layOutMain: (isActive: boolean) => ({
    p: 1,
    bgcolor: !isActive ? colors.alabaster : colors.iceberg,
    borderRadius: 6,
  }),
  iconButton: (color: string) => ({
    borderRadius: 1,
    height: 35,
    width: 35,
    bgcolor: color,
    "&:hover": {
      bgcolor: color,
    },
  }),
  edit: { width: "100%", height: "100%" },
  innerMain: {
    display: "flex",
    height: 160,
    width: "100%",
    gap: 2,
    borderRadius: 2,
  },
  image: { height: "100%", width: "50%", borderRadius: 5 },
  contentBox: {
    display: "flex",
    width: "50%",
    flexDirection: "column",
    gap: 0.5,
  },
  title: {
    fontSize: "clamp(0.875rem, 0.8596rem + 0.0877vw, 1rem)",
    fontWeight: 600,
    fontFamily: fonts.primary,
    color: colors.black,
    pr: 1,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  date: {
    color: colors.stormDust,
    fontWeight: 500,
    fontSize: "clamp(0.875rem, 0.8596rem + 0.0877vw, 1rem)",
    fontFamily: fonts.primary,
  },
  iconsBox: { display: "flex", gap: "4%", mt: 1 },
  layOutMainBox: (isTrue: boolean) => ({
    display: "flex",
    flexWrap: "wrap",
    justifyContent: !isTrue ? "end" : "space-between",
    width: "100%",
    mt: 2,
  }),
  layOutBox: { display: "flex", alignItems: "center", gap: { xs: 0, sm: 1 } },
  layOutText: {
    color: colors.stormDust,
    fontWeight: 500,
    fontSize: "clamp(0.875rem, 0.8596rem + 0.0877vw, 1rem)",
    fontFamily: fonts.primary,
    whiteSpace: "nowrap",
  },
  statusText: (status: string | undefined) => ({
    color: fontStatusColor(status),
    fontSize: "clamp(0.875rem, 0.898rem + -0.1316vw, 0.6875rem)",
    fontWeight: 500,
    fontFamily: fonts.secondary,
    pr: 3,
    textTransform: "capitalize",
  }),
  titleText: {
    display: "inline-block",
    width: 200,
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    fontSize: "clamp(1.1875rem, 1.1645rem + 0.1316vw, 1.375rem)",
    ml: 1,
  },
  modalBox: {
    width: { xs: 300, sm: 600, md: 650 },
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    alignItems: "center",
    gap: { xs: 2, md: 0 },
    justifyContent: "space-between",
  },
  deleteAdsText: {
    display: "flex",
    alignItems: "center",
    color: colors.white,
    mr: 3,
    fontSize: "clamp(1.1875rem, 1.1645rem + 0.1316vw, 1.375rem)",
  },
  areYouText: {
    color: colors.white,
    fontWeight: 500,
    fontFamily: fonts.primary,
    fontSize: "clamp(0.6875rem, 0.6645rem + 0.1316vw, 0.875rem)",
  },
  buttonsBox: { display: "flex", gap: 2 },
};
