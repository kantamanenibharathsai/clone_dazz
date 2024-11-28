import { Box, styled } from "@mui/material";
import { colors } from "../../../config/theme";

export const htmlParseStyles = {
  title: {
    fontWeight: 600,
    fontSize: "clamp(1.1875rem, 1.1645rem + 0.1316vw, 1.375rem)",
  },
};

export const HtmlParserContainer = styled(Box)(({ theme }) => ({
  backgroundColor: colors.white,
  borderRadius: 30,
  padding: 30,
  width: "100%",
  boxSizing: "border-box",
}));
