import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { Box, Button, Typography } from "@mui/material";
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";
import { videoImg } from "../../assets";
import ScreenAds from "../ScreenAds";
import { adsMyViewStyles } from "./AdsMyViewStyles";
export const adsMyViewData = [
  {
    id: 1,
    title: "Live Playlist",
    subTitle: "Menu Screen",
  },
  {
    id: 2,
    title: "Operating System ",
    subTitle: "Android",
  },
  {
    id: 3,
    title: "Orientation",
    subTitle: "Portrait",
  },
  {
    id: 4,
    title: "Resolution (W x H)",
    subTitle: "1080 x 2400",
  },
  {
    id: 5,
    title: "RAM",
    subTitle: "3.01 / 8 GB",
  },
  {
    id: 6,
    title: "Storage",
    subTitle: "110.47 / 119 GB",
  },
];

const AdsMyView = () => {
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

  return (
    <Box>
      <Box sx={adsMyViewStyles.demoTextMainBox}>
        <Box>
          <Box sx={adsMyViewStyles.statusContainer}>
            <Typography sx={adsMyViewStyles.statusText}>Demo 11</Typography>
            <Typography sx={adsMyViewStyles.statusBox}>Online</Typography>
          </Box>
          <Box sx={adsMyViewStyles.statusContainer}>
            <Box>
              <Typography sx={adsMyViewStyles.timeText}>
                Jan 29,2024
                <Box component={"br"} /> 17:06:19
              </Typography>
            </Box>
            <Typography sx={adsMyViewStyles.tagBox}>Tag : cmr</Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={adsMyViewStyles.videoMainBox}>
        <Box sx={adsMyViewStyles.videoBox}>
          <Box sx={adsMyViewStyles.videInnerBox} id="capture">
            <Box
              sx={adsMyViewStyles.video}
              component={"img"}
              src={videoImg}
              alt="Video Thumbnail"
            />
            <Box sx={adsMyViewStyles.videoBtnContainer}>
              <PlayArrowRoundedIcon sx={adsMyViewStyles.iconBtn} />
            </Box>
          </Box>
          <Box sx={adsMyViewStyles.btnContainer}>
            <Button
              sx={adsMyViewStyles.getScreenShotBtn}
              onClick={handleGetScreenshot}
            >
              Get Screenshot
            </Button>
          </Box>
        </Box>
        <Box sx={adsMyViewStyles.videoCardsBox}>
          {adsMyViewData.map((eachData) => (
            <Box key={eachData.id} sx={adsMyViewStyles.adsPropertiesBox}>
              <Typography sx={adsMyViewStyles.adsPropertiesText}>
                {eachData.title}
              </Typography>
              <Typography sx={adsMyViewStyles.adsPropertiesSubText}>
                {eachData.subTitle}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
      <Box mt={5}>
        <ScreenAds />
      </Box>
    </Box>
  );
};

export default AdsMyView;
