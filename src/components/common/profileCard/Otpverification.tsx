import { CircularProgress, InputBase, Stack, Typography } from "@mui/material";
import { FormEvent, memo, useRef, useState } from "react";
import { translate } from "../../../config/i18n";
import { colors, hex2rgba } from "../../../config/theme";
import { verifyOtp } from "../../../redux/reducers/common/forgotPasswordSlice";
import { displayAlert } from "../../../utils/toastMessage";
import { useAppDispatch, useAppSelector } from "../../../utils/useRedux";
import { CustomButton } from "../customButton/CustomButton";
import { loaderStyles } from "../dropZone/Styles";
import { formStyles } from "../landingPage/signInSignUp/formStyles";

interface IProps {
  handleCloseModal: () => void;
  handleEmailVerified: () => void;
}
interface IState {
  otp: string;
  error: string;
}

const VerifyOtp = ({ handleCloseModal, handleEmailVerified }: IProps) => {
  const [otp, setOtp] = useState<IState["otp"]>("");
  const [error, setError] = useState<IState["error"]>("");
  const inputRef = useRef<Array<HTMLInputElement | null>>([]);
  const getOTPValue = () => (otp ? otp.toString().split("") : []);
  const { allApiStatus } = useAppSelector((state) => state.forgotPasswordSlice);
  const dispatch = useAppDispatch();

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

      const verifyDispatch = await dispatch(verifyOtp(otp));
      if (verifyDispatch.payload === "Otp Verified succesfully") {
        handleCloseModal();
        handleEmailVerified();
      }
    }
  };
  const resendingOtp = () => {
    displayAlert("OTP Sent Successfully");
    setOtp("")
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
