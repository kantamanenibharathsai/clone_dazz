import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import {
  Box,
  Card,
  CardContent,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { colors } from "../../../config/theme";
import { CustomButton } from "./../../common/customButton/CustomButton";
import { styles } from "./ReportStyles";
interface DataPoint {
  name: string;
  uv: number;
  pv: number;
  amt: number;
}

export const data: DataPoint[] = [
  {
    name: "Jan",
    uv: 6000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Feb",
    uv: 8210,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Mar",
    uv: 12290,
    pv: 9800,
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
    uv: 19190,
    pv: 3800,
    amt: 1500,
  },
  {
    name: "Jul",
    uv: 11000,
    pv: 1600,
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
    pv: 1600,
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
    pv: 1600,
    amt: 16000,
  },
  {
    name: "Dec",
    uv: 21000,
    pv: 1600,
    amt: 21000,
  },
];

interface CustomTooltipProps {
  payload?: { value: number; name: string }[];
  active?: boolean;
}

interface IRevenueReport {
  title?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ payload, active }) => {
  if (active && payload && payload.length) {
    return (
      <Box>
        <Box sx={styles.customTooltip}>
          <Box>64,3664</Box>
        </Box>
        <Box sx={styles.positionContainer}></Box>
      </Box>
    );
  }
  return null;
};

const RevenueReportChart: React.FC<IRevenueReport> = ({ title }) => {
  const [age, setAge] = React.useState("2021");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };
  const minValue = Math.min(...data.map((d) => d.uv));
  const maxValue = Math.max(...data.map((d) => d.uv));

  const roundUpToNearest = (num: number, roundTo: number): number =>
    Math.ceil(num / roundTo) * roundTo;

  const roundedMinValue = Math.floor(minValue / 5000) * 5000;
  const roundedMaxValue = roundUpToNearest(maxValue, 5000);

  return (
    <Card sx={styles.revenueMainContainer}>
      <CardContent>
        <Box sx={styles.revenueSubContainer}>
          <Typography variant="body1" color="initial" sx={styles.title}>
            {title}
          </Typography>
          <Box sx={styles.selectFieldContainer}>
            <CustomButton
              bgcolor={colors.textFieldBg}
              sx={styles.exportButton}
              endIcon={<SystemUpdateAltIcon style={styles.exportIcon} />}
            >
              Export
            </CustomButton>
            <Box sx={styles.sortContainer}>
              <Box sx={styles.sortBox}>
                <Typography sx={styles.selectedYearText}>
                  Selected Year
                </Typography>
                <FormControl sx={styles.sortFormControl}>
                  <Select
                    value={age}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    sx={styles.selectField}
                  >
                    <MenuItem value="2024" sx={styles.menuItem}>
                      2024
                    </MenuItem>
                    <MenuItem value="2023" sx={styles.menuItem}>
                      2023
                    </MenuItem>
                    <MenuItem value="2022" sx={styles.menuItem}>
                      2022
                    </MenuItem>
                    <MenuItem value="2021" sx={styles.menuItem}>
                      2021
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box>
          <ResponsiveContainer width="100%" height={371}>
            <AreaChart
              width={550}
              height={400}
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 40,
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
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) =>
                  value.length === 4 ? value : value.slice(0, 3)
                }
              />
              <YAxis
                axisLine={false}
                tickLine={{
                  stroke: colors.chartTickLine,
                  strokeWidth: 0.5,
                }}
                tickFormatter={(tick) =>
                  tick >= 100000 ? tick / 100000 + "L" : tick / 1000 + "k"
                }
                domain={[roundedMinValue, roundedMaxValue]}
                tickCount={(roundedMaxValue - roundedMinValue) / 5000 + 1}
                tickMargin={60}
              />
              <Tooltip cursor={false} content={<CustomTooltip />} />
              <Area
                dataKey="uv"
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
        </Box>
      </CardContent>
    </Card>
  );
};

export default RevenueReportChart;
