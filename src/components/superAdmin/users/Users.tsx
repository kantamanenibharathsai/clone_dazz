import { Add, Close } from "@mui/icons-material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Modal,
  Pagination,
  Select,
  SelectChangeEvent,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import moment from "moment";
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useMemo,
  useState,
} from "react";
import { roles } from "../../../config/config";
import { colors } from "../../../config/theme";
import {
  EachScreenGroupOption,
  EachScreenOption,
  getExistingScreenGroups,
  getExistingScreens,
  getScreenGroups,
  getScreens,
  partialResetStore,
  userClient,
  userClientdelete,
  userCreationAndUpdation,
  UserType,
} from "../../../redux/reducers/superAdmin/UserSlice";
import { useAppDispatch, useAppSelector } from "../../../utils/useRedux";
import { useRoutePermissions } from "../../../utils/useRoutePermissions";
import {
  blockInvalidChar,
  checkEmailValidation,
  checkPhoneValidation,
  cleanInputSetter,
  showEntriesStats,
  tokenWithUrl,
} from "../../../utils/utils";
import { DummyUser } from "../../common/assets";
import { CustomButton } from "../../common/customButton/CustomButton";
import { InputField } from "../../common/inputField/InputField";
import { ModalStyled } from "../../common/modal/CommonModal";
import {
  DeleteIcon,
  EditIcon,
  Flag,
  PlainDeleteIcon,
  SearchIcon,
} from "../assets";
import { commonStyles } from "../common/CommonStyles";
import { styles } from "./UserStyles";
import {
  adAgencyFieldDetails,
  clientFieldDetails,
  clientsInitialForm,
  EachFieldType,
  hostFieldDetails,
  investorFieldDetails,
  othersInitialForm,
  othersTitles,
  UserRole,
  vendorFieldDetails,
  vendorsTitles,
} from "./typesAndDataStore";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const sortingOptions = ["Newest", "Oldest"];
interface IState {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNo: string;
    commissionType?: "PERCENTAGE" | "FIXED" | "NONE";
    commissionValue?: string;
    investedAmount?: string;
  };
  activeSortOption: "Newest" | "Oldest";
  searchInput: string;
  activeEditId: number | null;
  activeDeleteId: number | null;
  screenErrors: {
    group: string;
    screens: string;
  };
}
const getInitialForm = (role: UserRole) => {
  if (role === "USER") return clientsInitialForm;
  return othersInitialForm;
};

