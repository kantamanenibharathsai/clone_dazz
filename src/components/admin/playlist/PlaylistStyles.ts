import { colors, fonts } from "../../../config/theme";

export const playlistStyles = {
  mainBox: {
    bgcolor: colors.white,
    p: { xs: 0, sm: 2 },
    borderRadius: 10,
    overflow: "auto",
    "::-webkit-scrollbar": {
      display: "none",
    },
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
    flexDirection: { xs: "column", md: "row" },
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
    flexDirection: { xs: "column", sm: "row" },
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
    "& .MuiInputBase-input.MuiOutlinedInput-input": {
      paddingRight: "24px",
      width: { xs: "100px", sm: "60px", md: "30px", lg: "100px" },
    },
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
  errorMessage: {
    color: "red",
    textAlign: "center",
    width: "100%",
  },
  modalCon: {
    width: { xs: "90vw", sm: "75vw", md: "40vw" },
    display: "flex",
    bgcolor: colors.lightBlack,
    borderRadius: "30px",
    boxSizing: "border-box",
    px: { xs: 2, sm: 6 },
    py: 3,
  },
  modalButton: {
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
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  input: { bgcolor: colors.white, p: 2, borderRadius: "10px" },
  textArea: {
    backgroundColor: colors.white,
    padding: "15px",
    borderRadius: "10px",
    height: "130px",
    resize:"none" as "none"
  },
  addBtn: {
    width: "220px",
    height: "60px",
    ml: "auto",
    mr: "auto",
    fontSize: "16px",
    mt: "20px",
  },
};
