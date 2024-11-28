import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { colors, hex2rgba } from "../../../config/theme";
import DashBoardIndicator from "../../common/dashboardIndicator/DashBoardIndicator";

import { bag, persons } from "../assets";
import { dashboardStyles } from "./DashBoardStyles";
import MyQrcodes from "./MyQrcodes";
import { useEffect, useState } from "react";
import { getVendorStats } from "../../../redux/reducers/vendorsReducer/vendors";
import { useAppSelector, useAppDispatch } from "../../../utils/useRedux";
import { logsStyles } from "../payments/PaymentsStyles";

const Dashboard = () => {
  const [screensData, setScreensData] = useState([
    {
      id: 1,
      img: persons,
      title: "Total Scans",
      value: 350,
    },
    {
      id: 2,
      img: bag,
      title: "My Wallet",
      value: 145,
    },
  ]);
  const { data, loadingStatus } = useAppSelector((state) => state.vendor.stats);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getVendorStats());
  }, [dispatch]);
  useEffect(() => {
    if (loadingStatus === "FULFILLED") {
      const newScansData = [...screensData];
      newScansData[0].value = data?.totalScans! ?? 0;
      newScansData[1].value = data?.wallet! ?? 0;
      setScreensData(newScansData);
    }
    // eslint-disable-next-line
  }, [loadingStatus]);
  return (
    <Box>
      <Grid container sx={dashboardStyles.mainContainer}>
        {loadingStatus === "PENDING" ? (
          <Grid item xs={12} textAlign={"center"}>
            <CircularProgress sx={{ color: colors.primary }} />
          </Grid>
        ) : loadingStatus === "FULFILLED" ? (
          <>
            {screensData.map((eachData) => (
              <Grid
                item
                key={eachData.id}
                xs={12}
                sm={6}
                lg={4}
                xl={3}
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
                        eachData.id === screensData.length - 3
                          ? "transparent"
                          : hex2rgba(colors.black, 0.1)
                      }`,
                      xl: `1px solid ${
                        eachData.id === screensData.length - 2 ||
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
      <MyQrcodes />
    </Box>
  );
};

export default Dashboard;
