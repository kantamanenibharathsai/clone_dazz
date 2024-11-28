import { Box, Button, ListItemText } from "@mui/material";
import { useState } from "react";
import ProfileCard from "../../common/profileCard/ProfileCard";
import Logs from "./logs/Logs";
import { settingStyles } from "./SettingsStyles";
import SettingsScreens from "./settingsCards/SettingsScreens";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const tabs = ["Profile", "Logs", "Settings"];
const Settings = () => {
  const [tabNumber, setTabNumber] = useState(0);
  const { pagination } = useSelector((state: RootState) => state.logs.logs);
  const handleSetTab = (tabNum: number) => {
    setTabNumber(tabNum);
  };
  const tabJSX = () => {
    switch (tabNumber) {
      case 0:
        return <ProfileCard />;
      case 1:
        return <Logs />;
      case 2:
        return <SettingsScreens />;
    }
  };
  return (
    <Box>
      <Box sx={settingStyles.tabsMainBox}>
        <ListItemText
          primary={"Activity Logs"}
          secondary={`Total Logs - ${pagination?.totalItems}`}
          sx={settingStyles.listText(tabNumber)}
        />
        <Box sx={settingStyles.tabsBox}>
          {tabs.map((tab, index) => (
            <Button
              key={index}
              onClick={() => handleSetTab(index)}
              sx={settingStyles.button(tabNumber === index)}
            >
              {tab}
            </Button>
          ))}
        </Box>
      </Box>
      {tabJSX()}
    </Box>
  );
};

export default Settings;
