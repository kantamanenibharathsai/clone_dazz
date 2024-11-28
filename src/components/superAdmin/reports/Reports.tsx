import { Box } from "@mui/material";
import Dashboard from "./dashBoard/Dashboard";
import QrCodes from "./qrCodes/QrCodes";
import SalesDetails from "./salesDetails/SalesDetails";
import ScreensOverView from "./screensOverView/ScreensOverView";

const Reports = () => {
  return (
    <Box>
      <Dashboard />
      <SalesDetails />
      <Box display={"flex"} flexDirection={{ xs: "column", lg: "row" }} gap={5}>
        <QrCodes />
        <ScreensOverView />
      </Box>
    </Box>
  );
};

export default Reports;
