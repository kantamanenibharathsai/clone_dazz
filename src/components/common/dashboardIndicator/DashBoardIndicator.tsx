import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import { Box, Tooltip, Typography } from "@mui/material";
import { dashBoardIndicatorStyles } from "./DashBoardIndicatorStyles";
import { DashboardIndicatorProps } from "./Types";
const DashBoardIndicator = ({
  value,
  percentage,
  title,
  image,
  styles,
  icon,
}: DashboardIndicatorProps) => {
  const isGreen =
    title === "My Wallet" ||
    title === "Expected Revenue" ||
    title === "Payments Received";

  const arrowIcon =
    icon === "up" ? (
      <ArrowUpwardRoundedIcon sx={dashBoardIndicatorStyles.greenIconStyles} />
    ) : (
      <ArrowDownwardRoundedIcon sx={dashBoardIndicatorStyles.redIconStyles} />
    );

  const calculateAmount = (amount: number): string => {
    const amountString = Math.round(amount).toString();

    if (amountString.length >= 6 && amountString.length < 7) {
      return `${
        Number(amountString) > 100000
          ? amountString.slice(0, 2).split("").join(".")
          : amountString.slice(0, 1)
      } L`;
    } else if (amountString.length > 6 && amountString.length <= 7) {
      return `${amountString.slice(0, 2)} L`;
    } else if (amountString.length >= 8 && amountString.length < 9) {
      return `${
        Number(amountString) > 10000000
          ? amountString.slice(0, 2).split("").join(".")
          : amountString.slice(0, 1)
      } Cr`;
    } else if (amountString.length > 8 && amountString.length <= 9) {
      return `${amountString.slice(0, 2)} Cr`;
    } else {
      return `${Number(amountString).toLocaleString()}`;
    }
  };

  let valueDisplay;
  switch (title) {
    case "Expected Income":
    case "Invested Amount":
    case "My Wallet":
    case "Payments to be Paid":
    case "Payments Received":
    case "Expected Revenue":
      valueDisplay = value !== undefined ? `₹ ${calculateAmount(value)}` : "";
      break;
    case "Commission":
      valueDisplay = `${value}%`;
      break;
    default:
      valueDisplay = value !== undefined ? `${value}` : "";
      break;
  }
  const valueStyle = {
    ...dashBoardIndicatorStyles.value,
    color: isGreen
      ? dashBoardIndicatorStyles.greenColor
      : dashBoardIndicatorStyles.blackColor,
  };

  return (
    <Box
      sx={{
        ...dashBoardIndicatorStyles.indicatorMainContainer,
        ...styles?.indicatorMainContainer,
        ...(styles?.borderRight && {
          borderRight: {
            xs: styles.borderRight.xs,
            sm: styles.borderRight.sm,
            md: styles.borderRight.md,
            lg: styles.borderRight.lg,
            xl: styles.borderRight.xl,
          },
        }),
      }}
    >
      <Box>
        <Box sx={dashBoardIndicatorStyles.imageStyle}>
          <Box
            component={"img"}
            src={image}
            alt="indicator-image"
            sx={dashBoardIndicatorStyles.avatarStyles}
            loading="lazy"
          />
        </Box>
      </Box>
      <Box sx={dashBoardIndicatorStyles.contentContainer}>
        <Tooltip title={title}>
          <Typography sx={dashBoardIndicatorStyles.title}>{title}</Typography>
        </Tooltip>
        <Tooltip title={value?.toString()}>
          <Typography sx={valueStyle}>{valueDisplay}</Typography>
        </Tooltip>

        {percentage !== undefined && (
          <Box sx={dashBoardIndicatorStyles.percentageContainer}>
            {arrowIcon}

            <Typography
              sx={{
                ...dashBoardIndicatorStyles.percentage,
                color:
                  icon === "up"
                    ? dashBoardIndicatorStyles.greenIconStyles.color
                    : dashBoardIndicatorStyles.redIconStyles.color,
              }}
            >
              {percentage}
              {"%"}
              <Tooltip title={"this month"}>
                <Typography
                  component={"span"}
                  sx={dashBoardIndicatorStyles.percentageLable}
                >
                  this month
                </Typography>
              </Tooltip>
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default DashBoardIndicator;
