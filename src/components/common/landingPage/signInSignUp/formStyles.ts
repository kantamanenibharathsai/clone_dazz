import { colors, fonts, hex2rgba } from "../../../../config/theme";

export const formStyles = {
  form: {
    width: { xs: 240, sm: 350 },
  },
  pleaseLoginText: {
    fontSize: "clamp(1rem,1.15vw, 1rem)",
    fontFamily: fonts.primary,
    color: colors.lightGrey,
    mb: 5,
  },
  icon: { color: colors.lightGrey },
  accountText: {
    color: colors.white,
    fontFamily: fonts.primary,
    fontSize: "clamp(1rem,1.15vw, 1.5rem)",
  },
  phoneBox: { display: "flex", alignItems: "center", width: "100%", gap: 1 },
  labelText: {
    fontSize: "clamp(0.8296rem,1.15vw, 0.8rem)",
    fontWeight: 500,
    fontFamily: "poppins",
    color: colors.white,
    height: 30,
    flexGrow: 0.9,
    mb: 0.6,
    ml: -1.1,
  },
  flagField: {
    "&.MuiFormControl-root.MuiTextField-root ": {
      width: "101px",
    },
    "&.MuiFormControl-root.MuiTextField-root input": { paddingInline: "0px" },
    "& .MuiInputBase-root.MuiOutlinedInput-root ": {
      paddingLeft: "5px",
      paddingRight: "5px",
    },
  },
  toolTipText: {
    textAlign: "match-parent",
    fontSize: 11,
    color: colors.validate,
  },
  toolTipIcon: { color: colors.lightGrey, fontSize: 20 },
  helperText: { height: 12 },
  flagBox: { height: "100%" },
  inputBox: { color: colors.white, width: "100%" },
  inputFlag: { color: colors.white },

  input: {
    width: "100%",
    "& input::placeholder": {
      fontSize: "clamp(0.8125rem, 0.8048rem + 0.0439vw, 0.875rem)",
    },
  },
  iconBox: (isMessageIcon: boolean) => ({
    display: !isMessageIcon ? "none" : "block",
  }),
  button: { mt: 4 },
  supText: { color: colors.carmine },
  iconButton: { "&.MuiButtonBase-root.MuiIconButton-root": { p: 0 } },
  roleHelperText: {
    fontSize: "11px",
    color: colors.validate,
    fontWeight: 500,
    height: "12px",
  },
  selectInput: (isEmpty: boolean) => ({
    color: isEmpty ? colors.lightGray : "",
    fontSize: !isEmpty
      ? "clamp(0.8125rem, 0.8048rem + 0.0439vw, 0.875rem)"
      : "",
  }),
  dropDownMaxHeight: { maxHeight: 150 },
  forgotPasswordText: {
    color: colors.white,
    fontSize: "12px",
    textAlign: "right",
    cursor: "pointer",
  },
  sendOtpForm: { height: "380px", width: { xs: 240, md: 350 } },
  newPasswordForm: { height: "400px", width: { xs: 240, md: 350 } },
  otpDigitContainer: {
    fontSize: "clamp(1.25rem, 1.2116rem + 0.2193vw, 1.5625rem);",
    px: "clamp(0.9375rem, 0.9114rem + 0.1491vw, 1.15rem);",
    width: "clamp(2.8125rem, 2.6743rem + 0.7895vw, 3.9375rem)",
    height: "clamp(3rem, 2.8388rem + 0.9211vw, 4.3125rem);",
    borderRadius: "11.04px ",
    border: "2.76px solid",
    backgroundColor: hex2rgba(colors.darkGrey, 0.2),
  },
  forgotFlowMainText: {
    fontSize: "22px",
    color: colors.white,
    fontWeight: 600,
    mb: 0.5,
  },
  forgotFlowLabel: {
    color: hex2rgba(colors.white, 0.5),
    fontSize: "14px",
    fontWeight: 500,
  },
  notReceived: {
    fontSize: "clamp(0.9375rem, 0.8991rem + 0.2193vw, 1.25rem)",
    color: colors.grey,
  },
  resendText: {
    textDecoration: "underline",
    color: colors.activeColor,
    cursor: "pointer",
  },
  verifyOtpBtn: {
    color: "white",
    fontWeight: 600,
    padding: "10px, 16px, 10px, 20px",
    width: "clamp(12.5rem, 10.2069rem + 13.1034vw, 22rem)",
    height: "60px",
    textTransform: "none",
    alignSelf: "center",
  },
  eyeIcon: {
    color: colors.lightGray,
  },
};
export const loadingSpinner = { color: colors.white };
export const pendingForApprovalStyles = {
  mainBox: {
    display: "flex",
    flexDirection: { xs: "column-reverse", md: "row" },
    alignItems: "center",
    justifyContent: "center",
    width: { xs: 300, sm: 450, md: 800 },
    m: { xs: 0.5, sm: 2 },
    gap: 3,
  },
  contentBox: { width: { xs: "100%", md: "50%" }, color: colors.white },
  welcomeText: {
    bgcolor: colors.darkBlue,
    fontWeight: 700,
    width: 250,
    p: 1.5,
    fontFamily: fonts.third,
    fontSize: "clamp(1rem, 0.9808rem + 0.1096vw, 1.15625rem)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 2,
  },
  yourText: {
    fontSize: "clamp(1rem, 0.858rem + 0.8114vw, 2.15625rem)",
    fontWeight: 900,
    fontFamily: fonts.third,
    mt: 5,
    position: "relative",
    "&::Before": {
      content: `""`,
      height: 8,
      width: 90,
      position: "absolute",
      bottom: "-15px",
      left: 0,
      bgcolor: colors.white,
      borderRadius: 5,
    },
  },
  asSoonAsText: { fontWeight: 500, fontSize: "", mt: 4, mb: 4 },
  imageBox: { width: { xs: "100%", md: "50%" } },
  image: {
    width: "100%",
    height: "100%",
  },
  forgotPasswordText: {
    color: colors.white,
    fontSize: "12px",
    textAlign: "right",
    cursor: "pointer",
  },
  sendOtpForm: { height: "380px", width: { xs: 240, md: 350 } },
  newPasswordForm: { height: "400px", width: { xs: 240, md: 350 } },
  otpDigitContainer: {
    fontSize: "clamp(1.25rem, 1.2116rem + 0.2193vw, 1.5625rem);",
    px: "clamp(0.9375rem, 0.9114rem + 0.1491vw, 1.15rem);",
    width: "clamp(2.8125rem, 2.6743rem + 0.7895vw, 3.9375rem)",
    height: "clamp(3rem, 2.8388rem + 0.9211vw, 4.3125rem);",
    borderRadius: "11.04px ",
    border: "2.76px solid",
    backgroundColor: hex2rgba(colors.darkGrey, 0.2),
  },
  forgotFlowMainText: {
    fontSize: "22px",
    color: colors.white,
    fontWeight: 600,
    mb: 0.5,
  },
  forgotFlowLabel: {
    color: hex2rgba(colors.white, 0.5),
    fontSize: "14px",
    fontWeight: 500,
  },
  notReceived: {
    fontSize: "clamp(0.9375rem, 0.8991rem + 0.2193vw, 1.25rem)",
    color: colors.grey,
  },
  resendText: {
    textDecoration: "underline",
    color: colors.activeColor,
    cursor: "pointer",
  },
  verifyOtpBtn: {
    color: "white",
    fontWeight: 600,
    padding: "10px, 16px, 10px, 20px",
    width: "clamp(12.5rem, 10.2069rem + 13.1034vw, 22rem)",
    height: "60px",
    textTransform: "none",
    alignSelf: "center",
  },
  eyeIcon: {
    color: colors.lightGray,
  },
};
