import { Close } from "@mui/icons-material";
import { CircularProgress, IconButton, Stack, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { translate } from "../../../config/i18n";
import { colors } from "../../../config/theme";
import { updatePassword } from "../../../redux/reducers/common/forgotPasswordSlice";
import { useAppDispatch, useAppSelector } from "../../../utils/useRedux";
import { CustomButton } from "../customButton/CustomButton";
import { InputField } from "../inputField/InputField";
import { styles } from "./Styles";

interface PasswordFields {
  password: string;
  confirmPassword: string;
}
interface IState {
  data: PasswordFields;
  errorObj: PasswordFields;
  visitedFields: PasswordFields;
}
interface IProps {
  handleClose: () => void;
}

const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

const UpdatePassword = ({ handleClose }: IProps) => {
  const [data, setData] = useState<IState["data"]>({
    password: "",
    confirmPassword: "",
  });
  const [errorObj, setErrorObj] = useState<IState["errorObj"]>(
    {} as IState["errorObj"]
  );
  const [visitedFields, setVisitedFields] = useState<IState["visitedFields"]>(
    {} as IState["visitedFields"]
  );
  const { allApiStatus } = useAppSelector((state) => state.forgotPasswordSlice);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (allApiStatus.updatePassword === "SUCCESS") {
      handleClose();
    }
  }, [allApiStatus.updatePassword, handleClose]);
  const validate = (name: string) => {
    const errors = {} as IState["errorObj"];
    if (data.password.length === 0) {
      errors.password = translate("common.passwordRequired");
    } else if (!passwordRegex.test(data.password)) {
      errors.password = translate("common.passwordPatternMsg");
    }
    if (data.confirmPassword.length === 0) {
      errors.confirmPassword = translate("common.confirmPasswordRequired");
    } else if (data.password !== data.confirmPassword) {
      errors.confirmPassword = translate("common.passwordsNotMatch");
    }
    setErrorObj(errors);
    setVisitedFields({ ...visitedFields, [name]: "true" });
    return Object.values(errors).length === 0;
  };
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validate("password") && validate("confirmPassword")) {
      dispatch(updatePassword(data.password));
    }
    setVisitedFields({
      password: "true",
      confirmPassword: "true",
    });
  };
  return (
    <Stack
      component={"form"}
      spacing={4}
      sx={{ ...styles.commonStyle, ...styles.changePasswordModal }}
      justifyContent={"center"}
      onSubmit={handleSubmit}
    >
      {allApiStatus.updatePassword === "LOADING" ? (
        <Stack alignItems={"center"} justifyContent={"center"} height={"100%"}>
          <CircularProgress />
        </Stack>
      ) : (
        <>
          <IconButton sx={styles.closeButton} onClick={handleClose}>
            <Close />
          </IconButton>
          <Typography sx={styles.changePasswordText} ml={-1.1} mb={0.6}>
            {translate("common.change") + " " + translate("common.password")}
          </Typography>
          <InputField
            inputProps={{
              name: "password",
              onChange,
              onBlur: () => validate("password"),
              placeholder: "Enter new password",
              value: data.password,
              helperText: (
                <Typography height={12}>
                  {(visitedFields.password && errorObj.password) ?? ""}
                </Typography>
              ),
              FormHelperTextProps: {
                sx: styles.validationText,
              },
              fullWidth: true,
            }}
          />
          <InputField
            inputProps={{
              name: "confirmPassword",
              onChange,
              onBlur: () => validate("confirmPassword"),
              placeholder: "Confirm password",
              value: data.confirmPassword,
              helperText: (
                <Typography height={12}>
                  {(visitedFields.confirmPassword &&
                    errorObj.confirmPassword) ??
                    ""}
                </Typography>
              ),
              FormHelperTextProps: {
                sx: styles.validationText,
              },
              fullWidth: true,
            }}
          />
          <CustomButton
            type="submit"
            bgcolor={colors.primary}
            sx={styles.savePasswordBtn}
          >
            {translate("common.save") + " " + translate("common.password")}
          </CustomButton>
        </>
      )}
    </Stack>
  );
};

export default UpdatePassword;
