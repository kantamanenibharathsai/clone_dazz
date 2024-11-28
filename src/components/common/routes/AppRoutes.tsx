import { lazy, Suspense, useEffect } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { actionLogout, setUserData } from "../../../redux/reducers/auth";
import Storage from "../../../utils/Storage";
import { useAppDispatch, useAppSelector } from "../../../utils/useRedux";
import AdAgencyLayout from "../../adAgency/adAgencyLayout/AdAgencyLayout";
import adAgencyRoutes from "../../adAgency/routes/AdAgencyRoutes";
import AdminRoutes from "../../admin/adminRoutes/AdminRoutes";
import AdminLayout from "../../admin/layout/AdminLayout";
import HostLayout from "../../host/hostLayout/HostLayout";
import { hostRoutes } from "../../host/routes/HostRoutes";
import InvestorLayout from "../../investors/investorLayout/InvestorLayout";
import investorRoutes from "../../investors/routes/InvestorRoutes";
import SuperAdminLayout from "../../superAdmin/layout/SuperAdminLayout";
import { superAdminRoutes } from "../../superAdmin/routes/superAdminRoutes";
import UserLayout from "../../userFlow/userLayout/UserLayout";
import userRoutes from "../../userFlow/userRoutes/UserRoutes";
import { vendorsRoutes } from "../../vendors/routes/VendorsRoutes";
import VendorsLayout from "../../vendors/vedorsLayout/VendorsLayout";
import LandingPage from "../landingPage/LandingPage";
import RouteLoading from "../routeFallBacks/RouteLoading";
import RouteNotFound from "../routeFallBacks/RouteNotFound";
import { ProtectedLayout } from "../sidebar/Sidebar";
const EditPlayList = lazy(
  () => import("../../superAdmin/playlist/PlaylistEdit")
);
const CheckToken = () => {
  const auth = useAppSelector((state) => state.Auth);
  if (auth.token) {
    const isDashboardRoutePresent = auth.sidebar?.sidemenu.some(
      (item) => item.path.toLowerCase() === "/dashboard"
    );
    const secondRoute =
      auth.sidebar?.sidemenu?.[0]?.submenus?.[0]?.path ??
      (auth.sidebar?.sidemenu?.[0]?.path as string);
    return (
      <Navigate to={isDashboardRoutePresent ? "/dashboard" : secondRoute} />
    );
  }
  return <LandingPage />;
};
const AppRoutes = () => {
  const roleId = useAppSelector((state) => state.Auth?.user?.roleId);
  const routeJSX = () => {
    switch (roleId) {
      case 6:
        return (
          <>
            <Route
              path="/"
              element={
                <ProtectedLayout>
                  <SuperAdminLayout />
                </ProtectedLayout>
              }
            >
              {superAdminRoutes()}
            </Route>
            <Route path="/edit-playlist/:playListId" element={<Outlet />}>
              <Route path="" element={<EditPlayList />} />
            </Route>
          </>
        );
      case 7:
        return (
          <Route
            element={
              <ProtectedLayout>
                <AdminLayout />
              </ProtectedLayout>
            }
          >
            {AdminRoutes()}
          </Route>
        );
      case 8:
        return (
          <Route
            element={
              <ProtectedLayout>
                <HostLayout />
              </ProtectedLayout>
            }
          >
            {hostRoutes()}
          </Route>
        );
      case 9:
        return (
          <Route
            element={
              <ProtectedLayout>
                <UserLayout />
              </ProtectedLayout>
            }
          >
            {userRoutes()}
          </Route>
        );
      case 10:
        return (
          <Route
            element={
              <ProtectedLayout>
                <VendorsLayout />
              </ProtectedLayout>
            }
          >
            {vendorsRoutes()}
          </Route>
        );
      case 11:
        return (
          <Route
            element={
              <ProtectedLayout>
                <InvestorLayout />
              </ProtectedLayout>
            }
          >
            {investorRoutes()}
          </Route>
        );
      case 12:
        return (
          <Route
            element={
              <ProtectedLayout>
                <AdAgencyLayout />
              </ProtectedLayout>
            }
          >
            {adAgencyRoutes()}
          </Route>
        );
    }
  };
  const dispatch = useAppDispatch();
  const isTokenExpired = () => {
    // returns true if token expired
    const tokenExpiry = Storage.get("tokenExpiry");
    if (!tokenExpiry) return null;
    const currentTime = new Date().toISOString();
    return new Date(tokenExpiry) < new Date(currentTime);
  };

  useEffect(() => {
    dispatch(setUserData());
    if (isTokenExpired()) {
      dispatch(actionLogout());
    }
  }, [dispatch]);
  return (
    <Suspense fallback={<RouteLoading />}>
      <Routes>
        <Route path="/" element={<CheckToken />} />
        {routeJSX()}
        <Route path="*" element={<RouteNotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
