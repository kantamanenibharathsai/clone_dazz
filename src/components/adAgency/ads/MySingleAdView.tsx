import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { Box, Button, Typography } from "@mui/material";
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";
import { videoImg } from "../assets";
import CommonAdsScreen from "./MyAds";
import { mySingleAdViewStyles } from "./MySingleAdViewStyles";
import { adsMyViewData } from "./StaticData";

const MySingleAdView = () => {
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
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Box sx={mySingleAdViewStyles.statusContainer}>
            <Typography sx={mySingleAdViewStyles.statusText}>
              Demo 11
            </Typography>
            <Typography sx={mySingleAdViewStyles.statusBox}>Online</Typography>
          </Box>
          <Box sx={mySingleAdViewStyles.statusContainer}>
            <Box>
              <Typography sx={mySingleAdViewStyles.timeText}>
                Jan 29,2024
                <Box component={"br"} /> 17:06:19
              </Typography>
            </Box>
            <Typography sx={mySingleAdViewStyles.tagBox}>Tag : cmr</Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={mySingleAdViewStyles.contentContainer}>
        <Box sx={mySingleAdViewStyles.getScreenShotContainer}>
          <Box sx={mySingleAdViewStyles.videoImgContainer} id="capture">
            <Box component={"img"} src={videoImg} alt="Video Thumbnail" />
            <Box sx={mySingleAdViewStyles.videoBtnContainer}>
              <PlayArrowRoundedIcon sx={mySingleAdViewStyles.iconBtn} />
            </Box>
          </Box>
          <Box sx={mySingleAdViewStyles.btnContainer}>
            <Button
              sx={mySingleAdViewStyles.getScreenShotBtn}
              onClick={handleGetScreenshot}
            >
              Get Screenshot
            </Button>
          </Box>
        </Box>
        <Box sx={mySingleAdViewStyles.adsPropertiesContainer}>
          {adsMyViewData.slice(0, 4).map((eachData) => (
            <Box key={eachData.id} sx={mySingleAdViewStyles.adsPropertiesBox}>
              <Typography sx={mySingleAdViewStyles.adsPropertiesText}>
                {eachData.title}
              </Typography>
              <Typography sx={mySingleAdViewStyles.adsPropertiesSubText}>
                {eachData.subTitle}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
      <Box mt={5}>
        <CommonAdsScreen />
      </Box>
    </Box>
  );
};

export default MySingleAdView;
