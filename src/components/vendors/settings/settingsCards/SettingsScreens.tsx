import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Grid, Typography } from "@mui/material";
import { useState } from "react";
import ChangePassword from "../../../common/changePassword/ChangePassword";
import SettingsCard from "../../../common/settingsCard/SettingsCard";
import { settingsScreensData } from "./SettingsScreenData";
import { settingsScreensStyles } from "./SettingsScreensStyles";
import Document from "./Document";

const SettingsScreens = () => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const handleClickCard = (cardId: number) => {
    setSelectedCard(cardId);
  };
  const handleBack = () => {
    setSelectedCard(null);
  };
  const renderComponent = () => {
    switch (selectedCard) {
      case 1:
        return <Document heading="Agreement Document" />;
      case 2:
        return <ChangePassword />;
      case 3:
        return <Document heading="Privacy Policy" />;
      case 4:
        return <Document heading="Terms & Conditions" />;
      case 5:
        return <Document heading="About Us" />;
      default:
        return null;
    }
  };
  return (
    <Grid container spacing={2} mt={!selectedCard ? 7 : 0}>
      {!selectedCard &&
        settingsScreensData.map((eachScreen) => (
          <Grid item xs={12} sm={6} lg={3} key={eachScreen.id}>
            <SettingsCard
              icon={eachScreen.icon}
              description={eachScreen.title}
              onClick={() => handleClickCard(eachScreen.id)}
            />
          </Grid>
        ))}
      {selectedCard && (
        <Box sx={settingsScreensStyles.titleContainer}>
          <Box sx={settingsScreensStyles.iconContainer} onClick={handleBack}>
            <ArrowBackIcon />{" "}
          </Box>
          <Typography sx={settingsScreensStyles.title}>Settings</Typography>
        </Box>
      )}
      <Grid item xs={12} mt={{ xs: 5, sm: 8 }}>
        {renderComponent()}
      </Grid>
    </Grid>
  );
};

export default SettingsScreens;
