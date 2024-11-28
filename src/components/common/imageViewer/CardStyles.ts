import { Box, styled } from "@mui/material";

const ellipsis = {
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};
export const StyledContainer = styled(Box)<{}>(() => ({
  width: "145px",
  display: "flex",
  flexDirection: "column",
  gap: 1,
  margin: "10px",
  position: "relative",
}));
export const cardStyles = {
  textItem: {
    px: "5px",
    boxSizing: "border-box",
    ...ellipsis,
    "& .MuiTypography-root": {
      ...ellipsis,
    },
  },
  activeCard: {
    bottom: "-50px",
    transition: "opacity 1s",
    mt: "15px",
  },
  iconButton: {
    position: "absolute",
    zIndex: "10",
    width: "30px",
    height: "30px",
    right: "-12px",
    top: "-13px",
  },
  groupStyle: {
    display: "flex",
    justifyContent: "start",
    cursor: "pointer",
  },
  avatarStyle: { width: "28px", height: "28px" },
  bannerImage: {
    boxSizing: "border-box",
    p: 0,
    width: "100%",
    height: "130px",
    borderRadius: "13px",
    cursor: "pointer",
  },
  groupContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
};
