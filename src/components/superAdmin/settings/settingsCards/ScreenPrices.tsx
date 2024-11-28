import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { colors } from "../../../../config/theme";
import {
  getScreenPrices,
  updateScreenPrices,
} from "../../../../redux/reducers/superAdmin/ScreenPricesSlice";
import { displayAlert } from "../../../../utils/toastMessage";
import { useAppDispatch, useAppSelector } from "../../../../utils/useRedux";
import { blockInvalidChar } from "../../../../utils/utils";
import { CustomButton } from "../../../common/customButton/CustomButton";
import { InputField } from "../../../common/inputField/InputField";
import { screenAdsStyles } from "../../../host/screenAds/ScreenAdsStyles";
import { superAdminSettingsStyles } from "../settingsStyles";
import { pricesStyles } from "./SettingsScreensStyles";
interface IState {
  formData: {
    id: number;
    fieldName: string;
    error: string;
    value: string;
    placeHolder: string;
  }[];
}
const ScreenPrices = () => {
  const [formData, setFormData] = useState<IState["formData"]>([
    {
      id: 0,
      fieldName: "Cycle Time (in seconds)",
      error: "",
      value: "",
      placeHolder: "Enter cycle time",
    },
    {
      id: 1,
      fieldName: "Full Loop Time (in seconds)",
      error: "",
      value: "",
      placeHolder: "Enter full loop time",
    },
    {
      id: 2,
      fieldName: "CPM Price",
      error: "",
      value: "",
      placeHolder: "Enter cpm price",
    },
    {
      id: 3,
      fieldName: "Flexi (in percentage)",
      error: "",
      value: "",
      placeHolder: "Enter Flexi Percentage",
    },
    {
      id: 4,
      fieldName: "Half Loop (in Percentage)",
      error: "",
      value: "",
      placeHolder: "Enter Half Loop Percentage",
    },
    {
      id: 5,
      fieldName: "Rotaional (in Percentage)",
      error: "",
      value: "",
      placeHolder: "Enter Rotational Percentage",
    },
  ]);
  const [isUpdate, setIsUpdate] = useState(true);
  const formOnChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    setIsUpdate(false);
    const newFormData = [...formData];
    const inputObj = newFormData[index];
    newFormData[index] = {
      ...inputObj,
      value: event.target.value,
      error: event.target.value.length === 0 ? "Required" : "",
    };
    setFormData(newFormData);
  };
  const dispatch = useAppDispatch();
  const { loading, message } = useAppSelector((state) => state.screenPrices);
  const formOnBlur = (index: number) => {
    const newFormData = [...formData];
    const inputObj = newFormData[index];
    newFormData[index] = {
      ...inputObj,
      error: newFormData[index].value.length === 0 ? "Required" : "",
    };
    if (
      index > 2 &&
      (Number(formData[index].value) < 0 || Number(formData[index].value) > 100)
    ) {
      newFormData[index] = {
        ...inputObj,
        error: "Value Should be in range [0, 100]",
      };
    }
    setFormData(newFormData);
  };
  const handleOnSubmit = async (event: FormEvent) => {
    event.preventDefault();
    let newFormData = [...formData];
    const emptyValues = newFormData.filter((form) => form.value === "");
    emptyValues.forEach((formData) => {
      newFormData[formData.id].error = "Required";
    });
    if (newFormData.every((form) => form.error === "")) {
      const body = new FormData();
      body.append("cycleTime", formData[0].value);
      body.append("fullLoopTime", formData[1].value);
      body.append("cpmPrice", formData[2].value);
      body.append("flexi", formData[3].value);
      body.append("halfLoop", formData[4].value);
      body.append("rotational", formData[5].value);
      const updateScreenPricesDispatch = await dispatch(
        updateScreenPrices(body)
      );
      if (updateScreenPricesDispatch.payload.statusCode === "200") {
        displayAlert(updateScreenPricesDispatch.payload.message, "success");
        getScreenPricesFunc();
      }
    } else {
      setFormData(newFormData);
    }
  };
  const getScreenPricesFunc = async () => {
    const getScreensDispatch = await dispatch(getScreenPrices());
    if (getScreensDispatch.payload.statusCode === "200") {
      setIsUpdate(true);
      const { cycleTime, fullLoopTime, cpmPrice, rotational, flexi, halfLoop } =
        getScreensDispatch.payload.data;
      let newFormData = [...formData];
      newFormData[0].value = String(cycleTime);
      newFormData[1].value = String(fullLoopTime);
      newFormData[2].value = String(cpmPrice);
      newFormData[3].value = String(flexi);
      newFormData[4].value = String(halfLoop);
      newFormData[5].value = String(rotational);
      setFormData(newFormData);
    }
  };
  console.log(formData);
  useEffect(() => {
    getScreenPricesFunc();
    // eslint-disable-next-line
  }, []);
  return (
    <Box
      maxWidth={"lg"}
      sx={pricesStyles.formBox}
      component={"form"}
      onSubmit={handleOnSubmit}
    >
      <Grid container spacing={3}>
        <Grid xs={12} item>
          <Box sx={screenAdsStyles.loadingBox}>
            {loading === "PENDING" ? (
              <CircularProgress />
            ) : (
              loading === "REJECTED" && <Typography>{message}</Typography>
            )}
          </Box>
        </Grid>
        {loading === "FULFILLED" &&
          formData.map((form, index) => (
            <Grid item key={form.fieldName} xs={12} md={6}>
              <Box maxWidth={350}>
                <InputField
                  fieldName={
                    <Typography sx={superAdminSettingsStyles.valueLabel}>
                      {form.fieldName}
                    </Typography>
                  }
                  textProps={{
                    color: colors.labelText,
                    fontSize: "14px !important",
                  }}
                  inputProps={{
                    value: form.value,
                    fullWidth: true,
                    placeholder: form.placeHolder,
                    type: "number",
                    onKeyDown: blockInvalidChar,
                    onBlur: () => formOnBlur(index),
                    helperText: (
                      <Typography color={colors.validate} height={12}>
                        {form.error}
                      </Typography>
                    ),
                    onChange: (event: ChangeEvent<HTMLInputElement>) =>
                      formOnChange(event, index),
                    error: Boolean(form.error.length),
                  }}
                />
              </Box>
            </Grid>
          ))}
      </Grid>
      <CustomButton
        type="submit"
        disabled={isUpdate || formData.some((each) => each.error.length)}
        sx={{ width: 300, alignSelf: "center" }}
      >
        Update
      </CustomButton>
    </Box>
  );
};

export default ScreenPrices;
