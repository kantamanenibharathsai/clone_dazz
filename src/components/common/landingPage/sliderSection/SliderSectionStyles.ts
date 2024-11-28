import { colors, fonts, hex2rgba } from "../../../../config/theme";

export const sliderSectionStyles = {
  mainContainer: {
    margin: { xs: "35px", lg: "35px 105px" },
    "& .slick-dots": {
      bottom: { xs: "15px", md: "30px" },
    },
    "& .slick-dots li button": {
      borderRadius: "50%",
      width: "20px",
      border: `2px solid ${colors.white}`,
    },
    "& .slick-active": {
      backgroundColor: colors.white,
      borderRadius: "50%",
      width: "20px",
    },
    "& .slick-dots li button:before": {
      fontSize: "0px",
    },
  },
  imgStyles: {
    width: "100%",
    height: "100%",
    borderRadius: "10px",
  },
  sliderContainer: {
    background: `linear-gradient(92.61deg, ${
      colors.gunMetal
    } 40.09%, ${hex2rgba(colors.blue, 1.5)} 100.37%)`,
    borderRadius: "20px",
  },
  sliderSubContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: { xs: "column", sm: "row" },
    justifyContent: "space-between",
    borderRadius: "10px",
  },
  sliderTextContainer: {
    padding: { xs: "35px", md: "55px" },
  },
  sliderTitletext: {
    color: colors.white,
    fontSize: "clamp(1.125rem, 1.0789rem + 0.2632vw, 1.5rem)",
    fontWeight: "900",
    fontFamily: fonts.third,
  },
  sliderDescriptiontext: {
    color: colors.white,
    fontSize: "clamp(0.75rem, 0.727rem + 0.1316vw, 0.9375rem)",
    fontWeight: "600",
    opacity: "0.7",
    marginTop: "15px",
  },
  sliderImgStyle: {
    height: { xs: "150px", lg: "256px" },
    borderRadius: "10px",
  },
  customDot: {
    color: colors.white,
    backgroundColor: "red",
  },
  customDots: {
    backgroundColor: "red",
  },
};
