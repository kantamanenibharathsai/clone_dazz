import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { colors } from "../../../../config/theme";
import { sendingOtp } from "../../../../redux/reducers/common/forgotPasswordSlice";
import { useAppDispatch, useAppSelector } from "../../../../utils/useRedux";
import { checkEmailValidation } from "../../../../utils/utils";
import { CustomButton } from "../../customButton/CustomButton";
import { loaderStyles } from "../../dropZone/Styles";
import { InputField } from "../../inputField/InputField";
import { FormType } from "../bannerSection/BannerSection";
import { formStyles } from "./formStyles";

interface IProps {
  handleForm: (form: FormType) => void;
}
interface IState {
  field: string;
  error: string;
}
const SendingOtp = ({ handleForm }: IProps) => {
  const [field, setField] = useState<IState["field"]>("");
  const [error, setError] = useState<IState["error"]>("");
  const dispatch = useAppDispatch();
  const { allApiStatus } = useAppSelector((state) => state.forgotPasswordSlice);
  const validate = () => {
    let dummyError = "";
    if (!field) {
      dummyError = "Required";
    } else if (!/^[0-9+]+$/.test(field) && checkEmailValidation(field)) {
      dummyError = "Please enter valid email id";
    } else if (
      !/^(?:\+91)?[6789]\d{9}$/.test(field) &&
      checkEmailValidation(field)
    )
      dummyError = "Enter Valid Phone Number.";
    setError(dummyError);
    return dummyError.length === 0;
  };
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setField(event.target.value);
  };
  useEffect(() => {
    if (allApiStatus.sentOtp === "SUCCESS") handleForm("VERIFYING_OTP");
  }, [allApiStatus.sentOtp, handleForm]);
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validate()) {
      dispatch(sendingOtp(field));
    }
  };
  return (
    <Stack
      component={"form"}
      onSubmit={onSubmit}
      justifyContent={"space-around"}
      sx={formStyles.sendOtpForm}
    >
      <Box>
        <Typography sx={formStyles.forgotFlowMainText}>
          Forgot Password?
        </Typography>
        <Typography sx={formStyles.forgotFlowLabel}>
          Please verify Email or Phone Number to get OTP
        </Typography>
      </Box>
      <InputField
        fieldName={<Typography ml={-1.1} mb={0.6}>Email or Phone*</Typography>}
        textProps={{ color: colors.white }}
        inputProps={{
          name: "field",
          value: field,
          sx: formStyles.input,
          placeholder: "Enter Email or Phone",
          fullWidth: true,
          onChange,
          error: Boolean(error),
          helperText: (
            <Typography sx={formStyles.helperText} color={colors.validate}>
              {error}
            </Typography>
          ),
        }}
      />
      <CustomButton type="submit" fullWidth bgcolor={colors.darkBlue}>
        {allApiStatus.sentOtp === "LOADING" ? (
          <CircularProgress sx={loaderStyles.loaderColor()} />
        ) : (
          "Continue"
        )}
      </CustomButton>
    </Stack>
  );
};

export default SendingOtp;
