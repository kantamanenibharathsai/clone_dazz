import { colors, fonts, hex2rgba } from "../../../config/theme";

export const calendarStyles = {
  width: "100%",
  bgcolor: colors.calendarBg,
  p: 3,
  borderRadius: 6,

  "& .react-calendar": {
    width: "100%",
    background: "transparent",
    lineHeight: "1.125em",
  },
  "& .react-calendar *": {
    fontFamily: fonts.primary,
  },
  "& .react-calendar--doubleView": {
    width: "700px",
  },
  "& .react-calendar--doubleView .react-calendar__viewContainer": {
    display: "flex",
    margin: "-0.5em",
  },
  "& .react-calendar--doubleView .react-calendar__viewContainer > *": {
    width: "50%",
    margin: "0.5em",
  },
  "& .react-calendar,.react-calendar *,.react-calendar *:before, .react-calendar *:after":
    {
      boxSizing: "border-box",
    },
  "& .react-calendar button": {
    margin: 0,
    border: 0,
    outline: "none",
    marginBottom: "0.3rem",
    padding: "0px",
    width: 50,
    height: 45,
  },
  "& .react-calendar button:enabled:hover": {
    cursor: "pointer",
  },
  "& .react-calendar__navigation": {
    display: "flex",
  },
  "& .react-calendar__navigation button": {
    minWidth: 40,
    background: "none",
  },
  "& .react-calendar__navigation__label__labelText": {
    fontWeight: 500,
    fontSize: 18,
  },
  "& .react-calendar__navigation button:disabled": {
    color: colors.grey,
  },
  "& .react-calendar__navigation button:enabled:hover,.react-calendar__navigation button:enabled:focus":
    {
      bgcolor: "transparent",
    },
  "& .react-calendar__month-view__weekdays__weekday": {
    padding: "0.5em",
    fontSize: "0.75em",
    fontWeight: 500,
    color: hex2rgba(colors.black, 0.5),
    textAlign: "center",
    textTransform: "capitalize",
  },
  "& .react-calendar__month-view__weekdays__weekday > abbr": {
    textDecoration: "none",
  },
  "& .react-calendar__month-view__days__day--neighboringMonth, .react-calendar__decade-view__years__year--neighboringDecade, .react-calendar__century-view__decades__decade--neighboringCentury":
    {
      color: hex2rgba(colors.grey, 0.2),
    },
  "& .react-calendar__month-view__days__day--neighboringMonth:disabled,.react-calendar__decade-view__years__year--neighboringDecade:disabled,.react-calendar__century-view__decades__decade--neighboringCentury:disabled":
    {
      color: hex2rgba(colors.grey, 0.2),
    },
  "& .react-calendar__year-view .react-calendar__tile,.react-calendar__decade-view .react-calendar__tile,.react-calendar__century-view .react-calendar__tile":
    {
      padding: "2em 0.5em",
    },
  "& .react-calendar__tile": {
    maxWidth: "100%",
    padding: "10px 6.6667px",
    background: "none",
    textAlign: "center",
    lineHeight: "16px",
    fontSize: "0.8rem",
  },
  "& .react-calendar__tile:disabled": {
    backgroundColor: "transparent",
    color: colors.validate,
  },

  "& .react-calendar--selectRange .react-calendar__tile--hover": {
    backgroundColor: hex2rgba(colors.primary, 0.1),
  },
  "& .react-calendar__tile--rangeStart,.react-calendar__tile--rangeStart:hover":
    {
      borderTopLeftRadius: "50%",
      borderBottomLeftRadius: "50%",
    },
  "& .react-calendar__tile--rangeEnd,.react-calendar__tile--rangeEnd:hover": {
    backgroundColor: hex2rgba(colors.primary, 0.1),
    borderTopRightRadius: "50%",
    borderBottomRightRadius: "50%",
  },
  "& .react-calendar__tile--rangeStart > abbr,& .react-calendar__tile--rangeEnd > abbr":
    {
      backgroundColor: hex2rgba(colors.primary),
      color:colors.white,
      height: "100%",
      width: "100%",
      aspectRatio: "1/1",
      textAlign: "inherit",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  "& .react-calendar__tile--hoverStart": {
    borderTopLeftRadius: "50%",
    borderBottomLeftRadius: "50%",
  },
  "& .react-calendar__tile--hoverEnd": {
    borderTopRightRadius: "50%",
    borderBottomRightRadius: "50%",
  },
  "& .react-calendar__tile--rangeBothEnds": {
    backgroundColor: hex2rgba(colors.primary, 0.1),
  },
  "& .react-calendar__tile--hoverBothEnds": {
    backgroundColor: "transparent !important",
    borderRadius: "50% !important",
  },
  "& .react-calendar__tile--active.react-calendar__tile--rangeStart.react-calendar__tile--hoverStart":
    {
      backgroundColor: hex2rgba(colors.primary, 0.1),
      borderTopRightRadius: "0%",
      borderBottomRightRadius: "0%",
    },
  "& .react-calendar__tile--active.react-calendar__tile--rangeEnd.react-calendar__tile--hoverEnd":
    {
      backgroundColor: hex2rgba(colors.primary, 0.1),
      borderTopLeftRadius: "0%",
      borderBottomLeftRadius: "0%",
    },
  "& .react-calendar__navigation__prev-button, .react-calendar__navigation__next-button":
    {
      fontWeight: 500,
      fontSize: 25,
    },
  "& .react-calendar__month-view__days .react-calendar__tile--active:nth-of-type(7n),.react-calendar__month-view__days .react-calendar__tile--hover:nth-of-type(7n)":
    {
      backgroundColor: hex2rgba(colors.primary, 0.1),
      borderTopRightRadius: "50%",
      borderBottomRightRadius: "50%",
    },
  "& .react-calendar__month-view__days .react-calendar__tile--active:nth-of-type(7n + 1),.react-calendar__month-view__days .react-calendar__tile--hover:nth-of-type(7n + 1)":
    {
      backgroundColor: hex2rgba(colors.primary, 0.1),
      borderTopLeftRadius: "50%",
      borderBottomLeftRadius: "50%",
    },
  "& .react-calendar__tile--active": {
    backgroundColor: `${hex2rgba(colors.primary)}!important`,
    color: colors.white,
  },
  "& .react-calendar__tile--now": {
    backgroundColor: hex2rgba(colors.lighterGreen, 0.2),
  },
};
