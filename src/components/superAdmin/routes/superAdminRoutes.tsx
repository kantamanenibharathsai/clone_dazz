import React, { lazy } from "react";
import { Route } from "react-router-dom";
import Screens from "../../admin/screens/Screens";
const CanvasNext = lazy(() => import("../playlist/canvasNext/CanvasNext"));
const Dashboard = lazy(() => import("../dashboard/Dashboard"));
const PendingRequests = lazy(
  () => import("../pendingRequests/PendingRequests")
);
const Users = lazy(() => import("../users/Users"));
const Categories = lazy(() => import("../categories/Categories"));
const Logs = lazy(() => import("../logs/Logs"));
const Payments = lazy(() => import("../payments/Payments"));
const Reports = lazy(() => import("../reports/Reports"));
const Coupons = lazy(() => import("../coupons/Coupons"));
const Library = lazy(() => import("../library/Library"));
const Playlists = lazy(() => import("../playlist/Playlist"));
const EachQRCode = lazy(() => import("../qRCodes/EachQRCode"));
const QRCodes = lazy(() => import("../qRCodes/QRCodes"));
const Teams = lazy(() => import("../teams/Teams"));
const Settings = lazy(() => import("../settings/Settings"));
const PlaylistsSettings = lazy(
  () => import("../playlist/playlistSettigs/PlaylistsSettings")
);
const ScreenView = lazy(() => import("../../admin/screens/editScreens/ScreenView"));

const routesObject = [
  {
    path: "/Dashboard",
    element: <Dashboard />,
  },
  {
    path: "/PendingRequests",
    element: <PendingRequests />,
  },
  {
    path: "/Client",
    element: <Users role="USER" />,
  },
  {
    path: "/Investor",
    element: <Users role="INVESTOR" />,
  },
  {
    path: "/Hosts",
    element: <Users role="HOST" />,
  },
  {
    path: "/AdAgency",
    element: <Users role="AGENCY" />,
  },
  {
    path: "/QRVendors",
    element: <Users role="VENDER" />,
  },
  {
    path: "/Categories",
    element: <Categories active="GENRE" />,
  },
  {
    path: "/Categories/:genreId",
    element: <Categories active="CATEGORY" />,
  },
  {
    path: "/Categories/:genreId/types/:categoryId",
    element: <Categories active="SUB_CATEGORY" />,
  },
  {
    path: "/Categories/:genreId/types/:categoryId/subCategory/:subCategoryId",
    element: <Categories active="SCREEN_GROUPS" />,
  },
  {
    path: "/Categories/:genreId/types/:categoryId/subCategory/:subCategoryId/screenGroup/:screenGroupId",
    element: <Categories active="SCREENS" />,
  },
  {
    path: "/Logs",
    element: <Logs />,
  },
  {
    path: "/Payments",
    element: <Payments />,
  },
  {
    path: "/Reports",
    element: <Reports />,
  },
  {
    path: "/Coupons",
    element: <Coupons />,
  },
  {
    path: "/Screens",
    element: <Screens />,
  },
  {
    path: "/Library",
    element: <Library />,
  },
  {
    path: "/Playlists",
    element: <Playlists />,
  },
  {
    path: "/screens/edit",
    element: <ScreenView />,
  },
  {
    path: "/QRCodes",
    element: <QRCodes />,
  },
  {
    path: "/QRCodes/:id",
    element: <EachQRCode />,
  },
  {
    path: "/Teams",
    element: <Teams />,
  },
  {
    path: "/Settings",
    element: <Settings />,
  },
  {
    path: "/screens/settings/:groupId",
    element: <PlaylistsSettings />,
  },
  {
    path: "/screens/edit/:id",
    element: <ScreenView />,
  },
  {
    path: "/Playlists/next/:playListId",
    element:  <CanvasNext />,
  },
];
export const superAdminRoutes = () => {
  return (
    <React.Fragment>
      {routesObject.map((route, index) => (
        <Route key={index} {...route} />
      ))}
    </React.Fragment>
  );
};
