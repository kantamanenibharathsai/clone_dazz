import { Box, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import { colors } from "../../../config/theme";
import Header from "../../common/header/Header";
import { styles } from "../../common/sidebar/SidebarStyles";

const AdminLayout = () => {
  return (
    <Stack
      pt={"0px !important"}
      minHeight={"100vh"}
      bgcolor={colors.lightBlack}
    >
      <Box sx={styles.outletContainer}>
        <Header />
        <Outlet />
      </Box>
    </Stack>
  );
};

export default AdminLayout;
