import { colors, fonts, hex2rgba } from "../../../config/theme";

export const styles = {
  tableContainer: {
    ".MuiTableCell-root": {
      borderBottom: "none",
      color: "inherit",
      textWrap: "nowrap",
      pl: 0,
      fontWeight: 700,
    },
    "& .MuiTableRow-head": {
      color: colors.lightGray,
      fontWeight: "700 !important",
    },
  },
  tableBody: {
    "& .MuiTableCell-body": {
      color: colors.labelText,
      fontSize: "clamp(0.75rem, 0.7346rem + 0.0877vw, 0.875rem)",
      fontWeight: 700,
      borderBottom: "1px solid #EEEEEE",
    },
    "& .MuiTableRow-root:last-child .MuiTableCell-body": {
      borderBottom: "none",
    },
  },
  contentContainer: {
    background: colors.white,
    p: { xs: 2, md: 4 },
    borderRadius: "15px",
  },
  requestText: {
    fontSize: "(1.125rem, 1.0943rem + 0.1754vw, 1.375rem)",
    fontWeight: 700,
  },
  rejectButtonContainer: {
    "&.MuiButtonBase-root": {
      width: "30px",
      height: "30px",
      borderRadius: "4px",
      background: colors.validate,
    },
  },
  acceptButtonContainer: {
    "&.MuiButtonBase-root": {
      width: "30px",
      height: "30px",
      borderRadius: "4px",
      background: colors.green,
    },
  },
  disabledButton:{
    "&.MuiButtonBase-root": {
      width: "30px",
      height: "30px",
      borderRadius: "4px",
      background: colors.lightGray,
    },
  },
  whiteColor: {
    color: colors.white,
  },
  dataStats: {
    color: colors.lightGray,
    fontSize: "14px",
    fontWeight: 700,
  },
  NoDataStyle:{
    color: colors.lightGray,
    fontSize: "20px",
    fontWeight: 700,
    textAlign:'center'
  },
  activeTab: {
    px: "clamp(0.625rem, 0.5099rem + 0.6579vw, 1.5625rem);",
    height: "43px",
    color: colors.white,
    "&:hover": {
      color: colors.white,
    },
    fontWeight: 600,
    fontFamily: fonts.primary,
  },
  inActiveTab: {
    px: "clamp(0.625rem, 0.5099rem + 0.6579vw, 1.5625rem);",
    height: "43px",
    color: colors.black,
    "&:hover": {
      color: colors.black,
    },
    fontWeight: 500,
    fontFamily: fonts.primary,
  },
  reasonForRejectionModal: {
    width: "clamp(17.5rem, 14.1996rem + 18.8596vw, 44.375rem)",
    height: "clamp(21.875rem, 21.0921rem + 4.4737vw, 28.25rem)",
  },
  descriptionText: {
    fontWeight: "700 !important",
    position: "relative",
    left: -7,
    top: -5,
    color: colors.labelText,
  },
  campaignDetails: {
    width: "90vw",
    maxWidth: "710px",
    height: "80vh",
    mb: 2,
    pb:1,
    overflowY: "scroll !important",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  assignButton: {
    "&.MuiButtonBase-root": {
      width: 84,
      height: 30,
      backgroundColor: colors.blue,
      color: colors.white,
      borderRadius: "5px",
      textTransform: "none",
      boxSizing: "border-box",
      cursor: "pointer",
    },
  },
  pointer: {
    cursor: "pointer",
  },
  readonlyFieldLabels: {
    fontWeight: "700",
    ml: 0.5,
    mb: 1,
    color: colors.labelText,
    fontSize: "14px",
  },
  inputText:{
    width: "100%",
    '& .MuiInputBase-input': {
      color:colors.uploadText,
      fontWeight: 700,
    },
  },
  rejectCampaignBtn: {
    "&.MuiButtonBase-root": {
      backgroundColor: hex2rgba(colors.validate, 0.35),
      color: colors.validate,
      border: "none",
      borderRadius: "70px",
      textTransform: "none",
      height: "50px",
      width:"100%"
    },
  },
  acceptCampaign: {
    "&.MuiButtonBase-root": {
      backgroundColor: hex2rgba(colors.green, 0.35),
      color: colors.green,
      border: "none",
      borderRadius: "70px",
      textTransform: "none",
      height: "50px",
      width:"100%"
    },
  },
  reasonForRejectionText: {
    fontWeight: 700,
    fontSize: "clamp(1.125rem, 1.0943rem + 0.1754vw, 1.375rem)",
  },
  greenColor: {
    color: colors.green,
  },
  redColor: {
    color: colors.validate,
  },
  submitBtn: {
    width: 138,
    height: 48,
    alignSelf: "center",
    borderRadius: "5px",
  },
  modalAssignBtn: {
    position: "absolute",
    right: { xs: "30px", md: "80px" },
    top: { xs: "60px", md: "30px" },
    zIndex:2
  },
  nextBtn:{
    "&.MuiButtonBase-root": {
      borderRadius: "70px",
      width: "202px",
      height: "48px",
      mx:'auto',
      textTransform:'none'
    },
  },
  hostAdImage:{ borderRadius: "10px",height:'250px' }
};
