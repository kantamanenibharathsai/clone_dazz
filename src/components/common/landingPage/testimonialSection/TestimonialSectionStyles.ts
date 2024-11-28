import { colors, fonts, hex2rgba } from "../../../../config/theme";

export const testimonialStyles = {
  mainContainer: {
    margin: { xs: "35px", lg: "35px 105px" },
    "& .slick-dots li": {
      width: "15px",
      height: "15px",
      borderRadius: "50px",
      backgroundColor: hex2rgba(colors.grey, 0.3),
      margin: "0 8px",
      "&.slick-active": {
        backgroundColor: colors.activeColor,
        width: "15px",
        height: "15px",
      },
    },
    "& .slick-dots li button:before": {
      fontSize: "0px",
    },
  },
  title: {
    color: colors.white,
    fontSize: "clamp(1.5625rem, 1.5088rem + 0.307vw, 2rem)",
    fontWeight: "800",
    marginTop: "100px",
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
  imgStyle: {
    width: "100%",
  },
  arrowStyles: {
    fontSize: { xs: "25px", sm: "35px" },
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: { xs: "7px", sm: "15px" },
    mr: { xs: 0.5, sm: 1 },
  },
  dotsContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
  },
  iconContainer: {
    background: colors.white,
    width: "26px",
    padding: { xs: "0px", sm: "2px" },
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    "&:hover": { backgroundColor: colors.hoverBtn },
  },
};
