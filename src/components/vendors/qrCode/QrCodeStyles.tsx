import { colors } from "../../../config/theme";
import { qrCodeImg } from "../assets";
export const qrCodeStyles = {
  qrCodeContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  successModalText: {
    fontSize: "clamp(1.375rem, 1.352rem + 0.1316vw, 1.5625rem)",
    fontWeight: 600,
    textAlign: "center",
  },
  modalContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: colors.white,
    width: { xs: 300, sm: 450, md: 692 },
    my: "3%",
    "& .MuiBox-root": { mt: "8%", mb: "8%" },
  },
  discountTextBox: {
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    justifyContent: "space-between",
    gap: 1,
    width: { xs: 300, sm: 386 },
    mb: "8%",
    "& .MuiTypography-root": {
      fontSize: "clamp(1rem, 0.9846rem + 0.0877vw, 1.125rem)",
      fontWeight: 500,
      whiteSpace: "nowrap",
      textAlign: "center",
    },
  },
  headerBox: {
    height: 70,
    width: "100%",
    bgcolor: colors.primary,
    display: "flex",
  },
  headerIconTextBox: {
    display: "flex",
    alignItems: "center",
    pl: 2,
    gap: 2,
    "& .MuiButtonBase-root": {
      bgcolor: colors.white,
      height: 38,
      width: 38,
      "&:hover": {
        bgcolor: colors.white,
      },
    },
    "& .MuiTypography-root": {
      fontSize: "clamp(1.0625rem, 1.0395rem + 0.1316vw, 1.25rem)",
      fontWeight: 500,
      color: colors.white,
    },
  },
  qrCodeMainBox: {
    width: { xs: 300, sm: 500, md: 750 },
    bgcolor: colors.white,
    borderRadius: 5,
    boxShadow: "rgba(226, 236, 249, 0.5) 0px 10px 60px 0px",
    my: 5,
    pb: 5,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& .MuiTypography-root": {
      fontSize: "clamp(1.4375rem, 1.4145rem + 0.1316vw, 1.625rem)",
      fontWeight: 600,
      mt: "5%",
      mb: "5%",
    },
    "& .MuiTextField-root": { mt: "5%", mb: "5%" },
  },
  qrCodeBox: {
    backgroundImage: `url(${qrCodeImg})`,
    backgroundSize: "cover",
    height: 144,
    width: 144,
    p: 2.5,
  },
  qrCode: { height: "auto", maxWidth: "100%", width: "100%" },
};
export const qrFormStyles = {
  form: {
    px: { xs: 3, sm: 5 },
    "& .MuiFormHelperText-root .Mui-error": { mb: 0 },
    "& .MuiTextField-root": { mt: 0, mb: 0 },
    "& .MuiTypography-root": { mt: 0, mb: 0 },
  },
  fillText: { pt: 5, pb: 0 },
  helperText: {
    "&.MuiTypography-root": {
      fontSize: 12,
      height: 12,
      pb: 0,
      pt: 0,
    },
  },
};
