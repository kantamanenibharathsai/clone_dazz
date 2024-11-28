import { Box } from "@mui/material";
import AnalyticalReports from "./AnalyticalReports";
import ReportsBarGraph from "./ReportsBarGraph";
import RevenueReportChart from "./RevenueReports";

const Reports = () => {
  return (
    <Box mb={5}>
      <AnalyticalReports />
      <RevenueReportChart title="Revenue Reports" />
      <ReportsBarGraph title="Number Of Ads" labelX="Months" />
    </Box>
  );
};

export default Reports;
