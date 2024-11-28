import { Box, Typography } from "@mui/material";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { colors, hex2rgba } from "../../../config/theme";
import { updateActiveTab } from "../../../redux/reducers/superAdmin/teamsSlice";
import { useAppDispatch, useAppSelector } from "../../../utils/useRedux";
import GroupsScreen from "./GroupsScreen";
import MembersScreen from "./MembersScreen";
import NewMemberScreen from "./NewMemberScreen";
import PermissionsScreen from "./PermissionScreen";
import { teamStyles } from "./TeamStyles";

const tabsData = ["Groups", "Members", "New Member", "Permissions"];

const Teams = () => {
  const { activeTab } = useAppSelector((state) => state.TeamsSlice);
  const dispatch = useAppDispatch();
  const { selectedGroupId } = useAppSelector((state) => state.TeamsSlice);
  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    if (selectedGroupId) dispatch(updateActiveTab(newValue));
  };

  const renderSuitableView = () => {
    switch (activeTab) {
      case 0:
        return <GroupsScreen />;
      case 1:
        return <MembersScreen />;
      case 2:
        return <NewMemberScreen />;
      case 3:
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
                sx={{
                  color: selectedGroupId
                    ? colors.black
                    : hex2rgba(colors.black, 0.3),
                  cursor: selectedGroupId ? "pointer" : "not-allowed",
                }}
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
