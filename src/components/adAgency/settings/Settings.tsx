import { Box, Typography } from "@mui/material";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useState } from "react";
import { translate } from "../../../config/i18n";
import { settingsStyles } from "./SettingsStyles";
import Profile from "./profile/Profile";
import SettingsScreens from "./settingsScreens/SettingsScreens";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function TabPanel(props: Readonly<TabPanelProps>) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Box>
  );
}
const Settings = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Box pr={3}>
      <Box sx={settingsStyles.mainContainer}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="tabs example"
          allowScrollButtonsMobile={true}
          TabIndicatorProps={{
            style: {
              width: "50px",
              marginLeft: "12%",
            },
          }}
        >
          <Tab
            label={
              <Typography sx={settingsStyles.tabText}>
                {translate("adAgency.profile")}
              </Typography>
            }
            disableRipple
            disableFocusRipple
          />
          <Tab
            label={
              <Typography sx={settingsStyles.tabText}>
                {translate("adAgency.settings")}
              </Typography>
            }
            disableRipple
            disableFocusRipple
          />
        </Tabs>
      </Box>
      </Box>
      <TabPanel value={value} index={0}>
        <Profile />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SettingsScreens />
      </TabPanel>
    </Box>
  );
};

export default Settings;
