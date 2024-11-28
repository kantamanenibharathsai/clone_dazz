import { Add } from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  SelectChangeEvent,
  Stack,
  Step,
  StepIconProps,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import moment from "moment";
import { ChangeEvent, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { translate } from "../../../config/i18n";
import { colors } from "../../../config/theme";
import { getBalance } from "../../../redux/reducers/adAgencyReducers/adAgencyWallet";
import {
  Form,
  createNewCampaign,
  fillCheckoutDetails,
  getAdTypeOptions,
  getPricingModelOptions,
  restoreStateToInitial,
  setCampaign,
  setCurrentStep,
  setForm,
  updateCampaignDetails,
} from "../../../redux/reducers/userReducers/createCampaignSlice";
import { displayAlert } from "../../../utils/toastMessage";
import { useAppDispatch, useAppSelector } from "../../../utils/useRedux";
import { useRoutePermissions } from "../../../utils/useRoutePermissions";
import { CustomButton } from "../../common/customButton/CustomButton";
import Header from "../../common/header/Header";
import { styles } from "../../common/sidebar/SidebarStyles";
import AddNewCampaign from "../../userFlow/createCampaign/AddNewCampaign";
import Checkout from "../../userFlow/createCampaign/Checkout";
import ChooseLocation from "../../userFlow/createCampaign/ChooseLocation";
import ChooseScreenGroup from "../../userFlow/createCampaign/ChooseScreenGroup";
import ChooseSlots from "../../userFlow/createCampaign/ChooseSlots";
import MediaByGenre from "../../userFlow/createCampaign/MediaByGenre";
import PricingModel from "../../userFlow/createCampaign/PricingModel";
import SelectCategory from "../../userFlow/createCampaign/SelectCategory";
import SubCategory from "../../userFlow/createCampaign/SubCategory";
import UploadFiles from "../../userFlow/createCampaign/UploadFiles";
import {
  DateArray,
  UserLayoutCategoryType,
  UserLayoutFieldKey,
  UserLayoutIState,
  Value,
} from "../../userFlow/userLayout/UserLayout";
import {
  QontoConnector,
  QontoStepIconRoot,
  userLayoutStyles,
} from "./AdAgencyLayoutStyles";

const STEPS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const UserLayout = () => {
  const {
    loading,
    form,
    currentStep,
    campaign,
    campaignMode,
    campaignId,
    groupList,
  } = useAppSelector((state) => state.Campaign);
  const dispatch = useAppDispatch();
  const [showScreens, setShowScreens] =
    useState<UserLayoutIState["showScreens"]>(false);
  const [errors, setErrors] = useState<UserLayoutIState["errors"]>(
    {} as UserLayoutIState["errors"]
  );
  const permission = useRoutePermissions();
  const isInAdsRoute = permission.routeName.toLowerCase() === "ads";
  const startCreateCampaign = async () => {
    await dispatch(getPricingModelOptions());
    await dispatch(getAdTypeOptions());
    toggleCreateCampaign();
  };

  const toggleCreateCampaign = () => {
    setErrors((previous) => ({ ...previous, campaignName: "" }));
    dispatch(setCampaign());
    if (campaign) {
      dispatch(restoreStateToInitial());
    }
  };

  const handleNext = async () => {
    if (campaignId === null && campaignMode === "ADD") {
      const { payload } = await dispatch(
        createNewCampaign({
          campaignName: form.campaignName,
          step: currentStep.toString(),
        })
      );
      if (payload?.statusCode !== "200") return;
      dispatch(setCurrentStep(currentStep + 1));
    } else if (campaignMode === "EDIT" && campaignId) {
      const payload = await updateExistingCampaignDetails(currentStep);
      if (payload?.statusCode !== "200") return;
      dispatch(setCurrentStep(currentStep + 1));
    }
    handleFormValidation(form, currentStep + 1);
  };

  const updateExistingCampaignDetails = async (step: number) => {
    const id = (campaignId as number).toString();
    const time = form.selectedDates as DateArray;
    const startDate = moment(time?.[0] ?? new Date()).format("YYYY-MM-DD");
    const endDate = moment(time?.[1] ?? new Date()).format("YYYY-MM-DD");
    let payload;
    switch (step) {
      case 1:
        {
          let res = await dispatch(
            updateCampaignDetails({
              id: id,
              step: currentStep.toString(),
              campaignName: form.campaignName,
            })
          );
          payload = res.payload;
        }
        break;
      case 2:
        {
          let res = await dispatch(
            updateCampaignDetails({
              id: id,
              step: currentStep.toString(),
              latitude: form.location.lat,
              longitude: form.location.lng,
              locationId: form.location.locationId,
              locationName: form.location.locationName,
            })
          );
          payload = res.payload;
        }
        break;
      case 3:
        {
          let res = await dispatch(
            updateCampaignDetails({
              id: id,
              step: currentStep.toString(),
              startDate: startDate,
              endDate: endDate,
            })
          );
          payload = res.payload;
        }
        break;
      case 4:
        {
          let res = await dispatch(
            updateCampaignDetails({
              id: id,
              step: currentStep.toString(),
              adTypeId:
                form.adTypeId || form.CPM || form.numberOfSpots || form.price,
              pricingModelId: form.pricingModelId,
            })
          );
          payload = res.payload;
        }
        break;
      case 5:
        {
          let res = await dispatch(
            updateCampaignDetails({
              id: id,
              step: currentStep.toString(),
              genreIds: form.selectedGenre ? [form.selectedGenre] : [],
            })
          );
          payload = res.payload;
        }
        break;
      case 6:
        {
          let res = await dispatch(
            updateCampaignDetails({
              id: id,
              step: currentStep.toString(),
              categoryIds: form.selectedCategory,
            })
          );
          payload = res.payload;
        }
        break;
      case 7:
        {
          let res = await dispatch(
            updateCampaignDetails({
              id: id,
              step: currentStep.toString(),
              subCategoryIds: form.selectedSubCategory,
            })
          );
          payload = res.payload;
        }
        break;
      case 8:
        {
          let res = await dispatch(
            updateCampaignDetails({
              id: id,
              step: currentStep.toString(),
              screenGroupsIds: form.selectedScreenGroup,
              screenIds: form.selectedScreens,
            })
          );
          payload = res.payload;
        }
        break;
      case 9:
        {
          let res = await dispatch(
            updateCampaignDetails({
              id: id,
              step: "10",
              mediaFile: form.uploadedMedia as File[],
            })
          );
          dispatch(fillCheckoutDetails(res.payload.data));
          payload = res.payload;
        }
        break;
    }
    return payload;
  };

  const handleShowAllScreens = () => {
    setShowScreens((prev) => !prev);
  };

  const handleBack = () => {
    currentStep === 1
      ? toggleCreateCampaign()
      : dispatch(setCurrentStep(currentStep - 1));
    handleFormValidation(form, currentStep - 1);
  };

  const handleLocationChange = ({
    lat,
    lng,
    locationId,
    locationName,
  }: Form["location"]) => {
    const copyForm = { ...form };
    copyForm.location = { lat, lng, locationId, locationName };
    dispatch(setForm(copyForm));
    handleFormValidation(copyForm, currentStep);
  };

  const handleFormDetails = (
    event: ChangeEvent<HTMLInputElement> | SelectChangeEvent
  ) => {
    const copyFormData = { ...form };
    const { name, value } = event.target;
    if (name === "pricingModelId") {
      copyFormData.pricingModelId = value;
      copyFormData.CPM = "";
      copyFormData.adTypeId = "";
      copyFormData.numberOfSpots = "";
      copyFormData.price = "";
      dispatch(setForm(copyFormData));
    } else {
      copyFormData[name as UserLayoutFieldKey] = value;
      dispatch(setForm(copyFormData));
    }
    handleFormValidation(copyFormData, currentStep);
  };

  const removeDuplicateOrAddNewItem = (
    key: UserLayoutCategoryType,
    id: string
  ) => {
    const copyFormData = { ...form };
    const array = [...copyFormData[key]];
    const duplicateIndex = array.indexOf(id);
    duplicateIndex > -1 ? array.splice(duplicateIndex, 1) : array.push(id);
    copyFormData[key] = array;
    dispatch(setForm(copyFormData));
    handleFormValidation(copyFormData, currentStep);
  };

  const handleCategorySelection = (category: string) => {
    removeDuplicateOrAddNewItem("selectedCategory", category);
  };

  const handleSubCategorySelection = (subCategory: string) => {
    removeDuplicateOrAddNewItem("selectedSubCategory", subCategory);
  };

  const handleScreenGroupSelection = (screenGroupId: string) => {
    removeDuplicateOrAddNewItem("selectedScreenGroup", screenGroupId);
  };

  const handleScreenSelection = (screenId: string) => {
    const copyFormData = { ...form };
    const selectedScreens =
      copyFormData["selectedScreens" as UserLayoutCategoryType];
    if (selectedScreens.length === 1) {
      displayAlert("At least one screen should be selected", "info");
      return;
    }
    removeDuplicateOrAddNewItem("selectedScreens", screenId);
  };

  const handleSelectAllScreenByGroupId = () => {
    let copyData = { ...form };
    let array = [...copyData.selectedScreens];
    for (let groupId of form.selectedScreenGroup) {
      for (let group of groupList) {
        if (group.screenGroupId.toString() === groupId) {
          for (let screen of group.screens) {
            if (!array.includes(screen.id.toString())) {
              array.push(screen.id.toString());
            }
          }
        }
      }
    }
    copyData.selectedScreens = array;
    if (form.selectedScreenGroup.length === 0) {
      copyData.selectedScreens = [];
    }
    dispatch(setForm(copyData));
  };

  const handleUploadingMedia = (media: (File | string)[]) => {
    const copyFormData = { ...form };
    copyFormData.uploadedMedia = media;
    dispatch(setForm(copyFormData));
    handleFormValidation(copyFormData, currentStep);
  };

  const handlePaymentMode = () => {
    const copyFormData = { ...form };
    copyFormData.paymentMode =
      form.paymentMode === "Online" ? "Wallet" : "Online";
    dispatch(setForm(copyFormData));
  };

  const handleGenreSelection = (genre: string) => {
    const copyFormData = { ...form };
    copyFormData.selectedCategory = [];
    copyFormData.selectedSubCategory = [];
    copyFormData.selectedScreenGroup = [];
    copyFormData.selectedScreens = [];
    copyFormData.uploadedMedia = [];
    copyFormData.selectedGenre = genre;
    dispatch(setForm(copyFormData));
    handleFormValidation(copyFormData, currentStep);
  };

  const handleChooseDates = (value: Value) => {
    const copyFormData = { ...form };
    copyFormData.selectedDates = value;
    dispatch(setForm(copyFormData));
    handleFormValidation(copyFormData, currentStep);
  };

  const handleSidebarClicked = () => {
    dispatch(restoreStateToInitial());
  };

  const handleFormValidation = (form: Form, index: number) => {
    const errorObj = {} as UserLayoutIState["errors"];
    switch (index) {
      case 1:
        if (!form.campaignName)
          errorObj.campaignName = "Campaign Name is required";
        else if (!/^([a-zA-Z]+(?: [a-zA-Z]+)*)$/.test(form.campaignName))
          errorObj.campaignName = "Not a valid name";
        break;
      case 2:
        if (form.location.locationName === "")
          errorObj.locationName = "Please Select Location";
        break;
      case 3:
        if (
          (Array.isArray(form.selectedDates) && !form.selectedDates.length) ||
          form.selectedDates === null
        )
          errorObj.selectedDates = "Please Choose Dates";
        break;
      case 4: {
        switch (form.pricingModelId) {
          case "2":
            if (!form.numberOfSpots)
              errorObj.numberOfSpots = "Please enter spots in numbers";
            else if (form.numberOfSpots.length > 6)
              errorObj.numberOfSpots = "More than 6 digits not allowed";
            break;
          case "4":
            if (!form.CPM) errorObj.CPM = "Please enter CPM in numbers";
            else if (form.CPM.length > 6)
              errorObj.CPM = "More than 6 digits not allowed";
            break;
          case "5":
            if (!form.price) errorObj.price = "Please enter price in numbers";
            else if (form.price.length > 6)
              errorObj.price = "More than 6 digits not allowed";
            break;
          default:
            if (!form.adTypeId) errorObj.adTypeId = "Please select Ad Type";
        }
        break;
      }
      case 5:
        if (!form.selectedGenre)
          errorObj.selectedGenre = "Please choose one genre";
        break;
      case 6:
        if (form.selectedCategory.length === 0)
          errorObj.selectedCategory = "Please choose at least one category";
        break;
      case 7:
        if (form.selectedSubCategory.length === 0)
          errorObj.selectedSubCategory =
            "Please choose at least one sub-category";
        break;
      case 8:
        if (form.selectedScreenGroup.length === 0)
          errorObj.selectedScreenGroup =
            "Please choose at least one screen group";
        break;
      case 9:
        if (form.uploadedMedia.length === 0)
          errorObj.uploadedMedia = "Please upload media";
    }
    setErrors(errorObj);
  };
  const renderSuitableView = () => {
    switch (currentStep) {
      case 1:
        return (
          <AddNewCampaign
            helperText={errors.campaignName}
            handleOnChange={handleFormDetails}
          />
        );
      case 2:
        return (
          <ChooseLocation
            helperText={errors.locationName}
            handleOnChange={handleLocationChange}
          />
        );
      case 3:
        return (
          <ChooseSlots
            handleChooseDates={handleChooseDates}
            helperText={errors.selectedDates}
          />
        );
      case 4:
        return (
          <PricingModel
            adTypeIdErrorTxt={errors.adTypeId}
            handleAdType={handleFormDetails}
            handlePricingModel={handleFormDetails}
            handleSpots={handleFormDetails}
            handlePrice={handleFormDetails}
            cpmErrorTxt={errors.CPM}
            spotsErrorTxt={errors.numberOfSpots}
            priceErrorTxt={errors.price}
          />
        );
      case 5:
        return (
          <MediaByGenre
            handleGenreClick={handleGenreSelection}
            helperText={errors.selectedGenre}
          />
        );
      case 6:
        return (
          <SelectCategory
            handleCategory={handleCategorySelection}
            helperText={errors.selectedCategory}
          />
        );
      case 7:
        return (
          <SubCategory
            handleSubCategory={handleSubCategorySelection}
            helperText={errors.selectedSubCategory}
          />
        );
      case 8:
        return (
          <ChooseScreenGroup
            handleScreenGroup={handleScreenGroupSelection}
            handleScreenSelection={handleScreenSelection}
            showScreenModal={showScreens}
            helperText={errors.selectedScreenGroup}
            handleOpeningScreen={handleShowAllScreens}
          />
        );
      case 9:
        return (
          <UploadFiles
            uploadFileSetter={handleUploadingMedia}
            helperText={errors.uploadedMedia}
          />
        );
      case 10:
        return <Checkout handlePaymentMethod={handlePaymentMode} />;
    }
  };
  const QontoStepIcon = (props: StepIconProps, step: number) => {
    const { active, completed, className } = props;
    const handleBgColor = () => {
      if (active) {
        return colors.stepColor;
      } else if (completed) {
        return colors.primary;
      } else {
        return colors.white;
      }
    };
    const handleTextColor = () => {
      if (active) {
        return colors.white;
      } else if (completed) {
        return colors.white;
      } else {
        return colors.black;
      }
    };
    const handleStepUi = () => {
      if (step !== 10) {
        return (
          <Typography
            sx={{
              ...userLayoutStyles.stepUi,
              backgroundColor: handleBgColor(),
              color: handleTextColor(),
              border: `2px solid ${
                completed ? colors.primary : colors.stepColor
              }`,
            }}
          >
            0{step}
          </Typography>
        );
      } else {
        return (
          <Typography
            sx={{
              ...userLayoutStyles.stepUi,
              backgroundColor: handleBgColor(),
              color: handleTextColor(),
              border: `2px solid ${
                completed ? colors.primary : colors.stepColor
              }`,
            }}
          >
            {step}
          </Typography>
        );
      }
    };

    return (
      <QontoStepIconRoot ownerState={{ active }} className={className}>
        {handleStepUi()}
      </QontoStepIconRoot>
    );
  };

  useEffect(() => {
    handleSelectAllScreenByGroupId();
    // eslint-disable-next-line
  }, [form.selectedScreenGroup]);

  useEffect(() => {
    if (!campaign && Object.keys(errors).length)
      setErrors({} as UserLayoutIState["errors"]);
    // eslint-disable-next-line
  }, [campaign]);

  useEffect(() => {
    dispatch(getBalance());
  }, [dispatch]);
  return (
    <Box
      sx={{
        ...userLayoutStyles.layoutMain,
        ...styles.outletContainer,
        pt: "0px !important",
      }}
    >
      <Box sx={userLayoutStyles.contentContainer}>
        {campaign ? (
          <>
            <Header onClicked={handleSidebarClicked} />
            <Box
              bgcolor={currentStep !== 10 ? colors.white : "transparent"}
              sx={userLayoutStyles.formContainer}
            >
              <Stack
                minHeight={"inherit"}
                justifyContent={"space-between"}
                component={"form"}
                gap={2}
                onSubmit={(event) => event.preventDefault()}
              >
                {renderSuitableView()}
                {currentStep !== 10 && (
                  <Stack sx={userLayoutStyles.buttonContainer}>
                    <CustomButton
                      bgcolor={colors.primary}
                      sx={userLayoutStyles.btn}
                      outlined={true}
                      disableElevation
                      onClick={handleBack}
                    >
                      {translate("userFlow.campaignBackBtnTxt")}
                    </CustomButton>
                    <CustomButton
                      bgcolor={colors.primary}
                      sx={userLayoutStyles.btn}
                      disableElevation
                      onClick={handleNext}
                      type="submit"
                      disabled={Object.values(errors).length > 0}
                    >
                      {translate("userFlow.campaignNextBtnTxt")}
                    </CustomButton>
                  </Stack>
                )}
              </Stack>
            </Box>
            <Box my={8}>
              <Stepper
                activeStep={currentStep - 1}
                alternativeLabel
                connector={<QontoConnector />}
              >
                {STEPS.map((label) => (
                  <Step key={label}>
                    <StepLabel
                      StepIconComponent={(comp) => QontoStepIcon(comp, label)}
                    >
                      {null}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </>
        ) : (
          <>
            <Header
              onClicked={handleSidebarClicked}
              headerButton={
                isInAdsRoute &&
                permission.create && (
                  <CustomButton
                    onClick={startCreateCampaign}
                    endIcon={
                      loading ? (
                        <CircularProgress size={"20px"} color="warning" />
                      ) : (
                        <Add />
                      )
                    }
                    bgcolor={colors.primary}
                    sx={userLayoutStyles.headerBtn}
                    disabled={loading}
                  >
                    {translate("userFlow.createAdCampaignBtn")}
                  </CustomButton>
                )
              }
            />
            <Box component={"section"} pt={2}>
              <Outlet />
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default UserLayout;
