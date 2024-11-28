import {
  Box,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import { ChangeEvent } from "react";
import { translate } from "../../../config/i18n";
import { colors } from "../../../config/theme";
import { useAppSelector } from "../../../utils/useRedux";
import { blockInvalidChar } from "../../../utils/utils";
import { InputField } from "../../common/inputField/InputField";
import {
  addNewCampaign,
  mediaByGenre,
  pricingModelStyles,
} from "./CommonStyles";

interface PricingModelIProps {
  handlePricingModel: (event: SelectChangeEvent) => void;
  handleAdType: (event: SelectChangeEvent) => void;
  handleSpots: (event: ChangeEvent<HTMLInputElement>) => void;
  handlePrice: (event: ChangeEvent<HTMLInputElement>) => void;
  spotsErrorTxt: string;
  cpmErrorTxt: string;
  adTypeIdErrorTxt: string;
  priceErrorTxt: string;
}

const PricingModel = ({
  handlePricingModel,
  handleAdType,
  handleSpots,
  handlePrice,
  spotsErrorTxt,
  cpmErrorTxt,
  adTypeIdErrorTxt,
  priceErrorTxt,
}: PricingModelIProps) => {
  const { optionsErrorMsg, pricingModelOptions, adTypeOptions, form } =
    useAppSelector((state) => state.Campaign);
  const renderSuitableView = () => {
    switch (form.pricingModelId) {
      case "3":
        return (
          <>
            <Typography sx={addNewCampaign.campaignTextField}>
              {translate("userFlow.adType")}
            </Typography>
            <FormControl fullWidth>
              <Select
                onChange={handleAdType}
                sx={pricingModelStyles.selectField}
                fullWidth
                value={form.adTypeId}
                name="adTypeId"
              >
                {adTypeOptions.map((item) => (
                  <MenuItem
                    value={item.id.toString()}
                    key={item.id}
                    color={colors.grey}
                  >
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
              <Typography sx={pricingModelStyles.adTypeErrorTxt}>
                {adTypeIdErrorTxt}
              </Typography>
            </FormControl>
          </>
        );
      case "4":
        return (
          <InputField
            fieldName={translate("userFlow.howMuchCPM")}
            textProps={{ sx: addNewCampaign.campaignTextField }}
            inputProps={{
              fullWidth: true,
              helperText: cpmErrorTxt,
              type: "number",
              sx: {
                "& .MuiFormHelperText-root": {
                  color: cpmErrorTxt?.toLowerCase().includes("please")
                    ? colors.black
                    : colors.validate,
                },
              },
              value: form.CPM,
              name: "CPM",
              onChange: handleSpots,
              onKeyDown: blockInvalidChar,
              autoFocus: true,
            }}
          />
        );
      case "5":
        return (
          <InputField
            fieldName={translate("userFlow.howMuchPrice")}
            textProps={{ sx: addNewCampaign.campaignTextField }}
            inputProps={{
              fullWidth: true,
              helperText: priceErrorTxt,
              type: "number",
              sx: {
                "& .MuiFormHelperText-root": {
                  color: priceErrorTxt?.toLowerCase().includes("please")
                    ? colors.black
                    : colors.validate,
                },
              },
              value: form.price,
              name: "price",
              onChange: handlePrice,
              onKeyDown: blockInvalidChar,
              autoFocus: true,
            }}
          />
        );
      default:
        return (
          <InputField
            fieldName={translate("userFlow.howManySpots")}
            textProps={{ sx: addNewCampaign.campaignTextField }}
            inputProps={{
              fullWidth: true,
              helperText: spotsErrorTxt,
              type: "number",
              sx: {
                "& .MuiFormHelperText-root": {
                  color: spotsErrorTxt?.toLowerCase().includes("please")
                    ? colors.black
                    : colors.validate,
                },
              },
              value: form.numberOfSpots,
              name: "numberOfSpots",
              onChange: handleSpots,
              onKeyDown: blockInvalidChar,
              autoFocus: true,
            }}
          />
        );
    }
  };

  return (
    <Box>
      <Typography variant="h5" sx={addNewCampaign.title}>
        {translate("userFlow.pricingModel")}
      </Typography>
      {optionsErrorMsg ? (
        <Typography sx={mediaByGenre.errorTxt}>{optionsErrorMsg}</Typography>
      ) : (
        <Stack
          direction={"row"}
          flexWrap={"wrap"}
          gap={{ xs: 1, sm: 2, md: 3, lg: 4 }}
        >
          <Box flexGrow={{ xs: 1, lg: 0.5 }}>
            <Typography sx={addNewCampaign.campaignTextField}>
              {translate("userFlow.pricingModel")}
            </Typography>
            <FormControl fullWidth>
              <Select
                onChange={handlePricingModel}
                sx={pricingModelStyles.selectField}
                fullWidth
                value={form.pricingModelId}
                name="pricingModelId"
              >
                {pricingModelOptions.map((item) => (
                  <MenuItem
                    key={item.id}
                    value={item.id.toString()}
                    color={colors.grey}
                  >
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box flexGrow={{ xs: 1, lg: 0.5 }}>{renderSuitableView()}</Box>
        </Stack>
      )}
    </Box>
  );
};

export default PricingModel;
