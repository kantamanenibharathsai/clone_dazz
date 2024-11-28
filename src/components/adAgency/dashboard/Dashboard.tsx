import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { colors, hex2rgba } from "../../../config/theme";
import DashBoardIndicator from "../../common/dashboardIndicator/DashBoardIndicator";
import { dashBoardData } from "./DashBoardData";
import { dashboardStyles } from "./DashboardStyle";
import { translate } from "../../../config/i18n";
import { FunctionComponent, useEffect } from "react";
import MyScreenLocations from "../../common/myScreenLocations/MyScreenLocations";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { getUserDashboardData } from "../../../redux/reducers/userReducers/dashboardSlice";


const Dashboard = () => {
  const { data, loading, error } = useSelector(
    (state: RootState) => state.UserDashboardSlice
  );
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getUserDashboardData());
  }, [dispatch]);
  const getDataFromAPI = (title: string) => {
    const getValue = (value?: number | undefined | string, change?: string | undefined, icon?: string | undefined) => ({
      value: typeof value === 'string' ? parseFloat(value) || 0 : value ?? 0,
      percentage: change ? calculatePercentage(change) : undefined,
      icon: icon ? icon.slice(icon.indexOf("(") + 1, icon.indexOf(")")) : undefined,
    });
    switch (title) {
      case "Online Screens":
        return getValue(data?.onlineScreens, data?.onlineScreenChange, data?.onlineScreenChange);
      case "Offline Screens":
        return getValue(data?.offlineScreen, data?.offlineScreenChange, data?.offlineScreenChange);
      case "Total Screens":
        return getValue(data?.totalScreen); 
      case "Expected Income":
        return getValue(data?.expectedIncome, data?.expectedIncomeChange, data?.expectedIncomeChange);
      case "My Wallet":
        return getValue(data?.wallet);
      case "Commission":
        return getValue(data?.commission);
      default:
        return { value: undefined, percentage: undefined, icon:undefined};
    }
  };
  const calculatePercentage = (change?: string | undefined): number | undefined => {
    const parsedChange = parseFloat(change ?? "");
    return isNaN(parsedChange) ? undefined : parsedChange;
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
          !error && dashBoardData.map((eachData) => (
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
      <Box sx={dashboardStyles.mapContainer}>
        <Typography variant="h5">{translate("adAgency.myScreenLocation")}</Typography>
        <MyScreenLocations/> 
      </Box>
    </Box>
  );
};

export default Dashboard as FunctionComponent;
