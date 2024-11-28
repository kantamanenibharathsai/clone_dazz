import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  IconButton,
  SxProps,
  TextField,
  Typography,
} from "@mui/material";
import React, { useMemo } from "react";
import {
  onChangeLayoutField,
  onChangeWidgetField,
  onChangeWidgeZonetField,
  onDeleteFromPlayground,
  onDeleteFromPlaygroundZone,
  onUpAndBackword,
} from "../../../redux/reducers/layoutsReducer/layouts";
import { useAppDispatch, useAppSelector } from "../../../utils/useRedux";
import { thumbnails } from "./WidgetsData";
import { cardLayoutPlacedHolderImage } from "../../common/assets";

interface IProps {}

interface RenderItemsProps {
  selectedWidgetData: {
    name: string;
    type: string;
    widgetHTML: string;
    path?: string;
    duration?: number;
};
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  zoneLength?: number;
  onDelete: () => void;
}
const getWidgetImage = (url: string) => {
  for (const key in thumbnails) {
    if (url.includes(key)) {
      return thumbnails[key];
    }
  }
  return cardLayoutPlacedHolderImage;
};
const RenderItems: React.FC<RenderItemsProps> = ({
  selectedWidgetData,
  handleOnChange,
  zoneLength,
  onDelete,
}) => {
  return (
    <Box sx={styles.innerWrapper}>
      <Box sx={styles.imageContainer}>
        {(selectedWidgetData.type&&selectedWidgetData.type.includes("video")) ? (
            <Box
              component={"video"}
              src={selectedWidgetData.path}
              sx={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
                position: "relative",
              }}
            />
        ) : (
          <Box
            component="img"
            src={
              selectedWidgetData.type === "widget"
                ? getWidgetImage(selectedWidgetData.path??"")
                : selectedWidgetData.path
            }
            sx={styles.widgetImage}
          />
        )}
      </Box>
      <Box sx={styles.widgetContent}>
        {selectedWidgetData.type === "widget" && (
          <>
            <TextField
              label="Name"
              variant="outlined"
              value={selectedWidgetData.name}
              onChange={handleOnChange}
              name="name"
            />
            <TextField
              label="Path"
              variant="outlined"
              value={selectedWidgetData.path}
              onChange={handleOnChange}
              name="path"
            />
          </>
        )}
        {zoneLength
          ? zoneLength > 0 &&
            selectedWidgetData.type !== "video" && (
              <TextField
                label="duration"
                variant="outlined"
                value={selectedWidgetData.duration}
                onChange={handleOnChange}
                name="duration"
                type="number"
              />
            )
          : null}
        <Box textAlign="right">
          <IconButton onClick={()=>onDelete()} aria-label="delete">
            <DeleteIcon color="error" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

const PlaylistRightSidebar: React.FC<IProps> = () => {
  const { selectedWidget, playgroundData, selectedScreen } = useAppSelector(
    (state) => state.layoutsSlice
  );
  const dispatch = useAppDispatch();

  const selectedWidgetData = useMemo(() => {
    return playgroundData[selectedScreen].data.find(
      (item) => item.id === selectedWidget?.id
    );
    // eslint-disable-next-line
  }, [playgroundData, selectedWidget]);

  const selectedPlaygroundData = useMemo(
    () => playgroundData[selectedScreen],
    [playgroundData, selectedScreen]
  );

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedWidgetData) {
      return;
    }
    dispatch(
      onChangeWidgetField({
        name: event.target.name,
        value: event.target.value,
        id: selectedWidgetData.id,
      })
    );
  };

  const handleOnChangeZone = (
    event: React.ChangeEvent<HTMLInputElement>,
    zoneIndex: number
  ) => {
    if (!selectedWidgetData) {
      return;
    }
    dispatch(
      onChangeWidgeZonetField({
        name: event.target.name,
        value: event.target.value,
        id: selectedWidgetData.id,
        zoneIndex,
      })
    );
  };

  const handleOnChangeLayout = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      onChangeLayoutField({
        name: event.target.name,
        value: event.target.value,
      })
    );
  };

  const handleDeleteItem = () => {
    dispatch(onDeleteFromPlayground({ id: selectedWidgetData?.id }));
  };

  const handleDeleteZoneItem = (zoneIndex: number) => {
    dispatch(
      onDeleteFromPlaygroundZone({ id: selectedWidgetData?.id, zoneIndex,zoneItemId:selectedWidgetData?.zoneData[zoneIndex].id! })
    );
  };

  const handleUpwordBackword = (direction: "up" | "back") => {
    dispatch(onUpAndBackword(direction));
  };

  return (
    <Box
      sx={{
        backgroundColor: "white",
        height: "100%",
        width: "22vw",
        overflowX: "hidden",
      }}
    >
      <Box sx={styles.container}>
      <>
            <Typography variant="h6">Layout Screen Settings</Typography>
            <TextField
              label="Layout Name"
              variant="outlined"
              value={selectedPlaygroundData.layoutName}
              onChange={handleOnChangeLayout}
              name="layoutName"
              sx={{
                fontSize: "13px",
                ".MuiFormLabel-root.MuiInputLabel-root": { fontSize: "13px" },
              }}
            />
            <TextField
              label="Duration"
              variant="outlined"
              value={selectedPlaygroundData.duration}
              sx={{
                fontSize: "13px",
                ".MuiFormLabel-root.MuiInputLabel-root": { fontSize: "13px" },
              }}
              onChange={handleOnChangeLayout}
              name="duration"
              type="number"
            />
          </>
        {selectedWidgetData && (
          <>
            <Typography variant="subtitle1" sx={styles.zoneOutHeading}>Zone Settings </Typography>
            <Typography  variant="subtitle2"  sx={styles.zoneMessage}>*Select the required media for adding to current zone or press ESC for exiting zone</Typography>
            <RenderItems
              selectedWidgetData={selectedWidgetData.data}
              handleOnChange={handleOnChange}
              zoneLength={selectedWidgetData.zoneData.length}
              onDelete={handleDeleteItem}
            />
            {selectedWidgetData.zoneData.map((item, zoneIndex) => {
              return (
                <RenderItems
                  key={item.id}
                  selectedWidgetData={item}
                  handleOnChange={(event) =>
                    handleOnChangeZone(event, zoneIndex)
                  }
                  zoneLength={selectedWidgetData.zoneData.length}
                  onDelete={() => handleDeleteZoneItem(zoneIndex)}
                />
              );
            })}
            <Box display="flex" gap={1}>
              <Button
                color="primary"
                variant="contained"
                sx={styles.btns}
                onClick={() => handleUpwordBackword("up")}
              >
                Upword
              </Button>
              <Button
                color="secondary"
                variant="contained"
                sx={styles.btns}
                onClick={() => handleUpwordBackword("back")}
              >
                Backword
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    padding: 4,
  },
  btns: {
    textTransform: "none",
    borderRadius: "20px",
    fontSize: "12px",
    height: "40px",
  },
  innerWrapper: {
    border: "1px solid #ccc",
    borderRadius: 2,
    overflow: "hidden",
  },
  imageContainer: {
    width: "100%",
    height: 140,

    overflow: "hidden",
    margin: "0 auto",
  },
  widgetImage: {
    width: "100%",
    height: "100%",
  },
  widgetContent: {
    display: "flex",
    flexDirection: "column",
    gap: 3,
    p: 1,
  },
  zoneOutHeading : {
    color:'#000000',
  },
  zoneMessage : {
    color:'green',
  }
} satisfies Record<string, SxProps>;

export default PlaylistRightSidebar;
