import {
  Avatar,
  AvatarGroup,
  Box,
  BoxProps,
  IconButton,
  ListItemText,
  Stack,
  SxProps,
  Typography,
} from "@mui/material";
import { ReactNode } from "react";
import { colors } from "../../../config/theme";
import { tokenWithUrl } from "../../../utils/utils";
import { deleteIcon } from "../../admin/assets/Index";
import { screenStyles } from "../../admin/screens/ScreenStyles";
import { edit } from "../assets";
import fallback from "../assets/fallback.jpg";
import activeSvg from "../assets/selectIcon.svg";
import { StyledContainer, cardStyles } from "./CardStyles";

interface IProps {
  containerProps?: BoxProps;
  imageProps?: SxProps;
  mainImage: string;
  id: number | string;
  text: string;
  subText?: string;
  groupImages?: string[];
  groupCount?: number;
  isActive?: boolean;
  isSelect?: boolean;
  handleToggle?: (index: number | string) => void;
  onEdit?: (id: number | string) => void;
  onDelete?: (id: number | string) => void;
  handleGroupNav?: () => void;
  extraIcon?: ReactNode;
}
const CategoryCard = (props: IProps) => {
  return (
    <StyledContainer {...props.containerProps}>
      <Box
        position={"relative"}
        onClick={() => props.handleToggle && props.handleToggle(props.id)}
      >
        {props.isActive && (
          <Box component={"img"} src={activeSvg} sx={cardStyles.iconButton} />
        )}
        <Box
          component={"img"}
          border={
            props.isActive || props.isSelect
              ? `4px solid ${colors.primary}`
              : `4px solid transparent`
          }
          src={tokenWithUrl(props.mainImage)}
          sx={props.imageProps ? props.imageProps : cardStyles.bannerImage}
          onError={(event) => (event.currentTarget.src = fallback)}
        />
      </Box>
      {props.subText ? (
        <ListItemText
          title={props.text}
          sx={cardStyles.textItem}
          primary={props.text}
          secondary={props.subText}
        />
      ) : (
        <Typography sx={cardStyles.textItem} title={props.text}>
          {props.text}
        </Typography>
      )}
      {props.groupImages && (
        <Stack
          sx={cardStyles.groupContainer}
          onClick={() => {
            props.handleGroupNav && props.handleGroupNav();
          }}
        >
          <AvatarGroup spacing={"small"} sx={cardStyles.groupStyle}>
            {props.groupImages.slice(0, 5).map((image, index) => (
              <Avatar
                key={index}
                alt="category"
                src={image}
                sx={cardStyles.avatarStyle}
              />
            ))}
          </AvatarGroup>
          {props.groupCount && (
            <Typography fontSize={"small"}>{props.groupCount}+</Typography>
          )}
        </Stack>
      )}
      <Stack
        direction={"row"}
        gap={1.5}
        width={"100%"}
        justifyContent={"center"}
        sx={{
          ...cardStyles.activeCard,
          visibility: props.isSelect ? "visible" : "hidden",
        }}
      >
       {props.onEdit!==undefined&& <IconButton
          sx={screenStyles.editStyle}
          onClick={() => props.onEdit && props.onEdit(props.id)}
        >
          <Box component={"img"} src={edit} />
        </IconButton>}
       {props.onDelete!==undefined&& <IconButton
          sx={screenStyles.deleteStyle}
          onClick={() => props.onDelete && props.onDelete(props.id)}
        >
          <Box component={"img"} src={deleteIcon} />
        </IconButton>}
       {props.extraIcon!==undefined&& <IconButton  sx={screenStyles.extraIconStyle}>
        {props.extraIcon}
        </IconButton>}
      </Stack>
    </StyledContainer>
  );
};

export default CategoryCard;
