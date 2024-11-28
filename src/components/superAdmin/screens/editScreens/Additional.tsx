import { Stack, Typography } from "@mui/material";
import { colors, hex2rgba } from "../../../../config/theme";
import { additionalInfoStyles } from "./EditStyles";
const data = [
  { title: "ANDROID DEVICE DATE AND TIME", value: "Feb 24, 2024 5:29:49 AM" },
  { title: "ANDROID DEVICE DATE AND TIME MILLIS", value: "1708770589561" },
  { title: "ANDROID DEVICE TIME ZONE GMT", value: "EST" },
  { title: "ANDROID DEVICE TIME ZONE LOCATION", value: "America/New_York" },
  { title: "BOARD", value: "rk30sdk" },
  { title: "BRAND", value: "Rockchip" },
  { title: "DEVICE HEIGHT", value:" 1080" },
  { title: "DEVICE IP ADDRESS", value: "192.168.1.103" },
  { title: "DEVICE WIDTH", value: "1920 "},
  { title: "IS ANDROID DEFAULT LAUNCHER", value: "NO" },
  { title: "IS CAMERA PERMISSION GRANTED", value: "YES" },
  { title: "IS DEVICE OWNER ENABLED", value: "NO" },
  { title: "IS DEVICE ROOTED", value: "YES" },
];

const Additional = () => {
  return (
    <Stack sx={additionalInfoStyles.mainContainer}>
      <Typography sx={additionalInfoStyles.textHead}>
        Additional Information
      </Typography>

      {data.map((item, index) => (
        <Stack
          key={index}
          sx={additionalInfoStyles.infoField}
          bgcolor={
            index % 2 === 0
              ? hex2rgba(colors.searchInputColor, 0.5)
              : colors.white
          }
        >
          <Typography width={"50%"} px={"30px"} title={item.title}>
            {item.title}
          </Typography>

          <Typography width={"50%"} title={item.value}>
            {item.value}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
};

export default Additional;
