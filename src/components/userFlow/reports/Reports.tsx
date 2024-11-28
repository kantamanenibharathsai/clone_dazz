import {
  Box,
  Card,
  CardContent,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { CalendarIcon } from "../assets/Index";
import { reportStyles } from "./ReportsStyles";
import RevenueReportGraph from "./RevenueReportGraph";

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];
const data = ["From Date *", "To Date *", "Select Screen"];

const Reports = () => {
  return (
    <Box>
      <Card sx={reportStyles.analyticalMainContainer}>
        <CardContent>
          <Typography variant="body1" color="initial" sx={reportStyles.title}>
            Analytical Reports
          </Typography>
          <Grid container spacing={3} sx={reportStyles.analyticalGridContainer}>
            {data.map((each: string) => (
              <Grid item xs={12} sm={6} md={4} key={each}>
                <Typography
                  variant="body1"
                  color="initial"
                  sx={reportStyles.dateText}
                >
                  {each}
                </Typography>
                {each === "Select Screen" ? (
                  <Select fullWidth sx={reportStyles.analyticalSelectField}>
                    {names.map((name) => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                ) : (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      slotProps={{
                        textField: { placeholder: "DD-MM-YYYY" },
                      }}
                      slots={{
                        openPickerIcon: CalendarIcon,
                      }}
                      disablePast
                      sx={reportStyles.datePicker}
                    />
                  </LocalizationProvider>
                )}
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
      <RevenueReportGraph title="Reports" />
    </Box>
  );
};

export default Reports;
