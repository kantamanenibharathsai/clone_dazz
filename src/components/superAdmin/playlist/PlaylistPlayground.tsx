import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Typography } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Rnd as ResizableBox } from "react-rnd";
import { colors } from "../../../config/theme";
import {
  addLayoutScreen,
  onDropAndAdd,
  removeLayoutScreen,
  setSelectedSreen,
  setSelectedWidget,
  
  updatePosition,
} from "../../../redux/reducers/layoutsReducer/layouts";
import { useAppDispatch, useAppSelector } from "../../../utils/useRedux";
import { thumbnails } from "./WidgetsData";
import { handleCardLayoutPlaceHolder } from "../../../utils/utils";
import { cardLayoutPlacedHolderImage } from "../../common/assets";

type Position =
  | "top"
  | "right"
  | "bottom"
  | "left"
  | "topleft"
  | "topright"
  | "bottomright"
  | "bottomleft";

interface IState {
  cursorPosition: {
    clientX: number;
    clientY: number;
    id: number;
    x: number;
    y: number;
  } | null;
  resizePointer: {
    clientX: number;
    clientY: number;
    id: number;
    x: number;
    y: number;
    position: Position;
    height: number;
    width: number;
  } | null;
  selectedWidget: {
    id: number;
    height: number;
    width: number;
  } | null;
}

