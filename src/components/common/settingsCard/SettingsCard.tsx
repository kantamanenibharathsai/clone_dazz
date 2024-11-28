import EastIcon from "@mui/icons-material/East";
import { Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { styles } from "./SettingsCardStyles";
interface IData {
  description: string;
  icon: string;
  onClick?: () => void;
}

const SettingsCard: React.FC<Partial<IData>> = ({
  description,
  icon,
  onClick,
}) => {
  return (
    <Card sx={styles.cardContainer} onClick={onClick}>
      <CardContent sx={styles.cardContent}>
        <Box>
          <Box component="img" src={icon} sx={styles.icon} />
          <Box sx={styles.descriptionContainer}>
            <Typography color="initial" sx={styles.description}>
              {description}
            </Typography>
            <Box>
              <EastIcon />
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SettingsCard;
