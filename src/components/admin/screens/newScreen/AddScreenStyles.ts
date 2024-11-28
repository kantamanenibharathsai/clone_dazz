import { SxProps } from "@mui/material";
import { colors, fonts } from "../../../../config/theme";

export const addScreenStyles = {
  checkBoxContainer: { flexWrap: "wrap", flexDirection: "row", maxWidth: 600 },
  label: {
    "& .MuiTypography-root": {
      fontSize: 14,
      color: colors.grey,
      fontWeight: 500,
      minWidth: 120,
    },
  },
  formModal: {
    mainContainer: {
      width: "70vw",
      flexDirection: "column",
      gap: 2,
    },
    formCon: {
      display: "flex",
      flexDirection: "column",
      gap: 2,
      bgcolor: colors.white,
      borderRadius: "40px",
      px: { xs: "15px", sm: "50px", lg: "70" },
      py: "30px",
    },
    input: {
      width: "100%",
    },
    errorMsg: { height: "20px", textTransform: "lowercase" },
    addBtn: { width: "220px", height: "50px", ml: "auto", mr: "auto" },
    mapCon: {
      bgcolor: colors.white,
      p: "50px",
      borderRadius: "40px",
    },
    map: { borderRadius: "40px", height: "50vh" },
    tagsContainer: {
      width: "100%",
      backgroundColor: colors.textFieldBg,
      borderRadius: "10px",
      border: `1.5px solid ${colors.creamWhite}`,
    },
    tagsList: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 1,
      flex: 1,
      boxSizing: "border-box",
      p: 2,
    },
    root: {
      flex: 1,
      height: "fit-content",
      "& .MuiOutlinedInput-root": {
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "transparent",
        },
        "&.Mui-focused fieldset": {
          borderColor: "transparent",
        },
      },
      "& .MuiInputBase-root.MuiOutlinedInput-root:hover:not(.Mui-focused)": {
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "transparent",
        },
      },
    },
    tagElement: {
      bgcolor: colors.greenGradientDark,
      borderRadius: "5px",
      p: "5px",
      "& p": {
        fontSize: "12px",
        maxWidth: "110px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      },
    },
    closeIcon: { fontSize: "13px", cursor: "pointer" },
  },
  mediaModal: {
    modalBox: {
      width: { xs: "80vw", sm: "50vw" },
      display: "flex",
      bgcolor: colors.lightBlack,
      borderRadius: "30px",
      boxSizing: "border-box",
      px: 7,
      py: 7,
    },

    buttonsBox: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      alignItems: "center",
    },
    uploadText: {
      color: colors.white,
      fontWeight: 500,
      fontSize: "clamp(1.375rem, 1.3596rem + 0.0877vw, 1.5rem)",
    },
    videoButton: {
      "&.MuiButtonBase-root": {
        bgcolor: colors.charcoal,
        border: "2px solid",
        borderColor: colors.limedSpruce,
        width: 100,
      },
    },

    firstDropBox: { height: "300px" },
  },
  groupModal: {
    modalGroup: {
      width: { xs: "90vw", sm: "75vw", md: "60vw", lg: "40vw" },
      maxHeight: "85vh",
      overflowY: "auto",
      display: "flex",
      bgcolor: colors.lightBlack,
      borderRadius: "30px",
      boxSizing: "border-box",
      px: { xs: 2, sm: 8 },
      py: 3,
    },
    inputContainer: {
      display: "flex",
      flexDirection: "column",
    },
    input: { bgcolor: colors.white, p: 2, borderRadius: "20px" },

    textArea: {
      backgroundColor: colors.white,
      padding: "15px",
      borderRadius: "20px",
      height: "130px",
      fontFamily: fonts.primary,
      fontWeight: "500",
      fontSize: 14,
      color: colors.textAreaText,
      resize:"none" as "none"
    },
    addBtn: {
      width: "220px",
      height: "60px",
      ml: "auto",
      mr: "auto",
      fontSize: "16px",
    },
  },
  error: {
    height: "25px",
    fontSize: "11px",
    color: "red",
    px: "14px",
    mt: "3px",
  },
  menuItem: {
    color: colors.lightGray,
    fontSize: "17px",
    fontWeight: "400",
    textWrap: "nowrap",
    textTransform: "capitalize",
    width: "300px",
  },
} satisfies Record<string, SxProps>;
