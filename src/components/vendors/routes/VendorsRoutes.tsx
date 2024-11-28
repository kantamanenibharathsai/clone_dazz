import React, { lazy } from "react";
import { Route } from "react-router-dom";
import Payments from "../payments/Payments";
const DashBoard = lazy(() => import("../dashBoard/DashBoard"));
const Settings = lazy(() => import("../settings/Settings"));
const Reports = lazy(() => import("../reports/Reports"));
const routesObject = [
  {
    path: "/Dashboard",
    element: <DashBoard />,
  },
  {
    path: "/Reports",
    element: <Reports />,
  },
  {
    path: "/Payments",
    element: <Payments />,
  },
  {
    path: "/Settings",
    element: <Settings />,
  },
];
export const vendorsRoutes = () => {
  return (
    <React.Fragment>
      {routesObject.map((route, index) => (
        <Route key={index} {...route} />
      ))}
    </React.Fragment>
  );
};
