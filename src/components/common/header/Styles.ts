import { colors, fonts } from "../../../config/theme";

export const styles = {
  mainContainer: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    rowGap: "10px",
    justifyContent: "right",
    alignItems: "center",
    backgroundColor: colors.layoutBlack,
    py: 2,
    boxSizing: "border-box",
    position: "sticky",
    top: 0,
    zIndex: 11,
  },
  welcomeText: {
    fontSize: "clamp(1.125rem, 1.0789rem + 0.2632vw, 1.5rem)",
    color: "white",
    fontFamily: "Poppins",
    fontWeight: 500,
    textAlign: "left",
    textTransform: "capitalize",
    "& p": {
      all: "inherit",
    },
  },
  profileText: {
    textWrap: "nowrap",
    width: 150,
    overflow: "hidden",
    textOverflow: "ellipsis",
    textAlign: "left",
  },
  notificationContainer: {
    backgroundColor: colors.white,
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "50px",
    height: "50px",
    border: `1px solid ${colors.textFieldBg}`,
    boxSizing: "border-box",
    position: "relative",
    cursor: "pointer",
  },
  userName: {
    width: "calc(100% - 600px)",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  avatar: {
    width: "42px",
    height: "42px",
    borderRadius:'50%'
  },
  notificationBadge: {
    position: "absolute",
    top: 13,
    right: 13,
    fontSize: "8px",
    border: "solid white 2px",
    borderRadius: "50%",
    color: colors.validate,
    p: 0,
  },
  mobileSwiperClose: {
    width: "fit-content",
    alignSelf: "flex-end",
    position: "fixed",
    zIndex: 100,
    backgroundColor: colors.white,
    color: colors.black,
    left: "250px",
  },
  menuIcon: { color: colors.white, display: { xs: "block", md: "none" } },
  tabs: {
    "& .MuiTabs-indicator": {
      backgroundColor: colors.blue,
      height: "2px",
    },
    "& .MuiTab-root": {
      textTransform: "none",
      color: colors.lightGray,
      fontSize: "14px",
      fontWeight: 500,
      fontFamily: fonts.secondary,
    },
    "& .MuiTab-root.Mui-selected": {
      color: colors.white,
      textTransform: "none",
      fontSize: "14px",
      fontWeight: 600,
      fontFamily: fonts.secondary,
    },
  },
  customBadge: {
    background: colors.modalBg,
    m: 1,
    p: 0.5,
    px: 1,
    fontSize: "12px",
    borderRadius: "50px",
    fontWeight: 600,
  },
  notifyHolder: {
    borderRadius: 3,
    overflow: "hidden",
    background: colors.lightBlack,
    p: 2,
    pt: 0,
    boxSizing: "border-box",
    width: "100%",
    maxWidth: "450px",
    maxHeight: "80vh",
    overflowY: "auto",
    overflowX: "hidden",
    display: "flex",
    flexDirection: "column",
    // position: "relative",
    gap: 3,
    "::-webkit-scrollbar": {
      width: "7px",
    },

    /* Track */
    "::-webkit-scrollbar-track": {
      background: colors.lightBlack,
    },

    /* Handle */
    "::-webkit-scrollbar-thumb": {
      background: colors.white,
      borderRadius: "10px",
    },
  },
  eachNotifyContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 1,
    boxSizing: "border-box",
  },
  unReadAvatarHolder: {
    "&:before": {
      content: `""`,
      width: "10px",
      height: "10px",
      borderRadius: "50%",
      backgroundColor: colors.blue,
      marginTop: "auto",
      marginBottom: "auto",
      marginRight: "5px",
      boxSizing: "border-box",
    },
  },
  notificationText: {
    color: colors.white,
    fontSize: "20px",
    fontWeight: 500,
    width: { xs: 250, md: 430 },
  },
  avatarSize: {
    width: 48,
    height: 48,
  },
  notificationBody: {
    fontSize: 14,
    fontWeight: 700,
    fontFamily: fonts.secondary,
    color: colors.white,
    width: "calc(100% - 100px)",
  },
  sideBarBackBtn: {
    position: "relative",
    left: "5px",
  },
  popoverStyles: {
    "& .MuiPaper-root": {
      background: colors.lightBlack,
      border: `1px solid ${colors.grey}`,
      backgroundColor: colors.white,
      boxShadow: `0px 10px 60px 0px ${colors.modalBoxShadow}`,
      borderRadius: "30px",
      p: 0,
    },
  },
};
