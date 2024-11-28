import { Box, Typography } from "@mui/material";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { updateActiveTabInAdmin } from "../../../redux/reducers/adminReducers/teamSlice";
import { useAppDispatch, useAppSelector } from "../../../utils/useRedux";
import MembersScreen from "./MembersScreen";
import PermissionsScreen from "./PermissionScreen";
import { teamStyles } from "./TeamStyles";

const tabsData = ["Members", "Permissions"];
const Teams = () => {
  const { activeTab } = useAppSelector((state) => state.ATeamsSlice);
  const dispatch = useAppDispatch();
  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    dispatch(updateActiveTabInAdmin(newValue));
  };
  const renderSuitableView = () => {
    switch (activeTab) {
      case 0:
        return <MembersScreen />;
      case 1:
        return <PermissionsScreen />;
    }
  };
  return (
    <Box>
      <Box sx={teamStyles.subContainer}>
        <Typography variant="body1" color="initial" sx={teamStyles.title}>
          Your Team
        </Typography>
        <Box sx={teamStyles.mainContainer}>
          <Tabs
            value={activeTab}
            onChange={handleChange}
            aria-label="tabs example"
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
          >
            {tabsData.map((tab: string, index: number) => (
              <Tab
                key={tab}
                label={<Typography sx={teamStyles.tabText}>{tab}</Typography>}
                disableRipple
                disableFocusRipple
              />
            ))}
          </Tabs>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>{renderSuitableView()}</Box>
    </Box>
  );
};

export default Teams;
