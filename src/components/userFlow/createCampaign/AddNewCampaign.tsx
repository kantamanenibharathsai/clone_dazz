import { Box, Typography } from "@mui/material";
import { ChangeEvent } from "react";
import { translate } from "../../../config/i18n";
import { useAppSelector } from "../../../utils/useRedux";
import { InputField } from "../../common/inputField/InputField";
import { addNewCampaign } from "./CommonStyles";
interface AddNewCampaignIProps {
  handleOnChange: (event: ChangeEvent<HTMLInputElement>) => void;
  helperText: string;
}
const AddNewCampaign = ({
  handleOnChange,
  helperText,
}: AddNewCampaignIProps) => {
  const { form } = useAppSelector((state) => state.Campaign);
  return (
    <Box>
      <Typography variant="h5" sx={addNewCampaign.title}>
        {translate("userFlow.addNew")}
      </Typography>
      <InputField
        fieldName="Campaign Name"
        textProps={{ sx: addNewCampaign.campaignTextField }}
        inputProps={{
          placeholder: "Jacob",
          fullWidth: true,
          name: "campaignName",
          error: Boolean(helperText),
          helperText: helperText,
          value: form.campaignName,
          onChange: handleOnChange,
          sx: {
            maxWidth: { xs: "initial", md: 422 },
          },
          autoFocus: true,
        }}
      />
    </Box>
  );
};

export default AddNewCampaign;
