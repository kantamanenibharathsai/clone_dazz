import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { colors, hex2rgba } from "../../../config/theme";
import { dashBoardData } from "../../adAgency/dashboard/DashBoardData";
import DashBoardIndicator from "../../common/dashboardIndicator/DashBoardIndicator";
import { ads, bag, monitor, profile, profileTick } from "../assets/Index";
import { dashboardStyles } from "./DashboardStyle";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { useEffect,FunctionComponent } from "react";
import { getUserDashboardData } from "../../../redux/reducers/userReducers/dashboardSlice";
const dummyData = [
  {
    id: 1,
    title: "Online Screens",
    img: profile,
    value: 15,
  },
  {
    id: 2,
    title: "Offline Screens",
    img: profileTick,
    value: 60,
  },
  {
    id: 3,
    title: "Total Screens",
    img: ads,
    value: 75,
  },
  {
    id: 4,
    title: "My Total Ads",
    img: monitor,
    value: 6,
  },
  {
    id: 5,
    title: "My Wallet",
    img: bag,
    value: 15200,
  },
];

const Dashboard = () => {
  const { data, loading, error } = useSelector(
    (state: RootState) => state.UserDashboardSlice
  );
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getUserDashboardData());
  }, [dispatch]);

  const getDataFromAPI = (title: string) => {
    const getValue = (value?: number) => ({
      value,
    });
    switch (title) {
      case "Online Screens":
        return getValue(data?.onlineScreens);
      case "Offline Screens":
        return getValue(data?.offlineScreen);
      case "Total Screens":
        return getValue(data?.totalScreen);
      case "My Total Ads":
        return getValue(data?.totalAds);
      case "My Wallet":
        return getValue(data?.wallet);
      default:
        return { value: undefined};
    }
  };
  return (
    <Box>
      <Grid container sx={dashboardStyles.mainContainer}>
      {loading && (
          <Grid
            item
            xs={12}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            padding={10}
          >
            <CircularProgress />
          </Grid>
        )}
        {error && (
          <Grid
            item
            xs={12}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            padding={10}
          >
            <Typography variant="h6" color="error">
              {error.toString()}
            </Typography>
          </Grid>
        )}
        {!loading &&
          !error && dummyData.map((eachData) => (
          <Grid item key={eachData.id} xs={12} sm={6} lg={4} padding={3.5}>
            <DashBoardIndicator
              title={eachData.title}
              value={getDataFromAPI(eachData.title).value}
              image={eachData.img}
              styles={{
                borderRight: {
                  xs: "none",
                  sm: `1px solid ${
                    eachData.id === dashBoardData.length ||
                    eachData.id === dashBoardData.length - 2 ||
                    eachData.id === dashBoardData.length - 4
                      ? "transparent"
                      : hex2rgba(colors.black, 0.1)
                  }`,
                  lg: `1px solid ${
                    eachData.id === dashBoardData.length ||
                    eachData.id === dashBoardData.length - 3
                      ? "transparent"
                      : hex2rgba(colors.black, 0.1)
                  }`,
                  xl: `1px solid ${
                    eachData.id === dashBoardData.length - 3 ||
                    eachData.id === dashBoardData.length
                      ? "transparent"
                      : hex2rgba(colors.black, 0.1)
                  }`,
                },
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard as FunctionComponent;
