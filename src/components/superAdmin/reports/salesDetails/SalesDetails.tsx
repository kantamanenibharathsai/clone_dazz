import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { colors, fonts } from "../../../../config/theme";
import { getSuperAdminSalesDetails } from "../../../../redux/reducers/superAdmin/SalesDetails";
import { AppDispatch, RootState } from "../../../../redux/store";
import { salesDetailsStyles } from "./SalesDetailsStyles";

interface CustomTooltipProps {
  payload?: { value: number; name: string }[];
  active?: boolean;
}

interface IRevenueReport {
  title?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ payload, active }) => {
  if (active && payload?.length) {
    return (
      <Box>
        <Box sx={salesDetailsStyles.customTooltip}>
          <Box>{payload[0].value.toLocaleString()}</Box>
        </Box>
        <Box sx={salesDetailsStyles.positionContainer}></Box>
      </Box>
    );
  }
  return null;
};

const SalesDetails: React.FC<IRevenueReport> = () => {
  const [year, setYear] = React.useState<number>(new Date().getFullYear());

  const { salesData, loading, error } = useSelector(
    (state: RootState) => state.SalesDetails
  );
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getSuperAdminSalesDetails({ year }));
  }, [dispatch, year]);

  const handleYearChange = (event: SelectChangeEvent<number>) => {
    setYear(Number(event.target.value));
  };

  return (
    <Card sx={salesDetailsStyles.revenueMainContainer}>
      <CardContent>
        <Box sx={salesDetailsStyles.revenueSubContainer}>
          <Typography
            variant="body1"
            color="initial"
            sx={salesDetailsStyles.title}
          >
            Sales Details
          </Typography>
          <Box sx={salesDetailsStyles.selectFieldContainer}>
            <FormControl sx={salesDetailsStyles.sortFormControl}>
              <Select
                value={year}
                onChange={handleYearChange}
                displayEmpty
                inputProps={{ "aria-label": "Select Year" }}
                sx={salesDetailsStyles.selectField}
              >
                <MenuItem value={2021}>2021</MenuItem>
                <MenuItem value={2022}>2022</MenuItem>
                <MenuItem value={2023}>2023</MenuItem>
                <MenuItem value={2024}>2024</MenuItem>
                <MenuItem value={2025}>2025</MenuItem>
                <MenuItem value={2026}>2026</MenuItem>
                <MenuItem value={2027}>2027</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Box>
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
            <ResponsiveContainer width="100%" height={371}>
              <AreaChart
                width={550}
                height={400}
                data={salesData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <defs>
                  <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={colors.chartStopColor} />
                    <stop offset="100%" stopColor={colors.white} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="monthName"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontFamily: fonts.primary }}
                  tickFormatter={(value) =>
                    value.length === 4 ? value : value.slice(0, 3)
                  }
                />
                <YAxis
                  axisLine={false}
                  tick={{ fontFamily: fonts.primary, fontSize: "14px" }}
                  tickLine={{
                    stroke: colors.chartTickLine,
                    strokeWidth: 0.5,
                  }}
                  tickFormatter={(tick) =>
                    tick >= 100000 ? tick / 100000 + "L" : tick / 1000 + "k"
                  }
                  tickMargin={30}
                />
                <Tooltip cursor={false} content={<CustomTooltip />} />
                <Area
                  dataKey="revenue"
                  stroke={colors.chartStopColor}
                  fill="url(#colorPv)"
                  dot={{
                    stroke: colors.chartStopColor,
                    fill: colors.white,
                    strokeWidth: 6,
                  }}
                  activeDot={{ r: 6 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default SalesDetails;
