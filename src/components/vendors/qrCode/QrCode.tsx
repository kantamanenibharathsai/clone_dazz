import { Box, IconButton, TextField, Typography } from "@mui/material";
import { colors } from "../../../config/theme";
import { KeyboardArrowLeft } from "@mui/icons-material";
import { checkImg } from "../assets";
import { CustomButton } from "../../common/customButton/CustomButton";
import { ModalStyled } from "../../common/modal/CommonModal";
import { qrCodeStyles } from "./QrCodeStyles";
const QrCode = () => {
  return (
    <Box sx={qrCodeStyles.qrCodeContainer}>
      <ModalStyled open={false} isbgColor={colors.lightBlack}>
        <Box sx={qrCodeStyles.modalContainer}>
          <Typography sx={qrCodeStyles.successModalText}>
            QR Code is successfully
          </Typography>
          <Typography sx={qrCodeStyles.successModalText}>Scanned</Typography>
          <Box
            component={"img"}
            loading="lazy"
            src={checkImg}
            alt="Check Image"
          />
          <Box sx={qrCodeStyles.discountTextBox}>
            <Typography>Discount :- Flat ₹200</Typography>
            <Typography>Valid Till :- 9/16/2023</Typography>
          </Box>
          <CustomButton width={316}>Done</CustomButton>
        </Box>
      </ModalStyled>
      <Box sx={qrCodeStyles.headerBox}>
        <Box sx={qrCodeStyles.headerIconTextBox}>
          <IconButton>
            <KeyboardArrowLeft />
          </IconButton>
          <Typography>Form</Typography>
        </Box>
      </Box>
      <Box sx={qrCodeStyles.qrCodeMainBox}>
        <Typography>Scan QR Code</Typography>
        <Box sx={qrCodeStyles.qrCodeBox} />
        <TextField />
        <CustomButton width={202}>Verify</CustomButton>
      </Box>
    </Box>
  );
};
export default QrCode;
