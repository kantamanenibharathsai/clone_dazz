import { Box, Typography } from "@mui/material";
import React from "react";
import {
  Area,
  AreaChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import { colors, fonts } from "../../../../config/theme";
import { salesDetailsStyles } from "../salesDetails/SalesDetailsStyles";
import { qrCodeStyles } from "./QrCodesStyles";

interface DataPoint {
  name: string;
  uv: number;
  pv?: number;
  amt?: number;
}

export const data: DataPoint[] = [
  {
    name: "Mon",
    uv: 6000,
  },
  {
    name: "Tue",
    uv: 8210,
  },
  {
    name: "Wed",
    uv: 12290,
  },
  {
    name: "Thu",
    uv: 8000,
  },
  {
    name: "Fri",
    uv: 19181,
  },
  {
    name: "Sat",
    uv: 19190,
  },
];

interface CustomTooltipProps {
  payload?: { value: number; name: string }[];
  active?: boolean;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ payload, active }) => {
  if (active && payload && payload.length) {
    return (
      <Box>
        <Box sx={qrCodeStyles.customTooltip}>
          <Box>64,3664</Box>
        </Box>
      </Box>
    );
  }
  return null;
};
interface CustomTickProps {
  x?: number;
  y?: number;
  payload?: { value: string };
}
const CustomTick: React.FC<CustomTickProps> = ({ x, y, payload }) => {
  if (!payload) return null;
  let newX = x! + 18;
  let newY = y! - 30;
  return (
    <g transform={`translate(${newX},${newY})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fill={colors.black}
        opacity={0.5}
        fontFamily={fonts.secondary}
      >
        {payload.value}
      </text>
      <text
        x={-6}
        y={15}
        dy={16}
        fontSize={12}
        fontWeight={500}
        textAnchor="end"
        fill={colors.black}
        opacity={0.7}
        fontFamily={fonts.secondary}
      >
        {Math.ceil(Math.random() * 10)}
      </text>
    </g>
  );
};

const QrCodes = () => {
  return (
    <Box sx={qrCodeStyles.mainContainer} mt={5}>
      <Typography variant="body1" color="initial" sx={salesDetailsStyles.title}>
        QR Codes
      </Typography>
      <ResponsiveContainer width="100%" height={371}>
        <AreaChart
          width={550}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 20,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="100%" stopColor="#314CFF" />
              <stop offset="0%" stopColor="#D9D9D90%" />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={<CustomTick />}
            orientation="top"
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="uv"
            fill="url(#colorPv)"
            strokeWidth={8}
            stroke="#314CFF"
            activeDot={{ r: 8 }}
          />
          {data.map((entry, index) => (
            <ReferenceLine
              key={index}
              segment={[
                { x: entry.name, y: 0 },
                { x: entry.name, y: entry.uv },
              ]}
              stroke="#666"
              strokeDasharray="5 4"
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default QrCodes;
