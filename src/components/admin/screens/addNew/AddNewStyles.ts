import { colors } from "../../../../config/theme";

export const addNewStyles = {
  mainContainer: {
    width: "400px",
    height: "260px",
    display: "flex",
    flexWrap: "wrap",
    borderRadius: "30px",
  },
  innerCard: (bgcolor: string, radius: string) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    height: "50%",
    bgcolor: bgcolor,
    borderRadius: radius,
    "& p": { color: "white" },
    "& :nth-of-type(1)": {
      cursor: "pointer",
    },
  }),
  iconBtn: (color:string) => ({
    bgcolor: "white",
    width: "44px",
    height: "44px",
    "&:hover": { bgcolor: colors.creamWhite },
    "& :nth-of-type(1)": {
      color: color,
    },
  }),
};
