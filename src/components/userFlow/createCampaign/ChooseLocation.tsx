import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  Autocomplete,
  Box,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { translate } from "../../../config/i18n";
import { colors, hex2rgba } from "../../../config/theme";
import { Form } from "../../../redux/reducers/userReducers/createCampaignSlice";
import { useAppSelector } from "../../../utils/useRedux";
import { addNewCampaign } from "./CommonStyles";

interface AddNewCampaignIProps {
  handleOnChange: ({
    lat,
    lng,
    locationName,
    locationId,
  }: Form["location"]) => void;
  helperText: string;
}
interface IState {
  selectedValue: { placeId: string; placeName: string } | null;
  suggestions: { placeId: string; placeName: string }[];
}

const ChooseLocation = ({
  handleOnChange,
  helperText,
}: AddNewCampaignIProps) => {
  const { form } = useAppSelector((state) => state.Campaign);
  const {
    ready,
    setValue,
    suggestions: { data },
    clearSuggestions,
  } = usePlacesAutocomplete({});

  const [selectedValue, setSelectedValue] =
    useState<IState["selectedValue"]>(null);
  const [suggestions, setSuggestions] = useState<IState["suggestions"]>([]);

  const handleChangeLocation = (value: string) => {
    setValue(value);
  };

  const handleRetrieveGeoCords = async () => {
    if (selectedValue) {
      const result = await getGeocode({ placeId: selectedValue.placeId });
      const { lat, lng } = getLatLng(result?.[0]);
      handleOnChange({
        lat: lat.toString(),
        lng: lng.toString(),
        locationId: selectedValue.placeId,
        locationName: selectedValue.placeName,
      });
    } else {
      handleOnChange({
        lat: "",
        lng: "",
        locationId: "",
        locationName: "",
      });
    }
  };

  const handleUpdatingLocation = (obj: IState["selectedValue"]) => {
    setSelectedValue(obj);
  };

  const handleFormatSuggestions = (
    data: google.maps.places.AutocompletePrediction[]
  ) => {
    const modifiedData = data.map((item) => ({
      placeId: item.place_id,
      placeName: item.description,
    }));
    setSuggestions(modifiedData);
  };

  const getAutoCompletePredictionObjFromExitingLocationId = async () => {
    if (form.location.locationId) {
      try {
        const data = await fetch(
          `https://maps.googleapis.com/maps/api/place/details/json?place_id=${form.location.locationId}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
        );
        const res = await data.json();
        const obj = {
          placeId: res.result.place_id,
          placeName: res.result.formatted_address,
        };
        setSelectedValue(obj);
      } catch (error) {
        setSelectedValue(null);
      }
    }
  };

  useEffect(() => {
    handleRetrieveGeoCords();
    // eslint-disable-next-line
  }, [selectedValue]);

  useEffect(() => {
    handleFormatSuggestions(data);
  }, [data]);

  useEffect(() => {
    getAutoCompletePredictionObjFromExitingLocationId();
    return () => clearSuggestions();
    // eslint-disable-next-line
  }, []);
  return (
    <Box>
      <Typography variant="h5" sx={addNewCampaign.title}>
        {translate("userFlow.chooseLocation")}
      </Typography>
      <Typography sx={addNewCampaign.campaignTextField}>
        {translate("userFlow.location")}
      </Typography>
      <Box maxWidth={{ xs: "initial", md: 422 }}>
        {!ready ? (
          <CircularProgress />
        ) : (
          <>
            <Autocomplete
              disablePortal
              id="google-places"
              options={suggestions}
              value={selectedValue}
              fullWidth
              popupIcon={<KeyboardArrowDownIcon />}
              getOptionLabel={(option) => option.placeName}
              renderInput={(params) => (
                <TextField {...params} placeholder="Search location" />
              )}
              renderOption={(props, options) => {
                return <Typography {...props}>{options.placeName}</Typography>;
              }}
              onInputChange={(_, newInputValue) => {
                handleChangeLocation(newInputValue);
              }}
              onChange={(_, obj) => handleUpdatingLocation(obj)}
            />
            {Boolean(helperText) && (
              <Typography
                fontSize={11}
                ml={1}
                sx={{
                  color: helperText?.toLowerCase().includes("please")
                    ? hex2rgba(colors.black, 0.7)
                    : colors.validate,
                }}
              >
                {helperText}
              </Typography>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default ChooseLocation;
