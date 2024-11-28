import { Close } from "@mui/icons-material";
import { IconButton, InputBase, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import { FormEvent, useEffect, useRef, useState } from "react";
import { translate } from "../../../config/i18n";
import { colors, hex2rgba } from "../../../config/theme";
import {
  sendingOtp,
  verifyOtp,
} from "../../../redux/reducers/common/forgotPasswordSlice";
import { useAppDispatch, useAppSelector } from "../../../utils/useRedux";
import { CustomButton } from "../customButton/CustomButton";
import { styles } from "./Styles";

interface IState {
  otp: string;
  error: string;
}
interface IProps {
  moveNext: () => void;
  handleClose: () => void;
}
const VerifyOtp = ({ moveNext, handleClose }: IProps) => {
  const [otp, setOtp] = useState<IState["otp"]>("");
  const [error, setError] = useState<IState["error"]>("");
  const inputRef = useRef<Array<HTMLInputElement | null>>([]);
  const getOTPValue = () => (otp ? otp.toString().split("") : []);
  const { allApiStatus, emailOrmobile } = useAppSelector(
    (state) => state.forgotPasswordSlice
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (allApiStatus.verifyOtp === "SUCCESS") {
      moveNext();
    }
  }, [allApiStatus.verifyOtp, moveNext]);
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
  const handleOtpSubmission = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (otp.length < 4) {
      setError("Please enter your 4 digit OTP");
    } else {
      setError("");
      dispatch(verifyOtp(otp));
    }
  };
  const resendingOtp = () => {
    dispatch(sendingOtp(emailOrmobile));
    setOtp("")
  };
  return (
    <Stack
      sx={{ ...styles.commonStyle, ...styles.verifyOtpModal }}
      component={"form"}
      onSubmit={handleOtpSubmission}
    >
      <IconButton sx={styles.closeButton} onClick={handleClose}>
        <Close />
      </IconButton>
      <Stack spacing={10}>
        <Stack alignSelf={"flex-start"}>
          <Typography sx={styles.verificationText}>
            {translate("common.verification")}
          </Typography>
          <Typography sx={styles.verificationLabel}>
            {translate("common.verificationLabel")}
          </Typography>
        </Stack>
        <Typography color={"white"} textAlign={"center"}>
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
                    ...styles.otpDigitContainer,
                    borderColor: otp.toString().split("")[index]
                      ? colors.activeColor
                      : hex2rgba(colors.darkGrey, 0.15),
                  }}
                  inputProps={{
                    maxLength: 2,
                  }}
                  data-testid={`textField-${index}`}
                  value={otp.toString().split("")[index] ?? ""}
                  inputRef={(element) => (inputRef.current[index] = element)}
                  onChange={(event) => handleChangeWeb(event, index)}
                  onKeyUp={handleKeyDown(index)}
                  autoComplete="off"
                />
              );
            })}
          </Stack>
          <Typography textAlign={"center"} sx={styles.notReceiveYet}>
            {translate("common.notReceiveYet")}
            <Typography
              component={"span"}
              sx={styles.resend}
              onClick={resendingOtp}
            >
              {translate("common.resend")}
            </Typography>{" "}
          </Typography>
          <CustomButton
            bgcolor={colors.primary}
            sx={styles.verifyOtpBtn}
            disabled={allApiStatus.verifyOtp === "LOADING"}
            type="submit"
          >
            {translate("common.verifyWithOtp")}
          </CustomButton>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default VerifyOtp;
