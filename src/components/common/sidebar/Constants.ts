import {
  Payments,
  activeAddAgencyIcon,
  activeAdsIcon,
  activeCategoriesIcon,
  activeCouponsIcon,
  activeDashboardIcon,
  activeFranchisePartnerIcon,
  activeHostsIcon,
  activeLibraryIcon,
  activeLogoutIcon,
  activeLogsIcon,
  activePaymentsIcon,
  activePendingRequestIcon,
  activePlaylist,
  activeQrIcon,
  activeQrVendorsIcons,
  activeReportIcon,
  activeSettingsIcon,
  activeSuperAdminReports,
  activeTeamsIcon,
  activeUsersIcons,
  activeWalletIcon,
  addAgencyIcon,
  adsIcon,
  availableLicenseIcon,
  availableSpaceIcon,
  categoriesIcon,
  clientIcon,
  clientNormalIcon,
  coupons,
  dashboardIcon,
  franchisePartnerIcon,
  hostsIcon,
  library,
  licenseExpiringIcon,
  logoutIcon,
  logsIcon,
  pendingRequestIcon,
  playlistIcon,
  qrCodesIcon,
  qrVendorsIcons,
  reportIcon,
  settingsIcon,
  sideBarCardWalletIcon,
  superAdminReports,
  teams,
  usersIcons,
  walletIcon,
} from "./assets/assets";

export type CardData = {
  id: number;
  title: string;
  subTitle: string;
  icon: string;
};
export type NestedRoutes = {
  id: number;
  route: string;
  activeIcon: string;
  inActiveIcon: string;
};
export type ListItems = {
  id: number;
  route: string;
  activeIcon: string;
  inActiveIcon: string;
  nestedRoutes?: NestedRoutes[];
};

export const userData: ListItems[] = [
  {
    id: 1,
    route: "Dashboard",
    activeIcon: activeDashboardIcon,
    inActiveIcon: dashboardIcon,
  },
  {
    id: 2,
    route: "Ads",
    activeIcon: activeAdsIcon,
    inActiveIcon: adsIcon,
  },
  {
    id: 3,
    route: "My Wallet",
    activeIcon: activeWalletIcon,
    inActiveIcon: walletIcon,
  },
  {
    id: 4,
    route: "Reports",
    activeIcon: activeReportIcon,
    inActiveIcon: reportIcon,
  },
  {
    id: 5,
    route: "Settings",
    activeIcon: activeSettingsIcon,
    inActiveIcon: settingsIcon,
  },
  {
    id: 6,
    route: "Logout",
    activeIcon: activeLogoutIcon,
    inActiveIcon: logoutIcon,
  },
];

export const adminData: ListItems[] = [
  {
    id: 1,
    route: "dashboard",
    activeIcon: activeDashboardIcon,
    inActiveIcon: dashboardIcon,
  },
  {
    id: 2,
    route: "screens",
    activeIcon: activeAdsIcon,
    inActiveIcon: adsIcon,
    nestedRoutes: [
      {
        id: 9,
        route: "screens/edit",
        activeIcon: activeAdsIcon,
        inActiveIcon: adsIcon,
      },
    ],
  },
  {
    id: 3,
    route: "library",
    activeIcon: activeLibraryIcon,
    inActiveIcon: library,
  },
  {
    id: 4,
    route: "playlists",
    activeIcon: activePlaylist,
    inActiveIcon: playlistIcon,
    nestedRoutes: [
      {
        id: 3,
        route: "playlists/settings",
        activeIcon: activePlaylist,
        inActiveIcon: playlistIcon,
      },
    ],
  },
  {
    id: 5,
    route: "teams",
    activeIcon: activeTeamsIcon,
    inActiveIcon: teams,
  },
  {
    id: 6,
    route: "report",
    activeIcon: activeReportIcon,
    inActiveIcon: reportIcon,
  },
  {
    id: 7,
    route: "settings",
    activeIcon: activeSettingsIcon,
    inActiveIcon: settingsIcon,
  },
  {
    id: 8,
    route: "Logout",
    activeIcon: activeLogoutIcon,
    inActiveIcon: logoutIcon,
  },
];

