import { colors } from "../../../config/theme";

export const vendorsStyles = {
  modalBox: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "80%", sm: "85%", md: "70%", lg: "60%" },
    bgcolor: colors.lightBlack,
    borderRadius: 6,
    boxShadow: "rgba(226, 236, 249, 0.5) 0px 10px 60px 0px",
    p: 4,
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
  checkBoxMain: { display: "flex", gap: 0.5, alignItems: "center" },
  splitText: {
    color: colors.dawn,
    fontSize: "clamp(0.875rem, 0.8596rem + 0.0877vw, 1rem)",
  },
  firstDropBox: {
    height: 300,
    borderRadius: 10,
    width: { xs: "100%", sm: "75%" },
    mx: "auto",
  },
  secondDropBox: {
    mt: 3,
    height: 220,
    borderRadius: 10,
    width: { xs: "100%", sm: "75%" },
    mx: "auto",
  },
};
