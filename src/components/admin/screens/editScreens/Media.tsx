import PauseCircleFilledRoundedIcon from "@mui/icons-material/PauseCircleFilledRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { Box, Button, Typography } from "@mui/material";
import saveAs from "file-saver";
import html2canvas from "html2canvas";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { colors, hex2rgba } from "../../../../config/theme";
import {
  getPlaylistById,
  getPlaylistImage,
} from "../../../../redux/reducers/adminReducers/screenSlice";
import { AppDispatch, RootState } from "../../../../redux/store";
import { cardLayoutPlacedHolderImage } from "../../../common/assets";
import Playlist from "../../playlist/Playlist";
import { screenViewStyles } from "./screenViewStyles";

const Media = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedPlaylist, selectedImage } = useSelector(
    (state: RootState) => state.ScreensSlice
  );
  const { id } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  useEffect(() => {
    dispatch(getPlaylistById(Number(id)));
    dispatch(getPlaylistImage(Number(id)));
  }, [dispatch, id]);
  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };
  const handleGetScreenshot = async () => {
    try {
      const captureDiv = document.getElementById("capture");
      if (captureDiv) {
        const canvas = await html2canvas(captureDiv);
        const dataUrl = canvas.toDataURL();
        saveAs(dataUrl, "screenshot.png");
      }
    } catch (error) {}
  };
  const formattedDate = moment(selectedPlaylist?.createdAt).format(
    "MMM D, YYYY"
  );
  const formattedTime = moment(selectedPlaylist?.createdAt).format("HH:mm:ss");
  const displayProperties = [
    { label: "Live Playlist", value: selectedPlaylist?.livePlaylist },
    { label: "Operating System", value: selectedPlaylist?.operatingSystem },
    { label: "Orientation", value: selectedPlaylist?.orientation },
    { label: "Resolution (W x H)", value: selectedPlaylist?.resolution },
    { label: "RAM", value: selectedPlaylist?.ram },
    { label: "Storage", value: selectedPlaylist?.storage },
  ];
  return (
    <>
      <Box sx={screenViewStyles.demoTextMainBox}>
        <Box>
          <Box sx={screenViewStyles.statusContainer}>
            <Box>
              <Typography
                sx={screenViewStyles.statusText}
                title={selectedPlaylist?.screenName}
              >
                {selectedPlaylist?.screenName ?? "-"}
              </Typography>
            </Box>
            <Typography
              sx={{
                ...screenViewStyles.statusBox,
                backgroundColor: selectedPlaylist?.status
                  ? hex2rgba(colors.green, 1)
                  : hex2rgba(colors.validate, 1),
              }}
            >
              {selectedPlaylist?.status ? "online" : "offline"}
            </Typography>
          </Box>
          <Box sx={screenViewStyles.statusContainer}>
            <Box>
              <Typography sx={screenViewStyles.timeText}>
                {formattedDate ?? "--"}
                <Box component={"br"} />
                {formattedTime ?? "--"}
              </Typography>
            </Box>
            <Typography sx={screenViewStyles.tagBox}>
              Tag : {selectedPlaylist?.tags?.[0] ?? "--"}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={screenViewStyles.videoMainBox}>
        <Box sx={screenViewStyles.videoBox}>
          <Box sx={screenViewStyles.videInnerBox} id="capture">
            {(selectedImage?.url&&selectedImage.url.includes("mp4"))?
              <Box
                component={"video"}
                sx={screenViewStyles.video}
                autoPlay
                controls
                ref={videoRef}
              >
                <source
                  src={selectedImage?.url ?? cardLayoutPlacedHolderImage}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </Box>
            :
            <Box
             component={"img"}
             src={selectedImage?.url ?? cardLayoutPlacedHolderImage}
            sx={screenViewStyles.video}
                />
            }
            
            {(selectedImage?.url&&selectedImage.url.includes("mp4"))&&<Box sx={screenViewStyles.videoBtnContainer}>
              {!isPlaying ? (
                <PlayArrowRoundedIcon
                  sx={screenViewStyles.iconBtn}
                  onClick={handlePlay}
                />
              ) : (
                <PauseCircleFilledRoundedIcon
                  sx={screenViewStyles.iconBtn}
                  onClick={handlePlay}
                />
              )}
            </Box>}
          </Box>
          <Box sx={screenViewStyles.btnContainer}>
            <Button
              sx={screenViewStyles.getScreenShotBtn}
              onClick={handleGetScreenshot}
            >
              Get Screenshot
            </Button>
          </Box>
        </Box>
        <Box sx={screenViewStyles.videoCardsBox}>
          {displayProperties.map((eachData) => (
            <Box key={eachData.label} sx={screenViewStyles.adsPropertiesBox}>
              <Typography sx={screenViewStyles.adsPropertiesText}>
                {eachData.label}
              </Typography>
              <Typography sx={screenViewStyles.adsPropertiesSubText}>
                {eachData.value ?? "----"}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
      <Box mt={5}>
        <Playlist />
      </Box>
    </>
  );
};

export default Media;
