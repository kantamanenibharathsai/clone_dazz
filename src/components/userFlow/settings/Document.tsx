import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton, Stack, Typography } from "@mui/material";
import { Navigate, useParams } from "react-router-dom";
import { colors } from "../../../config/theme";
import { navigation } from "../../../utils/navigation";
import HtmlParser, {
  HtmlParserTitles,
} from "../../common/htmlParser/HtmlParser";
import { settingsStyles } from "./SettingsStyles";

const renderSuitableTitle = {
  "about-us": "About Us",
  "privacy-policy": "Privacy Policy",
  "terms-and-conditions": "Terms & Conditions",
  "agreement-document": "Agreement Document",
};

const Document = () => {
  const path = useParams().requiredDocument;
  const handleGoBack = () => {
    navigation.navigate(-1);
  };
  const defaultStyle = {
    sx: {
      maxWidth: "initial",
    },
  };
  const key = path as keyof typeof renderSuitableTitle;
  if (!renderSuitableTitle[key]) {
    return <Navigate to={"*"} replace={true} relative="path" />;
  }
  const title = renderSuitableTitle[key] as HtmlParserTitles;
  return (
    <>
      <Stack sx={settingsStyles.backBtnWrapper}>
        <IconButton sx={settingsStyles.iconContainer} onClick={handleGoBack}>
          <ArrowBackIcon />
        </IconButton>
        <Typography color={colors.white} variant="h5">
          Settings
        </Typography>
      </Stack>
      <HtmlParser title={title} container={defaultStyle} />
    </>
  );
};

export default Document;
