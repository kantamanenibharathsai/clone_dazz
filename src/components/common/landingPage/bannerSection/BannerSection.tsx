import { Box, Divider, Modal, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { translate } from "../../../../config/i18n";
import { colors } from "../../../../config/theme";
import { loadingStatusChange } from "../../../../redux/reducers/auth";
import { resetSlice } from "../../../../redux/reducers/common/forgotPasswordSlice";
import { useAppDispatch } from "../../../../utils/useRedux";
import { closeSvg } from "../../assets";
import banner from "../../assets/banner.png";
import logoImg from "../../assets/logoImg.svg";
import { CustomButton } from "../../customButton/CustomButton";
import { modalStyles } from "../../modal/ModalStyles";
import NewPassword from "../signInSignUp/NewPassword";
import PendingForApproval from "../signInSignUp/PendingForApproval";
import SendingOtp from "../signInSignUp/SendingOtp";
import SignIn from "../signInSignUp/SignIn";
import SignUp from "../signInSignUp/SignUp";
import VerifyOtp from "../signInSignUp/VerifyOtp";
import { bannerSectionStyles } from "./BannerSectionStyles";
export type FormType =
  | "INITIAL"
  | "SIGN_IN"
  | "SIGN_UP"
  | "SIGN_UP_EMAIL_VERIFY"
  | "SENDING_OTP"
  | "VERIFYING_OTP"
  | "NEW_PASSWORD"
  | "PENDING_FOR_APPROVAL";
interface IState {
  form: FormType;
  modalOpen: boolean;
}
const BannerSection = () => {
  const [form, setForm] = useState<IState["form"]>("INITIAL");
  const [modalOpen, setModalOpen] = useState<IState["modalOpen"]>(false);
  const dispatch = useAppDispatch();
  const handleForm = useCallback((formType: FormType) => {
    setModalOpen(true);
    setForm(formType);
  }, []);
  const handleModalClose = useCallback(() => {
    dispatch(resetSlice());
    dispatch(loadingStatusChange());
    setModalOpen(false);
  }, [dispatch]);
  const handleModalSwitch = () => {
    if (form === "SIGN_IN") setForm("SIGN_UP");
    else if (form === "SIGN_UP") setForm("SIGN_IN");
  };
  const renderSuitableForm = () => {
    switch (form) {
      case "SIGN_UP":
        return <SignUp handleForm={handleForm} />;
      case "SIGN_UP_EMAIL_VERIFY":
        return <VerifyOtp handleForm={handleForm} isSignUpEmailVerify={true} />;
      case "SENDING_OTP":
        return <SendingOtp handleForm={handleForm} />;
      case "VERIFYING_OTP":
        return (
          <VerifyOtp handleForm={handleForm} isSignUpEmailVerify={false} />
        );
      case "NEW_PASSWORD":
        return <NewPassword handleClose={handleModalClose} />;
      case "PENDING_FOR_APPROVAL":
        return <PendingForApproval handleModalClose={handleModalClose} />;
      case "SIGN_IN":
        return <SignIn modalClose={handleModalClose} handleForm={handleForm} />;
    }
  };

  return (
    <Box>
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={bannerSectionStyles.modalStyle}>
          <Box
            component={"img"}
            src={closeSvg}
            sx={modalStyles.icon}
            onClick={handleModalClose}
          />
          <Box sx={bannerSectionStyles.modalBox}>
            {renderSuitableForm()}
            <Typography sx={bannerSectionStyles.formText}>
              {form === "SIGN_IN" && translate("common.doNotHaveAccount")}
              {form === "SIGN_UP" && translate("common.alreadyHaveAccount")}
              <Typography
                onClick={handleModalSwitch}
                component={"span"}
                sx={bannerSectionStyles.signInUpText}
              >
                {form === "SIGN_UP" && " " + translate("common.logIn")}
                {form === "SIGN_IN" && translate("common.signUp")}
              </Typography>
            </Typography>
          </Box>
        </Box>
      </Modal>
      <Box
        component={"img"}
        src={banner}
        sx={bannerSectionStyles.backgroundImageStyles}
      />
      <Box sx={bannerSectionStyles.container}>
        <Box sx={bannerSectionStyles.logoContainer}>
          <Box
            component={"img"}
            src={logoImg}
            sx={bannerSectionStyles.logoImg}
          />
          <Box sx={bannerSectionStyles.btnContainer}>
            <CustomButton
              sx={bannerSectionStyles.loginBtnStyle}
              borderradius={0}
              onClick={() => handleForm("SIGN_IN")}
              bgcolor={colors.labelText}
            >
              {translate("common.login")}
            </CustomButton>
            <CustomButton
              sx={bannerSectionStyles.registerBtnStyle}
              onClick={() => handleForm("SIGN_UP")}
              bgcolor={colors.activeColor}
            >
              {translate("common.register")}
            </CustomButton>
          </Box>
        </Box>
        <Box sx={bannerSectionStyles.landingPageTextConatiner}>
          <Box sx={bannerSectionStyles.welcomeTextContainer}>
            {translate("common.welcomeTo")}{" "}
            <Box component={"span"} sx={bannerSectionStyles.spanText}>
              {translate("common.dadzMedia")}
            </Box>
          </Box>
          <Typography sx={bannerSectionStyles.title}>
            {translate("common.cloudBasesDigital")}
            <br /> {translate("common.signageSolutionFor")}
            <br /> {translate("common.enterpises")}
          </Typography>
          <Divider sx={bannerSectionStyles.dividerStyle} />
          <Typography sx={bannerSectionStyles.description}>
            {translate("common.createBuildCollaborateAndShipProducts")}
          </Typography>
          <Box sx={bannerSectionStyles.btnStyle}>
            {translate("common.createAnAdCampaign")}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default BannerSection;
