import { Add, Close } from "@mui/icons-material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  Box,
  Button,
  capitalize,
  FormControl,
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
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import dayjs, { Dayjs } from "dayjs";
import moment from "moment";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { endpoints } from "../../../config/config";
import { colors } from "../../../config/theme";
import {
  addAndUpdateCoupons,
  BeCoupon,
  deleteCoupons,
  readCoupons,
} from "../../../redux/reducers/superAdmin/CouponsSlice";
import { useAppDispatch, useAppSelector } from "../../../utils/useRedux";
import { useRoutePermissions } from "../../../utils/useRoutePermissions";
import { showEntriesStats } from "../../../utils/utils";
import { InputCalendar } from "../../common/assets";
import { CustomButton } from "../../common/customButton/CustomButton";
import { InputField } from "../../common/inputField/InputField";
import { ModalStyled } from "../../common/modal/CommonModal";
import { DeleteIcon, EditIcon, PlainDeleteIcon, SearchIcon } from "../assets";
import { styles } from "./CouponStyles";

interface RegisterTitle {
  title: string;
  align: "left" | "right" | "center";
  minWidth: string;
}
const couponTitles: RegisterTitle[] = [
  { title: "Coupon Code", align: "center", minWidth: "100px" },
  { title: "Discount(%)", align: "center", minWidth: "100px" },
  { title: "Flat Discount(₹)", align: "center", minWidth: "100px" },
  { title: "Expiry Date", align: "center", minWidth: "100px" },
  { title: "Status", align: "center", minWidth: "100px" },
  { title: "Action", align: "center", minWidth: "100px" },
];

const sortingOptions = ["All", "Active", "Inactive"];
type DiscountType = "DISCOUNT" | "FLAT";
interface IState {
  formData: {
    couponCode: string;
    type: DiscountType;
    discountValue: string;
    minCartValue: string;
    startDate: Dayjs | null;
    endDate: Dayjs | null;
  };
  activeSortOption: string;
  searchInput: string;
  activeEditId: number | null;
  activeDeleteId: number;
}
interface Errors {
  couponCode: string;
  type: string;
  discountValue: string;
  startDate: string;
  endDate: string;
  minCartValue: string;
}

