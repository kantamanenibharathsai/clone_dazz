import { Box, Button } from "@mui/material";
import { useState } from "react";
import ProfileCard from "../../common/profileCard/ProfileCard";
import SettingsScreens from "./settingsCards/SettingsScreens";
import { settingStyles } from "./settingsStyles";

const tabs = ["Profile", "Settings"];
const Settings = () => {
  const [tabNumber, setTabNumber] = useState(0);
  const handleSetTab = (tabNum: number) => {
    setTabNumber(tabNum);
  };
  const tabJSX = () => {
    switch (tabNumber) {
      case 0:
        return <ProfileCard />;
      case 1:
        return <SettingsScreens />;
    }
  };
  return (
    <Box>
      <Box sx={settingStyles.tabsMainBox}>
        <Box sx={settingStyles.tabsBox}>
          {tabs.map((tab, index) => (
            <Button
              onClick={() => handleSetTab(index)}
              sx={settingStyles.button(tabNumber === index)}
              key={index}
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
