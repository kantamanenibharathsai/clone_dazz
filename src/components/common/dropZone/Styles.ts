import { Box, BoxProps, styled } from "@mui/material";
import { colors, fonts } from "../../../config/theme";
export const DropZoneDiv = styled(Box)<BoxProps>({
  color: colors.black,
  fontFamily: fonts.secondary,
  fonSize: "15px",
  fontWeight: "500",
  textAlign: "center",
  backgroundColor: colors.textFieldBg,
  display: "flex",
  boxSizing: "border-box",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: 8,
  borderRadius: 10,
  cursor: "pointer",
  width: "100%",
  height: "100% important",
  position: "relative",
});
export const styles = {
  closeIcon: { cursor: "pointer", color: colors.primary },
  fileExtension: {
    fontFamily: fonts.secondary,
    fontSize: "inherit",
    fontWeight: 500,
  },
  defaultImageSize: { width: "90px", height: "90px" },
  validationText: {
    color: colors.validate,
    fontSize: "10px",
    ml: 1.5,
    my:0.5,
    height: 12,
  },
  removeBtn: {
    position: "absolute",
    top: 0,
    right: 0,
    background: colors.layoutBlack,
    color: colors.white,
  },
};
export const loaderStyles = {
  loaderColor: (color: string = colors.white) => ({ color }),
};