const PlaylistPlayground = () => {
  const [resizeProperties, setResizingProperties] = useState({
    index: 0,
    isResizing: false,
  });
  const [cursorPosition, setCursorPosition] =
    useState<IState["cursorPosition"]>(null);
  const [resizePointer, setResizePointer] =
    useState<IState["resizePointer"]>(null);
  const {
    playgroundData,
    selectedScreen,
    draggingItem,
    selectedWidget,
  } = useAppSelector((state) => state.layoutsSlice);
  const dispatch = useAppDispatch();

  const escFunction = useCallback((event: { key: string }) => {
    if (event.key === "Escape") {
      setResizePointer(null);
      dispatch(setSelectedWidget(null));
    }
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [escFunction]);

  const handleDrop = (event:any) => {
    if (draggingItem) {
      dispatch(
        onDropAndAdd({
          x: event.nativeEvent.layerX,
          y: event.nativeEvent.layerY,
        })
      );
    } else if (cursorPosition) {
      const x = cursorPosition.x + (event.clientX - cursorPosition.clientX);
      const y = cursorPosition.y + (event.clientY - cursorPosition.clientY);
      dispatch(updatePosition({ id: cursorPosition.id, x, y }));
    } else if (resizePointer) {
      dispatch(
        updatePosition({
          id: resizePointer.id,
          x: resizePointer.x,
          y: resizePointer.y,
          height: resizePointer.height,
          width: resizePointer.width,
        })
      );
      setResizePointer(null);
      dispatch(
        setSelectedWidget({
          id: resizePointer.id,
          height: resizePointer.height,
          width: resizePointer.width,
        })
      );
    }
  };
  const playgroundDataMemo = useMemo(() => {
    return playgroundData.length > 0 ? playgroundData[selectedScreen].data : [];
  }, [playgroundData, selectedScreen]);

  const handleDragOver = (event:any) => {
    event.preventDefault();
    if (resizePointer && selectedWidget) {
      if (resizePointer.position === "bottomright") {
        const width =
          selectedWidget.width + (event.clientX - resizePointer.clientX);
        const height =
          selectedWidget.height + (event.clientY - resizePointer.clientY);
        setResizePointer({
          ...resizePointer,
          width,
          height,
        });
      }
    }
  };

  const handleDragLeave = () => {
    if (resizePointer) {
      dispatch(
        updatePosition({
          id: resizePointer.id,
          x: resizePointer.x,
          y: resizePointer.y,
          height: resizePointer.height,
          width: resizePointer.width,
        })
      );
      setResizePointer(null);
      dispatch(
        setSelectedWidget({
          id: resizePointer.id,
          height: resizePointer.height,
          width: resizePointer.width,
        })
      );
    }
  };
  const handleAddNewScreen = () => {
    document.addEventListener("keydown", escFunction, false);
    dispatch(addLayoutScreen());
  };
  const handleRemoveScreen = (index: number) => {
    dispatch(removeLayoutScreen(index));
  };
  const setWidth = (type: number) => {
    const width = type >= 730 ? 731 : type;
    return width;
  };
  const setHeight = (type: number) => {
    const height = 411;
    return height;
  };
  const handleSetSelectedScreen = (index: number) => {
    dispatch(setSelectedSreen(index));
  };
  const getWidgetImage = (url: string) => {
    for (const key in thumbnails) {
      if (url.includes(key)) {
        return thumbnails[key];
      }
    }
    return cardLayoutPlacedHolderImage;
  };
 

  return (
    <Box
      sx={{
        minHeight: "100%",
        overflow: "auto",
        width: "53vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          width: `${playgroundData[selectedScreen].containerDimensions.width}px`,
          height: `${playgroundData[selectedScreen].containerDimensions.height}px`,
          backgroundColor: "white",
          m: "5px",
        }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {playgroundDataMemo.map((item, index) => {
          const thumb =
            item.data.type === "widget" ? getWidgetImage(item.data.path??"") : item.data.path;
          return (
            <ResizableBox
              key={item.id}
              bounds="parent"
              size={{ width: item.width, height: item.height }}
              position={{ x: item.x, y: item.y }}
              minWidth={100}
              minHeight={100}
              maxWidth={
                playgroundData[selectedScreen].containerDimensions.width
              }
              maxHeight={
                playgroundData[selectedScreen].containerDimensions.height
              }
              onDragStart={() => {
                dispatch(
                  setSelectedWidget({
                    id: item.id,
                    height: item.height,
                    width: item.width,
                  })
                );
              }}
              onDragStop={(e, data) => {
                setCursorPosition({
                  clientX: data.x,
                  clientY: data.y,
                  id: item.id,
                  x: data.x,
                  y: data.y,
                });
                dispatch(updatePosition({ id: item.id, x: data.x, y: data.y }));
              }}
              disableDragging={
                resizeProperties.index === index && resizeProperties.isResizing
              }
              onResizeStop={(e, direction, ref, delta, position) => {
                setResizingProperties({
                  ...resizeProperties,
                  index: index,
                  isResizing: false,
                });
                dispatch(
                  setSelectedWidget({
                    id: item.id,
                    height: parseFloat(ref.style.height),
                    width: parseFloat(ref.style.width),
                  })
                );
                dispatch(
                  updatePosition({
                    id: item.id,
                    x: position.x,
                    y: position.y,
                    height: parseFloat(ref.style.height),
                    width: parseFloat(ref.style.width),
                  })
                );
                setResizePointer(null);
              }}
              onResizeStart={() => {
                setResizingProperties({
                  ...resizeProperties,
                  index: index,
                  isResizing: true,
                });
              }}
              style={{
                position: "absolute",
                cursor: "pointer",
                border: selectedWidget?.id === item.id?`1px solid ${colors.inkBlue}`:"0px",
              }}
              resizeHandleClasses={{
                bottomRight: "custom-resize-handle",
              }}
            >
              {item.data.type === "video/mp4" ? (
                <Box
                  sx={{
                    height: "100%",
                    width: "100%",
                    position: "relative",
                    bgcolor: "black",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box
                    component={"video"}
                    src={item.data.path}
                    sx={{
                      width: "100%",
                    }}
                  />
                </Box>
              ) : (
                <Box
                  component="img"
                  src={thumb}
                  onError={handleCardLayoutPlaceHolder}
                  draggable={false}
                  sx={{
                    height: "100%",
                    width: "100%",
                    position: "relative",
                  }}
                />
              )}
              {selectedWidget?.id === item.id && (
                <>
                  <span
                    className="custom-resize-handle"
                    style={{
                      cursor: "nwse-resize",
                      position: "absolute",
                      bottom: "-13px",
                      right: "-13px",
                      width: "16px",
                      height: "16px",
                      backgroundColor: "rgba(255,255,255,0.5)",
                      borderRadius: "50%",
                      border: `1.5px solid ${colors.inkBlue}`,
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setResizingProperties({
                        ...resizeProperties,
                        index: index,
                        isResizing: true,
                      });
                    }}
                  />
                  <span
                    className="custom-resize-handle"
                    style={{
                      cursor: "nwse-resize",
                      position: "absolute",
                      bottom: "-13px",
                      left: "-7px",
                      width: "16px",
                      height: "16px",
                      borderRadius: "50%",
                      backgroundColor: "rgba(255,255,255,0.5)",
                      border: `1.5px solid ${colors.inkBlue}`,
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setResizingProperties({
                        ...resizeProperties,
                        index: index,
                        isResizing: true,
                      });
                    }}
                  />
                  <span
                    className="custom-resize-handle"
                    style={{
                      cursor: "nwse-resize",
                      position: "absolute",
                      top: "-7px",
                      right: "-13px",
                      width: "16px",
                      height: "16px",
                      backgroundColor: "rgba(255,255,255,0.5)",
                      borderRadius: "50%",
                      border: `1.5px solid ${colors.inkBlue}`,
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setResizingProperties({
                        ...resizeProperties,
                        index: index,
                        isResizing: true,
                      });
                    }}
                  />
                  <span
                    className="custom-resize-handle"
                    style={{
                      cursor: "nwse-resize",
                      position: "absolute",
                      top: "-8px",
                      left: "-8px",
                      width: "16px",
                      height: "16px",
                      backgroundColor: "rgba(255,255,255,0.5)",
                      borderRadius: "50%",
                      border: `1.5px solid ${colors.inkBlue}`,
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setResizingProperties({
                        ...resizeProperties,
                        index: index,
                        isResizing: true,
                      });
                    }}
                  />
                </>
              )}

              {item.zoneData.length > 0 &&
                (() => {
                  return (
                    <Box
                      sx={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        height: "100%",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        background: "rgba(0,0,0,0.4)",
                        pointerEvents: "none",
                      }}
                    >
                      <Typography sx={{ color: "#fff", fontSize: 26 }}>
                        {item.zoneData.length}+
                      </Typography>
                    </Box>
                  );
                })()}
            </ResizableBox>
          );
        })}
      </Box>

      {/* {previewEnabled && renderPreviewPresentation()} */}
      <Box
        sx={{
          minHeight: 70,
          maxHeight: 80,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            overflowX: "auto",
            display: "flex",
            flexDirection: "row",
            height: "100%",
            justifyContent: "center",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            "-ms-overflow-style": "none",
            "scrollbar-width": "none",
            gap: 2,
            padding: 2,
            flexWrap: "wrap",
          }}
        >
          {playgroundData.map((layoutItem, index) => (
            <Box
              onClick={() =>
                selectedScreen !== index && handleSetSelectedScreen(index)
              }
              sx={{
                position: "relative",
                backgroundColor: "#E6EDFA",
                height: "70px",
                width: "100px",
                borderRadius: 2,
                display: "flex",
                cursor: "pointer",
                border:
                  index === selectedScreen
                    ? `3px solid ${colors.inkBlue}`
                    : `3px solid ${colors.lightBlack}`,
              }}
              key={index}
            >
              <Box
                sx={{
                  position: "relative",
                  overflow: "hidden",
                  backgroundColor: "white",
                  width: `${
                    setWidth(layoutItem.containerDimensions.width) / 6
                  }px`,
                  height: `${
                    setHeight(layoutItem.containerDimensions.height) / 6
                  }px`,
                  marginLeft: "auto",
                  marginRight: "auto",
                  borderRadius: layoutItem.isVertical ? 0 : 2,
                }}
              >
                {layoutItem.data.map((item) => {
                  const thumb =
                    item.data.type === "widget"
                      ? getWidgetImage(item.data.path??"")
                      : item.data.path;
                  return (
                    <React.Fragment key={item.id}>
                      <Box
                        sx={{
                          position: "absolute",
                          left: item.x / 6,
                          top: item.y / 6,
                          height: item.height / 6,
                          width: item.width / 6,
                        }}
                      >
                        {item.data.type === "video/mp4" ? (
                          <Box
                            component="video"
                            src={item.data.path}
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
                            src={thumb}
                            draggable={false}
                            sx={{
                              height: "100%",
                              width: "100%",
                              position: "relative",
                            }}
                          />
                        )}
                      </Box>
                      {item.zoneData.length > 0 && (
                        <Box
                          sx={{
                            position: "absolute",
                            left: item.x / 6,
                            top: item.y / 6,
                            height: item.height / 6,
                            width: item.width / 6,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            background: "rgba(0,0,0,0.4)",
                            pointerEvents: "none",
                          }}
                        >
                          <Typography sx={{ color: "#fff", fontSize: 26 / 6 }}>
                            {item.zoneData.length}+
                          </Typography>
                        </Box>
                      )}
                    </React.Fragment>
                  );
                })}
              </Box>
              {selectedScreen === index && playgroundData.length > 1 && (
                <Box
                  onClick={() => handleRemoveScreen(index)}
                  sx={{
                    position: "absolute",
                    right: 1,
                    height: "12px",
                    width: "12px",
                    borderRadius: "50px",
                    backgroundColor: "red",
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                    padding: "3px",
                    marginLeft: "auto",
                    cursor: "pointer",
                    marginTop: 0.1,
                    marginRight: 0.1,
                  }}
                >
                  <CloseIcon
                    sx={{
                      color: "white",
                      fontSize: 14,
                    }}
                  />
                </Box>
              )}
            </Box>
          ))}
          <Box
            sx={{
              height: "70px",
              width: "100px",
              borderRadius: 2,
              backgroundColor: colors.blueChalk,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: `3px solid ${colors.blueChalk}`,
            }}
          >
            <Box
              sx={{
                backgroundColor: "#E6EDFA",
                height: "100%",
                width: "100%",
                borderRadius: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                onClick={handleAddNewScreen}
                sx={{ height: "100%", width: "100%", borderRadius: 50 }}
              >
                <AddIcon sx={{ color: "#7E7E7E" }} />
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PlaylistPlayground;
