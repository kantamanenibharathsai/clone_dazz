import { Box, Divider, Grid, Typography } from "@mui/material";
import { translate } from "../../../../config/i18n";
import MediaCard from "../../mediaCard/MediaCard";
import { browseMediaData } from "./BrowseMediaData";
import { browseMediaStyles } from "./BrowseMediaSectionStyles";

const BrowseMediaSection = () => {
  return (
    <Box sx={browseMediaStyles.mainContainer}>
      <Typography sx={browseMediaStyles.title}>
        {translate("common.browseMediaByGenre")}
      </Typography>
      <Divider sx={browseMediaStyles.dividerStyle} />
      <Grid container spacing={{ xs: 4, xl: 10 }}>
        {browseMediaData.map((eachData) => (
          <Grid item xs={12} sm={4} md={3} lg={2} key={eachData.id}>
            <MediaCard
              genreText={eachData.genreText}
              genreImg={eachData.genreImg}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BrowseMediaSection;
