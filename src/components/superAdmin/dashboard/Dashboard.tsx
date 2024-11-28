import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { FunctionComponent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { colors, hex2rgba } from "../../../config/theme";
import { getDashboardData } from "../../../redux/reducers/superAdmin/dashboardSlice";
import { AppDispatch, RootState } from "../../../redux/store";
import DashBoardIndicator from "../../common/dashboardIndicator/DashBoardIndicator";
import { dashBoardData } from "./DashBoardData";
import { dashboardStyles } from "./DashboardStyle";

const Dashboard = () => {
  const { data, loading, error } = useSelector(
    (state: RootState) => state.DashboardSlice
  );
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getDashboardData());
  }, [dispatch]);
  const getDataFromAPI = (title: string) => {
    const getValue = (value?: number, change?: string, icon?: string) => ({
      value: value ?? 0,
      percentage: change ? calculatePercentage(change) : undefined,
      icon: icon
        ? icon.slice(icon.indexOf("(") + 1, icon.indexOf(")"))
        : undefined,
    });
    switch (title) {
      case "Online Screens":
        return getValue(
          data?.onlineScreens,
          data?.onlineScreenChange,
          data?.onlineScreenChange
        );
      case "Offline Screens":
        return getValue(
          data?.offlineScreens,
          data?.offlineScreenChange,
          data?.offlineScreenChange
        );
      case "Total Screens":
        return getValue(data?.totalScreens);
      case "Number Of Admins":
        return getValue(data?.numberOfAdmins);
      case "Franchise Partners":
        return getValue(data?.franchisePartners);
      case "Vendors":
        return getValue(data?.totalVendors);
      case "Total Ad Agency":
        return getValue(data?.totalAdAgency);
      case "Payments to be Paid":
        return getValue(
          data?.totalAmountToBeReceived,
          data?.totalAmountChange,
          data?.totalAmountChange
        );
      case "Screens Licensed":
        return getValue(data?.screenLicence);
      case "Payments Received":
        return getValue(
          data?.totalAmountReceived,
          data?.totalAmountToReceive,
          data?.totalAmountToReceive
        );
      default:
        return { value: undefined, percentage: undefined, icon: undefined };
    }
  };
  const calculatePercentage = (change: string): number | undefined => {
    const parsedChange = parseFloat(change);
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
          !error &&
          dashBoardData.map((eachData) => (
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
                      eachData.id === dashBoardData.length - 4 ||
                      eachData.id === dashBoardData.length - 6 ||
                      eachData.id === dashBoardData.length - 8
                        ? "transparent"
                        : hex2rgba(colors.black, 0.1)
                    }`,
                    lg: `1px solid ${
                      eachData.id === dashBoardData.length ||
                      eachData.id === dashBoardData.length - 1 ||
                      eachData.id === dashBoardData.length - 4 ||
                      eachData.id === dashBoardData.length - 7
                        ? "transparent"
                        : hex2rgba(colors.black, 0.1)
                    }`,
                    xl: `1px solid ${
                      eachData.id === dashBoardData.length - 1 ||
                      eachData.id === dashBoardData.length - 4 ||
                      eachData.id === dashBoardData.length - 7 ||
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
