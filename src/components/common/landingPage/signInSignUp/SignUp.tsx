import {
  InfoOutlined,
  KeyboardArrowDown,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  FormControl,
  FormHelperText,
  IconButton,
  styled,
  Tooltip,
  tooltipClasses,
  TooltipProps,
  Typography,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { translate } from "../../../../config/i18n";
import { colors } from "../../../../config/theme";
import { rolesAction, signUpAction } from "../../../../redux/reducers/auth";
import { emailSetter } from "../../../../redux/reducers/common/forgotPasswordSlice";
import { AppDispatch, RootState } from "../../../../redux/store";
import { displayAlert } from "../../../../utils/toastMessage";
import { blockInvalidChar } from "../../../../utils/utils";
import { MessageIcon, flag } from "../../assets";
import { CustomButton } from "../../customButton/CustomButton";
import { InputField } from "../../inputField/InputField";
import { FormType } from "../bannerSection/BannerSection";
import { formStyles, loadingSpinner } from "./formStyles";
import {
  handleEmailSwitch,
  handleNameSwitch,
  handleOrganizationNameSwitch,
  handlePasswordSwitch,
  handlePhoneSwitch,
  handleRoleCondition,
} from "./formValidations";

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} placement="right-start" />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
    marginLeft: 5,
  },
}));
interface IState {
  inputs: {
    fieldName: string;
    value: string;
    errorMessage: string;
    placeholder: string;
  }[];
  isVisible: boolean;
  changeEvent:
    | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    | SelectChangeEvent;
}
interface IProps {
  handleForm: (form: FormType) => void;
}
const SignUp = ({ handleForm }: IProps) => {
  const [inputs, setInputs] = useState<IState["inputs"]>([
    {
      fieldName: translate("common.name"),
      value: "",
      errorMessage: "",
      placeholder: translate("common.enterName"),
    },
    {
      fieldName: translate("common.email"),
      value: "",
      errorMessage: "",
      placeholder: translate("common.enterEmail"),
    },
    {
      fieldName: translate("common.phone"),
      value: "",
      errorMessage: "",
      placeholder: translate("common.enterPhone"),
    },
    {
      fieldName: translate("common.organizationName"),
      value: "",
      errorMessage: "",
      placeholder: translate("common.enterOrganizationName"),
    },
    {
      fieldName: translate("common.role"),
      value: "",
      errorMessage: "",
      placeholder: translate("common.enterOrganizationName"),
    },
    {
      fieldName: translate("common.password"),
      value: "",
      errorMessage: "",
      placeholder: translate("common.enterPassword"),
    },
  ]);
  const [isVisible, setIsVisible] = useState<IState["isVisible"]>(false);
  const { loading, roles } = useSelector((state: RootState) => state.Auth);
  const dispatch = useDispatch<AppDispatch>();
  const handleVisibilityChange = () => {
    setIsVisible(!isVisible);
  };
  const handleOnSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (loading) return;
    const newErrors = [...inputs];
    let switchCases = [
      handleNameSwitch,
      handleEmailSwitch,
      handlePhoneSwitch,
      handleOrganizationNameSwitch,
      handleRoleCondition,
      handlePasswordSwitch,
    ];
    for (let i = 0; i < inputs.length; i++) {
      newErrors[i].errorMessage = switchCases[i](inputs[i].value);
    }
    const isAnyOneFieldEmpty = newErrors
      .map((input) => input.errorMessage)
      .every((errorMessage) => errorMessage.length === 0);
    if (!isAnyOneFieldEmpty) {
      setInputs(newErrors);
    } else {
      const formData = new FormData();
      formData.append("name", inputs[0].value.toLowerCase());
      formData.append("email", inputs[1].value.toLowerCase());
      formData.append("mobileNumber", inputs[2].value);
      formData.append("password", inputs[5].value);
      formData.append("organizationName", inputs[3].value.toLowerCase());
      formData.append("roleId", inputs[4].value);
      const signUpDispatch = await dispatch(signUpAction(formData));
      if (signUpDispatch.payload?.statusCode === "200") {
        dispatch(emailSetter({ emailOrmobile: inputs[1].value }));
        handleForm("SIGN_UP_EMAIL_VERIFY");
        displayAlert("OTP sent to your email", "success");
      }
    }
  };
  const handleOnChange = (event: IState["changeEvent"], index: number) => {
    event.preventDefault();
    const newInputs = [...inputs];
    const obj = newInputs[index];
    newInputs[index] = { ...obj, value: event.target.value };
    setInputs(newInputs);
  };
  const handleOnBlur = (event: { target: { name: string } }) => {
    const newErrors = [...inputs];
    let conditionFunctions = [
      handleNameSwitch,
      handleEmailSwitch,
      handlePhoneSwitch,
      handleOrganizationNameSwitch,
      handleRoleCondition,
      handlePasswordSwitch,
    ];
    inputs.forEach((input, index) => {
      if (input.fieldName === event.target.name) {
        return (newErrors[index].errorMessage = conditionFunctions[index](
          input.value
        ));
      }
    });
    setInputs(newErrors);
  };
  const handleType = (fieldName: string) => {
    switch (fieldName) {
      case translate("common.phone"):
        return "number";
      case translate("common.password"):
        return !isVisible ? "password" : "text";
      default: {
        return "text";
      }
    }
  };
  useEffect(() => {
    dispatch(rolesAction());
  }, [dispatch]);
  return (
    <Box component={"form"} sx={formStyles.form} onSubmit={handleOnSubmit}>
      <Typography sx={formStyles.accountText}>Create your account</Typography>
      {inputs.map((input, index) =>
        index === inputs.length - 2 ? (
          <FormControl fullWidth key={input.fieldName}>
            <Typography sx={{ ...formStyles.labelText, ml: 0.3 }}>
              Role
              <Typography sx={formStyles.supText} component={"sup"}>
                *
              </Typography>
            </Typography>
            <Select
              onBlur={() => handleOnBlur({ target: { name: input.fieldName } })}
              value={input.value}
              displayEmpty
              onChange={(event) => handleOnChange(event, index)}
              error={Boolean(input.errorMessage)}
              name={input.fieldName}
              sx={formStyles.selectInput(!input.value)}
              MenuProps={{ PaperProps: { sx: formStyles.dropDownMaxHeight } }}
            >
              <MenuItem value="">Select Role</MenuItem>
              {roles?.map((role) => (
                <MenuItem value={role.id} key={role.id}>
                  {role.roleName}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText sx={formStyles.roleHelperText}>
              {input.errorMessage}
            </FormHelperText>
          </FormControl>
        ) : (
          <Box sx={formStyles.phoneBox} key={input.fieldName}>
            {input.fieldName === translate("common.phone") && (
              <InputField
                fieldName={
                  <Typography sx={formStyles.labelText}>
                    {input.fieldName}
                    <Typography sx={formStyles.supText} component={"sup"}>
                      *
                    </Typography>
                  </Typography>
                }
                boxProps={formStyles.inputFlag}
                inputProps={{
                  sx: formStyles.flagField,
                  helperText: <Typography sx={formStyles.helperText} />,
                  InputProps: {
                    value: "+91",
                    startAdornment: (
                      <Box
                        component={"img"}
                        src={flag}
                        sx={formStyles.flagBox}
                      />
                    ),
                    endAdornment: <KeyboardArrowDown sx={formStyles.icon} />,
                  },
                }}
              />
            )}
            <InputField
              fieldName={
                <Typography sx={formStyles.labelText}>
                  {input.fieldName !== translate("common.phone") && (
                    <>
                      {input.fieldName}
                      <Typography
                        sx={{ color: colors.carmine }}
                        component={"sup"}
                      >
                        *
                      </Typography>
                      {input.fieldName === translate("common.password") && (
                        <HtmlTooltip
                          title={
                            <Typography sx={formStyles.toolTipText}>
                              The password should contain at least one
                              uppercase, one lowercase, one number, one special
                              character.
                            </Typography>
                          }
                        >
                          <IconButton>
                            <InfoOutlined sx={formStyles.toolTipIcon} />
                          </IconButton>
                        </HtmlTooltip>
                      )}
                    </>
                  )}
                </Typography>
              }
              boxProps={formStyles.inputBox}
              inputProps={{
                fullWidth: true,
                name: input.fieldName,
                value: input.value,
                autoComplete: "off",
                sx: formStyles.input,
                type: handleType(input.fieldName),
                placeholder: input.placeholder,
                error: Boolean(input.errorMessage),
                onKeyDown:
                  input.fieldName === translate("common.phone")
                    ? blockInvalidChar
                    : () => {},
                onBlur: (event) => handleOnBlur(event),
                onChange: (event) => handleOnChange(event, index),
                helperText: (
                  <Typography sx={formStyles.helperText}>
                    {input.errorMessage}
                  </Typography>
                ),
                InputProps: {
                  fullWidth: true,
                  endAdornment:
                    input.fieldName === translate("common.password") ? (
                      <IconButton onClick={handleVisibilityChange}>
                        {isVisible ? (
                          <Visibility sx={formStyles.icon} />
                        ) : (
                          <VisibilityOff sx={formStyles.icon} />
                        )}
                      </IconButton>
                    ) : (
                      <Box
                        sx={formStyles.iconBox(
                          input.fieldName === translate("common.email")
                        )}
                      >
                        <MessageIcon />
                      </Box>
                    ),
                },
              }}
            />
          </Box>
        )
      )}
      <CustomButton
        width={"100%"}
        bgcolor={colors.darkBlue}
        sx={formStyles.button}
        type="submit"
        endIcon={loading && <CircularProgress sx={loadingSpinner} />}
      >
        {translate("common.requestApproval")}
      </CustomButton>
    </Box>
  );
};
export default SignUp;