const initialForm: IState["formData"] = {
  couponCode: "",
  type: "FLAT",
  discountValue: "",
  startDate: null,
  endDate: null,
  minCartValue: "",
};
const Coupons = () => {
  const [activeSortOption, setActiveSortOption] = useState<
    IState["activeSortOption"]
  >(sortingOptions[0]);
  const [searchInput, setSearchInput] = useState<IState["searchInput"]>("");
  const [activeDeleteId, setActiveDeleteId] =
    useState<IState["activeDeleteId"]>(-1);
  const [activeEditId, setActiveEditId] =
    useState<IState["activeEditId"]>(null);
  const [formData, setFormData] = useState<IState["formData"]>(initialForm);
  const [errorObj, setErrorObj] = useState<Errors>({
    couponCode: "",
    discountValue: "",
    endDate: "",
    startDate: "",
    type: "",
    minCartValue: "",
  });
  const [internalPage, setInternalPage] = useState<number>(1);
  const dispatch = useAppDispatch();
  const { couponsData, totalItems, totalPages, currentPage, allApis } =
    useAppSelector((state) => state.CouponsSlice);
  useEffect(() => {
    if (Number(activeEditId) > 0) {
      const activeCoupon = couponsData.filter(
        (each) => each.id === activeEditId
      )[0];
      setFormData({
        couponCode: activeCoupon.code,
        discountValue:
          (activeCoupon.discountPercentage !== 0
            ? activeCoupon.discountPercentage
            : activeCoupon.flatDiscount) + "",
        endDate: dayjs(activeCoupon.expiryDate),
        minCartValue: activeCoupon.minCartValue + "",
        startDate: dayjs(activeCoupon.startDate),
        type: activeCoupon.discountPercentage !== 0 ? "DISCOUNT" : "FLAT",
      });
    }
  }, [activeEditId, couponsData]);

  const handleChange = (event: SelectChangeEvent) => {
    setActiveSortOption(event.target.value);
  };
  const handleSearchInput = (input: string) => {
    setSearchInput(input);
  };
  const handleRemoveSearchInput = () => {
    setSearchInput("");
  };
  const handleDelete = () => {
    dispatch(deleteCoupons(activeDeleteId + ""));
  };
  const fieldsChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (!/^(?!.*\s{2,})[a-zA-Z0-9][a-zA-Z0-9 ]*$/.test(value) && value) return;
    if (name === "discountValue") {
      if (
        (!/^[0-9]/.test(value) && value) ||
        value.length > (formData.type === "DISCOUNT" ? 2 : 12)
      ) {
        return;
      }
    }
    if (
      name === "minCartValue" &&
      value &&
      (!/^[0-9]/.test(value) || value.length > 12)
    )
      return;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrorObj((prevState) => ({
      ...prevState,
      [name]: "",
    }));
  };
  const validate = () => {
    const errors = {} as Errors;
    if (formData.couponCode.length === 0) {
      errors.couponCode = "Required";
    } else if (!/^[a-zA-Z0-9]*$/.test(formData.couponCode)) {
      errors.couponCode = "Invalid Coupon Code";
    }
    if (formData.discountValue.length === 0) {
      errors.discountValue = "Required";
    }
    if (formData.minCartValue.length === 0) {
      errors.minCartValue = "Required";
    }
    if (formData.startDate === null) {
      errors.startDate = "Required";
    }
    if (formData.endDate == null) {
      errors.endDate = "Required";
    }
    if(formData.type === "FLAT"&& formData.minCartValue&& Number(formData.discountValue) > Number(formData.minCartValue)){
      errors.discountValue = "Discount value should not be more than min cart value";
    }
    setErrorObj(errors);
    return Object.values(errors).length === 0;
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validate()) {
      const body = {
        couponCode: formData.couponCode,
        discountPercentage:
          formData.type === "DISCOUNT" ? formData.discountValue : 0,
        flatDiscount: formData.type === "FLAT" ? formData.discountValue : 0,
        expiryDate: formData.endDate,
        startDate: formData.startDate,
        minCartValue: formData.minCartValue,
      };
      if (activeEditId === -1) {
        dispatch(
          addAndUpdateCoupons({
            url: endpoints.GET_COUPONS,
            method: "POST",
            body: JSON.stringify(body),
          })
        );
      } else {
        dispatch(
          addAndUpdateCoupons({
            url: endpoints.GET_COUPONS + "/" + activeEditId,
            method: "PUT",
            body: JSON.stringify(body),
          })
        );
      }
      reInitializeStates();
    }
  };
  const addNewHandler = () => {
    reInitializeStates();
    setActiveEditId(-1);
  };
  const reInitializeStates = () => {
    setErrorObj({} as Errors);
    setFormData(initialForm);
    setActiveEditId(null);
    setActiveDeleteId(-1);
  };
  const dropDownHandler = (
    event: SelectChangeEvent<IState["formData"]["type"]>
  ) => {
    setFormData((prevState) => ({
      ...prevState,
      type: event.target.value as IState["formData"]["type"],
      discountValue: "",
    }));
  };
  const pageChangeHandler = (_event: ChangeEvent<unknown>, page: number) => {
    if (!searchInput) {
      setInternalPage(page);
    }
    dispatch(readCoupons({ page, text: searchInput, sort: activeSortOption }));
  };
  useEffect(() => {
    const id = setTimeout(() => {
      if (allApis.readApi !== "INITIAL") {
        if (!searchInput)
          dispatch(
            readCoupons({
              page: internalPage,
              text: searchInput,
              sort: activeSortOption,
            })
          );
        else
          dispatch(
            readCoupons({ page: 1, text: searchInput, sort: activeSortOption })
          );
      }
    }, 750);
    return () => {
      clearTimeout(id);
    }; //eslint-disable-next-line
  }, [searchInput, activeSortOption]);
  useEffect(() => {
    if (
      allApis.createAndUpdateApi === "SUCCESS" ||
      allApis.createAndUpdateApi === "INITIAL" ||
      allApis.deleteApi === "SUCCESS"
    ) {
      reInitializeStates();
      dispatch(
        readCoupons({
          page:
            allApis.deleteApi === "SUCCESS" && couponsData.length === 1
              ? currentPage - 1
              : currentPage,
          text: searchInput,
          sort: activeSortOption,
        })
      );
    }
  }, [dispatch, allApis.createAndUpdateApi, allApis.deleteApi]); //eslint-disable-line
  const permissions = useRoutePermissions();
  return (
    <Stack spacing={2}>
      <Stack
        sx={styles.contentContainer}
        justifyContent={"space-evenly"}
        spacing={3}
      >
        <Box sx={styles.headerContainer}>
          <Typography sx={styles.clientText}>Coupons</Typography>
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
                    onClick={handleRemoveSearchInput}
                    sx={{ display: searchInput ? "block" : "none" }}
                  />
                </InputAdornment>
              ),
            }}
          />
          <Box sx={styles.sortContainer}>
            <Box sx={styles.sortBox}>
              <Typography sx={styles.menuItem}>Sort by:</Typography>
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
              <caption>
                {couponsData.length === 0 && (
                  <Typography variant="h6" textAlign={"center"}>
                    Data Not Found
                  </Typography>
                )}
              </caption>
              <TableHead>
                <TableRow>
                  {couponTitles
                    .slice(0, permissions.edit || permissions.delete ? 6 : 5)
                    .map((each, index) => (
                      <TableCell
                        key={`register-title-${index}`}
                        align={each.align}
                      >
                        {capitalize(each.title)}
                      </TableCell>
                    ))}
                </TableRow>
              </TableHead>
              <TableBody sx={styles.clientTableBody}>
                {couponsData.map((each: BeCoupon) => (
                  <TableRow key={"pending-request-row" + each.id}>
                    <TableCell align="center">{each.code}</TableCell>
                    <TableCell align="center">
                      {each.discountPercentage}
                    </TableCell>
                    <TableCell align="center">{each.flatDiscount}</TableCell>
                    <TableCell align="center">
                      {moment(each.expiryDate).format("DD/MM/YYYY")}
                    </TableCell>
                    <TableCell align="center">
                      <Stack direction={"row"} justifyContent={"center"}>
                        <Box
                          sx={
                            each.status
                              ? styles.acceptedText
                              : styles.rejectedText
                          }
                        >
                          {each.status ? "Active" : "Inactive"}
                        </Box>
                      </Stack>
                    </TableCell>
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
                              onClick={() => setActiveDeleteId(each.id)}
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
        <Stack direction={"row"} justifyContent={"space-between"}>
          {Boolean(couponsData.length) && (
            <Typography sx={styles.dataStats}>
              {showEntriesStats(totalItems, currentPage, 10)}
            </Typography>
          )}
          {totalPages > 1 && (
            <Pagination
              count={totalPages}
              shape="rounded"
              page={currentPage}
              variant="outlined"
              onChange={pageChangeHandler}
            />
          )}
        </Stack>
      </Stack>
      <ModalStyled
        open={activeDeleteId !== -1}
        isClose={false}
        isbgColor={colors.lightBlack}
      >
        <Box sx={styles.modalBox}>
          <Box>
            <Typography sx={styles.deleteAdsText}>Delete Coupon</Typography>
            <Typography sx={styles.areYouText}>
            Are You Sure, You Want to Delete the Coupon?
            </Typography>
          </Box>
          <Box sx={styles.buttonsBox}>
            <CustomButton
              bgcolor={colors.blueChalk}
              textColor={colors.black}
              width={128}
              onClick={() => setActiveDeleteId(-1)}
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
            maxHeight: "500px",
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
            {activeEditId === -1 ? "Add New" : "Update"} Coupons
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <InputField
                fieldName="Coupon Code"
                textProps={{ sx: styles.labelText }}
                inputProps={{
                  helperText: (
                    <Typography height={12} color={colors.validate}>
                      {errorObj.couponCode ?? ""}
                    </Typography>
                  ),
                  placeholder: "Enter Coupon Code",
                  error: Boolean(errorObj.couponCode),
                  value: formData.couponCode.slice(0,25),
                  name: "couponCode",
                  type: "text",
                  onChange: fieldsChangeHandler,
                  fullWidth: true,
                  sx: styles.inputText,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography sx={styles.labelText}>Type</Typography>
              <Select
                fullWidth
                value={formData.type}
                onChange={dropDownHandler}
                sx={styles.selectText}
                MenuProps={{
                  sx: styles.unShadowMenu,
                }}
              >
                <MenuItem value="DISCOUNT">Discount(%)</MenuItem>
                <MenuItem value="FLAT">Flat(₹)</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                fieldName="Percentage/Rupees"
                textProps={{ sx: styles.labelText }}
                inputProps={{
                  helperText: (
                    <Typography height={12} color={colors.validate}>
                      {errorObj.discountValue ?? ""}
                    </Typography>
                  ),
                  name: "discountValue",
                  placeholder: "Enter Percentage/Rupees",
                  error: Boolean(errorObj.discountValue),
                  value: formData.discountValue,
                  type: "text",
                  onChange: fieldsChangeHandler,
                  fullWidth: true,
                  sx: styles.inputText,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                fieldName="Minimum Cart Value"
                textProps={{ sx: styles.labelText }}
                inputProps={{
                  helperText: (
                    <Typography height={12} color={colors.validate}>
                      {errorObj.minCartValue ?? ""}
                    </Typography>
                  ),
                  name: "minCartValue",
                  placeholder: "Enter Minimum Cart Value",
                  error: Boolean(errorObj.minCartValue),
                  value: formData.minCartValue,
                  type: "text",
                  onChange: fieldsChangeHandler,
                  fullWidth: true,
                  sx: styles.inputText,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography sx={styles.labelText}>Start Date</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoItem>
                  <DatePicker
                    onChange={(newValue) =>
                      setFormData((prev) => ({ ...prev, startDate: newValue }))
                    }
                    value={formData.startDate}
                    slotProps={{
                      textField: { placeholder: "MM-DD-YYYY" },
                    }}
                    slots={{
                      openPickerIcon: () => <InputCalendar />,
                    }}
                  />
                </DemoItem>
              </LocalizationProvider>
              {errorObj.startDate && (
                <Typography color={colors.validate} fontSize={11} height={12} ml={2}>
                  {errorObj.startDate}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography sx={styles.labelText}>End Date</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoItem>
                  <DatePicker
                    onChange={(newValue) =>
                      setFormData((prev) => ({ ...prev, endDate: newValue }))
                    }
                    value={formData.endDate}
                    slotProps={{
                      textField: {
                        placeholder: "MM-DD-YYYY",
                      },
                    }}
                    slots={{
                      openPickerIcon: InputCalendar,
                    }}
                  />
                </DemoItem>
              </LocalizationProvider>
              {errorObj.endDate && (
                <Typography color={colors.validate} fontSize={11} height={12} ml={2}>
                  {errorObj.endDate}
                </Typography>
              )}
            </Grid>
          </Grid>
          <CustomButton
            sx={styles.customBtnCenter}
            width={138}
            bgcolor={colors.primary}
            type="submit"
          >
            {activeEditId === -1 ? "Save" : "Update"}
          </CustomButton>
        </Box>
      </Modal>
    </Stack>
  );
};

export default Coupons;
