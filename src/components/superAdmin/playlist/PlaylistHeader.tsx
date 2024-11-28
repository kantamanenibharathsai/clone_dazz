import AddIcon from "@mui/icons-material/Add";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { colors } from "../../../config/theme";
import {
  clearData,
  LayoutStateInterface,
  onSaveLayout,
  setAdjustedLayoutDimensions,
  setContainerLayout,
  setShowLayoutPreview,
} from "../../../redux/reducers/layoutsReducer/layouts";
import { RootState } from "../../../redux/store";
import { navigation } from "../../../utils/navigation";
import { useAppDispatch } from "../../../utils/useRedux";
import { InputField } from "../../common/inputField/InputField";
import { ModalStyled } from "../../common/modal/CommonModal";
import arrowDownIcon from "../assets/arrowDownIcon.svg";
import sendIcon from "../assets/arrowRightIcon.svg";
import previewIcon from "../assets/previewIcon.svg";

import {
  CustomButton,
  HeaderCustomButton,
  playlistStyles,
} from "./playlistStyles";

interface IProps {}
interface IState {
  isCustomSelectOpen: boolean;
  customLayout: {
    height: string;
    width: string;
  };
}

const PlaylistHeader: React.FC<IProps> = () => {
  const [previousLayout, setPreviousLayout] = useState("");
  const [isCustomSelectOpen, setIsCustomSelectOpen] =
    useState<IState["isCustomSelectOpen"]>(false);
  const [customLayout, setCustomLayout] = useState<IState["customLayout"]>({
    height: "",
    width: "",
  });
  const { playListId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { playgroundData, selectedScreen } = useSelector(
    (state: RootState) => state.layoutsSlice
  );

  const handleSaveLayout = () => {
    if (playgroundData[selectedScreen].data.length > 0) {
      dispatch(onSaveLayout(Number(playListId)));
    }
  };
  const handlexNext = () => {
    navigation.navigate("/Playlists/next/" + playListId);
  };
  const adjustLayoutDimensions = (
    layoutData: LayoutStateInterface["playgroundData"],
    isVertical: boolean | null,
    dimensions: { height: number; width: number }
  ) => {
    const horizontalLayout = { width: 731, height: 411 };
    const verticalLayout = { width: 411, height: 731 };

    const currentLayout = isVertical ? verticalLayout : horizontalLayout;

    const oldLayout = layoutData[selectedScreen].containerDimensions;
    return layoutData.map((layout, index) => {
      if (index === selectedScreen) {
        return {
          ...layout,
          isVertical: isVertical,
          containerDimensions: dimensions,
          data: layout.data.map((item) => ({
            ...item,
            width: (item.width / oldLayout.width) * currentLayout.width,
            height: (item.height / oldLayout.height) * currentLayout.height,
            x: (item.x / oldLayout.width) * currentLayout.width,
            y: (item.y / oldLayout.height) * currentLayout.height,
            zoneData: item.zoneData.map((zone) => ({
              ...zone,
              width: (zone.width! / oldLayout.width) * currentLayout.width,
              height: (zone.height! / oldLayout.height) * currentLayout.height,
              x: (zone.x! / oldLayout.width) * currentLayout.width,
              y: (zone.y! / oldLayout.height) * currentLayout.height,
            })),
          })),
        };
      } else {
        return layout;
      }
    });
  };
  const handleCustomLayoutDimensions = (
    layoutData: LayoutStateInterface["playgroundData"] ,
    prevLayout: string,
    dimensions: { width: number; height: number }
  ) => {
    const horizontalLayout = { width: 731, height: 411 };
    const verticalLayout = { width: 411, height: 731 };
    const currentLayout = dimensions;
    const oldDimensions = {
      ...playgroundData[selectedScreen].containerDimensions,
      isVertical: playgroundData[selectedScreen].isVertical,
    };
    let oldLayout = {
      width: 1,
      height:1
  };
    if (oldDimensions.isVertical) {
      oldLayout = verticalLayout;
    } else if (oldDimensions.isVertical === false) {
      oldLayout = horizontalLayout;
    } else if (oldDimensions.isVertical === null) {
      oldLayout = { width: oldDimensions.width, height: oldDimensions.height };
    }
    dispatch(
      setContainerLayout({
        height: dimensions.height,
        width: dimensions.width,
        isVertical: null,
      })
    );
    return layoutData.map((layout, index) => {
      if (index === selectedScreen) {
        return {
          ...layout,
          isVertical: null,
          containerDimensions: dimensions,
          data: layout.data.map((item) => {
            const updatedItem = {
              ...item,
              width: (item.width / oldLayout.width) * currentLayout.width,
              height: (item.height / oldLayout.height) * currentLayout.height,
              x: (item.x / oldLayout.width) * currentLayout.width,
              y: (item.y / oldLayout.height) * currentLayout.height,
              zoneData: item.zoneData.map(
                (zone) => {
                  const updatedZone = {
                    ...zone,
                    width: (zone.width! / oldLayout.width) * currentLayout.width,
                    height:
                      (zone.height! / oldLayout.height) * currentLayout.height,
                    x: (zone.x! / oldLayout.width) * currentLayout.width,
                    y: (zone.y! / oldLayout.height) * currentLayout.height,
                  };
                  return updatedZone;
                }
              ),
            };
            return updatedItem;
          }),
        };
      } else {
        return layout;
      }
    });
  };

  const handleContainerlayout = (btnName: string) => {
    let adjustDimensions: any = {};
    const oldDimensions = {
      ...playgroundData[selectedScreen].containerDimensions,
      isVertical: playgroundData[selectedScreen].isVertical,
    };
    if (btnName === "vertical") {
      adjustDimensions = adjustLayoutDimensions(playgroundData, true, {
        height: 731,
        width: 411,
      });
      dispatch(
        setContainerLayout({ height: 731, width: 411, isVertical: true })
      );
    } else if (btnName === "horizontal") {
      adjustDimensions = adjustLayoutDimensions(playgroundData, false, {
        height: 411,
        width: 731,
      });
      dispatch(
        setContainerLayout({ height: 411, width: 731, isVertical: false })
      );
    } else {
      if (oldDimensions.isVertical) {
        setPreviousLayout("vertical");
      } else if (oldDimensions.isVertical === false) {
        setPreviousLayout("horizontal");
      } else if (oldDimensions.isVertical === null) {
        setPreviousLayout(previousLayout);
      }
      setIsCustomSelectOpen((prev) => !prev);
    }
    btnName !== "custom" &&
      dispatch(setAdjustedLayoutDimensions({ adjustDimensions }));
  };

  const isVerticalNotNull = () => {
    return playgroundData[selectedScreen].isVertical !== null;
  };

  const handleCustomSelectOpen = () => {
    setIsCustomSelectOpen((prev) => !prev);
  };

  const handleCutomeHeightWidth = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const numRegx = /^[0-9\b]+$/;
    if (value === "" || numRegx.test(value)) {
      setCustomLayout((prevInputs) => ({ ...prevInputs, [name]: value }));
    }
  };

  const handleApplyBtn = () => {
    dispatch(
      setContainerLayout({
        height: customLayout.height,
        width: customLayout.width,
        isVertical: null,
      })
    );
    const dimensions = {
      width: Number(customLayout.width)
        ? Number(customLayout.width)
        : playgroundData[selectedScreen].containerDimensions.width,
      height: Number(customLayout.height)
        ? Number(customLayout.height)
        : playgroundData[selectedScreen].containerDimensions.height,
    };
    const adjustDimensions = handleCustomLayoutDimensions(
      playgroundData,
      previousLayout,
      dimensions
    );
    dispatch(setAdjustedLayoutDimensions({ adjustDimensions }));
    setIsCustomSelectOpen((prev) => !prev);
    setCustomLayout({ height: "", width: "" });
  };
  const handleBack = () => {
    dispatch(clearData());
    navigate("/Playlists");
  };

  const setShowPreview = () => {
    dispatch(setShowLayoutPreview({ show: true }));
  };
  return (
    <Box sx={playlistStyles.appBarMainContainer}>
      <Avatar
        variant="circular"
        sx={playlistStyles.avatar}
        onClick={handleBack}
      >
        <ArrowBackIosRoundedIcon sx={playlistStyles.backButton} />
      </Avatar>
      <Box sx={playlistStyles.buttonMainContainer}>
        <Box sx={playlistStyles.buttonContainer}>
          <HeaderCustomButton
            sx={playlistStyles.outlinedButton}
            border={
              isVerticalNotNull() && playgroundData[selectedScreen].isVertical
                ? `2px solid ${colors.lightBlue}`
                : `2px solid ${colors.white}`
            }
            bgcolor={
              isVerticalNotNull() && playgroundData[selectedScreen].isVertical
                ? `${colors.lightBlue}`
                : "transparent"
            }
            onClick={() => handleContainerlayout("vertical")}
          >
            Vertical
          </HeaderCustomButton>
          <HeaderCustomButton
            sx={playlistStyles.outlinedButton}
            border={
              isVerticalNotNull()
                ? playgroundData[selectedScreen].isVertical
                  ? `2px solid ${colors.white}`
                  : `2px solid ${colors.lightBlue}`
                : `2px solid ${colors.white}`
            }
            bgcolor={
              isVerticalNotNull()
                ? playgroundData[selectedScreen].isVertical
                  ? "transparent"
                  : `${colors.lightBlue}`
                : "transparent"
            }
            onClick={() => handleContainerlayout("horizontal")}
          >
            Horizontal
          </HeaderCustomButton>
          <HeaderCustomButton
            sx={playlistStyles.outlinedButton}
            border={
              playgroundData[selectedScreen].isVertical === null
                ? `2px solid ${colors.lightBlue}`
                : `2px solid ${colors.white}`
            }
            bgcolor={
              playgroundData[selectedScreen].isVertical === null
                ? `${colors.lightBlue}`
                : "transparent"
            }
            onClick={() => handleContainerlayout("custom")}
          >
            Custom
          </HeaderCustomButton>
        </Box>
      </Box>

      <Box sx={playlistStyles.buttonContainer}>
        <CustomButton
          onClick={setShowPreview}
          sx={playlistStyles.layoutButton}
          bgcolor={colors.lightBlue}
          endIcon={<Box component="img" src={previewIcon} />}
        >
          Preview
        </CustomButton>
        <CustomButton
          sx={playlistStyles.layoutButton}
          bgcolor={"#104EAA"}
          endIcon={<Box component="img" src={arrowDownIcon} />}
          onClick={handleSaveLayout}
        >
          Save
        </CustomButton>
        <CustomButton
          sx={playlistStyles.layoutButton}
          bgcolor={colors.lightGreen}
          endIcon={<Box component="img" src={sendIcon} />}
          onClick={handlexNext}
        >
          Next
        </CustomButton>
      </Box>

      <ModalStyled
        open={!!isCustomSelectOpen}
        isbgColor={colors.white}
        isClose={true}
        handleClose={handleCustomSelectOpen}
        style={{ boxShadow: "none" }}
      >
        <Stack direction={"column"} gap={2} sx={playlistStyles.modalStack}>
          <Typography color={colors.primary}>Custom Layout</Typography>
          <InputField
            fieldName="Height"
            inputProps={{
              placeholder: "Height",
              value: customLayout.height,
              name: "height",
              onChange: handleCutomeHeightWidth,
              sx: playlistStyles.modalInputfields,
            }}
          />
          <InputField
            fieldName="Width"
            inputProps={{
              placeholder: "Width",
              value: customLayout.width,
              name: "width",
              onChange: handleCutomeHeightWidth,
              sx: playlistStyles.modalInputfields,
            }}
          />
          <CustomButton
            sx={playlistStyles.applyButton}
            bgcolor={colors.lightGreen}
            endIcon={<AddIcon />}
            onClick={() => handleApplyBtn()}
            disabled={
              !/^(?!(?:\d{1,2}|100)$)[0-9]\d+$/.test(customLayout.height) &&
              !/^(?!(?:\d{1,2}|100)$)[0-9]\d+$/.test(customLayout.width)
            }
          >
            Apply
          </CustomButton>
        </Stack>
      </ModalStyled>
    </Box>
  );
};

export default PlaylistHeader;
