import { SxProps } from "@mui/material";
import { fonts } from "../../../config/theme";

export const styles = {
  cardContainer: {
    width: "100%",
    height: "150px",
    p: 3,
    boxSizing: "border-box",
    borderRadius: "14px",
    cursor: "pointer",
    display: "flex",
  },
  icon: {
    height: "32px",
    width: "32px",
  },
  descriptionContainer: {
    display: "flex",
    justifyContent: "space-between",
    mt: 2,
    alignItems: "center",
  },
  description: {
    fontWeight: 600,
    fontSize: "16px",
    fontFamily:fonts.roboto
  },
  cardContent: {
    width: "100%",
  },
} satisfies Record<string, SxProps>;
