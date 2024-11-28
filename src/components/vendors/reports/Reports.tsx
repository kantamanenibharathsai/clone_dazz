import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { colors, hex2rgba } from "../../../config/theme";
import DashBoardIndicator from "../../common/dashboardIndicator/DashBoardIndicator";
import { bag, persons } from "../assets";
import { dashboardStyles } from "../dashBoard/DashBoardStyles";
import { useAppDispatch, useAppSelector } from "../../../utils/useRedux";
import { useEffect, useState } from "react";
import { getVendorScans } from "../../../redux/reducers/vendorsReducer/vendors";
import { logsStyles } from "../payments/PaymentsStyles";

const Dashboard = () => {
  const [screensData, setScreensData] = useState([
    {
      id: 1,
      img: persons,
      title: "Total Scans",
      value: 145,
    },
    {
      id: 2,
      img: bag,
      title: "Payments Received",
      value: 145,
    },
    {
      id: 3,
      img: bag,
      title: "Expected Revenue",
      value: 145,
    },
    {
      id: 4,
      img: persons,
      title: "Scans Pending",
      value: 145,
    },
  ]);
  const { data, loadingStatus } = useAppSelector((state) => state.vendor.scans);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getVendorScans());
  }, [dispatch]);
  useEffect(() => {
    if (loadingStatus === "FULFILLED") {
      const newScansData = [...screensData];
      newScansData[0].value = data?.totalScans! ?? 0;
      newScansData[1].value = data?.paymentReceived! ?? 0;
      newScansData[2].value = data?.expectedRevenue! ?? 0;
      newScansData[3].value = data?.scansPending! ?? 0;
      setScreensData(newScansData);
    }
    // eslint-disable-next-line
  }, [loadingStatus]);
  return (
    <Box>
      <Grid container sx={dashboardStyles.mainContainer}>
        {loadingStatus === "PENDING" ? (
          <CircularProgress color="inherit" />
        ) : loadingStatus === "FULFILLED" ? (
          <>
            {screensData.map((eachData) => (
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
                  value={eachData.value}
                  image={eachData.img}
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
                        eachData.id === screensData.length - 1
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
          </>
        ) : (
          <Grid xs={12}>
            <Typography sx={logsStyles.loadingBox}>
              Something Went Wrong!!
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default Dashboard;
