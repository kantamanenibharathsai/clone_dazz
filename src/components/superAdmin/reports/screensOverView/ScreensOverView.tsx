import FiberManualRecordRoundedIcon from "@mui/icons-material/FiberManualRecordRounded";
import { Box, Typography } from "@mui/material";
import { Cell, Pie, PieChart } from "recharts";
import { salesDetailsStyles } from "../salesDetails/SalesDetailsStyles";
import { screensOverViewStyles } from "./ScreensOverViewStyles";

const data = [
  { name: "User", value: 400 },
  { name: "Investors", value: 300 },
  { name: "Hosts", value: 300 },
  { name: "Owners", value: 200 },
];
const COLORS = ["#FF8E29", "#27D095", "#514EF3", "#DF0404"];

const ScreensOverView = () => {
  return (
    <Box sx={screensOverViewStyles.mainContainer} mt={5}>
      <Typography variant="body1" color="initial" sx={salesDetailsStyles.title}>
        Screens Overview
      </Typography>
      <Box sx={screensOverViewStyles.chartContainer} display="flex">
        <PieChart width={350} height={400}>
          <Pie
            data={data}
            cx={120}
            innerRadius={80}
            outerRadius={120}
            dataKey="value"
            strokeWidth={0}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "50%",
            gap: 2,
            pl: 2,
          }}
        >
          {data.map((entry, index) => (
            <Typography
              key={`detail-${index}`}
              sx={screensOverViewStyles.detailsContainer}
            >
              <Box sx={screensOverViewStyles.textContainer}>
                <FiberManualRecordRoundedIcon
                  sx={{ color: COLORS[index % COLORS.length] }}
                />{" "}
                {entry.name}
              </Box>
              <Typography>{`${((entry.value / 1000) * 100).toFixed(
                0
              )}%`}</Typography>
            </Typography>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ScreensOverView;
