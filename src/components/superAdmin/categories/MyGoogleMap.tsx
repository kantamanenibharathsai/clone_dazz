import { MyLocation } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import { colors } from "../../../config/theme";

const containerStyle = {
  width: "70vw",
  height: "70vh",
};

const MyGoogleMap = ({
  setForm,
  coordinates,
}: {
  setForm: React.Dispatch<
    React.SetStateAction<{
      name: string;
      pairingCode: string;
      screenName: string;
      tags: string;
      location: string;
      city: string;
      state: string;
      country: string;
      area: string;
    }>
  >;
  coordinates: { lat: number; lng: number };
}) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_KEY!,
  });
  const [center, setCenter] = useState(coordinates);
  const [address, setAddress] = useState(null);
  const settingAddress = async () => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${center.lat},${center.lng}&key=AIzaSyDq9FvBqXKuxjt9wfsXijxnr2eBrEJ-eqA`
    );
    const data = await response.json();
    const filteredData = data.results[0];
    const addressComponent = filteredData.address_components;
    const country = addressComponent.filter(
      (item: { long_name: string; short_name: string; types: string[] }) =>
        item.types.includes("country")
    )[0].long_name;
    let area = addressComponent.filter(
      (item: { long_name: string; short_name: string; types: string[] }) =>
        item.types.includes("sublocality_level_1")
    )[0];
    if (area === undefined) {
      area = "";
    } else {
      area = area.long_name;
    }
    let state = addressComponent.filter(
      (item: { long_name: string; short_name: string; types: string[] }) =>
        item.types.includes("administrative_area_level_1")
    )[0];
    let city = addressComponent.filter(
      (item: { long_name: string; short_name: string; types: string[] }) =>
        item.types.includes("locality")
    )[0];
    if (city === undefined) {
      city = "";
    } else {
      city = city.long_name;
    }
    if (state === undefined) {
      state = "";
    } else {
      state = state.long_name;
    }
    const lengthOfAddressComponents = addressComponent.length;
    const totalAddressObjects = addressComponent.slice(
      1,
      lengthOfAddressComponents - 1
    );
    const totalAddress = totalAddressObjects
      .map(
        (each: { long_name: string; short_name: string; types: string[] }) =>
          each.long_name
      )
      .join("@");
    let location = totalAddress
      .replaceAll(city, "")
      .replace(country, "")
      .replaceAll(area, "")
      .replaceAll(state, "")
      .replace(/@+$/, "")
      .replaceAll("@", ", ");
    if (location.length === 0) location = area;
    setForm((prev) => ({ ...prev, country, area, state, city, location }));
    setAddress(filteredData.formatted_address);
  };
  useEffect(() => {
    settingAddress();
  }, [center]); //eslint-disable-line
  const locateMeHandler = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCenter({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  };
  const dragHandler = (e: google.maps.MapMouseEvent) => {
    setCenter({
      lat: e.latLng!.lat(),
      lng: e.latLng!.lng(),
    });
  };
  return isLoaded ? (
    <>
      <Button
        variant="contained"
        onClick={locateMeHandler}
        endIcon={<MyLocation />}
        sx={{
          position: "absolute",
          top: 5,
          left: "45%",
          zIndex: 100,
          "&.MuiButtonBase-root": {
            textTransform: "none",
            backgroundColor: colors.darkBlue,
          },
        }}
      >
        Locate Me
      </Button>
      <Box
        position={"absolute"}
        bottom={5}
        left={0}
        zIndex={100}
        display={"flex"}
        alignItems={"center"}
        gap={2}
      >
        <Typography>Your Choosen Address : {address}</Typography>
      </Box>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={18}>
        <MarkerF position={center} draggable onDragEnd={dragHandler} />
      </GoogleMap>
    </>
  ) : (
    <></>
  );
};

export default React.memo(MyGoogleMap);
