import { Route } from "react-router-dom";
import DashBoard from "../dashboard/InvestorDashboard";
import Reports from "../reports/Reports";
import Settings from "../settings/Settings";
const investorRoutes = () => {
  return (
    <>
      <Route path="/Dashboard" element={<DashBoard />} />
      <Route path="/Reports" element={<Reports />} />
      <Route path="/Settings" element={<Settings />} />
    </>
  );
};

export default investorRoutes;
