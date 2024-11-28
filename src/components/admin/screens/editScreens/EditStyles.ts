import { colors } from "../../../../config/theme";

export const configurationStyles = {
  checkBoxContainer: { flexWrap: "wrap", flexDirection: "row", maxWidth: 600 },
  label: {
    "& .MuiTypography-root": {
      fontSize: 14,
      color: colors.grey,
      fontWeight: 500,
      minWidth: 120,
    },
  },
  errorMsg: { height: "20px", textTransform: "lowercase" },
  mainContainer: { width: "100%", flexDirection: "row", gap: 2 },
  formCon: {
    width: "100%",
    boxSizing: "border-box",
    bgcolor: colors.white,
    borderRadius: "40px",
    px: { xs: "15px", sm: "50px", lg: "70" },
    py: "30px",
  },
  heading: {
    fontSize: "22px",
    fontWeight: "600",
  },
  generalSection: {
    flexDirection: { xs: "column", lg: "row" },
    width: "100%",
  },
  generalItem: {
    width: { xs: "100%", md: "50%" },
    flexDirection: "column",
    gap: 1,
  },
  input: {
    width: "100%",
  },
  addBtn: { width: "220px", height: "50px", ml: "auto", mr: "auto" },
  mapCon: {
    width: "100%",
    boxSizing: "border-box",
    bgcolor: colors.white,
    p: "35px",
    borderRadius: "40px",
  },
  map: { borderRadius: "40px", height: { xs: "450px", lg: "100%" } },
  switchContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: 2,
    width: { xs: "100%", md: '"50%' },
  },
  switchGrid: {
    height: "70px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    "& p": { width: "60%", fontSize: "15px" },
    switch: {
      width: "40%",
      ml: "15px",
    },
  },
  deviceOwner: {
    bgcolor: colors.white,
    width: "100%",
    px: { xs: "20px", sm: "70px" },
    py: "30px",
    boxSizing: "border-box",
    borderRadius: "30px",
  },
  slider: {
    color: colors.lightBlue,
    "& .MuiSlider-thumb": {
      borderRadius: "3px",
      width: "5px",
    },
  },
  sliderSwitch: { ml: "10px", mt: "20px", mb: "30px", alignSelf: "start" },
  saveBtn: { ml: "auto", mr: "auto", mt: "50px" },
  tagsContainer: {
    width: "50%",
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
};
export const fileStyles = {
  mainContainer: {
    bgcolor: colors.white,
    borderRadius: "30px",
    px: "40px",
    py: "25px",
  },
  text: { fontSize: "22px", fontWeight: 700 },
  card: {
    width: "200px",
    "& p,span": { fontWeight: 600 },
  },
  filesContainer: {
    mt: 2,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,minMax(220px,1fr))",
    gridTemplateRows: "300px",
    placeItems: "center",
    flexGrow: 1,
  },
};

export const networkStyles = {
  chartContainer: {
    borderRadius: 8,
    padding: { xs: "10px", sm: "10px 50px" },
    backgroundColor: colors.white,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    height: "365px",
    flexDirection: "column",
  },
  detailsContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 2,
  },
  textContainer: {
    display: "flex",
    gap: 1,
    color: colors.selectText,
    fontSize: "16px",
    fontWeight: "400",
  },
  mainContainer: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: { xs: "10px", sm: "20px 40px" },
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
  customTooltip: {
    bgcolor: colors.white,
    p: 1,
    borderRadius: 2,
    border: `1px solid ${colors.lighterWhitish}`,
  },
};
export const additionalInfoStyles = {
  mainContainer: { bgcolor: colors.white, borderRadius: "40px", py: "35px" },
  textHead: { px: "50px", mb: "20px", fontSize: "20px" },
  infoField: {
    flexDirection: "row",
    width: "100%",
    padding: "20px",
    gap: 2,
    boxSizing: "border-box",
    "& p": {
      width: "100%",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  },
  loaderContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "7vh",
  },
};
export const settingStyles = {
  mainContainer: {
    width: { xs: "100%", lg: "50%" },
    flexDirection: "column",
    gap: 2,
    padding: "30px",
    boxSizing: "border-box",
    bgcolor: colors.white,
    borderRadius: "30px",
  },
  btn: {
    fontSize: { xs: "8px", sm: "15px", lg: "15px" },
    bgcolor: colors.validate,
    height: "40px",
    minWidth: { xs: "100px", sm: "150px" },
    "&:hover": {
      bgcolor: colors.validate,
    },
  },
  heading: {
    fontSize: "22px",
  },
  subHead: {
    mt: "25px",
    fontSize: "16px",
    fontWeight: 600,
  },
};
