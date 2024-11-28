import { Box, Stack } from "@mui/material";
import { stepperStyle } from "./StepperStyles";

interface StepperProps {
  totalSteps: number;
  currentStep: number;
}

const Stepper = ({ currentStep, totalSteps }: StepperProps) => {
  return (
    <Box>
      {Array(totalSteps).map((item) => (
        <Stack sx={stepperStyle.container} key={item}>
          <Box>{item + currentStep}</Box>
        </Stack>
      ))}
    </Box>
  );
};

export default Stepper;