export const superAdminData: ListItems[] = [
  {
    id: 1,
    route: "Dashboard",
    activeIcon: activeDashboardIcon,
    inActiveIcon: dashboardIcon,
  },
  {
    id: 2,
    route: "Pending Requests",
    activeIcon: activePendingRequestIcon,
    inActiveIcon: pendingRequestIcon,
  },
  {
    id: 3,
    route: "Users",
    activeIcon: activeUsersIcons,
    inActiveIcon: usersIcons,
    nestedRoutes: [
      {
        id: 3,
        route: "Client",
        activeIcon: clientIcon,
        inActiveIcon: clientNormalIcon,
      },
      {
        id: 14,
        route: "Franchise Partner",
        activeIcon: activeFranchisePartnerIcon,
        inActiveIcon: franchisePartnerIcon,
      },
      {
        id: 15,
        route: "Hosts",
        activeIcon: activeHostsIcon,
        inActiveIcon: hostsIcon,
      },
      {
        id: 16,
        route: "Ad Agency",
        activeIcon: activeAddAgencyIcon,
        inActiveIcon: addAgencyIcon,
      },
      {
        id: 17,
        route: "QR Vendors",
        activeIcon: activeQrVendorsIcons,
        inActiveIcon: qrVendorsIcons,
      },
    ],
  },
  {
    id: 4,
    route: "Categories",
    activeIcon: activeCategoriesIcon,
    inActiveIcon: categoriesIcon,
  },
  {
    id: 5,
    route: "Logs",
    activeIcon: activeLogsIcon,
    inActiveIcon: logsIcon,
  },
  {
    id: 6,
    route: "Payments",
    activeIcon: activePaymentsIcon,
    inActiveIcon: Payments,
  },
  {
    id: 7,
    route: "Reports",
    activeIcon: activeSuperAdminReports,
    inActiveIcon: superAdminReports,
  },
  {
    id: 8,
    route: "Coupons",
    activeIcon: activeCouponsIcon,
    inActiveIcon: coupons,
  },
  {
    id: 9,
    route: "Screens",
    activeIcon: activeAdsIcon,
    inActiveIcon: adsIcon,
  },

  {
    id: 10,
    route: "Library",
    activeIcon: activeLibraryIcon,
    inActiveIcon: library,
  },
  {
    id: 11,
    route: "Playlists",
    activeIcon: activePlaylist,
    inActiveIcon: playlistIcon,
  },
  {
    id: 12,
    route: "QR Codes",
    activeIcon: activeQrIcon,
    inActiveIcon: qrCodesIcon,
  },
  {
    id: 13,
    route: "Teams",
    activeIcon: activeTeamsIcon,
    inActiveIcon: teams,
  },

  {
    id: 14,
    route: "Settings",
    activeIcon: activeSettingsIcon,
    inActiveIcon: settingsIcon,
  },
  {
    id: 15,
    route: "Logout",
    activeIcon: activeLogoutIcon,
    inActiveIcon: logoutIcon,
  },
];

export const hostsData: ListItems[] = [
  {
    id: 1,
    route: "Dashboard",
    activeIcon: activeDashboardIcon,
    inActiveIcon: dashboardIcon,
  },
  {
    id: 2,
    route: "Screen Ads",
    activeIcon: activeAdsIcon,
    inActiveIcon: adsIcon,
  },

  {
    id: 3,
    route: "Reports",
    activeIcon: activeReportIcon,
    inActiveIcon: reportIcon,
  },
  {
    id: 4,
    route: "Settings",
    activeIcon: activeSettingsIcon,
    inActiveIcon: settingsIcon,
  },
  {
    id: 5,
    route: "Logout",
    activeIcon: activeLogoutIcon,
    inActiveIcon: logoutIcon,
  },
];
export const vendorsData: ListItems[] = [
  {
    id: 1,
    route: "Dashboard",
    activeIcon: activeDashboardIcon,
    inActiveIcon: dashboardIcon,
  },
  {
    id: 2,
    route: "Reports",
    activeIcon: activeReportIcon,
    inActiveIcon: reportIcon,
  },
  {
    id: 3,
    route: "Payments",
    activeIcon: activePaymentsIcon,
    inActiveIcon: Payments,
  },
  {
    id: 4,
    route: "Settings",
    activeIcon: activeSettingsIcon,
    inActiveIcon: settingsIcon,
  },
  {
    id: 5,
    route: "Logout",
    activeIcon: activeLogoutIcon,
    inActiveIcon: logoutIcon,
  },
];

export const investorsData: ListItems[] = [
  {
    id: 1,
    route: "Dashboard",
    activeIcon: activeDashboardIcon,
    inActiveIcon: dashboardIcon,
  },

  {
    id: 2,
    route: "Reports",
    activeIcon: activeReportIcon,
    inActiveIcon: reportIcon,
  },
  {
    id: 3,
    route: "Settings",
    activeIcon: activeSettingsIcon,
    inActiveIcon: settingsIcon,
  },
  {
    id: 4,
    route: "Logout",
    activeIcon: activeLogoutIcon,
    inActiveIcon: logoutIcon,
  },
];

export const sideBarCardDataAdmin = [
  {
    id: 1,
    title: "Storage Used",
    subTitle: "300.00 MB",
    icon: availableSpaceIcon,
  },
  {
    id: 2,
    title: "Available Licenses",
    subTitle: "0",
    icon: availableLicenseIcon,
  },
  {
    id: 3,
    title: "Licenses Expiring Soon",
    subTitle: "0",
    icon: licenseExpiringIcon,
  },
];

export const SidebarCardData = [
  {
    id: 1,
    title: "My Wallet",
    subTitle: "₹ 15200.00",
    icon: sideBarCardWalletIcon,
  },
];
