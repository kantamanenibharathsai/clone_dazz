import {
  Box,
  Button,
  CircularProgress,
  ListItemButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { colors } from "../../../../config/theme";
import {
  getPlayListAds,
  IAd,
} from "../../../../redux/reducers/superAdmin/CanvasNextSlice";
import { useAppDispatch, useAppSelector } from "../../../../utils/useRedux";
import { handleCardLayoutPlaceHolder } from "../../../../utils/utils";
import { layOutStyles } from "../../../common/cardLayout/CardLayoutStyles";
import { CustomButton } from "../../../common/customButton/CustomButton";
import { adPlaceHolder, threePersons } from "../../assets";
import CanvasGroups from "./CanvasGroups";
import { canvasGroupsStyles, canvasNextStyles } from "./CanvasNextStyles";
import CanvasScreens from "./CanvasScreens";
import PlaylistSchedule from "./PlaylistSchedule";
interface IState {
  adId: number | null;
}
const tabs = ["Screen", "Groups", "Playlist schedule"];
const CanvasNext = () => {
  const [tabNumber, setTabNumber] = useState(0);
  const [cleared, setCleared] = React.useState<boolean>(false);
  const [adId, setAdId] = useState<IState["adId"]>(null);
  const { loadingStatus, message, data } = useAppSelector(
    (state) => state.canvasNextSlice.ads
  );
  const dispatch = useAppDispatch();
  const { playListId } = useParams();
  useEffect(() => {
    dispatch(getPlayListAds(playListId));
    // eslint-disable-next-line
  }, []);
  React.useEffect(() => {
    if (cleared) {
      const timeout = setTimeout(() => {
        setCleared(false);
      }, 1500);
      return () => clearTimeout(timeout);
    }
    return () => {};
    // eslint-disable-next-line
  }, [cleared]);
  const handleSetTab = (tabNum: number) => {
    setTabNumber(tabNum);
  };
  const tableJSX = () => {
    const tabsJSX = [
      <CanvasScreens adId={adId} />,
      <CanvasGroups adId={adId} />,
      <PlaylistSchedule adId={adId} />,
    ];
    return tabsJSX[tabNumber];
  };
  const handleAdId = (adId: number) => {
    setAdId(adId);
  };
  const adJSX = () => {
    if (loadingStatus === "PENDING")
      return (
        <CircularProgress sx={canvasNextStyles.adloader(colors.primary)} />
      );
    if ((data && data.length === 0) || loadingStatus === "REJECTED")
      return (
        <Typography sx={canvasNextStyles.adloader(colors.validate)}>
          {message}
        </Typography>
      );
  };
  const adLayoutJSX = (layOutAd: IAd) => {
    if (layOutAd.files[0]?.fileType === "image/jpeg") {
      return (
        <Box
          component={"img"}
          loading="lazy"
          src={layOutAd.files[0].file}
          onError={handleCardLayoutPlaceHolder}
          sx={canvasNextStyles.adImage}
        />
      );
    } else if (layOutAd.files[0]?.fileType === "video/mp4") {
      return (
        <Box
          component={"video"}
          src={layOutAd.files[0].file}
          sx={canvasNextStyles.adImage}
        />
      );
    } else {
      return (
        <Box
          component={"img"}
          loading="lazy"
          src={adPlaceHolder}
          sx={canvasNextStyles.adImage}
        />
      );
    }
  };
  return (
    <Stack direction={"column"}>
      <Box sx={canvasNextStyles.tabBox}>
        <Box sx={canvasNextStyles.tabs}>
          {tabs.map((tab, index) => (
            <Button
              key={tab}
              onClick={() => handleSetTab(index)}
              sx={canvasNextStyles.tabsElement(index, tabNumber)}
            >
              {tab}
            </Button>
          ))}
        </Box>
        <CustomButton
          bgcolor={colors.inkBlue}
          width={158}
          endIcon={
            <Box component={"img"} src={threePersons} sx={layOutStyles.edit} />
          }
        >
          Publish
        </CustomButton>
      </Box>
      <Typography sx={canvasNextStyles.adText}>Ad</Typography>
      {adJSX()}
      <Box sx={canvasNextStyles.adMainBox}>
        {loadingStatus === "FULFILLED" &&
          data &&
          data?.length > 0 &&
          data.map((ad) => (
            <ListItemButton
              sx={canvasNextStyles.adBox(ad.playlistAdsId === adId)}
              key={ad.playlistAdsId}
              onClick={() => handleAdId(ad.playlistAdsId)}
            >
              {adLayoutJSX(ad)}
            </ListItemButton>
          ))}
      </Box>
      {loadingStatus === "FULFILLED" && (
        <>
          {adId === null ? (
            <Box sx={canvasGroupsStyles.tableMainBox}>
              <Typography textAlign={"center"}>
                Select any one ad in above ads
              </Typography>
            </Box>
          ) : (
            <React.Fragment>{tableJSX()}</React.Fragment>
          )}
        </>
      )}
    </Stack>
  );
};

export default CanvasNext;
