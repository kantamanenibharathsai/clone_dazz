import { AccessTimeFilledOutlined } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { GoogleMap, Marker, StandaloneSearchBox } from "@react-google-maps/api";
import moment from "moment";
import { useRef, useState } from "react";
import { endpoints } from "../../../../config/config";
import { colors } from "../../../../config/theme";
import { createNewScreen } from "../../../../redux/reducers/adminReducers/screenSlice";
import { displayAlert } from "../../../../utils/toastMessage";
import { useAppDispatch } from "../../../../utils/useRedux";
import { checked, unChecked } from "../../../admin/assets/Index";
import { CustomButton } from "../../../common/customButton/CustomButton";
import DadzsDropzone from "../../../common/dropZone/DadzDropZone";
import { InputField } from "../../../common/inputField/InputField";
import { categoryStyles } from "../../../superAdmin/categories/CategoriesStyles";
import { addScreenStyles } from "./AddScreenStyles";

interface Coordinates {
  lat: number;
  lng: number;
}
interface addressType {
  long_name: string;
  short_name: string;
  types: string[];
}
const containerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "26px",
};
const center = { lat: 17.4486, lng: 78.3908 };

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
interface IProps {
  handleClose: () => void;
}
interface IState {
  tagsList: string[];
  tag: string;
  timeFields: {
    id: number;
    value: string;
    errorMsg: string;
    placeHolder: string;
  }[];
  mediaFile: (File | string)[];
  mediaError: string;
}
const label = { inputProps: { "aria-label": "Checkbox demo" } };

