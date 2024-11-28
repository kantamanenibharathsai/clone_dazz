import styled from "@emotion/styled";
import {
  Button,
  TextField,
  TextFieldProps,
  Typography,
  TypographyProps,
} from "@mui/material";
import { colors, fonts } from "../../../config/theme";

export const playlistStyles = {
  mainBox: {
    bgcolor: colors.white,
    p: { xs: 0, sm: 2 },
    borderRadius: 10,
    height: { xs: "82vh", md: "76vh" },
    overflow: "auto",
    "::-webkit-scrollbar": {
      display: "none",
    },
  },
  errorMsg:{
   textAlign:"center",
   color:colors.validate,
   mt:"10px"
  },
  edit: { width: "100%", height: "100%" },
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
  grid: { p: 2 },
  mainContainer: {
    backgroundColor: colors.white,
    borderRadius: "20px",
    padding: { xs: "18px", sm: "45px" },
  },
  titleContainer: {
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    alignItems: "start",
    justifyContent: "space-between",
  },
  title: {
    fontSize: "22px",
    fontWeight: "600",
    whiteSpace: "nowrap",
  },
  subTitle: {
    fontSize: "14px",
    color: colors.lightGreen,
    fontWeight: "500",
  },
  textField: {
    "& .MuiOutlinedInput-root": {
      backgroundColor: colors.textFieldBg,
      borderRadius: "10px",
      height: "50px",
      paddingLeft: "10px",
      "&:hover": {
        borderColor: "transparent",
        outline: "none",
      },
      "& .MuiOutlinedInput-notchedOutline": {
        border: "none",
      },
    },
    "& .MuiInputBase-input": {
      fontSize: "17px",
      fontWeight: "500",
      color: colors.searchInputColor,
      ml: 1,
    },
    icon: {
      height: "25px",
      width: "25px",
    },
  },
  textFieldContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 2,
  },
  sortContainer: {
    display: "flex",
    alignItems: "center",
    border: 0,
    borderColor: "var(--dark-color)",
    backgroundColor: colors.textFieldBg,
    padding: "2px 15px",
    borderRadius: "10px",
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
    color: colors.searchInputColor,
    fontSize: "17px",
    fontWeight: "400",
    textWrap: "nowrap",
  },

  appBarMainContainer: {
    backgroundColor: " #514EF3",
    boxShadow: "0px 4px 50px 0px #00000014",
    height: "8vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxSizing: "border-box",
    px: {
      xs: 1,
      sm: 4,
    },
    overflow: "auto",
    width: "100%",
  },
  avatarBox: {
    width: "30vw",

  },
  avatar: {
    backgroundColor: "white",
    height: "30px",
    width: "30px",
    mr: '4px',
  },
  backButton: {
    color: "black",
    height: "15px",
    width: "15px",
    cursor:"pointer"
  },
  buttonMainContainer: {
    display: "flex",
    gap: 2,
  },
  buttonContainer: {
    display: "flex",
    gap: 1,
    alignItems: "center",
  },
  outlinedButton: {
    "&.MuiButtonBase-root.MuiButton-root": {
      fontSize: "12px",
      fontFamily: "inter",
      color: "white",
      height: "40px"
    }
  },
  layoutButton: {
    "&.MuiButtonBase-root.MuiButton-root": {
      fontSize: "12px",
      fontFamily: "inter",
      color: "white",
      height: "40px",
      width: "120px",
      padding: 0,
      ml: '4px',
    }
  },
  applyButton: {
    "&.MuiButtonBase-root.MuiButton-root": {
      fontSize: "12px",
      fontFamily: "inter",
      color: "white",
      height: "40px",
      padding: 0,
      ml: '4px',
    }
  },
  layoutButtonSide: (text: string) => ({
    fontSize: { sm: '11px', xl: "14px" },
    fontFamily: "inter",
    color: "white",
    height: { sm: '40px', xl: "42px" },
    borderRadius: "30px",
    textTransform: "none",
    bgcolor: text,
    paddingX: '16px',
    "&:hover": {
      bgcolor: text,
    },
  }),
  customContainer: {
    px: "30px",
    boxSizing: "border-box",
  },
  customButtonContainer: {
    display: "flex",
    justifyContent: 'space-between',
    gap: 1,
    py: 3,
    flexWrap: 'wrap',
  },
  inputField: {
    "& .MuiInputBase-input.MuiOutlinedInput-input": {
      p: 1,
    },
    width: "100%",
    flexGrow: 1,
  },
  inputProps: {
    backgroundColor: colors.blueChalk,
    "& fieldset": {
      border: "none",
    },
    width: "100%",
    borderRadius: "10px",
  },
  avatarAddIcon: {
    backgroundColor: colors.inkBlue,
    height: { sm: "30px", md: "40px" },
    width: { sm: "30px", md: "40px" },
  },
  mediaTabsContainer: {
    width: "100%",
    px: 0.5,
  },
  mediaTabs: {
    textTransform: "capitalize",
    fontSize: "11px",
    color: "black",
    fontWeight: 600,
  },
  dividerMedia: {
    position: "relative",
    top: -1.5,
    width: "99%",
  },
  mediaSubContainer: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#2A2C2E",
    height: "92vh",
  },
  modalInputfields: {
    width: '100%',
    marginTop: 1
  },
  modalStack: {
    width: '20vw'
  },
};

export const Input = styled(TextField)<TextFieldProps>(({ theme }) => ({
  "& p": {
    fontSize: 11,
  },
}));

export const Title = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontWeight: 500,
  fontSize: "clamp(0.875rem, 0.8596rem + 0.0877vw, 1rem)",
  marginLeft: 10,
}));

export const CustomButton = styled(Button)<{
  bgcolor?: string;
  width?: number | string;
  outlined?: boolean;
}>(({ bgcolor, width, outlined }) => {
  return {
    backgroundColor: !outlined ? bgcolor : "",
    color: outlined ? bgcolor : "white",
    width: width,
    borderRadius: 70,
    // fontFamily: "Poppinns",
    border: `2px solid ${bgcolor}`,
    fontWeight: 500,
    boxShadow: "0px",
    fontSize: ".8125rem",
    height: "45px",
    lineHeight: "34px",
    textAlign: "center",
    padding: "0 25px",
    transition: "all .15s ease-in-out",
    textTransform: "capitalize",
    whiteSpace: "nowrap",
    "&:hover": {
      backgroundColor: !outlined ? bgcolor : "",
      color: outlined ? bgcolor : "white",
      border: `2px solid ${bgcolor}`,
    },
  };
});

export const HeaderCustomButton = styled(Button)<{
  bgcolor?: string;
  width?: number | string;
  outlined?: boolean;
  borderColor?: string;
  border?: string;
}>(({ bgcolor, width, outlined, borderColor = "white", border }) => {
  return {
    backgroundColor: !outlined ? bgcolor : "",
    color: outlined ? bgcolor : "white",
    width: width,
    borderRadius: 70,
    border: border ?? `2px solid ${borderColor && bgcolor}`,
    fontWeight: 500,
    boxShadow: "0px",
    fontSize: ".8125rem",
    height: "45px",
    lineHeight: "34px",
    textAlign: "center",
    padding: "0 25px",
    transition: "all .15s ease-in-out",
    textTransform: "capitalize",
    whiteSpace: "nowrap",
    "&:hover": {
      backgroundColor: !outlined ? bgcolor : "",
      color: outlined ? bgcolor : "white",
    },
  };
});