import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  InputAdornment,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  clearMediaData,
  clearPage,
  getMediaFilesData,
  MediaData,
  onAddZoneData,
  onDragStart,
  onDropAndAdd,
  selectedMedia,
} from "../../../redux/reducers/layoutsReducer/layouts";
import { useAppDispatch, useAppSelector } from "../../../utils/useRedux";
import { handleCardLayoutPlaceHolder } from "../../../utils/utils";
import { InputField } from "../../common/inputField/InputField";
import { playlistStyles } from "./playlistStyles";

interface IProps {}

interface IState {
  activeTab: "media" | "widget" | "sequence";
  mediaActiveTab: number;
  openedWidget: null | string;
}

const mediaIndexes = ["", "video", "image", "folder"];

const MediaList: React.FC<IProps> = () => {
  const [mediaActiveTabIndex, setMediaActiveTabIndex] =
    useState<IState["mediaActiveTab"]>(0);
  const { selectedWidget, loading } = useAppSelector(
    (state) => state.layoutsSlice
  );
  const dispatch = useAppDispatch();
  const { mediaFiles, mediaPage, message } = useAppSelector(
    (state) => state.layoutsSlice
  );
  const handleDragStart = (item: MediaData) => {
    dispatch(selectedMedia({ type: "media", id: item.id }));
    dispatch(
      onDragStart({
        id: item.id,
        name: item.fileName,
        type: item.fileType,
        html: "",
        url: item.file,
        duriation:item.duriation??0
      })
    );
  };

  const handleAddWidget = (item: MediaData) => {
    if (selectedWidget?.id) {
      dispatch(selectedMedia({ type: "media", id: item.id }));
      dispatch(
        onAddZoneData({
          mediaType: item.fileType,
          path: item.file,
          id: selectedWidget.id,
          mediaId: item.id,
          name: item.fileName,
        })
      );
    } else {
      dispatch(selectedMedia({ type: "media", id: item.id }));
      dispatch(
        onDropAndAdd({
          id: item.id,
          mediaType: item.fileType,
          path: item.file,
          name: item.fileName,
          duriation:item.duriation??0
        })
      );
    }
  };
  const handleTabs = (index: number) => {
    if (loading) return;
    const tab = mediaIndexes[index];

    setMediaActiveTabIndex(index);
    dispatch(clearPage(1));
    dispatch(clearMediaData());
    if (index === 3) {
      // dispatch();  
    }else{  
      dispatch(getMediaFilesData({ tab }));
    }
  };
  const handleScroll = (event: React.UIEvent<HTMLDivElement>): void => {
    const target = event.currentTarget;
    const bottom =
      target.scrollHeight - target.scrollTop === target.clientHeight;
    if (bottom && mediaPage.currentPage < mediaPage.totalPages) {
      dispatch(clearPage(mediaPage.currentPage + 1));
      dispatch(getMediaFilesData({ tab: mediaIndexes[mediaActiveTabIndex] }));
    }
  };
  useEffect(() => {
    dispatch(getMediaFilesData({}));
  }, []); // eslint-disable-line
  return (
    <>
      <Box sx={playlistStyles.customContainer}>
        <Grid container justifyContent={"space-between"} marginBottom={3}>
          <Grid item xs={12}>
            <InputField
              inputProps={{
                placeholder: "Search",
                sx: playlistStyles.inputField,
                InputProps: {
                  sx: playlistStyles.inputProps,
                  startAdornment: (
                    <InputAdornment position="start" sx={{ cursor: "pointer" }}>
                      <SearchSharpIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Grid>
        </Grid>
      </Box>
      <Box sx={playlistStyles.mediaTabsContainer}>
        <Tabs
          value={mediaActiveTabIndex}
          onChange={(_event, index) => handleTabs(index)}
          aria-label="basic tabs example"
          sx={{
            textTransform: "capitalize",
            "& .MuiButtonBase-root.MuiTab-root": {
              minWidth: "50px",
              padding: 0,
            },
            mx: "30px",
            "& .MuiTabs-flexContainer": {
              display: "flex",
              justifyContent: "space-between",
            },
            "@media (max-width: 1200px)": {
              "& .MuiButtonBase-root.MuiTab-root": {
                minWidth: "40px", // Reduced minWidth for screens below 1200px
              },
            },
          }}
        >
          <Tab label="All" sx={playlistStyles.mediaTabs} />
          <Tab label="Video" sx={playlistStyles.mediaTabs} />
          <Tab label="Photo" sx={playlistStyles.mediaTabs} />
          <Tab label="Folder" sx={playlistStyles.mediaTabs} />
        </Tabs>
        <Divider
          variant="fullWidth"
          orientation="horizontal"
          sx={playlistStyles.dividerMedia}
        />
      </Box>
      <Grid
        container
        rowSpacing={2}
        columnSpacing={3}
        sx={{
          overflow: "auto",
          minHeight: "20vh",
          padding: "30px",
          boxSizing: "border-box",
          height: "62vh",
          "::-webkit-scrollbar": {
            display: "none",
          },
        }}
        mt={"0px"}
        onScroll={handleScroll}
      >
        {(() => {
          switch (true) {
            case !!message:
              return (
                <Grid item xs={12}>
                  <Typography sx={playlistStyles.errorMsg}>
                    {message}
                  </Typography>
                </Grid>
              );

            case loading:
              return (
                <Grid
                  item
                  xs={12}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <CircularProgress />
                </Grid>
              );
            // case 
            default:
              return mediaFiles.map((item) => (
                <Grid key={item.id} item xs={4}>
                  <Box
                    sx={{
                      cursor: "pointer",
                      position: "relative",
                      height: "10vh",
                      width: "90%",
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    draggable={true}
                    onDragStart={() => handleDragStart(item)}
                    onClick={() => handleAddWidget(item)}
                  >
                    {item.fileType && item.fileType.includes("video") ? (
                      <Box
                        sx={{
                          height: "100%",
                          width: "100%",
                          borderRadius: "10px",
                          display: "flex",
                          alignItems: "center",
                          backgroundColor: "black",
                        }}
                      >
                        <video width="100%">
                          <source src={item.file} type="video/mp4" />
                        </video>
                      </Box>
                    ) : (
                      <Box
                        draggable={false}
                        component="img"
                        sx={{
                          height: "100%",
                          width: "100%",
                          objectFit: "cover",
                          borderRadius: "10px",
                        }}
                        alt="Draggable Item"
                        src={item.file}
                        onError={handleCardLayoutPlaceHolder}
                      />
                    )}
                    {item.fileType && item.fileType.includes("video") && (
                      <PlayCircleIcon
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          fontSize: "40px",
                          color: "black",
                          opacity: 0.5,
                        }}
                      />
                    )}
                  </Box>
                </Grid>
              ));
          }
        })()}
      </Grid>
    </>
  );
};

export default MediaList;
