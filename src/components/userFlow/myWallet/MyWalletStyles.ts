import { colors } from "../../../config/theme";
import { hex2rgba } from "./../../../config/theme";

export const myWalletStyles = {
  mainContainer: {
    backgroundColor: colors.white,
    borderRadius: "25px",
    padding: { xs: "18px", sm: "30px" },
    display: "flex",
    justifyContent: "space-between",
    flexDirection: { xs: "column", sm: "row" },
    alignItems: "center",
    gap: { xs: 2, sm: 0 },
  },
  transactionsContainer: {
    backgroundColor: colors.white,
    borderRadius: "25px",
    mt: 5,
    pb: 3,
  },
  transactionsText: {
    color: colors.black,
    fontSize: "22px",
    fontWeight: "600",
    padding: { xs: "18px", sm: "30px" },
  },
  transactionsBox: {
    display: "flex",
    fleDirection: "column",
    alignItems: "center",
    ":nth-of-type(odd)": {
      background: hex2rgba(colors.searchInputColor, 0.3),
    },
    padding: "15px 30px",
  },
  transactionText: {
    fontSize: "15px",
    fontWeight: "500",
  },
  addMoneyBtn: { height: 48, width: "100%", maxWidth: 154 },
  paymentBtn: { height: "45px", width: "fit-content", alignSelf: "center" },
  tableContainer:{ mx: "auto", maxWidth: "100%", px: 2, boxSizing: "border-box" },
  detailsTableRow:{
    "&:last-child td, &:last-child th": { border: 0 },
    ":nth-of-type(odd)": {
      background: hex2rgba(colors.searchInputColor, 0.3),
    },
  }
};
