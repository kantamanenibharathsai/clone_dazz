import adAgencyWallet from "./reducers/adAgencyReducers/adAgencyWallet";
import adsSlice from "./reducers/adAgencyReducers/adsSlice";
import AddScreenSlice from "./reducers/adminReducers/addScreenSlice";
import ConfigurationSlice from "./reducers/adminReducers/configurationSlice";
import AdminDashboardSlice from "./reducers/adminReducers/dashboardSlice";
import LibrarySlice from "./reducers/adminReducers/librarySlice";
import NetworkUptime from "./reducers/adminReducers/netwrokUptimeSlice";
import PlaylistSlice from "./reducers/adminReducers/playlistSlice";
import screenFilesSlice from "./reducers/adminReducers/screenFilesSlice";
import ScreensSlice from "./reducers/adminReducers/screenSlice";
import ATeamsSlice from "./reducers/adminReducers/teamSlice";
import Auth from "./reducers/auth";
import forgotPasswordSlice from "./reducers/common/forgotPasswordSlice";
import logs from "./reducers/common/logsSlice";
import MyScreenLocations from "./reducers/common/myScreenLocations";
import HostSlice from "./reducers/hostReducers/HostSlice";
import hostScreenSlice from "./reducers/hostReducers/ScreenSlice";
import HostDashboardSlice from "./reducers/hostReducers/dashboardSlice";
import InvestorDashboardSlice from "./reducers/investorReducers/dashboardSlice";
import AgreementsSlice from "./reducers/superAdmin/AgreementsSlice";
import CategoriesSlice from "./reducers/superAdmin/CategoriesSlice";
import CouponsSlice from "./reducers/superAdmin/CouponsSlice";
import HostAdsSlice from "./reducers/superAdmin/HostAdsSlice";
import SalesDetails from "./reducers/superAdmin/SalesDetails";
import screenPrices from "./reducers/superAdmin/ScreenPricesSlice";
import userClient from "./reducers/superAdmin/UserSlice";
import WidgetsSlice from "./reducers/superAdmin/WidgetsSlice";
import commissionsSlice from "./reducers/superAdmin/commissionsSlice";
import DashboardSlice from "./reducers/superAdmin/dashboardSlice";
import paymentsSlice from "./reducers/superAdmin/paymentsSlice";
import PendingRequestsSlice from "./reducers/superAdmin/pendingRequests";
import ReportsDashboardSlice from "./reducers/superAdmin/reportsDashboardSlice";
import TeamsSlice from "./reducers/superAdmin/teamsSlice";
import Campaign from "./reducers/userReducers/createCampaignSlice";
import UserDashboardSlice from "./reducers/userReducers/dashboardSlice";
import MyAdsSlice from "./reducers/userReducers/myAdsSlice";
import MyWalletSlice from "./reducers/userReducers/myWalletSlice";
import UserSettingsSlice from "./reducers/userReducers/settingsSlice";
import vendor from "./reducers/vendorsReducer/vendors";
import layoutsSlice from "./reducers/layoutsReducer/layouts";
import canvasNextSlice from "./reducers/superAdmin/CanvasNextSlice"
export const reducers = {
  common: {
    Auth,
    forgotPasswordSlice,
    logs,
    ATeamsSlice,
    MyScreenLocations,
  },
  admin: {
    PlaylistSlice,
    ScreensSlice,
    LibrarySlice,
    AdminDashboardSlice,
    ConfigurationSlice,
    AddScreenSlice,
    screenFilesSlice,
    NetworkUptime,
    layoutsSlice,
  },
  superAdmin: {
    AgreementsSlice,
    TeamsSlice,
    commissionsSlice,
    PendingRequestsSlice,
    CategoriesSlice,
    CouponsSlice,
    userClient,
    ReportsDashboardSlice,
    DashboardSlice,
    paymentsSlice,
    WidgetsSlice,
    screenPrices,
    SalesDetails,
    HostAdsSlice,
    canvasNextSlice
  },
  user: {
    MyAdsSlice,
    Campaign,
    MyWalletSlice,
    UserDashboardSlice,
    UserSettingsSlice,
  },
  vendor: {
    vendor,
  },
  host: { hostScreenSlice, HostSlice, HostDashboardSlice },
  adAgency: {
    adsSlice,
    adAgencyWallet,
  },
  investor: {
    InvestorDashboardSlice,
  },
};
