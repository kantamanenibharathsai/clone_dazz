import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Grid, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import ChangePassword from "../../../common/changePassword/ChangePassword";
import SettingsCard from "../../../common/settingsCard/SettingsCard";
import Commissions from "./Commissions";
import { settingsScreensData } from "./SettingsScreenData";
import { settingsScreensStyles } from "./SettingsScreensStyles";
import TextEditor from "./textEditor/TextEditor";
import { useRoutePermissions } from "../../../../utils/useRoutePermissions";
import ScreenPrices from "./ScreenPrices";

const SettingsScreens = () => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [value, setValue] = useState(0);
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const handleClickCard = (cardId: number) => {
    setSelectedCard(cardId);
  };
  const handleBack = () => {
    setSelectedCard(null);
  };

  const renderComponent = () => {
    switch (selectedCard) {
      case 1:
        return <TextEditor documentType="AGREEMENT" />;
      case 2:
        return <ChangePassword />;
      case 3:
        return <TextEditor documentType="PRIVACY_POLICY" />;
      case 4:
        return <TextEditor documentType="TERMS_AND_CONDITIONS" />;
      case 5:
        return <TextEditor documentType="ABOUT_US" />;
      default:
        return null;
    }
  };
  const permissions = useRoutePermissions();
  const updatedScreensData = settingsScreensData.filter(
    (eachScreen) => eachScreen.title !== "Login & security"
  );
  const legalDocuments = () => (
    <Grid container spacing={2} mt={!selectedCard ? 7 : 0}>
      {!selectedCard &&
        (permissions.edit ? settingsScreensData : updatedScreensData).map(
          (eachScreen) => (
            <Grid item xs={12} sm={6} lg={3} key={eachScreen.id}>
              <SettingsCard
                icon={eachScreen.icon}
                description={eachScreen.title}
                onClick={() => handleClickCard(eachScreen.id)}
              />
            </Grid>
          )
        )}
      {selectedCard && (
        <Box sx={settingsScreensStyles.titleContainer}>
          <Box sx={settingsScreensStyles.iconContainer} onClick={handleBack}>
            <ArrowBackIcon fontSize="small" />{" "}
          </Box>
          <Typography sx={settingsScreensStyles.title}>{"Settings"}</Typography>
        </Box>
      )}
      <Grid item xs={12} mt={{ xs: 5, sm: 8 }}>
        {renderComponent()}
      </Grid>
    </Grid>
  );
  const cardsJSX = () => {
    switch (value) {
      case 0:
        return <Commissions />;
      case 1:
        return legalDocuments();
      default:
        return <ScreenPrices />;
    }
  };
  return (
    <>
      {selectedCard === null && (
        <Tabs
          allowScrollButtonsMobile
          value={value}
          onChange={handleChange}
          sx={settingsScreensStyles.tabsContainer}
        >
          <Tab label="Commission" />
          <Tab label="Legal Agreements" />
          <Tab label="Prices" />
        </Tabs>
      )}
      {cardsJSX()}
    </>
  );
};

export default SettingsScreens;
