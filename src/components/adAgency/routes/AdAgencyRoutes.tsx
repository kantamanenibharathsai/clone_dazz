import { lazy } from "react";
import { Route } from "react-router-dom";

const Dashboard = lazy(() => import("../dashboard/Dashboard"));
const Ads = lazy(() => import("../ads/MyAds"));
const AdsMyView = lazy(() => import("../ads/MySingleAdView"));
const MyWallet = lazy(() => import("../myWallet/MyWallet"));
const Report = lazy(() => import("../reports/Reports"));
const Settings = lazy(() => import("../settings/Settings"));

const adAgencyRoutes = () => (
  <>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/ads" element={<Ads />} />
    <Route path="/ads/:id" element={<AdsMyView />} />
    <Route path="/myWallet" element={<MyWallet />} />
    <Route path="/reports" element={<Report />} />
    <Route path="/settings" element={<Settings />} />
  </>
);

export default adAgencyRoutes;
