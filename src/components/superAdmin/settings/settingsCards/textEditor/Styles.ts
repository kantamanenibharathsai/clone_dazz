import { colors, hex2rgba } from "../../../../../config/theme";
export const styles = {
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    background: colors.white,
    borderRadius: 5,
    width: "100%",
    minHeight: "80vh",
    p: 2,
    boxSizing: "border-box",
    position: "relative",
  },
  selectText: {
    position: "absolute",
    top: "20px",
    left: "20px",
    width: "150px",
    "& .MuiInputBase-input": { color: hex2rgba(colors.uploadText, 0.7) },
  },
  unShadowMenu: {
    "& .MuiPaper-root": {
      boxShadow: "none",
    },
  },
  editBtn: {
    "&.MuiButtonBase-root": {
      ml: "auto",
      width: "125px",
      mb: 2,
      textTransform: "none",
      "&:hover": {
        background: colors.primary,
      },
    },
  },
};
