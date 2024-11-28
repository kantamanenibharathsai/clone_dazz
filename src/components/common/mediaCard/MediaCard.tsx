import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import { Box, Stack, Tooltip, Typography } from "@mui/material";
import { memo } from "react";
import { colors } from "../../../config/theme";
import { handleCardLayoutPlaceHolder } from "../../../utils/utils";
import hexogonImg from "../assets/hexogonImg.svg";
import deleteIcon from "../assets/mediaCardDeleteIcon.svg";
import editIcon from "../assets/mediaCardEditIcon.svg";
import { mediaCardStyles } from "./MediaCardStyles";
import { MediaCardProps } from "./Types";

const MediaCard = ({
  genreImg,
  genreText,
  clickable,
  onEdit,
  onDelete,
  doneIcon,
  styles,
  extraIcon,
}: MediaCardProps) => {
  return (
    <Box>
      <Box
        sx={{
          ...mediaCardStyles.mainContainer,
          ...styles?.mainContainer,
          border:
            clickable || doneIcon
              ? `3.5px solid ${colors.primary}`
              : "3.5px solid transparent",
          cursor: clickable || doneIcon ? "pointer" : "default",
        }}
      >
        <Box
          sx={{
            ...mediaCardStyles.hexogonImgContainer,
            ...styles?.hexogonImgContainer,
          }}
        >
          <Box
            component="img"
            src={hexogonImg}
            loading="lazy"
            alt="hexagonImage"
          />
          <Box sx={mediaCardStyles.mediaTextContainer}>
            <Tooltip title={genreText}>
              <Typography sx={mediaCardStyles.mediaText}>
                {genreText}
              </Typography>
            </Tooltip>
          </Box>
          <Box
            component="img"
            loading="lazy"
            alt={genreImg}
            src={genreImg}
            onError={handleCardLayoutPlaceHolder}
            sx={{
              ...mediaCardStyles.imgStyles,
              ...styles?.imgStyles,
            }}
          />
        </Box>
        {doneIcon && (
          <Box sx={mediaCardStyles.tickIconContainer}>
            <DoneRoundedIcon
              sx={{ ...mediaCardStyles.tickStyles, opacity: doneIcon ? 1 : 0 }}
            />
          </Box>
        )}
      </Box>
      {clickable !== undefined && (
        <Box
          sx={{
            ...mediaCardStyles.btnsContainer,
            visibility: clickable ? "visible" : "hidden",
          }}
        >
          <>
            {onEdit !== undefined && (
              <Box>
                <Box
                  component={"img"}
                  alt="editIcon"
                  src={editIcon}
                  sx={mediaCardStyles.iconStyle}
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit();
                  }}
                  loading="lazy"
                />
              </Box>
            )}
            {onDelete !== undefined && (
              <Box>
                <Box
                  component={"img"}
                  alt="deleteIcon"
                  src={deleteIcon}
                  sx={mediaCardStyles.iconStyle}
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete();
                  }}
                  loading="lazy"
                />
              </Box>
            )}
            <Stack alignItems={"center"} justifyContent={"center"}>
              {extraIcon}
            </Stack>
          </>
        </Box>
      )}
    </Box>
  );
};

export default memo(MediaCard);
