import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { translate } from "../../../config/i18n";
import { useAppSelector } from "../../../utils/useRedux";
import DadzDropzone from "../../common/dropZone/DadzDropZone";
import { addNewCampaign, mediaByGenre } from "./CommonStyles";

interface UploadFilesProps {
  uploadFileSetter: (file: (File | string)[]) => void;
  helperText: string;
}

const UploadFiles = ({ uploadFileSetter, helperText }: UploadFilesProps) => {
  const { form, loading } = useAppSelector((state) => state.Campaign);
  return (
    <Stack minHeight={"inherit"} gap={2}>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Typography variant="h5" sx={{ ...addNewCampaign.title, mb: 0 }}>
          {translate("userFlow.upload")}
        </Typography>
      </Stack>
      <Box textAlign={"center"}>
        {loading && <CircularProgress size={"25px"} />}
      </Box>
      {!loading && (
        <>
          <Typography sx={mediaByGenre.helperTxt}>{helperText}</Typography>
          <Box>
            <DadzDropzone
              uploadFileSetterWithEdit={uploadFileSetter}
              uploadFiles={form.uploadedMedia}
              boxStyle={{ sx: { height: "300px" } }}
              isAcceptMultiple
            />
          </Box>
        </>
      )}
    </Stack>
  );
};

export default UploadFiles;
