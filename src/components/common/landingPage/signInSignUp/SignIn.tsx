import { Visibility, VisibilityOff } from "@mui/icons-material";
import { CircularProgress, IconButton, Stack, Typography } from "@mui/material";
import { FormEvent, useState } from "react";
import { translate } from "../../../../config/i18n";
import {
  sendOtpEmailOrMobile,
  signInAction,
} from "../../../../redux/reducers/auth";
import { emailSetter } from "../../../../redux/reducers/common/forgotPasswordSlice";
import { displayAlert } from "../../../../utils/toastMessage";
import { useAppDispatch, useAppSelector } from "../../../../utils/useRedux";
import { MessageIcon } from "../../assets";
import { CustomButton } from "../../customButton/CustomButton";
import { InputField } from "../../inputField/InputField";
import { FormType } from "../bannerSection/BannerSection";
import { formStyles, loadingSpinner } from "./formStyles";
import { handleEmailOrPhoneSwitch } from "./formValidations";
interface IState {
  form: {
    emailOrPhone: string;
    password: string;
  };
  isVisible: boolean;
}
interface IProps {
  modalClose: () => void;
  handleForm: (form: FormType) => void;
}
const initialData = {
  emailOrPhone: "",
  password: "",
};
const SignIn = ({ modalClose, handleForm }: IProps) => {
  const [formData, setFormData] = useState<IState["form"]>(initialData);
  const [formErrors, setFormErrors] = useState<IState["form"]>(initialData);
  const [isVisible, setIsVisible] = useState<IState["isVisible"]>(false);
  const { loading } = useAppSelector((state) => state.Auth);
  const dispatch = useAppDispatch();
  const handleVisibilityChange = () => {
    setIsVisible(!isVisible);
  };
  const handleOnSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading) return;
    const newErrors = { ...formErrors };
    newErrors.emailOrPhone = handleEmailOrPhoneSwitch(formData.emailOrPhone);
    const isAnyOneFieldEmpty = Object.values(newErrors).every(
      (errorMessage) => errorMessage.length === 0
    );
    if (!isAnyOneFieldEmpty) {
      setFormErrors(newErrors);
    } else {
      const signInDispatch = await dispatch(
        signInAction({
          email: formData.emailOrPhone,
          password: formData.password,
        })
      );
      if (signInDispatch.payload?.statusCode === "200") {
        modalClose();
      }
      if (
        signInDispatch.payload === "Please verify your OTP before logging in."
      ) {
        handleForm("SIGN_UP_EMAIL_VERIFY");
        dispatch(sendOtpEmailOrMobile(formData.emailOrPhone));
        dispatch(emailSetter({ emailOrmobile: formData.emailOrPhone }));
        displayAlert(
          `Please verify your OTP before logging in. An OTP has been sent to your email`,
          "success"
        );
      }
    }
  };
  const handleOnChange = (event: {
    target: { name: string; value: string };
  }) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleOnBlur = (event: { target: { name: string } }) => {
    const newErrors = { ...formErrors };
    if (event.target.name === "emailOrPhone") {
      newErrors.emailOrPhone = handleEmailOrPhoneSwitch(formData.emailOrPhone);
    }
    setFormErrors(newErrors);
  };
  return (
    <Stack component={"form"} sx={formStyles.form} onSubmit={handleOnSubmit}>
      <Typography sx={formStyles.accountText}>
        {translate("common.weLcomeBack")}
      </Typography>
      <Typography sx={formStyles.pleaseLoginText}>
        {translate("common.pleaseLogin")}
      </Typography>
      <InputField
        fieldName={
          <Typography mb={0.6} ml={-1.1}>
            {translate("common.emailOrPhone")}
            <Typography sx={formStyles.supText} component={"sup"}>
              *
            </Typography>
          </Typography>
        }
        boxProps={formStyles.inputBox}
        inputProps={{
          fullWidth: true,
          name: "emailOrPhone",
          value: formData.emailOrPhone,
          sx: formStyles.input,
          type: "text",
          placeholder: "Enter email or phone",
          error: Boolean(formErrors.emailOrPhone),
          onBlur: (event) => handleOnBlur(event),
          onChange: (event) => handleOnChange(event),
          helperText: (
            <Typography sx={formStyles.helperText}>
              {formErrors.emailOrPhone}
            </Typography>
          ),
          InputProps: {
            endAdornment: <MessageIcon />,
          },
        }}
      />
      <InputField
        fieldName={
          <Typography mb={0.6} ml={-1.1}>
            {translate("common.password")}
            <Typography sx={formStyles.supText} component={"sup"}>
              *
            </Typography>
          </Typography>
        }
        boxProps={formStyles.inputBox}
        inputProps={{
          fullWidth: true,
          name: "password",
          value: formData.password,
          type: !isVisible ? "password" : "text",
          placeholder: "Enter password",
          sx: formStyles.input,
          error: Boolean(formErrors.password),
          onBlur: (event) => handleOnBlur(event),
          onChange: (event) => handleOnChange(event),
          helperText: (
            <Typography sx={formStyles.helperText}>
              {formErrors.password}
            </Typography>
          ),
          InputProps: {
            endAdornment: (
              <IconButton
                onClick={handleVisibilityChange}
                sx={formStyles.iconButton}
              >
                {isVisible ? (
                  <Visibility sx={formStyles.icon} />
                ) : (
                  <VisibilityOff sx={formStyles.icon} />
                )}
              </IconButton>
            ),
          },
        }}
      />
      <Typography
        textAlign={"center"}
        sx={formStyles.forgotPasswordText}
        onClick={() => handleForm("SENDING_OTP")}
      >
        Forgot Password ?
      </Typography>
      <CustomButton
        type="submit"
        bgcolor="#0786BF"
        width={"100%"}
        sx={formStyles.button}
        endIcon={loading && <CircularProgress sx={loadingSpinner} />}
      >
        {translate("common.logIn")}
      </CustomButton>
    </Stack>
  );
};
export default SignIn;
