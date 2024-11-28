import { SxProps } from "@mui/material";
import { colors, fonts } from "../../../config/theme";

export const styles = {
  revenueMainContainer: {
    py: 4,
    px: 2,
    borderRadius: "35px",
    mt: 3,
    position: "relative",
  },
  title: {
    fontFamily: fonts.primary,
    fontWeight: 500,
    color: colors.chartTitle,
    fontSize: "21px",
  },
  exportButton: {
    color: colors.uploadText,
    width: "88px",
    height: "38px",
    fontSize: "13px",
    fontFamily: fonts.primary,
    borderRadius: "10px",
    "&:hover": {
      backgroundColor: colors.textFieldBg,
      color: colors.uploadText,
    },
  },
  exportIcon: {
    fontSize: 15,
    color: colors.exportIcon,
  },
  sortContainer: {
    display: "flex",
    alignItems: "center",
    border: 0,
    borderColor: "var(--dark-color)",
    backgroundColor: colors.textFieldBg,
    padding: "2px 15px",
    borderRadius: "10px",
    width: "177px",
  },
  sortBox: {
    display: "flex",
    alignItems: "center",
  },
  sortFormControl: {
    "& .MuiOutlinedInput-root fieldset": {
      display: "none",
    },

    "& .MuiOutlinedInput-root input": {
      padding: 0,
    },
  },
  menuItem: {
    fontSize: "14px",
    fontWeight: "600",
    textWrap: "nowrap",
    color: colors.uploadText,
  },
  selectedYearText: {
    fontFamily: fonts.primary,
    fontWeight: 400,
    fontSize: "14px",
    color: colors.selectText,
    textWrap: "nowrap",
  },
  revenueSubContainer: {
    display: "flex",
    justifyContent: "space-between",
    mb: 1,
  },
  selectFieldContainer: {
    display: "flex",
    gap: 1,
    alignItems: "center",
  },
  selectField: {
    width: "90px",
    height: "34px",

    "& .MuiSvgIcon-root": {
      fontSize: "25px",
      color: "black",
    },
    "&.MuiOutlinedInput-input": {
      color: colors.uploadText,
      padding: "6.5 5px",
    },
  },
  customTooltip: {
    boxShadow:
      "0px 4.412177085876465px 8.82435417175293px 0px rgba(0, 0, 0, 0.12)",
    background: colors.chartTooltip,
    color: colors.white,
    fontWeight: "800",
    padding: "5px 20px",
  },
  positionContainer: {
    position: "absolute",
    top: "100%",
    left: "50%",
    transform: "translateX(-50%)",
    borderTop: `10px solid ${colors.chartTooltip}`,
    borderLeft: "10px solid transparent",
    borderRight: "10px solid transparent",
  },
  dateText: {
    fontFamily: fonts.primary,
    colors: colors.labelText,
    fontSize: "14px",
    mb: 0.5,
    fontWeight: 500,
  },
  analyticalMainContainer: {
    px: 3,
    py: 3,
    borderRadius: "25px",
  },
  analyticalGridContainer: {
    mt: 3,
  },
  analyticalSelectField: {
    "&  .MuiOutlinedInput-input": {
      color: colors.uploadText,
      fontWeight: 500,
      fontFamily: fonts.primary,
    },
    height: "52px",
    borderRadius: "10px",
    border: `1px solid ${colors.creamWhite}`,
    backgroundColor: colors.textFieldBg,
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
  },
  analyticalSelectPlaceholder: {
    color: colors.grey,
    fontWeight: 400,
    fontFamily: fonts.primary,
  },
} satisfies Record<string, SxProps>;

export const salesGraphStyles = {
  graphMainBox: { width: "100%", height: "100%" },
  buttonsBox: { bgColor: colors.textFieldBg, p: 0.5, borderRadius: 3 },
  detailsBox: {
    width: { xs: 160, sm: 200 },
    display: "flex",
    flexDirection: { xs: "row", sm: "column" },
    gap: 2,
  },
  graphBox: {
    position: "relative",
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    height: "100%",
    width: "100%",
    mt: 1,
  },

  salesTextBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  trendingBox: { display: "flex", alignItems: "center", gap: 0.5 },
  graphHeightBox: { height: { xs: "70%", sm: "85%" }, width: "100%" },

  customersGraphHeightBox: { height: { xs: "90%", sm: "85%" }, width: "100%" },

  customerAbsoluteBox: { position: "absolute", top: 15, left: 15 },
  sellerTextBox: { display: "flex", justifyContent: "space-between", mb: 1 },
  sellerText: { display: "flex", alignItems: "center", gap: 1 },
  sellerGraphMainBox: {
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    width: "100%",
    height: "100%",
    gap: 4,
  },
  sellerGraphBox: {
    width: { xs: "100%", sm: "60%" },
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    pb: { xs: 0, sm: 5 },
  },
  sellerContentBox: {
    width: { xs: "100%", sm: "40%" },
    height: "80%",
    pt: { xs: 0, sm: 8 },
    pr: 2,
  },

  googleBox: {
    position: "absolute",
    top: 1,
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    zIndex: 2,
    px: 0.5,
  },
  socialBox: {
    position: "absolute",
    top: 70,
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    zIndex: 2,
    px: 0.5,
  },
  directBox: {
    position: "absolute",
    top: 140,
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    zIndex: 1,
    px: 0.5,
  },
  customToolTip: {
    bgcolor: colors.white,
    p: 1,
    borderRadius: 2,
    border: `1px solid ${colors.lighterWhitish}`,
  },
  salesGraphNameText: {
    "&.MuiTypography-root": {
      fontWeight: 500,
      fontFamily: "poppins",
      fontSize: 13,
      color: "grey[700]",
    },
  },
  salesGraphText: {
    "&.MuiTypography-root": {
      fontWeight: 500,
      fontFamily: "poppins",
      fontSize: 13,
      color: colors.primary,
    },
  },
  labelText: {
    textAlign: "center",
    color: colors.uploadText,
    fontWeight: 600,
    fontSize: "12px",
  },
  subTitleText: {
    fontFamily: fonts.primary,
    fontSize: "12px",
    fontWeight: 600,
    color: colors.uploadText,
    width: "80px",
    mt: 10,
  },
  investmentContainer: {
    display: "flex",
    gap: 1,
  },
  barChartMargins: {
    top: 5,
    bottom: 5,
    left: 15,
    right: 30,
  },
  xAxisStyles: {
    fontFamily: fonts.primary,
    fontSize: 12,
    color: colors.barChartAxis,
    fontWeight: 500,
    marginTop: "200px",
  },
} satisfies Record<string, SxProps>;
