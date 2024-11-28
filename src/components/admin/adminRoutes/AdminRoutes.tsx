import React, { lazy } from "react";
import { Route } from "react-router-dom";
const Dashboard = lazy(() => import("../dashboard/Dashboard"));
const Screens = lazy(() => import("../screens/Screens"));
const Library = lazy(() => import("../library/Library"));
const Playlist = lazy(() => import("../playlist/Playlist"));
const Reports = lazy(() => import("../Report/Reports"));
const Settings = lazy(() => import("../settings/Settings"));
const Teams = lazy(() => import("../teams/Teams"));
const PlaylistsSettings = lazy(
  () => import("../playlist/playlistSettigs/PlaylistsSettings")
);
const ScreenView = lazy(() => import("../screens/editScreens/ScreenView"));
const routesObject = [
  {
    path: "/Dashboard",
    element: <Dashboard />,
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
    element: <Playlist />,
  },
  {
    path: "/Reports",
    element: <Reports />,
  },
  {
    path: "/Settings",
    element: <Settings />,
  },
  {
    path: "/Teams",
    element: <Teams />,
  },
  {
    path: "/Screens/settings/:groupId",
    element: <PlaylistsSettings />,
  },
  {
    path: "/Screens/edit/:id",
    element: <ScreenView />,
  },
];
const adminRoutes = () => {
  return (
    <React.Fragment>
      {routesObject.map((route, index) => (
        <Route key={index} {...route} />
      ))}
    </React.Fragment>
  );
};

export default adminRoutes;
