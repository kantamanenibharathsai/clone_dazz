import { colors } from "../../../config/theme";

export const commonStyles = {
  deleteModalBox: {
    width: { xs: 300, sm: 550, md: 650 },
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    alignItems: "center",
    justifyContent: "space-between",
  },
  deleteAdsText: {
    color: colors.white,
    fontSize: "clamp(1.1875rem, 1.1645rem + 0.1316vw, 1.375rem)",
    textTransform:'capitalize'
  },
  areYouText: {
    color: colors.white,
    fontWeight: 500,
    fontSize: "clamp(0.6875rem, 0.6645rem + 0.1316vw, 0.875rem)",
  },
  buttonsBox: { display: "flex", gap: 2 },
  ellipsisText: (maxWidth: string = "calc(100% - 10px)") => ({
    maxWidth,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  }),
  maxWidthForTableCell: (maxWidth: string) => ({ maxWidth: maxWidth }),
};

export type ApiStatus = "INITIAL" | "PENDING" | "SUCCESS" | "ERROR";
