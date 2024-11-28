import { Box, Stack, Typography } from "@mui/material";
import { translate } from "../../../config/i18n";
import { colors } from "../../../config/theme";
import { useAppSelector } from "../../../utils/useRedux";
import { DadzCalendar } from "../../common/dadzCalendar/DadzCalendar";
import { Value } from "../userLayout/UserLayout";
import { chooseSlotsStyles } from "./CommonStyles";

interface ChooseSlotsProps {
  handleChooseDates: (value: Value) => void;
  helperText: string;
}
const ChooseSlots = ({ handleChooseDates, helperText }: ChooseSlotsProps) => {
  const { form } = useAppSelector((state) => state.Campaign);
  return (
    <Box sx={chooseSlotsStyles.containerMain}>
      <Stack gap={1} direction={"row"} alignItems={"center"} mb={2}>
        <Typography sx={chooseSlotsStyles.title}>
          {translate("userFlow.chooseSlots")}
        </Typography>
      </Stack>
      <Stack sx={chooseSlotsStyles.flexBox}>
        <DadzCalendar
          textToRender="Check Availability"
          calendarPros={{
            value: form.selectedDates,
            onChange: (value) => handleChooseDates(value),
          }}
          boxStyle={{ minWidth: 330, maxWidth: 400, height: 450 }}
        />
        <Typography
          fontSize={12}
          height={16}
          ml={1}
          color={
            helperText?.toLowerCase().includes("please")
              ? colors.black
              : colors.validate
          }
        >
          {helperText}
        </Typography>
      </Stack>
    </Box>
  );
};

export default ChooseSlots;
