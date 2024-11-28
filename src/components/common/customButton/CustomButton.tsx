import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { colors, fonts } from "../../../config/theme";
export const CustomButton = styled(Button)<{
  bgcolor?: string;
  textColor?: string;
  width?: number | string;
  outlined?: boolean;
  borderradius?: string | number;
}>(({ bgcolor, width, textColor, outlined, borderradius }) => {
  return {
    backgroundColor: outlined ? "" : bgcolor ? bgcolor : colors.primary,
    color: textColor ? textColor : outlined ? bgcolor : colors.white,
    width: width,
    borderRadius: borderradius ?? 70,
    fontFamily: fonts.secondary,
    border: `2px solid ${bgcolor}`,
    fontWeight: 600,
    boxShadow: "0px",
    fontSize: "clamp(0.75rem, 0.7198rem + 0.1724vw, 0.875rem)",
    height: "55px",
    lineHeight: "34px",
    textAlign: "center",
    padding: "0 25px",
    transition: "all .15s ease-in-out",
    textTransform: "capitalize",
    whiteSpace: "nowrap",
    "&:hover": {
      width: width,
      backgroundColor: outlined ? "" : bgcolor ? bgcolor : colors.primary,
      color: textColor ? textColor : outlined ? bgcolor : colors.white,
      border: `2px solid ${bgcolor}`,
    },
  };
});
