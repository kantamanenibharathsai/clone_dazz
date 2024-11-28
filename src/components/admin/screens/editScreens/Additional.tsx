import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { colors, hex2rgba } from "../../../../config/theme";
import { additionalInfo } from "../../../../redux/reducers/adminReducers/screenSlice";
import { AppDispatch, RootState } from "../../../../redux/store";
import { additionalInfoStyles } from "./EditStyles";
import { useParams } from "react-router-dom";
const data = [
  {
    title: "ANDROID DEVICE DATE AND TIME",
    key: "androidDeviceDateTime",
  },
  {
    title: "ANDROID DEVICE DATE AND TIME MILLIS",
    key: "androidDeviceDateTimeMillis",
  },
  {
    title: "ANDROID DEVICE TIME ZONE GMT",
    key: "androidDeviceTimeZoneGmt",
  },
  {
    title: "ANDROID DEVICE TIME ZONE LOCATION",
    key: "androidDeviceTimeZoneLocation",
  },
  { title: "BOARD", key: "board" },
  { title: "BRAND", key: "brand" },
  { title: "DEVICE HEIGHT", key: "deviceHeight" },
  {
    title: "DEVICE IP ADDRESS",
    key: "deviceIpAddress",
  },
  { title: "DEVICE WIDTH", key: "deviceWidth" },
  {
    title: "IS ANDROID DEFAULT LAUNCHER",
    key: "isAndroidDefaultLauncher",
  },
  {
    title: "IS CAMERA PERMISSION GRANTED",
    key: "isCameraPermissionGranted",
  },
  {
    title: "IS DEVICE OWNER ENABLED",
    key: "isDeviceOwnerEnabled",
  },
  { title: "IS DEVICE ROOTED", key: "isDeviceRooted" },
];
const Additional = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { additionalInfoData, additionalInfoLoader } = useSelector(
    (store: RootState) => store.ScreensSlice
  );
  const {id}=useParams()
  useEffect(() => {
    dispatch(additionalInfo({ screenId: id }));
  }, [dispatch, id]);
  return (
    <Stack sx={additionalInfoStyles.mainContainer}>
      <Typography sx={additionalInfoStyles.textHead}>
        Additional Information
      </Typography>
      {additionalInfoLoader === "started" ? (
        <Box sx={additionalInfoStyles.loaderContainer}>
          <CircularProgress />
        </Box>
      ) : additionalInfoData !== null ? (
        data.map((item, index) => (
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
            <Typography width={"50%"} title={item.key}>
              {additionalInfoData !== null &&
              item.key === "androidDeviceDateTime"
                ? moment(additionalInfoData[item.key]).format(
                    "MMMM Do YYYY, h:mm:ss A"
                  )
                : typeof additionalInfoData[item.key] === "boolean"
                ? additionalInfoData[item.key]
                  ? "Yes"
                  : "No"
                : additionalInfoData[item.key]}
            </Typography>
          </Stack>
        ))
      ) : (
        <Box sx={additionalInfoStyles.loaderContainer}>
          <Typography>No Data ...</Typography>
        </Box>
      )}
    </Stack>
  );
};
export default Additional;
