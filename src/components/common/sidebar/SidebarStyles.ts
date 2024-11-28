import { SxProps } from "@mui/material";
import { colors, fonts } from "../../../config/theme";

export const styles = {
  modalBox: {
    width: { xs: 300, sm: 550, md: 650 },
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    alignItems: "center",
    justifyContent: "space-between",
  },
  deleteAdsText: {
    color: colors.white,
    fontSize: "clamp(1.1875rem, 1.1645rem + 0.1316vw, 1.375rem)",
  },
  areYouText: {
    color: colors.white,
    fontWeight: 500,
    fontFamily: fonts.primary,
    fontSize: "clamp(0.6875rem, 0.6645rem + 0.1316vw, 0.875rem)",
  },
  buttonsBox: { display: "flex", gap: 2 },
  edit: { width: "100%", height: "100%" },

  mainContainer: {
    width: "280px",
    // maxWidth: 280,
    background: colors.black,
    height: "100dvh",
    color: colors.white,
    py: 2,
    boxSizing: "border-box",
    flexDirection: "column",
    justifyContent: "space-between",
    overflow: "auto",
    scrollbarWidth: "none",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  subContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
  },
  logo: {
    height: "81px",
    width: "100px",
  },
  listItemButton: {
    display: "flex",
    justifyContent: "space-between",
    gap: 2,
    width: "100%",
    mr: 3,
    "&:hover .MuiAvatar-root": {
      backgroundColor: colors.activeColor,
    },
    "&:hover img": {
      filter: "brightness(0) invert(1)",
    },
    "&:hover .MuiTypography-root": {
      color: colors.activeColor,
    },
    "&:hover .MuiSvgIcon-root": {
      color: colors.activeColor,
    },
  },
  activeAvatar: {
    "& img": {
      filter: "brightness(0) invert(1)",
    },
    backgroundColor: colors.activeColor,
    height: "50px",
    width: "50px",
  },
  nestedButton: {
    "&:hover .MuiAvatar-root": {
      backgroundColor: colors.activeColor,
    },
    "&:hover img": {
      filter:
        "invert(41%) sepia(70%) saturate(4915%) hue-rotate(177deg) brightness(95%) contrast(94%)",
    },
    "&:hover .MuiTypography-root": {
      color: colors.activeColor,
    },
  },
  avatar: {
    height: "50px",
    width: "50px",
    bgcolor: colors.lightModalBg,
  },
  iconImage: {
    height: "18px",
    width: "17px",
  },
  paymentIconImage: {
    height: "33px",
    width: "32px",
  },
  labelText: {
    fontSize: "18px",
    fontWeight: 500,
    fontFamily: fonts.primary,
    textTransform: "capitalize",
  },
  sideBarCardContainer: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    mt: {
      xs: 3,
      lg: 4,
    },
  },
  subRouteLabelText: {
    fontSize: "15px",
    fontWeight: 500,
    fontFamily: fonts.primary,
  },

  sideBarCardMainContainer: {
    width: "85%",
    backgroundColor: colors.activeColor,
    borderRadius: "20px",
    display: "flex",
    flexDirection: "column",
    gap: 2,
    p: 3,
    boxSizing: "border-box",
    color: colors.white,
    overflow: "hidden",
  },
  sideBarCardAvatarContainer: {
    display: "flex",
    gap: 1,
    alignItems: "center",
  },
  sideBarCardAvatar: {
    height: "50px",
    width: "50px",
    backgroundColor: colors.white,
  },
  sideBarCardTitle: {
    color: colors.white,
    fontSize: "12px",
    fontWeight: 500,
    fontFamily: fonts.primary,
  },
  sideBarCardSubTitle: {
    color: colors.white,
    fontSize: "20px",
    fontWeight: 600,
    fontFamily: fonts.primary,
    width: 150,
    overflow: "hidden",
    textOverflow: "ellipsis",
    textWrap: "nowrap",
  },
  drawerStyle: {
    "& .MuiDrawer-paper": {
      background: colors.lightBlack,
    },
  },
  outletContainer: { px: { xs: 2, md: 6 }, ml: { xs: 0, md: "280px" }, pb: 2 },
  accordian: {
    "& .MuiAccordionSummary-content": {
      flexDirection: "row-reverse",
    },
    "& .MuiAccordionDetails-root": {
      padding: "0px",
    },
    backgroundColor: "black",
    pl: 3,
  },
} satisfies Record<string, SxProps>;
