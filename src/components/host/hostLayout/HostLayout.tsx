import { Add } from "@mui/icons-material";
import { Box, Stack } from "@mui/material";
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { colors } from "../../../config/theme";
import { CustomButton } from "../../common/customButton/CustomButton";
import Header from "../../common/header/Header";
import AddMediaModal from "./AddNewModal";
import { styles } from "./HostLayOutStyles";
import { useRoutePermissions } from "../../../utils/useRoutePermissions";

const HostLayout = () => {
  const [dropModalOpen, setDropModalOpen] = useState(false);
  const { pathname } = useLocation();
  const addNewHandler = () => {
    setDropModalOpen(true);
  };
  const handleModalClose = () => {
    setDropModalOpen(false);
  };
  const { create } = useRoutePermissions();
  return (
    <Stack
      pt={"0px !important"}
      minHeight={"100vh"}
      bgcolor={colors.lightBlack}
    >
      <Box sx={styles.outletContainer}>
        <Header
          headerButton={
            create &&
            pathname === "/Dashboard" && (
              <CustomButton
                onClick={addNewHandler}
                width={170}
                endIcon={<Add />}
                bgcolor={colors.primary}
              >
                Add New
              </CustomButton>
            )
          }
        />
        <Outlet />
      </Box>
      <AddMediaModal
        modalOpen={dropModalOpen}
        handleModalClose={handleModalClose}
      />
    </Stack>
  );
};

export default HostLayout;
