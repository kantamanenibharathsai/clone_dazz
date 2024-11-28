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
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import { colors } from "../../../config/theme";
import { salesGraphStyles, styles } from "./ReportStyles";
import { data } from "./RevenueReports";

export const DataFormater = (number: number) => {
  switch (true) {
    case number > 1000000000:
      return (number / 1000000000).toString() + "B";
    case number > 1000000:
      return (number / 1000000).toString() + "M";
    case number > 100000:
      return (number / 100000).toString() + "L";
    case number > 1000:
      return (number / 1000).toString() + "k";
    default: {
      return number.toString();
    }
  }
};

const SalesCustomTooltip = ({
  payload,
  active,
}: TooltipProps<ValueType, NameType>) => {
  if (active) {
    return (
      <Box sx={salesGraphStyles.customToolTip}>
        <Typography sx={salesGraphStyles.salesGraphNameText}>{`${
          payload![0]?.payload?.name
        }`}</Typography>
        <Typography sx={salesGraphStyles.salesGraphText}>
          Sales: {`${payload![0]?.payload?.uv}`}
        </Typography>
      </Box>
    );
  }
  return null;
};

interface IRevenueReport {
  title?: string;
  labelX?: string;
  subTitle?: string;
}

const ReportsBarGraph: React.FC<IRevenueReport> = ({
  title,
  labelX,
  subTitle,
}) => {
  const [age, setAge] = React.useState("2021");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  return (
    <Card sx={styles.revenueMainContainer}>
      <CardContent>
        <Box sx={styles.revenueSubContainer}>
          <Typography variant="body1" color="initial" sx={styles.title}>
            {title}
          </Typography>
          <Box sx={styles.selectFieldContainer}>
            
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
        <Box sx={salesGraphStyles.investmentContainer}>
          <Typography
            variant="body1"
            color="initial"
            sx={salesGraphStyles.subTitleText}
          >
            {subTitle}
          </Typography>
          <ResponsiveContainer width="100%" height={391}>
            <BarChart
              width={600}
              height={400}
              margin={salesGraphStyles.barChartMargins}
              data={data}
              barGap={0}
              barCategoryGap={0}
            >
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                style={salesGraphStyles.xAxisStyles}
                interval={0}
              />
              <YAxis
                orientation="left"
                tickLine={false}
                axisLine={false}
                tickFormatter={DataFormater}
                style={salesGraphStyles.xAxisStyles}
                tickMargin={45}
              />
              <Tooltip
                content={<SalesCustomTooltip />}
                cursor={{ fill: "transparent" }}
              />
              <CartesianGrid
                strokeDasharray="1 0"
                verticalCoordinatesGenerator={(props) =>
                  props.width > 250 ? [] : []
                }
              />
              <Bar
                dataKey="uv"
                fill={colors.chartStopColor}
                barSize={35}
                minPointSize={150}
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>

        <Typography
          variant="body1"
          color="initial"
          sx={salesGraphStyles.labelText}
        >
          {labelX}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ReportsBarGraph;