export const AddScreen = ({ handleClose }: IProps) => {
  const [inputArr, setInputArr] = useState([
    {
      id: 0,
      name: "pairingCode",
      value: "",
      errorMsg: "",
      placeholder: "Pairing Code",
      regex: /^[a-zA-Z0-9]{4,10}$/,
    },
    {
      id: 1,
      name: "screenName",
      value: "",
      errorMsg: "",
      placeholder: "Screen Name",
      regex: /^[A-Za-z\s,]*$/,
    },
    {
      id: 2,
      name: "tags",
      value: "",
      errorMsg: "",
      placeholder: "Tags",
      regex: /^[A-Za-z0-9\s,]+$/,
    },
    {
      id: 3,
      name: "location",
      value: "",
      errorMsg: "",
      placeholder: "Location",
      regex: /^[A-Za-z\s,]+$/,
    },
    {
      id: 4,
      name: "pinCode",
      value: "",
      errorMsg: "",
      placeholder: "Pin Code",
      regex: /^[0-9]{5,6}$/,
    },
    {
      id: 5,
      name: "city",
      value: "",
      errorMsg: "",
      placeholder: "City",
      regex: /^[A-Za-z\s]+$/,
    },
    {
      id: 6,
      name: "state",
      value: "",
      errorMsg: "",
      placeholder: "State",
      regex: /^[A-Za-z\s]+$/,
    },
    {
      id: 7,
      name: "country",
      value: "",
      errorMsg: "",
      placeholder: "Country",
      regex: /^[A-Za-z\s]+$/,
    },
    {
      id: 8,
      name: "area",
      value: "",
      errorMsg: "",
      placeholder: "Area",
      regex: /^[A-Za-z0-9\s]+$/,
    },
    {
      id: 9,
      name: "price",
      value: "",
      errorMsg: "",
      placeholder: "Price",
      regex: /^[0-9]{2,9}$/,
    },
    {
      id: 10,
      name: "startTime",
      value: "",
      errorMsg: "",
      placeholder: "Start Time",
      regex:
        /^[A-Za-z]{3}, (\d{2}) [A-Za-z]{3} (\d{4}) (\d{2}:\d{2}:\d{2}) [A-Z]{3}$/,
    },
    {
      id: 11,
      name: "endTime",
      value: "",
      errorMsg: "",
      placeholder: "End Time",
      regex:
        /^[A-Za-z]{3}, (\d{2}) [A-Za-z]{3} (\d{4}) (\d{2}:\d{2}:\d{2}) [A-Z]{3}$/,
    },
  ]);

  const inputRef = useRef<google.maps.places.SearchBox | null>(null);
  const [tagsList, setTagsList] = useState<IState["tagsList"]>([]);
  const [mediaFile, setMediaFile] = useState<IState["mediaFile"]>([]);
  const [mediaError, setMediaError] = useState<string>("");
  const [tag, setTag] = useState("");
  const [checkedDays, setCheckedDays] = useState<string[]>([]);
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const dispatch = useAppDispatch();
  const handleUpload = (file: (File | string)[]) => {
    setMediaFile(file);
    setMediaError("");
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
  const handleInputs = (input: string, id: number) => {
    const value = [...inputArr];
    if (value[id].regex.test(input)) {
      const currentObj = {
        ...value[id],
        value: input,
        errorMsg: "",
      };
      value[id] = currentObj;
    } else {
      const currentObj = {
        ...value[id],
        value: input,
        errorMsg: input ? "Invalid" : "",
      };
      value[id] = currentObj;
    }
    setInputArr(value);
  };
  const handleOnBlur = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id: number
  ) => {
    const updatedInputs = [...inputArr];
    const { value, regex, placeholder, name } = updatedInputs[id];
    if (value.trim() && regex.test(value)) {
      updatedInputs[id].errorMsg = "";
    } else if (name !== "pairingCode") {
      updatedInputs[id].errorMsg = value.trim()
        ? "Invalid"
        : `${placeholder} is required`;
    }
    setInputArr(updatedInputs);
  };
  const handlePinCode = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id: number
  ) => {
    handleInputs(event.target.value, id);
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let validate = false;
    if (mediaFile.length === 0) {
      validate = true;
      setMediaError("required");
    }
    const inputValidations = inputArr.map((item) => {
      if (item.name === "pairingCode") {
        validate =
          item?.value?.trim() && !item.regex.test(item.value) ? true : false;
        return {
          ...item,
          errorMsg:
            !item.regex.test(item.value) && item?.value?.trim()
              ? "Invalid"
              : "",
        };
      } else if (
        item.name !== "tags" &&
        (!item?.value?.trim() || !item.regex.test(item.value))
      ) {
        validate = true;
        return {
          ...item,
          errorMsg: !item?.value?.trim() ? "required" : "Invalid",
        };
      } else {
        return {
          ...item,
          errorMsg: "",
        };
      }
    });
    if (validate) {
      setInputArr(inputValidations);
    } else {
      const body = new FormData();
      inputValidations.forEach((data) => {
        if (data.name !== "tags" && data.value) {
          body.append(
            data.name,
            ["startTime", "endTime"].includes(data.name)
              ? moment(data.value).format("YYYY-MM-DDTHH:mm:ss")
              : data.value
          );
        }
      });
      body.append("days", checkedDays.join(","));
      body.append("tags", tagsList.join(","));
      body.append("latitude", `${coordinates?.lat}`);
      body.append("longitude", `${coordinates?.lng}`);
      mediaFile.forEach((element) => {
        body.append("images", element);
      });
      const result = await dispatch(
        createNewScreen({
          body,
          endPoint: endpoints.CREAT_NEW_SCREEN,
          method: "POST",
        })
      );
      if (result.meta.requestStatus === "fulfilled") handleClose();
    }
  };
  const handleCheckboxChange =
    (day: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setCheckedDays((prev) =>
        event.target.checked
          ? [...prev, day]
          : prev.filter((checkedDay) => checkedDay !== day)
      );
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
  const handlePlaceChange = () => {
    if (inputRef.current) {
      const places = inputRef.current.getPlaces();
      if (places && places.length > 0) {
        const place = places[0];
        setCoordinates({
          lat: place.geometry?.location?.lat() ?? 0,
          lng: place.geometry?.location?.lng() ?? 0,
        });
        const addressComponent = place.address_components!;
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
        if (location.trim() !== place.name?.trim())
          location = place.name + ", " + location.trim();
        if (location.length === 0) location = area;
        const inputs = [...inputArr];
        inputs[3] = { ...inputs[3], value: location, errorMsg: "" };
        inputs[5] = { ...inputs[5], value: city, errorMsg: "" };
        inputs[6] = { ...inputs[6], value: state, errorMsg: "" };
        inputs[7] = { ...inputs[7], value: country, errorMsg: "" };
        inputs[8] = {
          ...inputs[8],
          value: area ? area : location,
          errorMsg: "",
        };

        setInputArr(inputs);
      }
    }
  };
  const onPositionChanged = (event: google.maps.MapMouseEvent) => {
    const newLat = event.latLng!.lat();
    const newLng = event.latLng!.lng();
    setCoordinates({ lat: newLat, lng: newLng });
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
          inputs[3] = { ...inputs[3], value: location, errorMsg: "" };
          inputs[5] = { ...inputs[5], value: city, errorMsg: "" };
          inputs[6] = { ...inputs[6], value: state, errorMsg: "" };
          inputs[7] = { ...inputs[7], value: country, errorMsg: "" };
          inputs[8] = { ...inputs[8], value: area, errorMsg: "" };
          setInputArr(inputs);
        } else {
          displayAlert("Geocoder failed due to: " + status);
        }
      }
    );
  };
  return (
    <Stack sx={addScreenStyles.formModal.mainContainer}>
      <Box
        component={"form"}
        onSubmit={handleSubmit}
        sx={addScreenStyles.formModal.formCon}
      >
        <Typography>New Screen</Typography>
        <Grid container spacing={2}>
          {inputArr.slice(0, 4).map((item) => {
            switch (item.name) {
              case "tags":
                return (
                  <Grid item xs={12} sm={12} md={6} key={item.id}>
                    <Stack
                      direction={{ xs: "column-reverse" }}
                      sx={addScreenStyles.formModal.tagsContainer}
                    >
                      <Stack
                        sx={addScreenStyles.formModal.tagsList}
                        display={tagsList.length === 0 ? "none" : "flex"}
                      >
                        {tagsList &&
                          tagsList.map((item, index) => (
                            <Stack
                              direction={"row"}
                              gap={1}
                              sx={addScreenStyles.formModal.tagElement}
                            >
                              <Typography key={index}>{item}</Typography>
                              <CloseIcon
                                sx={addScreenStyles.formModal.closeIcon}
                                onClick={() => removeTag(index)}
                              />
                            </Stack>
                          ))}
                      </Stack>
                      <TextField
                        name={"tags"}
                        value={tag}
                        placeholder={"Tag"}
                        sx={addScreenStyles.formModal.root}
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
                  </Grid>
                );
              case "location":
                return (
                  <Grid item xs={12} sm={12} md={6} key={item.id}>
                    <StandaloneSearchBox
                      onPlacesChanged={handlePlaceChange}
                      onLoad={(ref) => (inputRef.current = ref)}
                    >
                      <InputField
                        inputProps={{
                          inputRef,
                          placeholder: "Enter a Location",
                          type: "text",
                          fullWidth: true,
                          value: item.value,
                          onChange: (e) =>
                            handleInputs(e.target.value, item.id),
                          helperText: (
                            <Typography sx={addScreenStyles.formModal.errorMsg}>
                              {item.errorMsg}
                            </Typography>
                          ),
                          error: Boolean(item.errorMsg),
                          sx: { ...categoryStyles.inputText },
                        }}
                      />
                    </StandaloneSearchBox>
                  </Grid>
                );
              default:
                return (
                  <Grid item xs={12} sm={12} md={6} key={item.id}>
                    <InputField
                      inputProps={{
                        name: item.name,
                        placeholder: item.placeholder,
                        sx: addScreenStyles.formModal.input,
                        onBlur: (event) => handleOnBlur(event, item.id),
                        onChange: (event) =>
                          handleInputs(event.target.value, item.id),
                        helperText: (
                          <Typography sx={addScreenStyles.formModal.errorMsg}>
                            {item.errorMsg}
                          </Typography>
                        ),
                        error: Boolean(item.errorMsg),
                      }}
                    />
                  </Grid>
                );
            }
          })}
          {inputArr.slice(4, inputArr.length - 2).map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <InputField
                inputProps={{
                  name: item.name,
                  value: item.value,
                  placeholder: item.placeholder,
                  sx: addScreenStyles.formModal.input,
                  onBlur: (event) => handleOnBlur(event, item.id),
                  onChange: (event) => {
                    item.name === "pinCode"
                      ? handlePinCode(event, item.id)
                      : handleInputs(event.target.value, item.id);
                  },
                  helperText: (
                    <Typography sx={addScreenStyles.formModal.errorMsg}>
                      {item.errorMsg}
                    </Typography>
                  ),
                  error: Boolean(item.errorMsg),
                }}
              />
            </Grid>
          ))}
          <Grid item xs={12} sm={12} md={6}>
            <FormControl sx={addScreenStyles.checkBoxContainer}>
              {days.map((item) => (
                <Grid item xs={6} sm={4} md={6} lg={4} key={item}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...label}
                        icon={<Box component="img" src={unChecked} />}
                        checkedIcon={<Box component="img" src={checked} />}
                        onChange={handleCheckboxChange(item)}
                      />
                    }
                    label={item}
                    sx={addScreenStyles.label}
                  />
                </Grid>
              ))}
            </FormControl>
          </Grid>
          {inputArr.slice(inputArr.length - 2, inputArr.length).map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item.id} direction={"column"}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoItem>
                  <TimePicker
                    sx={
                      item.errorMsg
                        ? {
                            border: "1px solid red",
                            borderRadius: "10px",
                            "&:hover": {
                              border: "1px solid transparent",
                            },
                          }
                        : {}
                    }
                    slotProps={{
                      field: {
                        clearable: true,
                      },
                      textField: {
                        placeholder: item.placeholder,
                      },
                    }}
                    slots={{
                      openPickerIcon: () => <AccessTimeFilledOutlined />,
                    }}
                    onChange={(value) => handleInputs(String(value), item.id)}
                  />
                </DemoItem>
              </LocalizationProvider>
              <Typography sx={addScreenStyles.error}>
                {item.errorMsg}
              </Typography>
            </Grid>
          ))}
          <Grid item xs={12}>
            <DadzsDropzone
              uploadFileSetterWithEdit={handleUpload}
              uploadFiles={mediaFile}
              boxStyle={{ sx: { height: "200px" } }}
              helperText={mediaError}
              isAcceptMultiple={true}
            />
          </Grid>
        </Grid>
        <CustomButton
          sx={addScreenStyles.formModal.addBtn}
          endIcon={<AddIcon />}
          type="submit"
        >
          Add Now
        </CustomButton>
      </Box>
      <Stack sx={addScreenStyles.formModal.mapCon}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={coordinates || center}
          zoom={10}
        >
          <Marker
            position={coordinates ?? center}
            draggable={true}
            onDragEnd={onPositionChanged}
          />
        </GoogleMap>
      </Stack>
    </Stack>
  );
};
