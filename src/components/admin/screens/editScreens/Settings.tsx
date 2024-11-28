import { Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { endpoints } from "../../../../config/config";
import { deleteCard } from "../../../../redux/reducers/superAdmin/CategoriesSlice";
import { navigation } from "../../../../utils/navigation";
import { useAppDispatch } from "../../../../utils/useRedux";
import { CustomButton } from "../../../common/customButton/CustomButton";
import { settingStyles } from "./EditStyles";

const Settings = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  return (
    <Stack direction={{ xs: "column", md: "row" }} gap={2}>
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
        <Typography sx={settingStyles.subHead}>Reboot Player App</Typography>
        <Stack direction={"row"}>
          <Typography>
            This action will reboot your signage application without intrupting
            device.
          </Typography>
          <CustomButton sx={settingStyles.btn}>Reboot Player App</CustomButton>
        </Stack>
        <Typography sx={settingStyles.subHead}>Delete Screen</Typography>
        <Stack direction={"row"}>
          <Typography>
            This action will delete your screen from signage application.
          </Typography>
          <CustomButton
            onClick={async () => {
              const result = await dispatch(
                deleteCard(endpoints.GET_SCREENS + "/" + id)
              );
              if (result.meta.requestStatus === "fulfilled")
                navigation.navigate("/Screens");
            }}
            sx={settingStyles.btn}
          >
            Delete Screen
          </CustomButton>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Settings;
