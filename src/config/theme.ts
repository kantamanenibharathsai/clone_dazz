import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { createTheme } from "@mui/material";
import { LeftArrow, RightArrow } from "../components/common/assets";

export const hex2rgba = (hex: string, alpha: number = 1) => {
  const matches = hex.match(/\w\w/g);
  if (!matches) {
    return hex;
  }
  const [r, g, b] = matches.map((x) => parseInt(x, 16));
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const fonts = {
  primary: "Poppins",
  secondary: "Inter",
  third: "Nunito Sans",
  roboto:"Roboto",
  raleway:"Raleway"
};

const lightTheme = {
  primary: "#514EF3",
  green: "#00AC4F",
  lightGreen: "#16C098",
  modalBg: "#323639",
  activeColor: "#0787C0",
  white: "#FFFFFF",
  black: "#000000",
  textFieldBg: "#F9FBFF",
  grey: "#7E92A2",
  lightGrey: "#9A9BA0",
  gunMetal: "#112E3A",
  turquoise: "#3ADAD9",
  validate: "#DF0404",
  blue: "#316CF4",
  purple: "#6B47BD",
  orange: "#FF8E29",
  carmine: "#D0004B",
  labelText: "#292D32",
  uploadText: "#3D3C42",
  creamWhite: "#E7E7E7",
  lightModalBg: "#2C2F32",
  greenGradientDark: "#D3FFE7",
  greenGradientLight: "#EFFFF6",
  yellow: "#FFCA1D",
  darkGreen: "#2ECA45",
  lighterGreen: "#65C466",
  imageBorderColor: "#EAF5EF",
  switchBgColor: "#E9E9EA",
  switchDarkColor: "#39393D",
  lightBlack: "#292C2E",
  darkBlue: "#0786BF",
  darkGrey: "#D9D9D9",
  modalBoxShadow: "#E2ECF980",
  calendarBg: "#F6F8FC",
  blueChalk: "#E6EDFA",
  layoutBlack: "#292C2E",
  lightGray: "#B5B7C0",
  cement: "#F5F5F5",
  lighterBluish: "#EEF4FF",
  spanishCarmine: "#008767",
  searchInputColor: "#B5B7C0",
  iceberg: "#A6E7D866",
  alabaster: "#F9FBFF",
  stormDust: "#646466",
  chartTitle: "#202224",
  selectText: "#7E7E7E",
  chartStopColor: "#4379EE",
  chartTickLine: "#EAEAEA",
  exportIcon: "#263238",
  chartTooltip: "#5E77FF",
  lighterWhitish: " #F1F2F4",
  barChartAxis: "#A0AEC0",
  lightBlue: "#0EC5EA",
  inkBlue: "#0C6DFB",
  limedSpruce: "#394851",
  charcoal: "#343837",
  dawn: "#A6A29A",
  thickBlue: "#0E6EEE",
  thickRed: "#DF3243",
  stepColor: "#A1AEBE",
  hoverBtn:"#ADD7EA",
  textAreaText:"#919294"
};

const darkTheme = {
  primary: "#514EF3",
  green: "#00AC4F",
  lightGreen: "#16C098",
  modalBg: "#323639",
  activeColor: "#0787C0",
  white: "#FFFFFF",
  black: "#000000",
  textFieldBg: "#F9FBFF",
  grey: "#7E92A2",
  lightGrey: "#9A9BA0",
  gunMetal: "#112E3A",
  turquoise: "#3ADAD9",
  validate: "#DF0404",
  blue: "#316CF4",
  purple: "#6B47BD",
  orange: "#FF8E29",
  carmine: "#D0004B",
  labelText: "#292D32",
  uploadText: "#3D3C42",
  creamWhite: "#E7E7E7",
  lightModalBg: "#2C2F32",
  greenGradientDark: "#D3FFE7",
  greenGradientLight: "#EFFFF6",
  yellow: "#FFCA1D",
  darkGreen: "#2ECA45",
  lighterGreen: "#65C466",
  imageBorderColor: "#EAF5EF",
  switchBgColor: "#E9E9EA",
  switchDarkColor: "#39393D",
  darkGrey: "#D9D9D9",
  modalBoxShadow: "#E2ECF980",
  lightBlack: "#292C2E",
  darkBlue: "#0786BF",
  calendarBg: "#F6F8FC",
  blueChalk: "#E6EDFA",
  layoutBlack: "#292C2E",
  lightGray: "#B5B7C0",
  cement: "#F5F5F5",
  lighterBluish: "#EEF4FF",
  spanishCarmine: "#008767",
  searchInputColor: "#B5B7C0",
  iceberg: "#A6E7D866",
  alabaster: "#F9FBFF",
  stormDust: "#646466",
  chartTitle: "#202224",
  selectText: "#7E7E7E",
  chartStopColor: "#4379EE",
  chartTickLine: "#EAEAEA",
  exportIcon: "#263238",
  chartTooltip: "#5E77FF",
  lighterWhitish: " #F1F2F4",
  barChartAxis: "#A0AEC0",
  lightBlue: "#0EC5EA",
  inkBlue: "#0C6DFB",
  limedSpruce: "#394851",
  charcoal: "#343837",
  dawn: "#A6A29A",
  thickBlue: "#0E6EEE",
  thickRed: "#DF3243",
  stepColor: "#A1AEBE",
  hoverBtn:"#ADD7EA",
  textAreaText:"#919294"
};

let isDarkMode = false;

export const colors = isDarkMode ? darkTheme : lightTheme;

export const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.activeColor,
    },
    error: {
      main: colors.validate,
    },
    info: {
      main: colors.grey,
    },
  },
  typography: {
    fontFamily: [fonts.primary].join(","),
    body1: {
      fontSize: "1rem",
      fontWeight: 500,
    },
    h6: {
      fontSize: "0.8rem",
      fontWeight: 600,
      color: colors.validate,
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: colors.textFieldBg,
            borderRadius: 10,
            fontSize: 14,
            "& .MuiOutlinedInput-notchedOutline": {
              borderRadius: 10,
              borderColor: colors.creamWhite,
            },
          },
          "& input:-webkit-autofill": {
            transition:
              "background-color 0s 600000s, color 0s 600000s !important",
          },
          "& input": {
            paddingBlock: 16,
            paddingInline: 18,
            color:colors.black
          },
          "& .MuiInputBase-root.MuiOutlinedInput-root:hover:not(.Mui-focused)":
            {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: colors.grey,
                borderWidth: 2,
              },
            },
        },
      },
    },
    MuiSelect: {
      defaultProps: {
        IconComponent: ExpandMoreRoundedIcon,
        MenuProps: {
          sx: {
            "& .MuiPaper-root": {
              boxShadow: `${hex2rgba(
                colors.black,
                0.2
              )} 6px 2px 16px 0px, ${hex2rgba(
                colors.white,
                0.8
              )} -6px -2px 16px 0px`,
            },
          },
        },
      },
      styleOverrides: {
        root: {
          borderRadius: 10,
          backgroundColor: colors.textFieldBg,
          "& .MuiSvgIcon-root": {
            transition: "400ms ease all",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderRadius: 10,
            borderColor: colors.creamWhite,
          },
          "& > .MuiSelect-select": {
            paddingBlock: 15,
            fontSize: 14,
          },
          "& > .MuiSelect-select.MuiSelect-outlined.MuiInputBase-input.MuiOutlinedInput-input":
            {
              paddingLeft: 18,
            },
          "&.MuiInputBase-root.MuiOutlinedInput-root:hover:not(.Mui-focused) .MuiOutlinedInput-notchedOutline":
            {
              borderColor: colors.grey,
              borderWidth: 2,
            },
        },
      },
    },
    MuiPagination: {
      styleOverrides: {
        root: {
          "& .MuiPaginationItem-root:not(.MuiPaginationItem-ellipsis)": {
            borderRadius: "4px",
            border: `1px solid ${colors.creamWhite}`,
            backgroundColor: colors.cement,
            color: colors.labelText,
            fontWeight: 700,
          },
          "& .MuiPaginationItem-root.Mui-selected,.MuiPaginationItem-root.Mui-selected:hover":
            {
              outline: colors.primary,
              border: `1px solid ${colors.primary}`,
              backgroundColor: colors.primary,
              color: colors.white,
              fontWeight: 700,
            },
          "& .MuiPagination-ul": {
            justifyContent: "flex-end",
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          "& .MuiSvgIcon-root": {
            fill: colors.lightGreen,
            fontSize: 28,
          },
        },
      },
    },
    MuiPaginationItem: {
      defaultProps: {
        slots: { previous: LeftArrow, next: RightArrow },
      },
    },
    MuiStepIcon: {
      styleOverrides: {
        root: {
          "&.MuiSvgIcon-root.MuiStepIcon-root.Mui-completed": {
            color: colors.blue,
          },
          "&.MuiSvgIcon-root.MuiStepIcon-root": {
            color: colors.white,
          },
          "& .MuiStepIcon-text": {
            fill: colors.black,
          },
          "&.MuiSvgIcon-root.MuiStepIcon-root.Mui-active": {
            fill: colors.primary,
          },
        },
      },
    },
  },
});
