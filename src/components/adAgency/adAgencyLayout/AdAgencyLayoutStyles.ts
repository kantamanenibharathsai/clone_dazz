import { StepConnector, stepConnectorClasses, styled } from "@mui/material";
import { colors } from "../../../config/theme";

export const userLayoutStyles = {
  layoutMain: {
    bgcolor: colors.layoutBlack,
    minHeight: "100vh",
  },
  contentContainer: {
    boxSizing: "border-box",
  },
  welcomeText: {
    color: colors.white,
    fontSize: 24,
    fontWeight: 600,
  },
  formContainer: {
    borderRadius: 6,
    px: 6,
    mt: 8,
    pt: 4,
    pb: 5,
    minHeight: { xs: 250, md: 460 },
    transition: "400ms ease height",
  },
  buttonContainer: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  btn: { height: 48, width: "100%", maxWidth: 188 },
  headerBtn: {
    fontSize: { xs: 10, sm: 14 },
    width: "100%",
    height: { xs: 40, sm: 50 },
    maxWidth: { xs: 150, sm: 223 },
    transition: "700ms ease all",
  },
  stepUi: {
    width: "26.5px",
    height: "26.5px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "13px",
  },
};

export const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 13,
    left: "calc(-50% + 15px)",
    right: "calc(50% + 15px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: colors.primary,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: colors.primary,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : colors.grey,
    borderTopWidth: 2,
  },
}));

export const QontoStepIconRoot = styled("div")<{
  ownerState: { active?: boolean };
}>(({ theme, ownerState }) => ({
  color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
  display: "flex",
  height: 22,
  alignItems: "center",
  ...(ownerState.active && {
    color: "#784af4",
  }),
  "& .QontoStepIcon-completedIcon": {
    color: "#784af4",
    zIndex: 1,
    fontSize: 18,
  },
  "& .QontoStepIcon-circle": {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
}));
