import {
  Box,
  CircularProgress,
  Grid,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { colors, fonts } from "../../../../config/theme";
import { getNetWorUptimeData } from "../../../../redux/reducers/adminReducers/netwrokUptimeSlice";
import { AppDispatch, RootState } from "../../../../redux/store";
import { networkStyles } from "./EditStyles";
import { screenViewStyles } from "./screenViewStyles";

interface DataPoint {
  name: string;
  uv: number;
  pv: number;
  amt: number;
}

export const dataMonth: DataPoint[] = [
  {
    name: "Jan",
    uv: 6000,
    pv: 400,
    amt: 2400,
  },
  {
    name: "Feb",
    uv: 8210,
    pv: 398,
    amt: 2210,
  },
  {
    name: "Mar",
    uv: 12290,
    pv: 800,
    amt: 2290,
  },
  {
    name: "Apr",
    uv: 8000,
    pv: 3908,
    amt: 8000,
  },
  {
    name: "May",
    uv: 19181,
    pv: 4800,
    amt: 19181,
  },
  {
    name: "Jun",
    uv: 9190,
    pv: 3800,
    amt: 1500,
  },
  {
    name: "Jul",
    uv: 11000,
    pv: 10600,
    amt: 11000,
  },
  {
    name: "Aug",
    uv: 20100,
    pv: 1600,
    amt: 20100,
  },
  {
    name: "Sep",
    uv: 8000,
    pv: 5600,
    amt: 8000,
  },
  {
    name: "Oct",
    uv: 5000,
    pv: 1600,
    amt: 5000,
  },
  {
    name: "Nov",
    uv: 16000,
    pv: 11600,
    amt: 16000,
  },
  {
    name: "Dec",
    uv: 21000,
    pv: 11600,
    amt: 21000,
  },
];

const tabsData = ["Day", "Week", "Month"];
const Network = () => {
  const [value, setValue] = useState("Day");
  const [percentage, setPercentage] = useState("Day");

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    setPercentage(newValue);
  };
  const { data, loading, error } = useSelector(
    (state: RootState) => state.NetworkUptime
  );
  const { selectedPlaylist } = useSelector(
    (state: RootState) => state.ScreensSlice
  );
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(
      getNetWorUptimeData({
        screenId: selectedPlaylist?.id,
        interval: percentage,
      })
    );
  }, [dispatch, percentage, selectedPlaylist?.id]);
  const totalCircumference = 2 * Math.PI * 140;
  const strokeDashoffset =
    totalCircumference -
    ((data?.uptimePercentage ?? 0) / 100) * totalCircumference;
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} lg={6}>
        <Box sx={networkStyles.chartContainer} display="flex">
          <Box
            sx={{
              ...screenViewStyles.header,
              mb: 2.5,
              px: "0px",
              height: "10px",
              "& .MuiButtonBase-root.MuiTab-root": {
                height: "0px",
                color: colors.black,
                textTransform: "none",
              },
              "& .MuiButtonBase-root.MuiTab-root.Mui-selected": {
                px: 1,
                color: colors.primary,
                fontWeight: 700,
              },
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
            >
              {tabsData.map((item) => (
                <Tab key={item} value={item} label={item} />
              ))}
            </Tabs>
          </Box>
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
          {!loading && !error && (
            <svg width="400" height="400" viewBox="0 0 400 400">
              <circle cx="200" cy="200" r="140" fill="#2a344f" />
              <g transform="rotate(-90 200 200)">
                <circle
                  r="140"
                  cx="200"
                  cy="200"
                  fill="transparent"
                  stroke="#f0f0f0"
                  strokeWidth="20"
                />
                <circle
                  r="140"
                  cx="200"
                  cy="200"
                  fill="transparent"
                  stroke={colors.activeColor}
                  strokeWidth="20"
                  strokeDasharray="878.4"
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  style={{ transition: "stroke-dashoffset 0.8s ease" }}
                />
              </g>
              <text
                x="200"
                y="200"
                fontSize="32"
                fill="white"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                <tspan
                  x="200"
                  dy="-10"
                  fontSize="18"
                  fontFamily={fonts.secondary}
                >
                  Network Uptime
                </tspan>
                <tspan
                  x="200"
                  dy="30"
                  fontSize="25"
                  fontFamily={fonts.secondary}
                >
                  {data?.uptimePercentage ?? 0}%
                </tspan>
              </text>
            </svg>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Network;
