import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Slider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { colors } from "../../../../config/theme";
import {
  BeResponse,
  getConfiguration,
  updateScreenConfiguration,
} from "../../../../redux/reducers/adminReducers/configurationSlice";
import { displayAlert } from "../../../../utils/toastMessage";
import { useAppDispatch, useAppSelector } from "../../../../utils/useRedux";
import { CustomButton } from "../../../common/customButton/CustomButton";
import { InputField } from "../../../common/inputField/InputField";
import { IOSSwitch } from "../../../common/iosSwitch/IosSwitch";
import { volumeIcon } from "../../../admin/assets/Index";
import { screenStyles } from "../ScreenStyles";
import { configurationStyles } from "./EditStyles";
import { GoogleMap, Marker } from "@react-google-maps/api";

interface AllSwitches {
  fitContent: boolean;
  analytics: boolean;
  nativeVideoPlayer: boolean;
  enableAction: boolean;
  autoStartAtBoot: boolean;
  dotIndicators: boolean;
  keepOnTop: boolean;
  deviceProtection: boolean;
  deviceOwner: boolean;
}
interface addressType {
  long_name: string;
  short_name: string;
  types: string[];
}
const switchData = [
  { key: "fitContent", label: "Fit Content" },
  { key: "analytics", label: "Analytics" },
  { key: "nativeVideoPlayer", label: "Native Video Player" },
  { key: "enableAction", label: "Enable Auction" },
  { key: "autoStartAtBoot", label: "Auto Start at boot" },
  { key: "dotIndicators", label: "Dot Indicator’s" },
  { key: "keepOnTop", label: "Keep on Top" },
  { key: "deviceProtection", label: "Device protection" },
];
const allSwitchesInitialState: AllSwitches = {
  fitContent: false,
  analytics: false,
  nativeVideoPlayer: false,
  enableAction: false,
  autoStartAtBoot: false,
  dotIndicators: false,
  keepOnTop: false,
  deviceProtection: false,
  deviceOwner: false,
};
interface IState {
  tagsList: string[];
  tag: string;
  allSwitches: AllSwitches;
  dropDownErrors: {
    appRotation: string;
    screenOrientation: string;
  };
  Coordinates: {
    lat: number;
    lng: number;
  };
  inputs: {
    id: number;
    name: string;
    value: string;
    errorMsg: string;
    placeholder: string;
    regex: RegExp;
  }[];
}
const containerStyle = {
  width: "100%",
  height: "100%",
};
const center = { lat: 17.4486, lng: 78.3908 };
type ScreenOrientation = "NONE" | "PORTRAIT" | "LANDSCAPE";
type AppRotation =
  | "NONE"
  | "BUILD_IN_APP_ROTATION_270_RIGHT"
  | "BUILD_IN_APP_ROTATION_180"
  | "BUILD_IN_APP_ROTATION_90_LEFT"
  | "BUILD_IN_APP_ROTATION_0";
