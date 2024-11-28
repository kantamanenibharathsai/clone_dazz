import { Box, CircularProgress, Grid, SxProps, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getLayoutWidgets } from "../../../redux/reducers/layoutsReducer/layouts";
import { IWidget } from "../../../redux/reducers/superAdmin/WidgetsSlice";
import { useAppDispatch, useAppSelector } from "../../../utils/useRedux";
import WidgetItemList from "./WidgetItemList";
import { playlistStyles } from "./playlistStyles";
import { handleCardLayoutPlaceHolder } from "../../../utils/utils";

interface IProps {}

interface IState {
  selectedWidget: IWidget | null;
}

const WidgetList: React.FC<IProps> = () => {
  const [selectedWidget, setSelectedWidget] =
    useState<IState["selectedWidget"]>(null);
  const { widgets, loading ,message } = useAppSelector((state) => state.layoutsSlice);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getLayoutWidgets());
  }, []);// eslint-disable-line
  return (
    
      <Grid container rowSpacing={2} columnSpacing={3} sx={styles.container}>
        {(() => {
          switch (true) {
            case !!selectedWidget?.id:
              return (
                <WidgetItemList
                  selectedWidget={selectedWidget}
                  onGoBack={() => setSelectedWidget(null)}
                />
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
              case !!message:
              return (
                <Grid
                  item
                  xs={12}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                <Typography sx={playlistStyles.errorMsg}>{message}</Typography>
                </Grid>
              );

            default:
              return widgets.map((item, index) => (
                <Grid
                  key={index}
                  item
                  xs={6}
                  onClick={() => setSelectedWidget(item)}
                >
                  <Box sx={styles.widget}>
                    <Box
                      draggable={false}
                      component="img"
                      onError={handleCardLayoutPlaceHolder}
                      sx={styles.widgetImage}
                      alt="Draggable Item"
                      src={item.widgetImage}
                    />
                  </Box>
                </Grid>
              ));
          }
        })()}
      </Grid>
    
  );
};

const styles = {
  container: {
    overflow: "auto",
    minHeight: "20vh",
    maxHeight: "75vh",
    px: "10px",
  },
  widget: {
    cursor: "pointer",
    position: "relative",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  widgetImage: {
    height: "100%",
    width: "100%",
    objectFit: "cover",
    borderRadius: "10px",
  },
} satisfies Record<string, SxProps>;

export default WidgetList;
