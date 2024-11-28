import {
  Box,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { colors } from "../../../../config/theme";
import {
  CommissionData,
  getCommissions,
  postCommissions,
} from "../../../../redux/reducers/superAdmin/commissionsSlice";
import { AppDispatch, RootState } from "../../../../redux/store";
import { displayAlert } from "../../../../utils/toastMessage";
import { useAppSelector } from "../../../../utils/useRedux";
import { CustomButton } from "../../../common/customButton/CustomButton";
import { InputField } from "../../../common/inputField/InputField";
import { superAdminSettingsStyles } from "../settingsStyles";
import { useRoutePermissions } from "../../../../utils/useRoutePermissions";
interface IState {
  data: {
    hostType: string;
    hostValue: string;
    adAgencyType: string;
    adAgencyValue: string;
    investorType: string;
    investorValue: string;
  };
  errors: {
    host: string;
    investor: string;
    adAgency: string;
  };
  isOpenModal: boolean;
}
const Commissions: React.FC = () => {
  const { commissions, loading } = useAppSelector(
    (state: RootState) => state.commissionsSlice
  );
  const dispatch = useDispatch<AppDispatch>();
  const [data, setData] = useState<IState["data"]>({
    adAgencyType: "PERCENTAGE",
    adAgencyValue: "50",
    hostType: "PERCENTAGE",
    hostValue: "50",
    investorType: "PERCENTAGE",
    investorValue: "50",
  });
  const [errors, setErrors] = useState<IState["errors"]>({
    adAgency: "",
    host: "",
    investor: "",
  });
  useEffect(() => {
    dispatch(getCommissions());
  }, [dispatch]);
  useEffect(() => {
    const getRoleData = (roleId: number) => {
      if (commissions !== null) {
        return commissions.find((item) => item?.roleId === roleId);
      }
    };
    const initializeData = () => {
      setData({
        adAgencyType: getRoleData(12)?.commission.toUpperCase() ?? "",
        adAgencyValue: getRoleData(12)?.value?.toString() ?? "",
        hostType: getRoleData(8)?.commission.toUpperCase() ?? "",
        hostValue: getRoleData(8)?.value?.toString() ?? "",
        investorType: getRoleData(11)?.commission.toUpperCase() ?? "",
        investorValue: getRoleData(11)?.value?.toString() ?? "",
      });
    };
    if (commissions && commissions.length > 0) {
      initializeData();
    }
  }, [commissions]);
  const validate = () => {
    const dummyErrors = {} as IState["errors"];
    if (data?.hostValue === "") {
      dummyErrors.host = "Host value is required";
    } else if (
      data?.hostType === "PERCENTAGE" &&
      Number(data?.hostValue) > 100
    ) {
      dummyErrors.host = "Host value should be less than 100%";
    }
    if (data?.investorValue === "") {
      dummyErrors.investor = "Investor value is required";
    } else if (
      data?.investorType === "PERCENTAGE" &&
      Number(data?.investorValue) > 100
    ) {
      dummyErrors.investor = "Investor value should be less than 100";
    }
    if (data?.adAgencyValue === "") {
      dummyErrors.adAgency = "AdAgency value is required";
    } else if (
      data?.adAgencyType === "PERCENTAGE" &&
      Number(data.adAgencyValue) > 100
    ) {
      dummyErrors.adAgency = "AdAgency value should be less than 100";
    }
    setErrors(dummyErrors);
    return Object.keys(dummyErrors).length === 0;
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validate()) {
      displayAlert("Successfully Added", "success");
      const obj: CommissionData[] = [
        { commission: data.hostType, value: Number(data.hostValue), roleId: 8 },
        {
          commission: data.investorType,
          value: Number(data.investorValue),
          roleId: 11,
        },
        {
          commission: data.adAgencyType,
          value: Number(data.adAgencyValue),
          roleId: 12,
        },
      ];
      dispatch(postCommissions(obj));
    }
  };
  const fieldHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (!/^[0-9]*$/.test(value) || value.length > 12) {
      return;
    }
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors({ ...errors, [name]: "" });
  };
  const dropDownHandler = (event: SelectChangeEvent) => {
    setData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  const permissions = useRoutePermissions();
  return loading ? (
    <h1>Loading....</h1>
  ) : (
    <Box
      sx={superAdminSettingsStyles.mainContainer}
      component={"form"}
      onSubmit={handleSubmit}
    >
      <Typography fontSize={{ xs: "26px", md: "20px" }} fontWeight={500}>
        Host
      </Typography>
      <Grid container width={{ xs: "100%", lg: "70%" }} spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography color={colors.labelText} fontSize={14} mb={"8px"}>
            Commission
          </Typography>
          <Select
            name="hostType"
            fullWidth
            value={data.hostType}
            onChange={dropDownHandler}
            sx={superAdminSettingsStyles.selectText}
          >
            <MenuItem value="PERCENTAGE">Percentage</MenuItem>
            <MenuItem value="FIXED">Fixed</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            fieldName={
              <Typography sx={superAdminSettingsStyles.valueLabel}>
                Value*
              </Typography>
            }
            textProps={{
              color: colors.labelText,
              fontSize: "14px !important",
            }}
            inputProps={{
              value: data.hostValue,
              name: "hostValue",
              fullWidth: true,
              placeholder: "Enter Value",
              helperText: (
                <Typography color={colors.validate} height={12}>
                  {errors.host ?? ""}
                </Typography>
              ),
              onChange: fieldHandler,
              error: Boolean(errors.host),
            }}
          />
        </Grid>
      </Grid>
      <Typography fontSize={{ xs: "26px", md: "20px" }} fontWeight={500}>
        Investors
      </Typography>
      <Grid container width={{ xs: "100%", lg: "70%" }} spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography color={colors.labelText} fontSize={14} mb={"8px"}>
            Commission
          </Typography>
          <Select
            fullWidth
            name="investorType"
            value={data.investorType}
            onChange={dropDownHandler}
            sx={superAdminSettingsStyles.selectText}
          >
            <MenuItem value="PERCENTAGE">Percentage</MenuItem>
            <MenuItem value="FIXED">Fixed</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            fieldName={
              <Typography sx={superAdminSettingsStyles.valueLabel}>
                Value*
              </Typography>
            }
            textProps={{
              color: colors.labelText,
              fontSize: "14px !important",
            }}
            inputProps={{
              value: data.investorValue,
              name: "investorValue",
              fullWidth: true,
              placeholder: "Enter Value",
              helperText: (
                <Typography color={colors.validate} height={12}>
                  {errors.investor ?? ""}
                </Typography>
              ),
              onChange: fieldHandler,
              error: Boolean(errors.investor),
            }}
          />
        </Grid>
      </Grid>
      <Typography fontSize={{ xs: "26px", md: "20px" }} fontWeight={500}>
        Ad Agency
      </Typography>
      <Grid container width={{ xs: "100%", lg: "70%" }} spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography color={colors.labelText} fontSize={14} mb={"8px"}>
            Commission
          </Typography>
          <Select
            name="adAgencyType"
            fullWidth
            value={data.adAgencyType}
            onChange={dropDownHandler}
            sx={superAdminSettingsStyles.selectText}
          >
            <MenuItem value="PERCENTAGE">Percentage</MenuItem>
            <MenuItem value="FIXED">Fixed</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            fieldName={
              <Typography sx={superAdminSettingsStyles.valueLabel}>
                Value*
              </Typography>
            }
            textProps={{
              color: colors.labelText,
              fontSize: "14px !important",
            }}
            inputProps={{
              value: data.adAgencyValue,
              name: "adAgencyValue",
              fullWidth: true,
              placeholder: "Enter Value",
              helperText: (
                <Typography color={colors.validate} height={12}>
                  {errors.adAgency ?? ""}
                </Typography>
              ),
              onChange: fieldHandler,
              error: Boolean(errors.adAgency),
            }}
          />
        </Grid>
      </Grid>
      {permissions.edit && (
        <CustomButton
          type="submit"
          bgcolor={colors.primary}
          sx={superAdminSettingsStyles.saveBtn}
        >
          Save
        </CustomButton>
      )}
    </Box>
  );
};

export default Commissions;
