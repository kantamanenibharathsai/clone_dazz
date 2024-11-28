import { Box, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import Additional from "./Additional";
import Configuration from "./Configuration";
import Files from "./Files";
import Media from "./Media";
import Network from "./Network";
import Settings from "./Settings";
import { screenViewStyles } from "./screenViewStyles";
import { useAppDispatch } from "../../../../utils/useRedux";
import { resetSlice } from "../../../../redux/reducers/adminReducers/configurationSlice";

const tabsData = [
  "Media",
  "Configuration",
  "Files",
  "Network Uptime",
  "Additional Info",
  "Settings",
];
const ScreenView = () => {
  const [value, setValue] = useState("Media");
  const dispatch=useAppDispatch();
  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const renderTab = () => {
    switch (value) {
      case "Media":
        return <Media />;
      case "Configuration":
        return <Configuration />;
      case "Files":
        return <Files />;
      case "Network Uptime":
        return <Network />;
      case "Additional Info":
        return <Additional />;
      case "Settings":
      return <Settings />;
    }
  };
  useEffect(()=>{
    dispatch(resetSlice());
  },[dispatch])
  return (
    <Box>
      <Box sx={screenViewStyles.header}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {tabsData.map((item) => (
            <Tab value={item} label={item} />
          ))}
        </Tabs>
      </Box>
      {renderTab()}
    </Box>
  );
};

export default ScreenView;
