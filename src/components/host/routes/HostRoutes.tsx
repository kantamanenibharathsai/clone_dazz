import React, { lazy } from "react";
import { Route } from "react-router-dom";
const DashBoard = lazy(() => import("../dashBoard/DashBoard"));
const Settings = lazy(() => import("../settings/Settings"));
const Reports = lazy(() => import("../reports/Reports"));
const AdsMyView = lazy(() => import("../screenAds/adView/AdsMyView"));
const ScreenAds = lazy(() => import("../screenAds/ScreenAds"));

const routesObject = [
  {
    path: "/Dashboard",
    element: <DashBoard />,
  },
  {
    path: "/ScreenAds",
    element: <ScreenAds />,
  },
  {
    path: "/ScreenAds/view/:id",
    element: <AdsMyView />,
  },
  {
    path: "/Reports",
    element: <Reports />,
  },
  {
    path: "/Settings",
    element: <Settings />,
  },
];
export const hostRoutes = () => {
  return (
    <React.Fragment>
      {routesObject.map((route, index) => (
        <Route key={index} {...route} />
      ))}
    </React.Fragment>
  );
};
