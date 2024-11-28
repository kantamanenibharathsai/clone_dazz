import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { colors, hex2rgba } from "../../../config/theme";
import DashBoardIndicator from "../../common/dashboardIndicator/DashBoardIndicator";

import { expectedIncome, noOfAds, person, persons } from "../assets";
import { dashboardStyles } from "./DashBoardStyles";
import MyScreenLocations from "../../common/myScreenLocations/MyScreenLocations";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { useEffect } from "react";
import { getHostDashboardData } from "../../../redux/reducers/hostReducers/dashboardSlice";

const Dashboard = () => {
  const { data, loading, error } = useSelector(
    (state: RootState) => state.HostDashboardSlice
  );
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getHostDashboardData());
  }, [dispatch]);
  const getDataFromAPI = (title: string) => {
    const getValue = (value?: number | undefined, change?: string | undefined, icon?: string) => {
      return {
        value: typeof value === 'string' ? parseFloat(value) || 0 : value ?? 0,
        percentage: change ? calculatePercentage(change) : undefined,
        icon: icon ? icon.slice(icon.indexOf("(") + 1, icon.indexOf(")")) : undefined,
      };
    };
    switch (title) {
      case "Online Screens":
        return getValue(data?.onlineScreens, data?.onlineScreenChange, data?.onlineScreenChange);
      case "Offline Screens":
        return getValue(data?.offlineScreens, data?.offlineScreenChange, data?.offlineScreenChange);
      case "No. of Ads":
        return getValue(data?.totalAds);
      case "Expected Income":
        return getValue(data?.expectedIncome, data?.expectedIncomeChange, data?.expectedIncomeChange);
      default:
        return { value: undefined, percentage: undefined, icon:undefined };
    }
  };
  const calculatePercentage = (change: string | undefined): number | undefined => {
    const parsedChange = parseFloat(change ?? "");
    return isNaN(parsedChange) ? undefined : parsedChange;
  };
  const screensData = [
    {
      id: 1,
      img: persons,
      title: "Online Screens",
      value: 145,
      percentage: 15,
      percentageLabel: "this month",
    },
    {
      id: 2,
      img: person,
      title: "Offline Screens",
      value: 145,
      percentage: 15,
      percentageLabel: "this month",
    },
    {
      id: 3,
      img: noOfAds,
      title: "No. of Ads",
      value: 145,
      percentage: 15,
      percentageLabel: "this month",
    },
    {
      id: 4,
      img: expectedIncome,
      title: "Expected Income",
      value: 145,
      percentage: 15,
      percentageLabel: "this month",
    },
  ];
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
          !error && screensData.map((eachData) => (
          <Grid
            item
            key={eachData.id}
            xs={12}
            sm={6}
            lg={4}
            padding={{ xs: 3.5, lg: 2, xl: 3.5 }}
          >
            <DashBoardIndicator
              title={eachData.title}
              value={getDataFromAPI(eachData.title).value}
              image={eachData.img}
              percentage={getDataFromAPI(eachData.title).percentage}
              icon={getDataFromAPI(eachData.title).icon}
              styles={{
                borderRight: {
                  xs: "none",
                  sm: `1px solid ${
                    eachData.id === screensData.length ||
                    eachData.id === screensData.length - 2 ||
                    eachData.id === screensData.length - 4
                      ? "transparent"
                      : hex2rgba(colors.black, 0.1)
                  }`,
                  lg: `1px solid ${
                    eachData.id === screensData.length ||
                    eachData.id === screensData.length - 3
                      ? "transparent"
                      : hex2rgba(colors.black, 0.1)
                  }`,
                  xl: `1px solid ${
                    eachData.id === screensData.length - 1 ||
                    eachData.id === screensData.length
                      ? "transparent"
                      : hex2rgba(colors.black, 0.1)
                  }`,
                },
              }}
            />
          </Grid>
        ))}
      </Grid>
      <Box sx={dashboardStyles.mapContainer}>
        <Typography variant="h5">My Screen Locations</Typography>
        <MyScreenLocations/>
      </Box>
    </Box>
  );
};

export default Dashboard;
