import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import { IconButton, Stack, Typography } from "@mui/material";
import { colors } from "../../../config/theme";
import { navigation } from "../../../utils/navigation";
import ChangePassword from "../../common/changePassword/ChangePassword";
import { settingsStyles } from "./SettingsStyles";
const LoginAndSecurity = () => {
  const handleGoBack = () => {
    navigation.navigate(-1);
  };
  return (
    <>
      <Stack sx={settingsStyles.backBtnWrapper}>
        <IconButton sx={settingsStyles.iconContainer} onClick={handleGoBack}>
          <KeyboardBackspaceOutlinedIcon />
        </IconButton>
        <Typography color={colors.white} variant="h5">
          Settings
        </Typography>
      </Stack>
      <ChangePassword />
    </>
  );
};

export default LoginAndSecurity;
