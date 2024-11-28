import { Box } from "@mui/material";
import AnalyticalReports from "./AnalyticalReports";
import RevenueReportChart from "./RevenueReports";

const Reports = () => {
  return (
    <Box>
      <AnalyticalReports />
      <RevenueReportChart title="Revenue Reports" />
    </Box>
  );
};

export default Reports;
