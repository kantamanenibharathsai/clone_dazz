import { Box, Typography } from "@mui/material";
import { translate } from "../../../../config/i18n";
import { footerSectionStyles } from "./FooterSectionStyles";

const FooterSection = () => {
  return (
    <Box>
      <Box sx={footerSectionStyles.copyRightContainer}>
        <Typography sx={footerSectionStyles.copyRightText}>
          {translate("common.copyRightText")}
        </Typography>
      </Box>
    </Box>
  );
};

export default FooterSection;
