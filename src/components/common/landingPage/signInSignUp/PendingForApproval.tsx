import { Box, Typography } from "@mui/material";
import { CustomButton } from "../../customButton/CustomButton";
import { pendingForApprovalImage } from "../../assets";
import { colors } from "../../../../config/theme";
import { KeyboardBackspace } from "@mui/icons-material";
import { pendingForApprovalStyles } from "./formStyles";

interface IProps {
  handleModalClose: () => void;
}
const PendingForApproval = ({ handleModalClose }: IProps) => {
  const handleGoBack = () => {
    handleModalClose();
  };
  return (
    <Box sx={pendingForApprovalStyles.mainBox}>
      <Box sx={pendingForApprovalStyles.contentBox}>
        <Typography sx={pendingForApprovalStyles.welcomeText}>
          👋 Welcome to DADZ Media
        </Typography>
        <Typography sx={pendingForApprovalStyles.yourText}>
          Your Registration is Now Pending for Approval{" "}
        </Typography>
        <Typography sx={pendingForApprovalStyles.asSoonAsText}>
          As soon as the approval is received, you will receive email.
        </Typography>
        <CustomButton
          bgcolor={colors.darkBlue}
          startIcon={<KeyboardBackspace />}
          borderradius={"10px"}
          onClick={handleGoBack}
        >
          Go Back
        </CustomButton>
      </Box>
      <Box sx={pendingForApprovalStyles.imageBox}>
        <Box
          component={"img"}
          loading="lazy"
          alt="banner image"
          src={pendingForApprovalImage}
          sx={pendingForApprovalStyles.image}
        />
      </Box>
    </Box>
  );
};

export default PendingForApproval;
