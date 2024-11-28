import { Box } from "@mui/material";
import { translate } from "../../../config/i18n";
import AnalyticalReports from "./AnalyticalReports";
import RevenueReportChart from "./RevenueReports";

const Report = () => {
  return (
    <Box>
      <AnalyticalReports />
      <RevenueReportChart title={translate("adAgency.revenueReports")} />
      <RevenueReportChart title={translate("adAgency.screenAdPlayTime")} />
      <RevenueReportChart title={translate("adAgency.networkUptime")} />
    </Box>
  );
};

export default Report;
