import { SxProps } from "@mui/material";
import { colors, fonts } from "../../../config/theme";

export const reportStyles = {
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
    fontSize: "22px",
  },
  sortContainer: {
    display: "flex",
    alignItems: "center",
    border: 0,
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
    flexDirection: { xs: "column", sm: "row" },
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
  },
  datePicker: {
    width: "100%",
    "& .MuiOutlinedInput-notchedOutline": {
      borderWidth: 2,
    },
    "& svg": {
      width: 30,
      height: 30,
    },
  },
} satisfies Record<string, SxProps>;