const Users = ({ role }: { role: UserRole }) => {
  const [activeSortOption, setActiveSortOption] =
    useState<IState["activeSortOption"]>("Newest");
  const [searchInput, setSearchInput] = useState<IState["searchInput"]>("");
  const [activeDeleteId, setActiveDeleteId] =
    useState<IState["activeDeleteId"]>(null);
  const [activeEditId, setActiveEditId] =
    useState<IState["activeEditId"]>(null);
  const [formData, setFormData] = useState<IState["formData"]>(
    getInitialForm(role)
  );
  const [errorObj, setErrorObj] = useState<IState["formData"]>(formData);
  const [screenGroupName, setScreenGroupName] = useState<string>("");
  const [screenName, setScreenName] = useState<string>("");
  const [screenGroupIds, setScreenGroupIds] = useState<EachScreenGroupOption[]>(
    []
  );
  const [screenIds, setScreenIds] = useState<EachScreenOption[]>([]);
  const [screenErrors, setScreenErrors] = useState<IState["screenErrors"]>({
    group: "",
    screens: "",
  });
  const [visitedFields, setVisitedFields] =
    useState<IState["formData"]>(formData);
  const autoCompleteTextChangeHandler = (
    type: "GROUP" | "SCREEN",
    value: string
  ) => {
    if (type === "GROUP") {
      cleanInputSetter(value, setScreenGroupName);
      dispatch(
        getScreenGroups({
          page: 1,
          searchInput: value.trim(),
          isHost: role === "HOST",
        })
      );
    } else {
      cleanInputSetter(value, setScreenName);
    }
  };
  const {
    userData,
    pagination,
    allApiStatuses,
    readApiError,
    screenGroupOptions,
    screenGroupPagination,
    screenOptions,
    screensPagination,
  } = useAppSelector((state) => state.userClient);
  const roleId = useMemo(() => {
    switch (role) {
      case "USER":
        return roles.USER + "";
      case "INVESTOR":
        return roles.INVESTORS + "";
      case "HOST":
        return roles.HOST + "";
      case "AGENCY":
        return roles.AD_AGENCY + "";
      case "VENDER":
        return roles.VENDERS + "";
    }
  }, [role]);
  const handleChange = (
    event: SelectChangeEvent<IState["activeSortOption"]>
  ) => {
    const { value } = event.target;
    if (event.target.value === "Newest") {
      setActiveSortOption(value as IState["activeSortOption"]);
    }
    if (event.target.value === "Oldest") {
      setActiveSortOption(value as IState["activeSortOption"]);
    }
    dispatch(
      userClient({
        page: "1",
        search: searchInput.trim(),
        sortDirection: event.target.value === "Newest" ? "desc" : "asc",
        roleId,
      })
    );
  };
  const handleSearchInput = (input: string) => {
    setSearchInput(input);
    dispatch(
      userClient({
        page: "1",
        search: input,
        sortDirection: activeSortOption === "Newest" ? "desc" : "asc",
        roleId,
      })
    );
  };
  const handleDeleteId = (deleteID: number | null) => {
    setActiveDeleteId(deleteID);
  };
  const handleDelete = async () => {
    dispatch(userClientdelete({ userId: activeDeleteId }));
  };
  const fieldsChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (!/^(?! )(?!.*\s{2,}).*$/.test(value) && value.length > 0) return;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setVisitedFields((prevState) => ({
      ...prevState,
      [name]: true,
    }));
    setErrorObj((prev) => ({ ...prev, [name]: false }));
  };
  const validate = (name?: string) => {
    const errors = {} as typeof formData;
    if (formData.firstName.length === 0) {
      errors.firstName = "Required";
    } else if (formData.firstName.length >= 20) {
      errors.firstName = "First Name should be less than 20 characters";
    } else if (!/^(?!.*\s{2,})[a-zA-Z][a-zA-Z ]*$/.test(formData.firstName)) {
      errors.firstName = "Invalid First Name";
    }
    if (formData.lastName.length === 0) {
      errors.lastName = "Required";
    } else if (formData.lastName.length >= 12) {
      errors.lastName = "Last Name should be less than 12 characters";
    } else if (!/^(?!.*\s{2,})[a-zA-Z][a-zA-Z ]*$/.test(formData.lastName)) {
      errors.lastName = "Invalid Last Name";
    }
    if (formData.email.length === 0) {
      errors.email = "Required";
    } else if (checkEmailValidation(formData.email)) {
      errors.email = "Invalid Email";
    }
    if (formData.phoneNo.length === 0) {
      errors.phoneNo = "Required";
    } else if (!checkPhoneValidation(formData.phoneNo)) {
      errors.phoneNo = "Invalid Phone Number";
    }
    if (role !== "USER") {
      if (formData.commissionValue?.length === 0) {
        errors.commissionValue = "Required";
      }
    }
    if (role === "INVESTOR" && formData.investedAmount?.length === 0) {
      errors.investedAmount = "Required";
    }
    if (role !== "USER" && formData.commissionType === "NONE") {
      errors.commissionType = "FIXED";
    }
    if (
      formData.commissionType === "PERCENTAGE" &&
      Number(formData.commissionValue) > 99
    ) {
      errors.commissionValue = "Commission Value should be less than 100%";
    } else if (
      Number(formData.commissionValue) > Number(formData.investedAmount) &&
      formData.commissionType === "FIXED"
    ) {
      errors.commissionValue =
        "Commission Value should be less than invested amount";
    }
    setErrorObj(errors);
    if (name) {
      if (name !== "commissionType")
        setVisitedFields({ ...visitedFields, [name]: "true" });
      else setVisitedFields({ ...visitedFields, commissionType: "FIXED" });
    }
    return Object.values(errors).length === 0;
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (activeEditId === -1) {
      if (role === "USER")
        setVisitedFields({
          firstName: "true",
          lastName: "true",
          email: "true",
          phoneNo: "true",
        });
      else
        setVisitedFields({
          firstName: "true",
          lastName: "true",
          email: "true",
          phoneNo: "true",
          commissionValue: "true",
          investedAmount: "true",
          commissionType: "FIXED",
        });
    }
    if (validate()) {
      if (role === "INVESTOR" || role === "HOST") {
        const dummyErrors = { ...screenErrors };
        if (screenGroupIds.length === 0) {
          dummyErrors.group = "Required";
        }
        if (screenIds.length === 0) {
          dummyErrors.screens = "Required";
        }
        if (dummyErrors.group || dummyErrors.screens) {
          setScreenErrors(dummyErrors);
          return;
        }
      }
      const body = new FormData();
      if (role === "HOST" || role === "INVESTOR") {
        for (let eachScreenId of screenIds) {
          body.append("screenIds", eachScreenId.id.toString());
        }
        if (activeEditId === -1) {
          if (role === "HOST") body.append("isHost", "true");
          else body.append("isInvestor", "true");
        }
        if (role === "INVESTOR") {
          body.append("investedAmount", formData.investedAmount ?? "");
        }
      }
      body.append(
        "name",
        (formData.firstName + " " + formData.lastName).trim()
      );
      body.append("email", formData.email);
      body.append("mobileNumber", formData.phoneNo);
      if (activeEditId === -1) body.append("roleId", roleId?.toString() || "1");
      else body.append("userId", activeEditId! + "");
      if (role !== "USER") {
        body.append("amountOrPercentage", formData.commissionValue + "");
        body.append("commission", formData.commissionType + "");
      }
      dispatch(
        userCreationAndUpdation({
          body,
          method: activeEditId === -1 ? "POST" : "PUT",
        })
      );
    }
  };
  const addNewHandler = () => {
    reInitializeStates();
    setActiveEditId(-1);
  };
  const reInitializeStates = () => {
    setErrorObj({} as IState["formData"]);
    setVisitedFields({} as IState["formData"]);
    setFormData(getInitialForm(role));
    setActiveEditId(null);
    setActiveDeleteId(null);
    setScreenIds([]);
    setScreenGroupIds([]);
    dispatch(partialResetStore());
  };
  useEffect(() => {
    if (allApiStatuses.delete === "SUCCESS") {
      if (userData.length === 1)
        getClientList(pagination.currentPage.toString());
      else getClientList();
      reInitializeStates();
    }
  }, [allApiStatuses.delete]); //eslint-disable-line
  useEffect(() => {
    if (allApiStatuses.createAndUpdate === "SUCCESS") {
      getClientList();
      reInitializeStates();
    }
  }, [allApiStatuses.createAndUpdate]); //eslint-disable-line
  useEffect(() => {
    if (activeEditId !== null && activeEditId !== -1) {
      fillingForm();
    }
  }, [activeEditId]); //eslint-disable-line
  useEffect(() => {
    if (allApiStatuses.getExistingScreens === "SUCCESS") {
      const activeScreenIds = screenOptions.filter(
        (eachScreen) => eachScreen.contains
      );
      setScreenIds(activeScreenIds);
    }
  }, [allApiStatuses.getExistingScreens]); //eslint-disable-line

  const dropDownHandler = (
    event: SelectChangeEvent<IState["formData"]["commissionType"]>
  ) => {
    setFormData((prevState) => ({
      ...prevState,
      commissionType: event.target
        .value as IState["formData"]["commissionType"],
      commissionValue: "",
    }));
    setErrorObj({ ...errorObj, commissionType: "NONE" });
    setVisitedFields({ ...visitedFields, commissionType: "FIXED" });
  };
  const getPlainField = (each: EachFieldType) => {
    const keyValue = each.fieldNameInForm as keyof IState["formData"];
    return (
      <Grid item xs={12} sm={6} key={each.fieldName}>
        <InputField
          fieldName={each.fieldName}
          textProps={{ sx: styles.labelText }}
          inputProps={{
            helperText: (
              <Typography height={12} color={colors.validate}>
                {visitedFields[keyValue] && errorObj[keyValue]
                  ? errorObj[keyValue]
                  : ""}
              </Typography>
            ),
            placeholder: each.fieldPlaceholder,
            error: Boolean(visitedFields[keyValue] && errorObj[keyValue]),
            value: (each.fieldName === "Invested Amount"
              ? formData[keyValue]?.slice(0, 10)
              : formData[keyValue]) as string,
            name: String(keyValue),
            type: each.fieldName !== "Invested Amount" ? "text" : "number",
            onKeyDown:
              each.fieldName === "Invested Amount"
                ? blockInvalidChar
                : () => null,
            onChange: fieldsChangeHandler,
            onBlur: () => validate(keyValue),
            fullWidth: true,
            sx: styles.inputText,
          }}
        />
      </Grid>
    );
  };
  const getPhoneNumberField = (each: EachFieldType) => {
    const keyValue = each.fieldNameInForm as keyof IState["formData"];
    return (
      <Grid item xs={12} sm={6}>
        <Box sx={styles.phoneNumberFlex}>
          <InputField
            fieldName={each.fieldName}
            textProps={{ sx: styles.labelText }}
            inputProps={{
              sx: styles.flagField,
              InputProps: {
                readOnly: true,
                value: " +91",
                endAdornment: <KeyboardArrowDownIcon sx={styles.icon} />,
                startAdornment: (
                  <Box component={"img"} src={Flag} ml={-1} mr={0} />
                ),
              },
            }}
          />
          <InputField
            fieldName={<Typography height={21.5}></Typography>}
            textProps={{ sx: styles.labelText }}
            inputProps={{
              placeholder: each.fieldPlaceholder,
              helperText: (
                <Typography height={12} color={colors.validate}>
                  {visitedFields[keyValue] && errorObj[keyValue]
                    ? errorObj[keyValue]
                    : ""}
                </Typography>
              ),
              error: Boolean(visitedFields[keyValue] && errorObj[keyValue]),
              value: formData[keyValue],
              name: each.fieldNameInForm,
              onChange: fieldsChangeHandler,
              fullWidth: true,
              type: "text",
              onBlur: () => validate(String(keyValue)),
              sx: styles.inputText,
            }}
          />
        </Box>
      </Grid>
    );
  };
  const getDropdownField = (each: EachFieldType) => {
    const keyValue = each.fieldNameInForm as keyof IState["formData"];
    return (
      <Grid item xs={12} sm={6}>
        <Typography sx={styles.labelText}>Commission Type</Typography>
        <Select
          fullWidth
          value={formData[keyValue] as IState["formData"]["commissionType"]}
          onChange={dropDownHandler}
          error={
            visitedFields.commissionType === "FIXED" &&
            errorObj.commissionType === "FIXED"
          }
          onBlur={() =>
            validate(formData[keyValue] as IState["formData"]["commissionType"])
          }
          sx={
            formData.commissionType === "NONE"
              ? styles.dullSelectText
              : styles.selectText
          }
          MenuProps={{
            sx: styles.unShadowMenu,
          }}
        >
          <MenuItem value="NONE">Select Commission Type</MenuItem>
          <MenuItem value="PERCENTAGE">Percentage</MenuItem>
          <MenuItem value="FIXED">Fixed</MenuItem>
        </Select>
        <FormHelperText>
          <Typography
            color={colors.validate}
            fontSize={12}
            ml={1.1}
            height={12}
          >
            {visitedFields.commissionType === "FIXED" &&
              errorObj.commissionType === "FIXED" &&
              "Required"}
          </Typography>
        </FormHelperText>
      </Grid>
    );
  };
  const handleScreenIds = (values: EachScreenOption[]) => {
    setScreenIds(values);
    setScreenErrors((prev) => ({ ...prev, screens: "" }));
  };
  const handleScreenGroupIds = (values: EachScreenGroupOption[]) => {
    setScreenGroupIds(values);
    setScreenErrors((prev) => ({ ...prev, group: "" }));
    if (activeEditId === -1) {
      const finalScreenIds = screenIds.filter((eachScreen) =>
        values.some((each) => each.id === eachScreen.screenGroupId)
      );
      setScreenIds(finalScreenIds);
      dispatch(
        getScreens({ page: 1, groupIds: values.map((each) => each.id) })
      );
    } else {
      dispatch(
        getExistingScreens({
          id: activeEditId ?? -1,
          groupIds: values.map((each) => each.id),
        })
      );
    }
  };
  const getScreenGroupField = (each: EachFieldType) => {
    return (
      <Grid item xs={12} sm={6}>
        <Typography sx={styles.labelText}>{each.fieldName}</Typography>
        <Autocomplete
          multiple
          value={screenGroupIds}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          onChange={(_event, value) => {
            handleScreenGroupIds(value);
          }}
          inputValue={
            each.fieldNameInForm === "screenIds" ? screenName : screenGroupName
          }
          onInputChange={(_event: React.SyntheticEvent, value) => {
            autoCompleteTextChangeHandler("GROUP", value);
          }}
          limitTags={2}
          popupIcon={<KeyboardArrowDownIcon />}
          id="asynchronous-demo"
          ListboxProps={{
            sx: { maxHeight: "200px" },
            onScroll: (event: React.UIEvent<HTMLElement>) => {
              if (
                event.currentTarget.scrollHeight -
                  event.currentTarget.scrollTop ===
                  event.currentTarget.clientHeight &&
                activeEditId === -1
              ) {
                if (
                  screenGroupPagination.totalPages >
                  screenGroupPagination.currentPage
                ) {
                  dispatch(
                    getScreenGroups({
                      page: screenGroupPagination.currentPage + 1,
                      isHost: role === "HOST",
                    })
                  );
                }
              }
            },
          }}
          onOpen={() => {
            if (activeEditId === -1) {
              dispatch(getScreenGroups({ page: 1, isHost: role === "HOST" }));
            }
          }}
          getOptionLabel={(option) => option.screenGroupName}
          options={screenGroupOptions}
          renderInput={(params) => (
            <InputField
              inputProps={{
                placeholder:
                  screenGroupIds.length === 0 ? each.fieldPlaceholder : "",
                helperText: (
                  <Typography height={12} color={colors.validate}>
                    {screenErrors.group}
                  </Typography>
                ),
                ...params,
                InputProps: {
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {allApiStatuses.getScreenGroups === "PENDING" ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                },
              }}
            />
          )}
          renderTags={(values) => (
            <Box>
              <Chip label={values[values.length - 1].screenGroupName} />
              {values.length > 1 && `+${values.length - 1} more`}
            </Box>
          )}
          disableCloseOnSelect
          renderOption={(props, option) => {
            const withoutKey = Object.create({});
            for (let key in props) {
              if (key !== "key") {
                withoutKey[key] = props[key as keyof typeof props];
              }
            }
            return (
              <li key={option.id} {...withoutKey}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={screenGroupIds.some((each) => each.id === option.id)}
                />
                {option.screenGroupName}
              </li>
            );
          }}
        />
      </Grid>
    );
  };

  const getScreensField = (each: EachFieldType) => {
    return (
      <Grid item xs={12} sm={6}>
        <Typography sx={styles.labelText}>{each.fieldName}</Typography>
        <Autocomplete
          disabled={screenGroupIds.length === 0}
          multiple
          value={screenIds}
          onChange={(_event, value) => {
            handleScreenIds(value);
          }}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          inputValue={screenName}
          onInputChange={(_event: React.SyntheticEvent, value) => {
            autoCompleteTextChangeHandler("SCREEN", value);
          }}
          limitTags={2}
          popupIcon={<KeyboardArrowDownIcon />}
          id="asynchronous-demo"
          ListboxProps={{
            sx: { maxHeight: "200px" },
            onScroll: (event: React.UIEvent<HTMLElement>) => {
              if (
                event.currentTarget.scrollHeight -
                  event.currentTarget.scrollTop ===
                event.currentTarget.clientHeight
              ) {
                if (
                  screensPagination.totalPages > screensPagination.currentPage
                ) {
                  dispatch(
                    getScreens({
                      page: screensPagination.currentPage + 1,
                      groupIds: screenGroupIds.map((each) => each.id),
                    })
                  );
                }
              }
            },
          }}
          getOptionLabel={(option) => option.screenName}
          options={screenOptions}
          renderTags={(values) => (
            <Box>
              <Chip label={values[values.length - 1].screenName} />
              {values.length > 1 && `+${values.length - 1} more`}
            </Box>
          )}
          renderInput={(params) => (
            <InputField
              inputProps={{
                placeholder:
                  screenIds.length === 0 ? each.fieldPlaceholder : "",
                helperText: (
                  <Typography height={12} color={colors.validate}>
                    {screenErrors.screens}
                  </Typography>
                ),
                ...params,
                InputProps: {
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {allApiStatuses.getScreenGroups === "PENDING" ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                },
              }}
            />
          )}
          disableCloseOnSelect
          renderOption={(props, option, { selected }) => {
            const withoutKey = Object.create({});
            for (let key in props) {
              if (key !== "key") {
                withoutKey[key] = props[key as keyof typeof props];
              }
            }
            return (
              <li key={option.id} {...withoutKey}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.screenName}
              </li>
            );
          }}
        />
      </Grid>
    );
  };
  const getSuitableField = (each: EachFieldType) => {
    switch (each.fieldName) {
      case "Phone No":
        return getPhoneNumberField(each);
      case "Commission Type":
        return getDropdownField(each);
      case "Choose Screen Group":
        return getScreenGroupField(each);
      case "Choose Screens":
        return getScreensField(each);
      default:
        return getPlainField(each);
    }
  };

  const roleBasedText = useMemo(() => {
    switch (role) {
      case "INVESTOR":
        return {
          text: "Investors",
          fields: investorFieldDetails,
          secondaryText: "Investor",
        };
      case "USER":
        return {
          text: "Clients",
          fields: clientFieldDetails,
          secondaryText: "Client",
        };
      case "HOST":
        return {
          text: "Hosts",
          fields: hostFieldDetails,
          secondaryText: "Host",
        };
      case "AGENCY":
        return {
          text: "Ad Agency",
          fields: adAgencyFieldDetails,
          secondaryText: "Ad Agency",
        };
      case "VENDER":
        return {
          text: "QR Vendors",
          fields: vendorFieldDetails,
          secondaryText: "QR Vendor",
        };
      default:
        return {
          text: "Clients",
          fields: clientFieldDetails,
          secondaryText: "Client",
        };
    }
  }, [role]);
  const fields = roleBasedText.fields;
  const fillingForm = async () => {
    const options = (await dispatch(getExistingScreenGroups(activeEditId ?? 0)))
      .payload as EachScreenGroupOption[];
    let activeGroupIds = [];
    for (let each of options) {
      if (each.contains) {
        activeGroupIds.push(each);
      } else break;
    }
    setScreenGroupIds(activeGroupIds);
    const existingObject: UserType = userData.filter(
      (each) => each.id === activeEditId
    )[0];
    const fullNamePieces = existingObject.fullName.split(" ");
    const firstName =
      fullNamePieces.length >= 2
        ? fullNamePieces.slice(0, fullNamePieces.length - 1).join(" ")
        : fullNamePieces[0];
    const lastName =
      fullNamePieces.length > 1
        ? fullNamePieces[fullNamePieces.length - 1]
        : "";
    const existingDetails: IState["formData"] = {
      firstName,
      lastName,
      email: existingObject.email,
      phoneNo: existingObject.mobileNumber,
      commissionType:
        existingObject.commission === "PERCENTAGE" ? "PERCENTAGE" : "FIXED",
      commissionValue: existingObject.amountOrPercentage + "",
      investedAmount: String(existingObject.investedAmount ?? ""),
    };
    dispatch(
      getExistingScreens({
        id: activeEditId ?? -1,
        groupIds: activeGroupIds.map((each) => each.id),
      })
    );
    setFormData(existingDetails);
  };

  const dispatch = useAppDispatch();
  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    dispatch(
      userClient({
        page: value.toString(),
        search: searchInput.trim(),
        sortDirection: activeSortOption === "Newest" ? "desc" : "asc",
        roleId: roleId ?? "1",
      })
    );
  };

  const getClientList = async (page?: string) => {
    await dispatch(
      userClient({
        page: page ?? pagination.currentPage.toString(),
        search: searchInput.trim(),
        sortDirection: activeSortOption === "Newest" ? "desc" : "asc",
        roleId,
      })
    );
  };
  const permissions = useRoutePermissions();

  useEffect(() => {
    getClientList("1");
    // eslint-disable-next-line
  }, [role]);
  return (
    <Stack spacing={2}>
      <Stack
        sx={styles.contentContainer}
        justifyContent={"space-evenly"}
        spacing={3}
      >
        <Box sx={styles.headerContainer}>
          <Typography sx={styles.clientText}>{roleBasedText.text}</Typography>
          {permissions.create && (
            <Button
              variant="outlined"
              endIcon={<Add />}
              sx={styles.outlinedBtn}
              onClick={addNewHandler}
            >
              Add New{" "}
            </Button>
          )}
          <TextField
            sx={styles.textField}
            type="text"
            placeholder="Search"
            value={searchInput}
            onChange={(event) => handleSearchInput(event.target.value)}
            InputProps={{
              startAdornment: (
                <Box
                  component={"img"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  sx={styles.textField.icon}
                  src={SearchIcon}
                />
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Close
                    cursor={"pointer"}
                    onClick={() => handleSearchInput("")}
                    sx={{ display: searchInput ? "block" : "none" }}
                  />
                </InputAdornment>
              ),
            }}
          />
          <Box sx={styles.sortContainer}>
            <Box sx={styles.sortBox}>
              <Typography sx={styles.menuItem}>Sort By:</Typography>
              <FormControl sx={styles.sortFormControl}>
                <Select
                  value={activeSortOption}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  IconComponent={KeyboardArrowDownIcon}
                >
                  {sortingOptions.map((each) => (
                    <MenuItem key={each} value={each} sx={styles.menuItem}>
                      {each}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Box>
        <Box sx={styles.tableHolder}>
          <TableContainer sx={styles.tableContainer}>
            <Table sx={styles.tableMinWidth}>
              {allApiStatuses.read !== "SUCCESS" && (
                <caption>
                  <Stack
                    justifyContent={"center"}
                    alignItems={"center"}
                    height={"40vh"}
                  >
                    {allApiStatuses.read === "PENDING" ? (
                      <CircularProgress />
                    ) : (
                      <Typography variant="h6">{readApiError}</Typography>
                    )}
                  </Stack>
                </caption>
              )}
              <TableHead>
                <TableRow>
                  {(role === "VENDER" ? vendorsTitles : othersTitles)
                    .filter(
                      (each) =>
                        !(
                          each.title === "ACTION" &&
                          !permissions.edit &&
                          !permissions.delete
                        )
                    )
                    .map((each, index) => (
                      <TableCell
                        key={`register-title-${index}`}
                        align={each.align}
                      >
                        {each.title}
                      </TableCell>
                    ))}
                </TableRow>
              </TableHead>
              <TableRow>
                <TableCell
                  colSpan={
                    (role === "VENDER" ? vendorsTitles : othersTitles).length
                  }
                  sx={{ p: 0 }}
                >
                  <div
                    style={{
                      borderTop: "1px solid #ddd",
                    }}
                  />
                </TableCell>
              </TableRow>
              <TableBody sx={styles.clientTableBody}>
                {allApiStatuses.read === "SUCCESS" &&
                  userData.map((each, index) => (
                    <TableRow key={"pending-request-row" + index}>
                      <TableCell
                        sx={commonStyles.maxWidthForTableCell("200px")}
                      >
                        <Stack
                          direction={"row"}
                          spacing={1}
                          alignItems={"center"}
                        >
                          <Box
                            component="img"
                            src={
                              each.image ? tokenWithUrl(each.image) : DummyUser
                            }
                            width={30}
                            height={30}
                            alt="img"
                            borderRadius={"5px"}
                          />
                          <Tooltip title={each.fullName}>
                            <Typography
                              fontSize={"inherit"}
                              fontWeight={"inherit"}
                              sx={commonStyles.ellipsisText()}
                            >
                              {each.fullName}
                            </Typography>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                      <TableCell
                        sx={commonStyles.maxWidthForTableCell("175px")}
                      >
                        <Tooltip title={each.email}>
                          <Typography
                            fontSize={"inherit"}
                            fontWeight={"inherit"}
                            sx={commonStyles.ellipsisText()}
                          >
                            {each.email}
                          </Typography>
                        </Tooltip>
                      </TableCell>
                      <TableCell align="center">{each.mobileNumber}</TableCell>
                      {role !== "VENDER" ? (
                        <>
                          <TableCell align="center">
                            {each.screenCount}
                          </TableCell>
                          <TableCell align="center">
                            {moment(each.createdAt).format("DD/MM/YYYY")}
                          </TableCell>
                        </>
                      ) : (
                        <TableCell align="center">{each.id}</TableCell>
                      )}
                      {(permissions.edit || permissions.delete) && (
                        <TableCell align="center">
                          <Stack
                            direction={"row"}
                            spacing={1}
                            alignItems={"center"}
                            justifyContent={"center"}
                          >
                            {permissions.edit && (
                              <EditIcon
                                cursor={"pointer"}
                                onClick={() => setActiveEditId(each.id)}
                              />
                            )}
                            {permissions.delete && (
                              <DeleteIcon
                                cursor={"pointer"}
                                onClick={() => handleDeleteId(each.id)}
                              />
                            )}
                          </Stack>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        {pagination.totalPages > 1 && (
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Typography sx={styles.dataStats}>
              {showEntriesStats(
                pagination.totalItems,
                pagination.currentPage,
                pagination.pageSize
              )}
            </Typography>
            <Pagination
              onChange={handlePageChange}
              count={pagination.totalPages}
              shape="rounded"
              page={Number(pagination.currentPage)}
              variant="outlined"
            />
          </Stack>
        )}
      </Stack>
      <ModalStyled
        open={activeDeleteId !== null}
        isClose={false}
        isbgColor={colors.lightBlack}
      >
        <Box sx={styles.modalBox}>
          <Box>
            <Typography sx={styles.deleteAdsText}>
              Delete {roleBasedText.secondaryText}
            </Typography>
            <Typography sx={styles.areYouText}>
              Are you sure, You want to delete {roleBasedText.secondaryText}?
            </Typography>
          </Box>
          <Box sx={styles.buttonsBox}>
            <CustomButton
              bgcolor={colors.blueChalk}
              textColor={colors.black}
              width={128}
              onClick={() => setActiveDeleteId(null)}
            >
              Cancel
            </CustomButton>
            <CustomButton
              bgcolor={colors.validate}
              width={158}
              onClick={handleDelete}
              endIcon={<PlainDeleteIcon />}
            >
              Delete
            </CustomButton>
          </Box>
        </Box>
      </ModalStyled>
      <Modal open={activeEditId !== null} onClose={reInitializeStates}>
        <Box
          component={"form"}
          onSubmit={handleSubmit}
          sx={{
            ...styles.addNewUserContainer,
          }}
        >
          <IconButton
            size="small"
            sx={styles.closeIcon}
            disableFocusRipple
            disableTouchRipple
            disableRipple
            onClick={reInitializeStates}
          >
            <Close fontSize="small" />
          </IconButton>
          <Typography sx={styles.titleText}>
            {activeEditId === -1 ? "Add New" : "Update"}{" "}
            {roleBasedText.secondaryText}
          </Typography>
          <Grid container spacing={2}>
            {fields.map((each, index) => (
              <React.Fragment key={index + each.fieldName}>
                {getSuitableField(each)}
              </React.Fragment>
            ))}
          </Grid>
          <CustomButton
            sx={styles.customBtnCenter}
            width={138}
            bgcolor={colors.primary}
            type="submit"
          >
            {activeEditId === -1 ? "Save " : "Update "}
            {allApiStatuses.createAndUpdate === "PENDING" && (
              <CircularProgress sx={styles.whiteColor} size={20} />
            )}
          </CustomButton>
        </Box>
      </Modal>
    </Stack>
  );
};

export default Users;
