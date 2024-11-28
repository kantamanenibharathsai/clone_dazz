import { Stack, Typography } from "@mui/material";
import { CustomButton } from "../../../common/customButton/CustomButton";
import { settingStyles } from "./EditStyles";

const Settings = () => {
  return (
    <Stack direction={{ xs: "column", lg: "row" }} gap={2}>
      <Stack sx={settingStyles.mainContainer}>
        <Typography sx={settingStyles.heading}>PLayer Actions</Typography>

        <Typography sx={settingStyles.subHead}>Restart Player App</Typography>
        <Stack direction={"row"}>
          <Typography>
            This action will restart your signage application without intrupting
            device.
          </Typography>
          <CustomButton sx={settingStyles.btn}>Restart Player App</CustomButton>
        </Stack>
        <Typography sx={settingStyles.subHead}>Restart Player App</Typography>
        <Stack direction={"row"}>
          <Typography>
            This action will restart your signage application without intrupting
            device.
          </Typography>
          <CustomButton sx={settingStyles.btn}>Restart Player App</CustomButton>
        </Stack>
      </Stack>
      <Stack sx={settingStyles.mainContainer}>
        <Typography sx={settingStyles.heading}>PLayer Actions</Typography>

        <Typography sx={settingStyles.subHead}>Restart Player App</Typography>
        <Stack direction={"row"}>
          <Typography>
            This action will restart your signage application without intrupting
            device.
          </Typography>
          <CustomButton sx={settingStyles.btn}>Restart Player App</CustomButton>
        </Stack>
        <Typography sx={settingStyles.subHead}>Restart Player App</Typography>
        <Stack direction={"row"}>
          <Typography>
            This action will restart your signage application without intrupting
            device.
          </Typography>
          <CustomButton sx={settingStyles.btn}>Restart Player App</CustomButton>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Settings;
