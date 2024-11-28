import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { colors, hex2rgba } from "../../../../config/theme";
import { getSuperAdminReports } from "../../../../redux/reducers/superAdmin/reportsDashboardSlice";
import { AppDispatch, RootState } from "../../../../redux/store";
import DashBoardIndicator from "../../../common/dashboardIndicator/DashBoardIndicator";
import { dashBoardData } from "./DashBoardData";
import { dashboardStyles } from "./DashboardStyle";

const Dashboard = () => {
  const { data, loading, error } = useSelector(
    (state: RootState) => state.ReportsDashboardSlice
  );
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getSuperAdminReports());
  }, [dispatch]);
  const getDataFromAPI = (title: string) => {
    const getValue = (value?: number | undefined, change?: string | undefined, icon?: string) => {
      return {
        value,
        percentage: change ? calculatePercentage(change) : undefined,
        icon: icon ? icon.slice(icon.indexOf("(") + 1, icon.indexOf(")")) : undefined,
      };
    };
    switch (title) {
      case "Users":
        return getValue(data?.numberOfUsers, data?.userChange, data?.userChange);
      case "Investors":
        return getValue(data?.numberOfInvestors, data?.investorChange, data?.investorChange);
      case "Hosts":
        return getValue(data?.numberOfHosts);
      case "Owners":
        return getValue(data?.numberOfAdmins, data?.adminChange, data?.adminChange);
      case "Teams":
        return getValue(data?.numberOfTeams, data?.teamChange, data?.teamChange);
      case "Total Screens":
        return getValue(data?.totalScreens);
      default:
        return { value: undefined, percentage: undefined, icon:undefined };
    }
  };
  const calculatePercentage = (change: string | undefined): number | undefined => {
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
                      eachData.id === dashBoardData.length - 6 ||
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

export default Dashboard;
