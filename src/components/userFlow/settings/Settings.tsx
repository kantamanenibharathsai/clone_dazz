import { Box, Grid, Typography } from "@mui/material";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { updateUserSetting } from "../../../redux/reducers/userReducers/settingsSlice";
import { navigation } from "../../../utils/navigation";
import { useAppDispatch, useAppSelector } from "../../../utils/useRedux";
import ProfileCard from "../../common/profileCard/ProfileCard";
import SettingsCard from "../../common/settingsCard/SettingsCard";
import { generalSettingsData } from "./SettingsRoutes";
import { settingsStyles } from "./SettingsStyles";

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
  const dispatch = useAppDispatch();
  const { value } = useAppSelector((state) => state.UserSettingsSlice);
  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    dispatch(updateUserSetting(newValue));
  };

  const handleClickCard = (path: string) => {
    navigation.navigate(`/Settings/${path}`);
  };

  return (
    <Box>
      <Box>
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
                <Typography sx={settingsStyles.tabText}>Profile</Typography>
              }
              disableRipple
              disableFocusRipple
            />
            <Tab
              label={
                <Typography sx={settingsStyles.tabText}>Settings</Typography>
              }
              disableRipple
              disableFocusRipple
            />
          </Tabs>
        </Box>
      </Box>
      <TabPanel value={value} index={0}>
        <ProfileCard />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Grid container spacing={2}>
          {generalSettingsData.map((eachScreen) => (
            <Grid item xs={12} sm={6} lg={3} key={eachScreen.id}>
              <SettingsCard
                icon={eachScreen.icon}
                description={eachScreen.title}
                onClick={() => handleClickCard(eachScreen.path)}
              />
            </Grid>
          ))}
        </Grid>
      </TabPanel>
    </Box>
  );
};

export default Settings;
