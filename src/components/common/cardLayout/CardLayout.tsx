import { Box, IconButton, Typography } from "@mui/material";
import { colors } from "../../../config/theme";
import { handleCardLayoutPlaceHolder } from "../../../utils/utils";
import {
  LayoutIcon,
  editIcon,
  layOutDelete,
  setting,
  show,
} from "../assets/index";
import { CustomButton } from "../customButton/CustomButton";
import { ModalStyled } from "../modal/CommonModal";
import { layOutStyles } from "./CardLayoutStyles";
interface IProps {
  layOutId: number;
  activeLayoutId: null | number;
  imageSrc: string;
  title: string;
  date: string;
  layout?: number;
  status?: string;
  handleEdit?: () => void;
  handleShow?: () => void;
  isShow: boolean;
  handleSettings?: () => void;
  handleDelete?: () => void;
  handleCloseModal?: () => void;
  handleDeleteLayout?: () => void;
}
const CardLayout = ({
  layOutId,
  activeLayoutId,
  imageSrc,
  title,
  date,
  layout,
  status,
  isShow,
  handleEdit,
  handleShow,
  handleSettings,
  handleDelete,
  handleCloseModal,
  handleDeleteLayout,
}: IProps) => {
  return (
    <>
      <ModalStyled
        open={activeLayoutId === layOutId}
        isClose={false}
        isbgColor={colors.lightBlack}
      >
        <Box sx={layOutStyles.modalBox}>
          <Box>
            <Typography sx={layOutStyles.deleteAdsText}>
              Delete
              <Typography
                component={"div"}
                title={title}
                sx={layOutStyles.titleText}
              >
                {title}
              </Typography>
            </Typography>
            <Typography sx={layOutStyles.areYouText}>
              Are you sure, you want to delete the playlist?
            </Typography>
          </Box>
          <Box sx={layOutStyles.buttonsBox}>
            <CustomButton
              bgcolor={colors.blueChalk}
              textColor={colors.black}
              width={128}
              onClick={handleCloseModal}
            >
              Cancel
            </CustomButton>
            <CustomButton
              bgcolor={colors.validate}
              width={158}
              onClick={handleDeleteLayout}
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
      <Box sx={layOutStyles.layOutMain(activeLayoutId === layOutId)}>
        <Box sx={layOutStyles.innerMain}>
          <Box
            sx={layOutStyles.image}
            component={"img"}
            src={imageSrc ?? "dummy"}
            onError={handleCardLayoutPlaceHolder}
          />
          <Box sx={layOutStyles.contentBox}>
            <Typography title={title} sx={layOutStyles.title}>
              {title}
            </Typography>
            <Typography sx={layOutStyles.date}>{date}</Typography>
            <Box sx={layOutStyles.iconsBox}>
              {handleEdit && (
                <IconButton
                  onClick={handleEdit}
                  sx={layOutStyles.iconButton(colors.lightGreen)}
                >
                  <Box
                    component={"img"}
                    src={editIcon ?? "dummy"}
                    sx={layOutStyles.edit}
                    alt="Card Layout image"
                  />
                </IconButton>
              )}
            {(isShow||handleSettings)&& <IconButton
                onClick={isShow ? handleShow : handleSettings}
                sx={layOutStyles.iconButton(colors.blue)}
              >
                <Box
                  component={"img"}
                  src={isShow ? show : setting}
                  sx={layOutStyles.edit}
                />
              </IconButton>}
              {handleDelete && (
                <IconButton
                  onClick={handleDelete}
                  sx={layOutStyles.iconButton(colors.validate)}
                >
                  <Box
                    component={"img"}
                    src={layOutDelete}
                    sx={layOutStyles.edit}
                  />
                </IconButton>
              )}
            </Box>
            <Box
              sx={layOutStyles.layOutMainBox(Boolean(layout || layout === 0))}
            >
              {layout !== undefined && (
                <Box sx={layOutStyles.layOutBox}>
                  <LayoutIcon />
                  <Typography sx={layOutStyles.layOutText}>
                    {layout} Layout
                  </Typography>
                </Box>
              )}

              <Typography sx={layOutStyles.statusText(status)}>
                {status}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CardLayout;
