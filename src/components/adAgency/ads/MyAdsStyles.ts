import { colors, fonts, hex2rgba } from "../../../config/theme";

export const myAdsStyles = {
  mainContainer: {
    backgroundColor: colors.white,
    borderRadius: "25px",
    padding: { xs: "18px", sm: "45px" },
    minHeight: "60vh",
    position: "relative",
    overflow: "hidden",
  },
  titleContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  title: {
    fontSize: "22px",
    fontWeight: "600",
  },
  subTitle: {
    fontSize: "14px",
    color: colors.lightGreen,
    fontWeight: "500",
  },
  textField: {
    "& .MuiOutlinedInput-root": {
      height: "50px",
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "transparent",
      },
    },
    "& .MuiInputBase-input": {
      fontSize: 16,
      fontWeight: 400,
      ml: 1,
      paddingInline: "0px",
    },
    "& .searchIcon": {
      width: 40,
      height: 40,
    },
  },
  textFeildContainer: {
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
    minWidth: 180,
  },
  menuItem: {
    color: hex2rgba(colors.black, 0.5),
    fontSize: 16,
    fontWeight: 400,
    textWrap: "nowrap",
  },

  mainBox: {
    bgcolor: colors.white,
    p: { xs: 0, sm: 2 },
    borderRadius: 5,
    height: { xs: "82vh", md: "76vh" },
    overflow: "auto",
    "::-webkit-scrollbar": {
      display: "none",
    },
  },
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
  textFieldContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 2,
  },
};
