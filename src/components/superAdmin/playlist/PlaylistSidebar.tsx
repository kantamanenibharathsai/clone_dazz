import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import MediaList from "./MediaList";
import { playlistStyles } from "./playlistStyles";
import WidgetList from "./WidgetList";

interface IProps {}

interface IState {
  activeTab: "media" | "widget" | "sequence";
  mediaActiveTab: number;
  openedWidget: null | string;
}

const PlaylistSidebar: React.FC<IProps> = () => {
  const [activeTab, setActiveTab] = useState<IState["activeTab"]>("media");
  return (
    <Box
      sx={{
        backgroundColor: "white",
        height: "100%",
        width: "25vw",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={playlistStyles.customContainer}>
        <Box sx={playlistStyles.customButtonContainer}>
          <Button
            onClick={() => setActiveTab("media")}
            sx={playlistStyles.layoutButtonSide("#0EC5EA")}
          >
            Media
          </Button>
          <Button
            sx={playlistStyles.layoutButtonSide("#0C6DFB")}
            onClick={() => setActiveTab("widget")}
          >
            Widgets
          </Button>
          <Button
            sx={playlistStyles.layoutButtonSide("#16C098")}
            onClick={() => setActiveTab("sequence")}
          >
            Sequences
          </Button>
        </Box>
      </Box>
      {activeTab === "media" && <MediaList />}
      {activeTab === "widget" && <WidgetList />}
      {activeTab === "sequence" && (
        <Typography
          variant="body1"
          color="initial"
          sx={{ textAlign: "center" }}
        >
          Coming soon...
        </Typography>
      )}
    </Box>
  );
};

export default PlaylistSidebar;
