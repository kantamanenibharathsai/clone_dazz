import { colors, fonts, hex2rgba } from "../../../config/theme";

export const addNewCampaign = {
  title: {
    fontSize: 20,
    fontWeight: 500,
    mb: 3,
  },
  campaignTextField: {
    ml: 0,
    mb: 1,
    fontSize: 14,
    fontWeight: 500,
    minWidth: 300,
  },
  selectField: {
    maxWidth: { xs: "initial", md: 422 },
    color: hex2rgba(colors.black, 0.5),
  },
};

export const chooseSlotsStyles = {
  containerMain: {
    maxWidth: 1450,
  },
  title: {
    fontSize: "clamp(1.125rem, 1.0353rem + 0.5128vw, 1.5rem)",
    fontWeight: 600,
  },
  flexBox: {
    gap: 1,
    justifyContent: "center",
    width: "max-content",
  },
  subTitle: {
    mb: 1,
    fontWeight: 600,
    color: colors.lightGreen,
  },
  checkBoxContainer: { flexWrap: "wrap", flexDirection: "row", maxWidth: 600 },
  label: {
    "& .MuiTypography-root": {
      fontSize: 14,
      color: colors.grey,
      fontWeight: 500,
      minWidth: 120,
    },
  },
  aside: { display: "flex", flexDirection: "column" },
  continueBtn: { height: 50, mt: "auto", maxWidth: "80%" },
};

export const pricingModelStyles = {
  selectField: {
    minWidth: 300,
  },
  adTypeErrorTxt: {
    ml: 1,
    mt: 0.5,
    fontWeight: 400,
    fontSize: 11,
  },
};

export const mediaByGenre = {
  flexWrap: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,minMax(160px,1fr))",
    gridTemplateRows: "160px",
    placeItems: "center",
    rowGap: "10px",
    columnGap: "10px",
    minHeight: 320,
    mb: 2,
  },
  helperTxt: { height: 16, fontSize: 14, textAlign: "center", mb: 2 },
  mediaCard: {
    hexogonImgContainer: {
      width: "80px",
      height: "80px",
    },
    imgStyles: {
      width: "60px",
      left: 10,
      bottom: 27,
    },
    mainContainer: {
      width: "160px",
      height: "160px",
    },
  },
  errorTxt: {
    fontSize: 12,
    color: colors.validate,
    textAlign: "center",
  },
};

export const selectCategory = {
  searchField: {
    "& svg": {
      width: 30,
      height: 30,
    },
    "& input": {
      paddingBlock: "16px",
      paddingInline: "18px",
      paddingLeft: "10px",
    },
    "& .MuiOutlinedInput-root": {
      bgcolor: colors.lighterBluish,
      fontWeight: 400,
      "& .MuiOutlinedInput-notchedOutline": {
        borderRadius: "10px",
        borderColor: "transparent",
      },
    },
  },
  categoriesContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,minMax(150px,1fr))",
    rowGap: "10px",
    columnGap: "10px",
    minHeight: 400,
    mb: 2,
    "& > div": {
      width: "150px",
      height: "250px",
      m: "0",
    },
    "& p": {
      fontSize: 14,
    },
    "& img": {
      objectFit: "cover",
    },
  },
  singleScreenPopUp: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    overflowY: "auto",
    zIndex: 12,
    width: "90dvh",
    height: "90dvh",
    borderRadius: 6,
    px: 5,
    pt: 3,
    pb: 1,
    bgcolor: colors.white,
    boxSizing: "border-box",
    boxShadow: `0 0 200px 170px ${hex2rgba(colors.black, 0.7)}`,
  },
  imageStyle: {
    width: 140,
    aspectRatio: 1,
    borderRadius: 4,
    objectFit: "cover",
    cursor: "pointer",
  },
};

export const uploadFilesStyles = {
  btn: {
    height: 48,
    bgcolor: hex2rgba(colors.grey, 0.1),
    color: colors.black,
    maxWidth: 120,
    "&:hover": {
      color: colors.black,
    },
    mx: "auto",
  },
  sendApproveBtn: {
    height: 48,
    maxWidth: 180,
    fontWeight: 500,
  },
};

export const checkoutStyle = {
  listItem: {
    mb: 6,
    "& h6": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      mb: 1,
      color: "black",
    },
    "& h6:not(:last-child)": {
      fontFamily: fonts.secondary,
      fontWeight: 400,
    },
    "& h6 *": {
      fontFamily: "inherit",
      fontWeight: "inherit",
    },
    "& .rupeeSymbol": {
      fontFamily: "initial !important",
    },
  },
  couponCard: {
    border: `1px solid ${colors.primary}`,
    borderRadius: "10px",
    p: 1,
    mb: 1,
  },
  couponApplyBtn: {
    height: 29,
    fontSize: 13,
    borderRadius: 1.2,
    fontWeight: 500,
    textTransform: "capitalize",
  },
  couponCode: {
    fontWeight: 500,
    fontSize: 14,
    color: colors.lightBlue,
    width: 250,
    textWrap: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  couponSubTxt: {
    fontWeight: 500,
    fontSize: 13,
    color: colors.yellow,
  },
  checkoutBtn: { height: 48, mb: 1 },
  callBackBtn: {
    height: 48,
    color: colors.black,
    border: `2px solid ${colors.primary}`,
  },
  applyBtn: {
    height: 29,
    fontSize: 14,
    borderRadius: 1.2,
    fontWeight: 500,
    color: colors.spanishCarmine,
    bgcolor: hex2rgba(colors.lightGreen, 0.4),
    borderWidth: 1,
    "&:hover": {
      bgcolor: hex2rgba(colors.lightGreen, 0.5),
      color: colors.spanishCarmine,
      borderWidth: 1,
    },
    border: `1px solid ${hex2rgba(colors.spanishCarmine, 0.5)}`,
  },
  card: {
    py: 3,
    borderRadius: 7,
    overflow: "hidden",
    bgcolor: colors.white,
    position: "relative",
    boxSizing: "border-box",
    px: 5,
  },
  walletRadio: { position: "absolute", right: 20, top: 20, p: 0 },
  cardHolder: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 4,
  },
  leftContainer: {
    width: "100%",
    minWidth: { xs: "initial", md: 350 },
    maxWidth: 452,
  },
};
