import { CircularProgress, InputBase, Stack, Typography } from "@mui/material";
import { FormEvent, memo, useEffect, useRef, useState } from "react";
import { translate } from "../../../../config/i18n";
import { colors, hex2rgba } from "../../../../config/theme";
import {
  sendOtpEmailOrMobile,
  signUpEmailVerify,
} from "../../../../redux/reducers/auth";
import { verifyOtp } from "../../../../redux/reducers/common/forgotPasswordSlice";
import { displayAlert } from "../../../../utils/toastMessage";
import { useAppDispatch, useAppSelector } from "../../../../utils/useRedux";
import { CustomButton } from "../../customButton/CustomButton";
import { loaderStyles } from "../../dropZone/Styles";
import { FormType } from "../bannerSection/BannerSection";
import { formStyles } from "./formStyles";

interface IProps {
  handleForm: (form: FormType) => void;
  isSignUpEmailVerify: boolean;
}
interface IState {
  otp: string;
  error: string;
}

const VerifyOtp = ({ handleForm, isSignUpEmailVerify }: IProps) => {
  const [otp, setOtp] = useState<IState["otp"]>("");
  const [error, setError] = useState<IState["error"]>("");
  const inputRef = useRef<Array<HTMLInputElement | null>>([]);
  const getOTPValue = () => (otp ? otp.toString().split("") : []);
  const { allApiStatus, emailOrmobile } = useAppSelector(
    (state) => state.forgotPasswordSlice
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (allApiStatus.verifyOtp === "SUCCESS") handleForm("NEW_PASSWORD");
  }, [allApiStatus.verifyOtp, handleForm]);
  const isInputValueValid = (value: string) => {
    const isTypeValid = !isNaN(Number(value));
    return isTypeValid;
  };
  const handleChangeWeb = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const { value } = event.target;
    if (value.trim().length > 0 && isInputValueValid(value)) {
      changeCodeAtFocus(value[0].trim(), index);
      if (otp.length < index) {
        focusInput(otp.length + 1);
      } else {
        focusInput(index + 1);
      }
    }
  };
  const focusInput = (index: number) => {
    if (inputRef.current[index]) {
      inputRef.current[index]?.focus();
    }
  };
  const changeCodeAtFocus = (value: string, index: number) => {
    const otp = getOTPValue();
    otp[index] = value.trim();
    handleOTPChange(otp);
  };
  const handleOTPChange = (otp: Array<string>) => {
    const otpValue = otp.join("");
    setOtp(otpValue);
  };
  const handleKeyDown =
    (index: number) => (event: React.KeyboardEvent<HTMLInputElement>) => {
      const otp = getOTPValue();
      if (event.code === "Backspace") {
        if (otp[index] === undefined || otp[index].length === 0) {
          changeCodeAtFocus("", index - 1);
          focusInput(index - 1);
        } else {
          changeCodeAtFocus("", index);
        }
      } else if (event.code === "Delete") {
        changeCodeAtFocus("", index);
      }
    };
  const handleOtpSubmission = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (otp.length < 4) {
      setError("Please enter your 4 digit OTP");
    } else {
      setError("");
      if (isSignUpEmailVerify) {
        const signEmailVerifyDispatch = await dispatch(
          signUpEmailVerify({ emailOrmobile, otp })
        );
        if (signEmailVerifyDispatch.payload.statusCode === "200") {
          handleForm("SIGN_IN");
          displayAlert("OTP verified successfully", "success");
        }
      } else {
        await dispatch(verifyOtp(otp));
      }
    }
  };
  const resendingOtp = async () => {
    if (isSignUpEmailVerify) {
      const reSendOtp = await dispatch(sendOtpEmailOrMobile(emailOrmobile));
      if (reSendOtp.payload.statusCode === "200") {
        displayAlert("The OTP has been resent to your email", "success");
        setOtp("")
      }
    } else {
      displayAlert("OTP Sent Successfully");
      setOtp("")
    }
  };
  return (
    <Stack component={"form"} onSubmit={handleOtpSubmission}>
      <Stack spacing={10}>
        <Stack alignSelf={"flex-start"}>
          <Typography sx={formStyles.forgotFlowMainText}>
            {translate("common.verification")}
          </Typography>
          <Typography sx={formStyles.forgotFlowLabel}>
            {translate("common.verificationLabel")}
          </Typography>
        </Stack>
        <Typography color={"white"} textAlign={"center"} height={12}>
          {error}
        </Typography>
        <Stack spacing={4}>
          <Stack direction={"row"} justifyContent={"space-around"}>
            {Array.from({ length: 4 }, (_, index) => index).map((index) => {
              return (
                <InputBase
                  type="text"
                  key={index}
                  sx={{
                    ...formStyles.otpDigitContainer,
                    borderColor: otp.toString().split("")[index]
                      ? colors.activeColor
                      : hex2rgba(colors.darkGrey, 0.15),
                  }}
                  inputProps={{
                    maxLength: 2,
                  }}
                  value={otp.toString().split("")[index] ?? ""}
                  inputRef={(element) => (inputRef.current[index] = element)}
                  onChange={(event) => handleChangeWeb(event, index)}
                  onKeyUp={handleKeyDown(index)}
                  autoComplete="off"
                />
              );
            })}
          </Stack>
          <Typography textAlign={"center"} sx={formStyles.notReceived}>
            {translate("common.notReceiveYet")}
            <Typography
              component={"span"}
              sx={formStyles.resendText}
              onClick={resendingOtp}
            >
              {translate("common.resend")}
            </Typography>{" "}
          </Typography>
          <CustomButton
            bgcolor={colors.darkBlue}
            sx={formStyles.verifyOtpBtn}
            type="submit"
          >
            {allApiStatus.verifyOtp === "LOADING" ? (
              <CircularProgress sx={loaderStyles.loaderColor()} />
            ) : (
              translate("common.verifyWithOtp")
            )}
          </CustomButton>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default memo(VerifyOtp);
