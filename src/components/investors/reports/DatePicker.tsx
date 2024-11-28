import Box from "@mui/material/Box";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import * as React from "react";
import { calenderIcon } from "../assets/index";
interface IDatePicker {
  label?: string;
}

const DatePickerComponent: React.FC<IDatePicker> = ({ label }) => {
  const [cleared, setCleared] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (cleared) {
      const timeout = setTimeout(() => {
        setCleared(false);
      }, 1500);

      return () => clearTimeout(timeout);
    }
    return () => {};
  }, [cleared]);
  const getCalenderIcon = () => <Box component="img" src={calenderIcon} />;

  return (
    <Box>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box>
          <DemoItem>
            <DatePicker
              slotProps={{
                field: { clearable: true, onClear: () => setCleared(true) },
                textField: { placeholder: "DD-MM-YYYY" },
              }}
              slots={{
                openPickerIcon: getCalenderIcon,
              }}
              sx={{
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    border: `1px solid #E7E7E7`,
                  },
                "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                  {
                    border: `1px solid #E7E7E7`,
                  },
                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  border: `1px solid #E7E7E7`,
                },
              }}
            />
          </DemoItem>
        </Box>
      </LocalizationProvider>
    </Box>
  );
};

export default DatePickerComponent;
