import { Box, Typography } from "@mui/material";
import { common } from "./CommonStyle";

const RouteLoading = () => {
  return (
    <Box sx={common.container}>
      <Typography variant="h6">Loading...</Typography>
    </Box>
  );
};

export default RouteLoading;
