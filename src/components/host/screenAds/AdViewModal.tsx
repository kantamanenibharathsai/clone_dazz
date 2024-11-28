import { Autocomplete, Box, Modal, Stack, TextField } from "@mui/material";
import { colors } from "../../../config/theme";
import { tokenWithUrl } from "../../../utils/utils";
import { styles } from "../hostLayout/HostLayOutStyles";

interface IProps {
  modalOpen: boolean;
  handleModalClose: () => void;
  data: { list: string[]; url: string };
}

const AdViewModal = ({ modalOpen, handleModalClose, data }: IProps) => {
  return (
    <Modal open={modalOpen} onClose={handleModalClose}>
      <Box sx={styles.modalStyle}>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={data.list}
          sx={{ width: { xs: "100%", sm: "75%" } }}
          defaultValue={data.list[0]}
          renderInput={(params) => <TextField {...params} />}
        />
        <Stack
          width="75%"
          maxHeight={"50vh"}
          mt={4}
          alignItems={"center"}
          justifyContent={"center"}
          borderRadius={"30px"}
          bgcolor={colors.white}
          boxSizing={"border-box"}
          py={2}
          px={1}
        >
          {!data.url.endsWith(".mp4") ? (
            <Box
              component={"img"}
              width={"100%"}
              borderRadius={"30px"}
              maxHeight={"350px"}
              onClick={(event) => event.stopPropagation()}
              src={tokenWithUrl(data.url)}
            />
          ) : (
            <video
              src={tokenWithUrl(data.url as string)}
              width={"80%"}
              controls
              autoPlay
            ></video>
          )}
        </Stack>
      </Box>
    </Modal>
  );
};

export default AdViewModal;
