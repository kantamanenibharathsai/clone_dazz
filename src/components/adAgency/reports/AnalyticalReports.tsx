import {
  Card,
  CardContent,
  Grid,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Theme,
  Typography,
  useTheme,
} from "@mui/material";
import Box from "@mui/material/Box";
import * as React from "react";
import { translate } from "../../../config/i18n";
import DatePickerComponent from "./DatePicker";
import { reportStyles } from "./ReportsStyles";

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
function getreportStyles(name: string, personName: string, theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const data = [
  translate("adAgency.fromDate"),
  translate("adAgency.toDate"),
  translate("adAgency.selectScreen"),
];
const AnalyticalReports = () => {
  const theme = useTheme();
  const [cleared, setCleared] = React.useState<boolean>(false);
  const [personName, setPersonName] = React.useState<string>("");

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(value);
  };
  React.useEffect(() => {
    if (cleared) {
      const timeout = setTimeout(() => {
        setCleared(false);
      }, 1500);

      return () => clearTimeout(timeout);
    }
    return () => {};
  }, [cleared]);

  return (
    <Card sx={reportStyles.analyticalMainContainer}>
      <CardContent>
        <Typography variant="body1" color="initial" sx={reportStyles.title}>
          {translate("adAgency.analyticalReports")}
        </Typography>
        <Grid
          container
          columnSpacing={3}
          sx={reportStyles.analyticalGridContainer}
        >
          {data.map((each: string) => (
            <Grid item lg={4} sm={4} key={each}>
              <Typography
                variant="body1"
                color="initial"
                sx={reportStyles.dateText}
              >
                {each}
              </Typography>
              {each === "Select Screen" ? (
                <Box>
                  <Select
                    displayEmpty
                    fullWidth
                    value={personName}
                    onChange={handleChange}
                    input={<OutlinedInput />}
                    sx={reportStyles.analyticalSelectField}
                    renderValue={(selected) => {
                      if (selected.length === 0) {
                        return (
                          <Typography
                            sx={reportStyles.analyticalSelectPlaceholder}
                          >
                            {translate("adAgency.choose")}
                          </Typography>
                        );
                      }

                      return selected;
                    }}
                    MenuProps={MenuProps}
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    {names.map((name) => (
                      <MenuItem
                        key={name}
                        value={name}
                        style={getreportStyles(name, personName, theme)}
                      >
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
              ) : (
                <DatePickerComponent />
              )}
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default AnalyticalReports;
