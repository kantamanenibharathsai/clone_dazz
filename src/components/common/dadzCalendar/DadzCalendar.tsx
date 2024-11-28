import { Box, SxProps, Typography } from "@mui/material";
import { ReactNode } from "react";
import Calendar, { CalendarProps } from "react-calendar";
import { fonts } from "../../../config/theme";
import { calendarStyles } from "./DadzCalendarStyles";

interface DadzCalendarProps {
  calendarPros: CalendarProps;
  boxStyle?: SxProps;
  textStyle?: SxProps;
  textToRender?: string | ReactNode;
}

export const DadzCalendar = ({
  boxStyle,
  calendarPros,
  textStyle,
  textToRender,
}: DadzCalendarProps) => {
  return (
    <Box boxSizing={"border-box"} sx={{ ...calendarStyles, ...boxStyle }}>
      {textToRender && (
        <Typography
          fontFamily={fonts.third}
          fontWeight={700}
          fontSize={19}
          mb={2}
          sx={{ ...textStyle }}
        >
          {textToRender}
        </Typography>
      )}
      <Calendar
        view={"month"}
        prev2Label={null}
        next2Label={null}
        selectRange
        minDate={new Date()}
        {...calendarPros}
        calendarType="hebrew"
        formatShortWeekday={(_, date) =>
          ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"][date.getDay()]
        }
      />
    </Box>
  );
};
