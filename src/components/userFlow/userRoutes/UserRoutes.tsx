import { lazy } from "react";
import { Route } from "react-router-dom";
const Dashboard = lazy(() => import("../dashboard/Dashboard"));
const MyAds = lazy(() => import("../ads/MyAds"));
const MyWallet = lazy(() => import("../myWallet/MyWallet"));
const Reports = lazy(() => import("../reports/Reports"));
const Settings = lazy(() => import("../settings/Settings"));
const Document = lazy(() => import("../settings/Document"));
const LoginAndSecurity = lazy(() => import("../settings/LoginAndSecurity"));
const MySingleAdView = lazy(() => import("../ads/MySingleAdView"));
const userRoutes = () => {
  return (
    <>
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/Ads" element={<MyAds />} />
      <Route path="/Ads/:id" element={<MySingleAdView />} />
      <Route path="/MyWallet" element={<MyWallet />} />
      <Route path="/Reports" element={<Reports />} />
      <Route path="/Settings" element={<Settings />} />
      <Route path="/Settings/:requiredDocument" element={<Document />} />
      <Route path="/Settings/login-security" element={<LoginAndSecurity />} />
    </>
  );
};

export default userRoutes;
