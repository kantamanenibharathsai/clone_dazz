import { Box, Modal } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getLayouts,
  PlaygroundData,
  setShowLayoutPreview,
} from "../../../redux/reducers/layoutsReducer/layouts";
import { RootState } from "../../../redux/store";
import { useAppDispatch } from "../../../utils/useRedux";
import PlaylistHeader from "./PlaylistHeader";
import PlaylistPlayground from "./PlaylistPlayground";
import PlaylistRightSidebar from "./PlaylistRigthSidebar";
import PlaylistSidebar from "./PlaylistSidebar";
import { playlistStyles } from "./playlistStyles";

interface RenderProps {
  data: PlaygroundData;
  path?: string;
  name: string;
  onVideoEnd?: () => void;
}

export interface Layout {
  duration: number;
  displayConditions: DisplayConditions;
  config: LayoutConfig;
  zones: Zone[];
}

export interface LayoutConfig {
  height: number;
  width: number;
}

export interface DisplayConditions {
  conditionId: string;
  config: { [key: string]: [] | null };
}

export interface Zone {
  id: string;
  name: null;
  config: ZoneConfig;
  content_type: string;
  isZoneContentStretchToFitEnabled: boolean;
  isZoneContentMuted: boolean;
  sequence: Sequence;
  sequenceSchedules: [];
}

export interface ZoneConfig {
  x: number;
  y: number;
  w: number;
  h: number;
  z: number;
}

export interface Sequence {
  data: Datum[];
  config: SequenceConfig;
}

export interface SequenceConfig {
  id: string;
  name: string;
  transition: string;
  type: string;
}

export interface Datum {
  id: string;
  name: string;
  path: string;
  duration: number;
  type: string;
  displayConditions: DisplayConditions;
}

const PlaylistEdit = () => {
  const { showPreview, playgroundData, selectedScreen } =
    useSelector((state: RootState) => state.layoutsSlice);

  const { playListId } = useParams();
  const dispatch = useAppDispatch();

  const closePreview = () => {
    dispatch(setShowLayoutPreview({ show: false }));
  };

  useEffect(() => {
    dispatch(getLayouts(Number(playListId)));
    // eslint-disable-next-line
  }, []);

  return (
    <Box sx={{ height: "100vh" }}>
      <PlaylistHeader />
      <Box sx={playlistStyles.mediaSubContainer}>
        <PlaylistSidebar />
        <PlaylistPlayground />
        <PlaylistRightSidebar />
        <Modal
          open={showPreview}
          onClose={closePreview}
          aria-labelledby="preview-modal-title"
          aria-describedby="preview-modal-description"
        >
          <Box
            onClick={closePreview}
            sx={{
              height: "100vh",
              width: "100vw",
              backgroundColor: "rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              onClick={(event) => {
                event.stopPropagation();
              }}
              sx={{
                width: `${playgroundData[selectedScreen].containerDimensions.width}px`,
                height: `${playgroundData[selectedScreen].containerDimensions.height}px`,
                backgroundColor: "white",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {playgroundData[selectedScreen].data.map((item, index) => {
                return (
                  <React.Fragment key={index.toString()}>
                    <RenderItems
                      data={item}
                      path={item.data.path}
                      name={item.data.name}
                    />
                  </React.Fragment>
                );
              })}
            </Box>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default PlaylistEdit;

const RenderItems: React.FC<RenderProps> = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const onVideoEnd = () => {
    if (data.zoneData && data.zoneData.length > 0) {
      if (currentIndex > 0) {
        setCurrentIndex((prevValue) =>
          prevValue >= data.zoneData.length ? 0 : prevValue + 1
        );
      } else {
        setCurrentIndex((prevValue) => prevValue + 1);
      }
    }
  };

  const item = useMemo(() => {
    let type = data.data.type;
    let path = data.data.path;
    let name = data.data.name;
    try {
      if (data.zoneData && data.zoneData.length > 0) {
        if (currentIndex > 0) {
          const duration = `${data.zoneData[currentIndex - 1].duration || 10}`;
          data.zoneData[currentIndex - 1].type !== "video" &&
            setTimeout(() => {
              setCurrentIndex((prevValue) =>
                prevValue >= data.zoneData.length ? 0 : prevValue + 1
              );
            }, parseInt(duration) * 1000);
          type = data.zoneData[currentIndex - 1].type;
          path = data.zoneData[currentIndex - 1].path;
          name = data.zoneData[currentIndex - 1].name;
        } else {
          const duration = `${data.data.duration || 0}`;
          data.data.type !== "video" &&
            setTimeout(() => {
              setCurrentIndex((prevValue) => prevValue + 1);
            }, parseInt(duration) * 1000);
          type = data.data.type;
          path = data.data.path;
          name = data.data.name;
        }
      }
    } catch (error) {
      type = data.data.type;
      path = data.data.path;
      name = data.data.name;
    }
    return (
      <>
        {type && type.includes("image") && (
          <RenderImage data={data} path={path} name={name} />
        )}
        {type && type.includes("video") && (
          <RenderVideo
            data={data}
            path={path}
            name={name}
            onVideoEnd={onVideoEnd}
          />
        )}
        {type === "widget" && (
          <RenderWebView data={data} path={path} name={name} />
        )}
      </>
    );
    // eslint-disable-next-line
  }, [data, currentIndex]);

  return item;
};

const RenderImage: React.FC<RenderProps> = ({ data, path }) => {
  return (
    <img
      alt="rendering"
      src={path || ""}
      style={{
        position: "absolute",
        left: data.x,
        top: data.y,
        height: data.height,
        width: data.width,
      }}
    />
  );
};

const RenderVideo: React.FC<RenderProps> = ({
  data,
  path,
  name,
  onVideoEnd,
}) => {
  // const [videurl, setVideourl] = useState<string>(path);
  return (
    <>
      {path && (
        <video
          src={path}
          style={{
            position: "absolute",
            left: data.x,
            top: data.y,
            height: data.height,
            width: data.width,
          }}
          autoPlay
          muted
          controls={false}
          onEnded={onVideoEnd}
        />
      )}
    </>
  );
};
const RenderWebView: React.FC<RenderProps> = ({ data, path }) => {
  return (
    <Box
      component={"div"}
      sx={{
        position: "absolute",
        left: data.x,
        top: data.y,
        height: data.height,
        width: data.width,
      }}
      dangerouslySetInnerHTML={{ __html: path ? path : "" }}
    />
  );
};
