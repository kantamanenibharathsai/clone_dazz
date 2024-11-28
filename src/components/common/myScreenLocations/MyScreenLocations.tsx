import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { GoogleMap, InfoWindowF, MarkerF } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { colors, hex2rgba } from "../../../config/theme";
import { getMyScreenLocations } from "../../../redux/reducers/common/myScreenLocations";
import { AppDispatch, RootState } from "../../../redux/store";
import {
  LayoutIcon,
  cardLayoutPlacedHolderImage,
  greenDot,
  redDot,
} from "../assets";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "20px",
};

const center = {
  lat: 17.448,
  lng: 78.498276,
};
interface Marker {
  id: number;
  screenGroupName: string;
  image: string;
  latitude: number;
  longitude: number;
  screenCount: number;
  active: boolean;
}

const MyScreenLocations = () => {
  const { data, loading } = useSelector(
    (state: RootState) => state.MyScreenLocations
  );
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.Auth.token);
  const [selectedMarker, setSelectedMarker] = useState<Marker | null>(null);

  useEffect(() => {
    dispatch(getMyScreenLocations());
  }, [dispatch]);

  if (loading) {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        height={"100%"}
      >
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <GoogleMap mapContainerStyle={mapContainerStyle} zoom={11} center={center}>
      {data?.map((marker) => (
        <MarkerF
          key={marker.id}
          position={{ lat: marker.latitude, lng: marker.longitude }}
          icon={marker.active ? greenDot : redDot}
          onClick={() => setSelectedMarker(marker)}
        >
          {selectedMarker === marker && (
            <InfoWindowF
              position={{ lat: marker.latitude, lng: marker.longitude }}
              onCloseClick={() => setSelectedMarker(null)}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  component="img"
                  src={`${marker.image}/${token}`}
                  onError={(event) =>
                    (event.currentTarget.src = cardLayoutPlacedHolderImage)
                  }
                  width="50px"
                  height="60px"
                  borderRadius="10px"
                />
                <Box sx={{ textAlign: "left" }}>
                  <Typography textTransform="capitalize" fontWeight={600}>
                    {marker.screenGroupName}
                  </Typography>
                  <Typography
                    display="flex"
                    alignItems="center"
                    gap={0.5}
                    fontWeight={500}
                    color={hex2rgba(colors.black, 0.6)}
                  >
                    <LayoutIcon />
                    {marker.screenCount} Screens
                  </Typography>
                </Box>
                <Box
                  component="img"
                  src={marker.active ? greenDot : redDot}
                  mt={-5}
                  width="20px"
                  height="20px"
                />
              </Box>
            </InfoWindowF>
          )}
        </MarkerF>
      ))}
    </GoogleMap>
  );
};

export default MyScreenLocations;
