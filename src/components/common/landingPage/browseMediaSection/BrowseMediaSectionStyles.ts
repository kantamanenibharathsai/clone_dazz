import { colors, fonts } from "../../../../config/theme";

export const browseMediaStyles = {
  mainContainer: {
    margin: { xs: "35px", lg: "35px 105px" },
  },
  title: {
    color: colors.white,
    fontSize: "clamp(1.5625rem, 1.5088rem + 0.307vw, 2rem)",
    fontWeight: "800",
    fontFamily: fonts.third,
  },
  dividerStyle: {
    width: "30px",
    height: "5px",
    backgroundColor: colors.turquoise,
    borderRadius: "10px",
    marginBottom: "20px",
    borderBotttomWidth:"inherit"
  },
  card: {
    mainContainer: {
      borderRadius: "20px",
      backgroundColor: "#F5F6F8",
      width: { xs: "78vw", sm: "190px" },
      height: "190px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
    },
    hexogonImgContainer: {
      position: "relative",
      width: "117px",
      height: "119px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    imgStyles: {
      position: "absolute",
      bottom: 46.5,
      left: 33,
      width: "50px",
    },
  },
};
