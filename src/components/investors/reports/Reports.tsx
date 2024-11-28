import { Box } from "@mui/material";
import AnalyticalReports from "./AnalyticalReports";
import ReportsBarGraph from "./ReportsBarGraph";
import RevenueReportChart from "./RevenueReports";

const Reports = () => {
  return (
    <Box>
      <AnalyticalReports />
      <RevenueReportChart title="Revenue Reports" />
      <RevenueReportChart title="Network Uptime" />
      <ReportsBarGraph
        title="Investment Reports"
        labelX="Accumulated Income"
        subTitle="Investment"
      />
      <ReportsBarGraph
        title="Expected ROI"
        labelX="Months"
        subTitle="Investment Amount"
      />
    </Box>
  );
};

export default Reports;
