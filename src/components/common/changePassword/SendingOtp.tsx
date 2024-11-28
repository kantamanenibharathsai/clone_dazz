import { Close } from "@mui/icons-material";
import { CircularProgress, IconButton, Stack, Typography } from "@mui/material";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { translate } from "../../../config/i18n";
import { colors } from "../../../config/theme";
import { sendingOtp } from "../../../redux/reducers/common/forgotPasswordSlice";
import { RootState } from "../../../redux/store";
import { useAppDispatch, useAppSelector } from "../../../utils/useRedux";
import { checkEmailValidation } from "../../../utils/utils";
import { CustomButton } from "../customButton/CustomButton";
import { InputField } from "../inputField/InputField";
import { styles } from "./Styles";
interface IState {
  email: string;
}
type Errors = {
  email: string;
};
interface IProps {
  moveNext: () => void;
  handleClose: () => void;
}

export const SendingOtp = ({ moveNext, handleClose }: IProps) => {
  const [email, setEmail] = useState<IState["email"]>("");
  const [errorObj, setErrorObj] = useState<Errors>({} as Errors);
  const { user } = useSelector((state: RootState) => state.Auth);
  const { allApiStatus } = useAppSelector((state) => state.forgotPasswordSlice);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (allApiStatus.sentOtp === "SUCCESS") {
      moveNext();
    }
  }, [allApiStatus.sentOtp, moveNext]);
  const validate = () => {
    const errors = {} as Errors;
    if (!email) {
      errors.email = "Please enter email id";
    } else if (checkEmailValidation(email)) {
      errors.email = "Please enter valid email id";
    } else if (email !== user?.email) {
      errors.email = "Please enter your email id";
    }
    setErrorObj(errors);
    return Object.values(errors).length === 0;
  };
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validate()) {
      dispatch(sendingOtp(email));
    }
  };

  return (
    <Stack
      component={"form"}
      spacing={4}
      sx={{ ...styles.commonStyle, ...styles.emailModal }}
      justifyContent={"center"}
      onSubmit={onSubmit}
    >
      {allApiStatus.sentOtp === "LOADING" ? (
        <Stack alignItems={"center"} justifyContent={"center"} height={"100%"}>
          <CircularProgress />
        </Stack>
      ) : (
        <>
          <IconButton sx={styles.closeButton} onClick={handleClose}>
            <Close />
          </IconButton>
          <Typography
            fontSize={"clamp(1.125rem, 1.0345rem + 0.5172vw, 1.5rem)"}
            fontWeight={500}
          >
            {translate("common.enterEmailId")}
          </Typography>

          <InputField
            inputProps={{
              onChange,
              type: "text",
              value: email,
              name: "email",
              placeholder: "email id",
              sx: styles.textFieldStyle,
              FormHelperTextProps: {
                sx: styles.validationText,
              },
              onBlur: validate,
              helperText: errorObj.email ?? "",
            }}
          />
          <CustomButton
            bgcolor={colors.primary}
            sx={styles.sendBtn}
            type="submit"
          >
            {translate("common.send")}
          </CustomButton>
        </>
      )}
    </Stack>
  );
};

export default SendingOtp;