const appRotationOptions = [
  { label: "Select App Rotation", value: "NONE" },
  { label: "Build in App Rotation 0", value: "BUILD_IN_APP_ROTATION_0" },
  {
    label: "Build in App Rotation 270 (Right)",
    value: "BUILD_IN_APP_ROTATION_270_RIGHT",
  },
  {
    label: "Build in App Rotation 180",
    value: "BUILD_IN_APP_ROTATION_180",
  },
  {
    label: "Build in App Rotation 90 (Left)",
    value: "BUILD_IN_APP_ROTATION_90_LEFT",
  },
];
const screenOrientationOptions = [
  { label: "Screen Orientation", value: "NONE" },
  { label: "Portrait", value: "PORTRAIT" },
  { label: "Landscape", value: "LANDSCAPE" },
];
const Configuration = () => {
  const id = Number(useParams().id!);
  const [inputArr, setInputArr] = useState<IState["inputs"]>([
    {
      id: 0,
      name: "location",
      value: "",
      errorMsg: "",
      placeholder: "Location",
      regex: /^[a-zA-Z\s,]+$/,
    },
    {
      id: 1,
      name: "longitude",
      value: "",
      errorMsg: "",
      placeholder: "Longitude",
      regex: /^-?\d+(\.\d+)?$/,
    },
    {
      id: 2,
      name: "latitude",
      value: "",
      errorMsg: "",
      placeholder: "Latitude",
      regex: /^-?\d+(\.\d+)?$/,
    },
    {
      id: 3,
      name: "city",
      value: "",
      errorMsg: "",
      placeholder: "City",
      regex: /^[a-zA-Z\s,]+$/,
    },
    {
      id: 4,
      name: "state",
      value: "",
      errorMsg: "",
      placeholder: "State",
      regex: /^[a-zA-Z\s,]+$/,
    },
    {
      id: 5,
      name: "country",
      value: "",
      errorMsg: "",
      placeholder: "Country",
      regex: /^[a-zA-Z\s,]+$/,
    },
    {
      id: 6,
      name: "area",
      value: "",
      errorMsg: "",
      placeholder: "Area",
      regex: /^[a-zA-Z\s,]+$/,
    },
  ]);

  const [generalInput, setGeneralInput] = useState({
    id: 0,
    name: "screenName",
    screenName: "",
    errorMsg: "",
    placeholder: "Screen Name",
  });
  const [screenOrientation, setScreenOrientation] =
    useState<ScreenOrientation>("NONE");
  const [appRotation, setAppRotation] = useState<AppRotation>("NONE");
  const [volume, setVolume] = useState(50);
  const [tagsList, setTagsList] = useState<IState["tagsList"]>([]);
  const [tag, setTag] = useState("");
  const [dropDownErrors, setDropDownErrors] = useState<
    IState["dropDownErrors"]
  >({ appRotation: "", screenOrientation: "" });
  const [allSwitches, setAllSwitches] = useState<IState["allSwitches"]>(
    allSwitchesInitialState
  );
  const dispatch = useAppDispatch();
  const { allApiStatus, screenData } = useAppSelector(
    (state) => state.ConfigurationSlice
  );
  const handleScreenOrientation = (
    event: SelectChangeEvent<ScreenOrientation>
  ) => {
    setScreenOrientation(event.target.value as ScreenOrientation);
    if (
      dropDownErrors.screenOrientation !== "" &&
      event.target.value !== "NONE"
    ) {
      setDropDownErrors({
        ...dropDownErrors,
        screenOrientation: "",
      });
    }
  };
  const handleAppRotation = (event: SelectChangeEvent<AppRotation>) => {
    setAppRotation(event.target.value as AppRotation);
    if (
      dropDownErrors.screenOrientation !== "" &&
      event.target.value !== "NONE"
    ) {
      setDropDownErrors({
        ...dropDownErrors,
        screenOrientation: "",
      });
    }
  };
  const handleTagInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTag(event.target.value);
  };
  const handleTags = () => {
    tag.trim() && setTagsList([...tagsList, tag]);
    setTag("");
  };
  const removeTag = (index: number) => {
    const tagsArr = [...tagsList];
    tagsArr.splice(index, 1);
    setTagsList(tagsArr);
  };
  const handleSliderChange = (_event: Event, newValue: number | number[]) => {
    setVolume(newValue as number);
  };
  const handleInputs = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id: number
  ) => {
    const inputs = [...inputArr];
    const currentObj = {
      ...inputs[id],
      value: event.target.value,
    };
    inputs[id] = currentObj;
    setInputArr(inputs);
  };
  const handleGeneralInputs = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setGeneralInput({ ...generalInput, screenName: event.target.value });
  };
  const handleOnBlur = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id: number,
    placeHolder: string
  ) => {
    const value = [...inputArr];
    const input = event.target.value.trim();
    if (input.length > 3) {
      const currentObj = {
        ...value[id],
        errorMsg: value[id].regex.test(input) ? "" : "Invalid",
      };
      value[id] = currentObj;
      setInputArr(value);
    } else {
      const currentObj = {
        ...value[id],
        errorMsg: `${placeHolder} is required`,
      };
      value[id] = currentObj;
      setInputArr(value);
    }
  };
  const formUpdation = () => {
    const body = new FormData();
    body.append("screenName", generalInput.screenName);
    inputArr.forEach((item) => body.append(item.name, item.value));
    body.append("orientation", screenOrientation);
    Object.entries(allSwitches).forEach(([key, value]) =>
      body.append(key, value.toString())
    );
    body.append("playerSetting", appRotation);
    body.append("deviceVolume", volume.toString());
    for (let each of tagsList) body.append("tags", each);
    dispatch(updateScreenConfiguration({ body, id }));
  };
  const handleSwitchChange = (name: keyof AllSwitches, checked: boolean) => {
    setAllSwitches((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let validate = "";
    const inputValidations = inputArr.map((item) => {
      if (!item.value.trim() && item.name !== "tags") {
        validate = "required";
        return {
          ...item,
          errorMsg: `${item.placeholder} is required`,
        };
      } else if (!item.regex.test(item.value)) {
        validate = "invalid";
        return {
          ...item,
          errorMsg: `Invalid`,
        };
      } else {
        return {
          ...item,
          errorMsg: "",
        };
      }
    });
    if (validate) {
      displayAlert(
        `please fill in ${
          validate === "invalid" ? "valid" : "all"
        } the details`,
        "error"
      );
      setInputArr(inputValidations);
    }
    if (appRotation === "NONE" || screenOrientation === "NONE") {
      setDropDownErrors({
        appRotation: appRotation === "NONE" ? "App Rotation is required" : "",
        screenOrientation:
          screenOrientation === "NONE" ? "Screen Orientation is required" : "",
      });
    }
    if (!validate && appRotation !== "NONE" && screenOrientation !== "NONE") {
      formUpdation();
    }
  };
  useEffect(() => {
    if (allApiStatus.updateScreenConfiguration === "SUCCESS")
      dispatch(getConfiguration(id));
  }, [allApiStatus.updateScreenConfiguration]); //eslint-disable-line
  useEffect(() => {
    if (allApiStatus.getConfiguration === "INITIAL")
      dispatch(getConfiguration(id));
    if (allApiStatus.getConfiguration === "SUCCESS") fillingFields();
  }, [allApiStatus]); //eslint-disable-line
  const fillingFields = () => {
    setInputArr((prev) =>
      prev.map((item) => ({
        ...item,
        value: String(screenData[item.name as keyof BeResponse] ?? ""),
      }))
    );
    setTagsList(screenData.tags);
    setGeneralInput((prev) => ({
      ...prev,
      screenName: screenData.screenName,
    }));
    setScreenOrientation(screenData.orientation as ScreenOrientation);
    setAppRotation(screenData.playerSetting as AppRotation);
    fillingSwitches();
  };
  const fillingSwitches = () => {
    const allKeys = Object.keys(allSwitches);
    let newObj = {} as AllSwitches;
    setVolume(screenData["deviceVolume"] ? screenData["deviceVolume"] : 0);
    for (let each of allKeys) {
      newObj[each as keyof AllSwitches] = Boolean(
        screenData[each as keyof AllSwitches]
      );
    }
    setAllSwitches(newObj);
  };
  const getLongNameByType = (
    addtypes: string[],
    addressComponent: addressType[]
  ) => {
    const item = addressComponent.find((item: { types: string[] }) =>
      addtypes.some((type) => item.types.includes(type))
    );
    return item?.long_name ?? "";
  };
  const onPositionChanged = (event: google.maps.MapMouseEvent) => {
    const newLat = event.latLng!.lat();
    const newLng = event.latLng!.lng();
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode(
      { location: { lat: newLat, lng: newLng } },
      (results, status) => {
        if (status === "OK" && results![0]) {
          const addressComponent = results![0].address_components!;
          let country = getLongNameByType(["country"], addressComponent);
          let area = getLongNameByType(
            ["sublocality_level_1", "sublocality", "locality"],
            addressComponent
          );
          let state = getLongNameByType(
            ["administrative_area_level_1"],
            addressComponent
          );
          let city = getLongNameByType(["locality"], addressComponent);
          let totalAddress = addressComponent
            .slice(1, addressComponent.length - 1)
            .map(
              (each: {
                long_name: string;
                short_name: string;
                types: string[];
              }) => each.long_name
            )
            .join(",");
          let location = totalAddress
            .replaceAll(city, "")
            .replace(country, "")
            .replaceAll(state, "")
            .replace(/^\s*,+/, "")
            .replace(/,\s*$/, "")
            .replace(/\s*,\s*/g, ",")
            .replace(/,,+/g, ",")
            .replace(/^\s*,\s*/, "");

          if (location.length === 0) location = area;
          const inputs = [...inputArr];
          inputs[0] = { ...inputs[0], value: location, errorMsg: "" };
          inputs[1] = { ...inputs[1], value: newLng.toString(), errorMsg: "" };
          inputs[2] = { ...inputs[2], value: newLat.toString(), errorMsg: "" };
          inputs[3] = { ...inputs[3], value: city, errorMsg: "" };
          inputs[4] = { ...inputs[4], value: state, errorMsg: "" };
          inputs[5] = { ...inputs[5], value: country, errorMsg: "" };
          inputs[6] = { ...inputs[6], value: area, errorMsg: "" };
          setInputArr(inputs);
        } else {
          displayAlert("Geocoder failed due to: " + status);
        }
      }
    );
  };
  return (
    <Stack sx={configurationStyles.mainContainer}>
      <Box component={"form"} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Stack direction={{ x: "column", lg: "row" }} gap={"50px"}>
              <Stack
                direction={"column"}
                gap={1.5}
                sx={configurationStyles.formCon}
              >
                <Typography sx={configurationStyles.heading}>
                  Location Setting
                </Typography>
                <Stack direction={"column"} gap={1}>
                  {inputArr.map((item) => (
                    <Box key={item.id}>
                      <InputField
                        inputProps={{
                          name: item.name,
                          placeholder: item.placeholder,
                          sx: configurationStyles.input,
                          helperText: (
                            <Typography sx={configurationStyles.errorMsg}>
                              {item.errorMsg}
                            </Typography>
                          ),
                          value: item.value,
                          error: Boolean(item.errorMsg),
                          onChange: (event) => handleInputs(event, item.id),
                          onBlur: (event) =>
                            handleOnBlur(event, item.id, item.placeholder),
                        }}
                      />
                    </Box>
                  ))}
                </Stack>
              </Stack>
              <Stack sx={configurationStyles.mapCon}>
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={
                    {
                      lat: Number(inputArr[2].value),
                      lng: Number(inputArr[1].value),
                    } || center
                  }
                  zoom={5}
                >
                  <Marker
                    position={
                      {
                        lat: Number(inputArr[2].value),
                        lng: Number(inputArr[1].value),
                      } ?? center
                    }
                    draggable={true}
                    onDragEnd={onPositionChanged}
                  />
                </GoogleMap>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack direction={"column"} sx={configurationStyles.formCon}>
              <Typography sx={configurationStyles.heading}>
                General settings
              </Typography>
              <Stack sx={configurationStyles.generalSection}>
                <Stack sx={configurationStyles.generalItem}>
                  <Box mt={"20px"}>
                    <InputField
                      inputProps={{
                        name: generalInput.name,
                        placeholder: generalInput.placeholder,
                        sx: configurationStyles.input,
                        value: generalInput.screenName,
                        onChange: (event) => handleGeneralInputs(event),
                      }}
                    />
                  </Box>
                  <FormControl>
                    <Select
                      value={screenOrientation}
                      onChange={handleScreenOrientation}
                      displayEmpty
                      error={dropDownErrors.screenOrientation.length !== 0}
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      {screenOrientationOptions.map((each) => (
                        <MenuItem
                          key={each.value}
                          value={each.value}
                          sx={screenStyles.menuItem}
                        >
                          {each.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Typography variant="caption" color={"error"}>
                    {dropDownErrors.screenOrientation}
                  </Typography>
                </Stack>
                <Stack sx={configurationStyles.switchContainer}>
                  <Grid container>
                    {switchData.slice(0, 4).map((item, index) => (
                      <Grid
                        item
                        xs={6}
                        sx={configurationStyles.switchGrid}
                        key={index}
                      >
                        <Stack
                          direction={"row"}
                          alignItems={"center"}
                          width={"70%"}
                        >
                          <Typography>{item.label}</Typography>
                          <FormGroup sx={configurationStyles.switchGrid.switch}>
                            <FormControlLabel
                              name={item.key}
                              onChange={(_event, checked) =>
                                handleSwitchChange(
                                  item.key as keyof AllSwitches,
                                  checked
                                )
                              }
                              control={<IOSSwitch defaultChecked />}
                              label=""
                              checked={
                                allSwitches[item.key as keyof AllSwitches]
                              }
                            />
                          </FormGroup>
                        </Stack>
                      </Grid>
                    ))}
                  </Grid>
                </Stack>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
              sx={configurationStyles.deviceOwner}
            >
              <Typography sx={configurationStyles.heading}>Kisko</Typography>
              <Stack direction={"row"} gap={3} alignItems={"center"}>
                <Typography>Device Owner</Typography>
                <FormGroup>
                  <FormControlLabel
                    checked={allSwitches.deviceOwner}
                    onChange={(_event, checked) =>
                      handleSwitchChange("deviceOwner", checked)
                    }
                    control={<IOSSwitch defaultChecked />}
                    label=""
                  />
                </FormGroup>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack
              direction={"column"}
              gap={4}
              sx={configurationStyles.formCon}
            >
              <Typography sx={configurationStyles.heading}>
                Player Setting
              </Typography>
              <Stack
                direction={{ xs: "column", md: "row" }}
                alignItems={"center"}
                width={"100%"}
                gap={5}
              >
                <Stack width={{ xs: "100%", md: "50%" }}>
                  <FormControl>
                    <Select
                      value={appRotation}
                      onChange={handleAppRotation}
                      displayEmpty
                      error={dropDownErrors.appRotation.length !== 0}
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      {appRotationOptions.map((each) => (
                        <MenuItem
                          key={each.value}
                          value={each.value}
                          sx={screenStyles.menuItem}
                        >
                          {each.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Typography variant="caption" color="error">
                    {dropDownErrors.appRotation}
                  </Typography>
                </Stack>
                <Stack width={{ xs: "100%", md: "50%" }}>
                  <Typography>Device Volume</Typography>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box component={"img"} src={volumeIcon} />
                    </Grid>
                    <Grid item xs>
                      <Slider
                        sx={configurationStyles.slider}
                        value={typeof volume === "number" ? volume : 0}
                        onChange={handleSliderChange}
                        aria-labelledby="input-slider"
                      />
                    </Grid>
                    <Grid item alignItems={"center"}>
                      <Typography fontSize={"16px"}> {volume}</Typography>
                    </Grid>
                  </Grid>
                </Stack>
              </Stack>
              <Stack direction={"row"} gap={3}>
                {switchData.slice(4, switchData.length).map((item, index) => (
                  <Box key={index}>
                    <FormControlLabel
                      checked={allSwitches[item.key as keyof AllSwitches]}
                      onChange={(_event, checked) =>
                        handleSwitchChange(
                          item.key as keyof AllSwitches,
                          checked
                        )
                      }
                      control={
                        <IOSSwitch
                          defaultChecked
                          sx={configurationStyles.sliderSwitch}
                        />
                      }
                      label={item.label}
                      labelPlacement="top"
                    />
                  </Box>
                ))}
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
              sx={configurationStyles.deviceOwner}
            >
              <Typography sx={configurationStyles.heading}>
                Screen tags
              </Typography>
              <Stack
                direction={{ xs: "column-reverse" }}
                sx={configurationStyles.tagsContainer}
              >
                <Stack
                  sx={configurationStyles.tagsList}
                  display={tagsList.length === 0 ? "none" : "flex"}
                >
                  {tagsList.map((item, index) => (
                    <Stack
                      key={index + "tag"}
                      direction={"row"}
                      gap={1}
                      sx={configurationStyles.tagElement}
                    >
                      <Typography key={index}>{item}</Typography>
                      <CloseIcon
                        sx={configurationStyles.closeIcon}
                        onClick={() => removeTag(index)}
                      />
                    </Stack>
                  ))}
                </Stack>
                <TextField
                  name={"tags"}
                  value={tag}
                  placeholder={"Tag"}
                  sx={{ ...configurationStyles.root }}
                  onChange={(event) => handleTagInput(event)}
                  InputProps={{
                    endAdornment: (
                      <CustomButton
                        sx={{ height: "40px" }}
                        endIcon={<AddRoundedIcon />}
                        bgcolor={colors.green}
                        onClick={handleTags}
                      >
                        Add
                      </CustomButton>
                    ),
                  }}
                />
              </Stack>
            </Stack>
          </Grid>
          <CustomButton sx={configurationStyles.saveBtn} type="submit">
            Save Configurations
          </CustomButton>
        </Grid>
      </Box>
    </Stack>
  );
};
export default Configuration;