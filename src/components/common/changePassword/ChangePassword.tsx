import { Modal, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { translate } from "../../../config/i18n";
import { colors, hex2rgba } from "../../../config/theme";
import { CustomButton } from "../customButton/CustomButton";
import SendingOtp from "./SendingOtp";
import { styles } from "./Styles";
import UpdatePassword from "./UpdatePassword";
import VerifyOtp from "./VerifyOtp";
import { useAppDispatch } from "../../../utils/useRedux";
import { resetSlice } from "../../../redux/reducers/common/forgotPasswordSlice";

interface IState {
  open: boolean;
  currentTab: "SENDING_OTP" | "VERIFY_OTP" | "CHANGE_PASSWORD";
}

const ChangePassword = () => {
  const [open, setOpen] = useState<IState["open"]>(false);
  const dispatch=useAppDispatch();
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    dispatch(resetSlice());
    setCurrentModal("SENDING_OTP");
    setOpen(false);
  };
  const [currentModal, setCurrentModal] =
    useState<IState["currentTab"]>("SENDING_OTP");
  const renderForm = () => {
    switch (currentModal) {
      case "SENDING_OTP":
        return (
          <SendingOtp
            moveNext={() => setCurrentModal("VERIFY_OTP")}
            handleClose={handleClose}
          />
        );
      case "VERIFY_OTP":
        return (
          <VerifyOtp
            moveNext={() => setCurrentModal("CHANGE_PASSWORD")}
            handleClose={handleClose}
          />
        );
      case "CHANGE_PASSWORD":
        return <UpdatePassword handleClose={handleClose} />;
    }
  };
  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      height={"80px"}
      boxSizing={"border-box"}
      alignItems={"center"}
      borderRadius={"20px"}
      bgcolor={"white"}
      px={2}
    >
      <Typography
        color={hex2rgba(colors.black, 0.85)}
        fontSize={"clamp(1rem, 0.977rem + 0.1316vw, 1.1875rem)"}
        fontWeight={500}
      >
        {translate("common.change") + " " + translate("common.password")}
      </Typography>
      <CustomButton
        bgcolor={colors.primary}
        onClick={handleOpen}
        sx={styles.changeButton}
      >
        {translate("common.change")}
      </CustomButton>
      <Modal open={open}>{renderForm()}</Modal>
    </Stack>
  );
};

export default ChangePassword;
