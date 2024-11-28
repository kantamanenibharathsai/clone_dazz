import { colors } from "../../../config/theme";

export const modalStyles = {
  main: {
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
    maxHeight: "90vh",
    maxWidth: "100%",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    boxSizing: "border-box",
    borderRadius: "30px",
    boxShadow: "rgba(226, 236, 249, 0.5) 0px 10px 60px 0px",
    "::-webkit-scrollbar": {
      display: "none",
    },
  },
  container: {
    position: "relative",
    p: { xs: 4, lg: 5 },
    maxWidth: "100vw",
    boxSizing: "border-box",
    borderRadius: "30px",
  },
  icon: {
    width: { xs: "20px", lg: "30px" },
    height: { xs: "20px", lg: "30px" },
    position: "absolute",
    right: "20px",
    top: "15px",
    color: colors.grey,
    cursor: "pointer",
  },
};
