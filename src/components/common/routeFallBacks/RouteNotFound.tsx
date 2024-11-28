import { Box, Typography } from "@mui/material";
import { colors } from "../../../config/theme";
import { CustomButton } from "../customButton/CustomButton";
import SafeRoute from "../safeRoute/SafeRoute";
import { common } from "./CommonStyle";
import Storage from "../../../utils/Storage";
import { useEffect } from "react";
import { navigation } from "../../../utils/navigation";

const RouteNotFound = () => {
  const handleGoBack = () => {
    navigation.navigate(-1);
  };
  const token = Storage.get("token");
  useEffect(() => {
    if (!token) {
      navigation.navigate("/");
    }
  }, [token]);
  return (
    <Box sx={common.container}>
      <Box>
        <Typography
          className="text-shadow-drop-left text-focus-in"
          color={colors.white}
          variant="h3"
          p={1}
        >
          Sorry Page Not Found
        </Typography>
        <CustomButton sx={common.goBackBtn} onClick={handleGoBack}>
          GO BACK
        </CustomButton>
      </Box>
    </Box>
  );
};

export default SafeRoute(RouteNotFound);
