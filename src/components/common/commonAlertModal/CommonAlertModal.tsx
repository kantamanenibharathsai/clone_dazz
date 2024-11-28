import { Box, Typography } from "@mui/material";
import React from "react";
import { colors } from "../../../config/theme";
import { layOutDelete } from "../assets/index";
import { layOutStyles } from "../cardLayout/CardLayoutStyles";
import { CustomButton } from "../customButton/CustomButton";
import { ModalStyled } from "../modal/CommonModal";
interface IProps {
  isModalOpen: boolean;
  deleteTitle: string;
  descriptionContent: string;
  handleCancelModal: () => void;
  handleActionModal: () => void;
}
const CommonAlertModal: React.FC<IProps> = ({
  isModalOpen,
  deleteTitle,
  descriptionContent,
  handleCancelModal,
  handleActionModal,
}) => {
  return (
    <ModalStyled
      open={isModalOpen}
      isClose={false}
      isbgColor={colors.lightBlack}
    >
      <Box sx={layOutStyles.modalBox}>
        <Box>
          <Typography sx={layOutStyles.deleteAdsText}>
            Delete
            <Typography component={"div"} sx={layOutStyles.titleText}>
              {deleteTitle}
            </Typography>
          </Typography>
          <Typography sx={layOutStyles.areYouText}>
            Are you sure, you want to delete the {descriptionContent}?
          </Typography>
        </Box>
        <Box sx={layOutStyles.buttonsBox}>
          <CustomButton
            bgcolor={colors.blueChalk}
            textColor={colors.black}
            width={128}
            onClick={handleCancelModal}
          >
            Cancel
          </CustomButton>
          <CustomButton
            bgcolor={colors.validate}
            width={158}
            onClick={handleActionModal}
            endIcon={
              <Box
                component={"img"}
                src={layOutDelete}
                sx={layOutStyles.edit}
              />
            }
          >
            Delete
          </CustomButton>
        </Box>
      </Box>
    </ModalStyled>
  );
};

export default CommonAlertModal;
