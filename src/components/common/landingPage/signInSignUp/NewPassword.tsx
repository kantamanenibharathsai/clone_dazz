import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { translate } from "../../../../config/i18n";
import { colors } from "../../../../config/theme";
import { updatePassword } from "../../../../redux/reducers/common/forgotPasswordSlice";
import { useAppDispatch, useAppSelector } from "../../../../utils/useRedux";
import { passwordRegex } from "../../../../utils/utils";
import { CustomButton } from "../../customButton/CustomButton";
import { InputField } from "../../inputField/InputField";
import { formStyles } from "./formStyles";

interface IProps {
  handleClose: () => void;
}
interface PasswordFields {
  password: string;
  confirmPassword: string;
}
interface IState {
  data: PasswordFields;
  errorObj: PasswordFields;
  visitedFields: PasswordFields;
  passwordTypes: {
    password: "text" | "password";
    confirmPassword: "text" | "password";
  };
}
const NewPassword = ({ handleClose }: IProps) => {
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
  const [passwordTypes, setPasswordTypes] = useState<IState["passwordTypes"]>({
    password: "password",
    confirmPassword: "password",
  });
  const dispatch = useAppDispatch();
  const { allApiStatus } = useAppSelector((state) => state.forgotPasswordSlice);
  useEffect(() => {
    if (allApiStatus.updatePassword === "SUCCESS") handleClose();
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
  const toggleEye = (name: "password" | "confirmPassword") => {
    setPasswordTypes((prev) => ({
      ...prev,
      [name]: prev[name] === "text" ? "password" : "text",
    }));
  };
  return (
    <Stack
      component={"form"}
      onSubmit={handleSubmit}
      justifyContent={"space-around"}
      sx={formStyles.newPasswordForm}
    >
      <Box>
        <Typography sx={formStyles.forgotFlowMainText}>
          Create New Password
        </Typography>
      </Box>
      <InputField
        fieldName={
          <Typography ml={-1.1} mb={0.6}>
            New Password
          </Typography>
        }
        textProps={{ color: colors.white }}
        inputProps={{
          name: "password",
          type: passwordTypes.password,
          value: data.password,
          onBlur: () => validate("password"),
          sx: formStyles.input,
          placeholder: "Enter New Password",
          fullWidth: true,
          onChange,
          InputProps: {
            endAdornment: (
              <IconButton onClick={() => toggleEye("password")}>
                {passwordTypes.password === "text" ? (
                  <Visibility sx={formStyles.eyeIcon} />
                ) : (
                  <VisibilityOff sx={formStyles.eyeIcon} />
                )}
              </IconButton>
            ),
          },
          error: Boolean(visitedFields.password && errorObj.password),
          helperText: (
            <Typography sx={formStyles.helperText} color={colors.validate}>
              {(visitedFields.password && errorObj.password) ?? ""}
            </Typography>
          ),
        }}
      />
      <InputField
        fieldName={
          <Typography ml={-1.1} mb={0.6}>
            Confirm Password
          </Typography>
        }
        textProps={{ color: colors.white }}
        inputProps={{
          name: "confirmPassword",
          type: passwordTypes.confirmPassword,
          onBlur: () => validate("confirmPassword"),
          value: data.confirmPassword,
          sx: formStyles.input,
          placeholder: "Confirm Your Password",
          fullWidth: true,
          onChange,
          InputProps: {
            endAdornment: (
              <IconButton onClick={() => toggleEye("confirmPassword")}>
                {passwordTypes.confirmPassword === "text" ? (
                  <Visibility sx={formStyles.eyeIcon} />
                ) : (
                  <VisibilityOff sx={formStyles.eyeIcon} />
                )}
              </IconButton>
            ),
          },
          error: Boolean(
            visitedFields.confirmPassword && errorObj.confirmPassword
          ),
          helperText: (
            <Typography sx={formStyles.helperText} color={colors.validate}>
              {(visitedFields.confirmPassword && errorObj.confirmPassword) ??
                ""}
            </Typography>
          ),
        }}
      />
      <CustomButton type="submit" fullWidth bgcolor={colors.darkBlue}>
        Update
      </CustomButton>
    </Stack>
  );
};

export default NewPassword;
