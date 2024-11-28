import { SxProps } from "@mui/material";
import { colors } from "../../../../config/theme";

export const styles = {
  selectField: {
    "& .MuiOutlinedInput-root fieldset": {
      display: "none",
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
      outline: `1.26px solid ${colors.white}`,
      backgroundColor: colors.white,
      p: "0px",
      pl: "8px",
      height: "46px",
    },
    outline: `1.26px solid ${colors.white}`,
    borderRadius: "8px",
    minWidth: 170,
  },
} satisfies Record<string, SxProps>;

export const customAcStyles = {
  loadingText: { p: 1 },
  downArrowStyles: {
    color: colors.primary,
    transition: "0.2s ease all",
    cursor: "pointer",
  },
  transformDownArrowStyles: {
    color: colors.primary,
    transform: "rotateZ(180deg)",
    transition: "0.2s ease all",
    cursor: "pointer",
  },

  autocompleteContainer: {
    position: "relative",
    width: { xs: "100%", sm: "75%" },
  },
  autocompleteInput: {
    width: "100%",
    padding: "8px",
    boxSizing: "border-box",
  },
  autocompleteDropdown: {
    borderRadius: "10px",
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    maxHeight: "130px",
    overflowY: "auto",
    background: "white",
    zIndex: 1000,
    boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px",
  },
  autocompleteItem: {
    padding: "7px",
    cursor: "pointer",
  },
} satisfies Record<string, SxProps>;
