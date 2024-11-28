import AddIcon from "@mui/icons-material/Add";
import { Box, Stack, TextareaAutosize, Typography } from "@mui/material";
import { useState } from "react";
import {
  createNewGroup,
  createNewPlaylist,
  uploadLibraryFiles,
} from "../../../../redux/reducers/adminReducers/addScreenSlice";
import { useAppDispatch } from "../../../../utils/useRedux";
import { CustomButton } from "../../../common/customButton/CustomButton";
import DadzsDropzone from "../../../common/dropZone/DadzDropZone";
import { InputField } from "../../../common/inputField/InputField";
import { addScreenStyles } from "./AddScreenStyles";

interface IProps {
  handleClose: () => void;
}
interface GroupProps {
  handleClose: () => void;
  type: string;
}
interface IState {
  tagsList: string[];
  tag: string;
  timeFields: {
    id: number;
    value: string;
    errorMsg: string;
    placeHolder: string;
  }[];
  mediaFile: File[] | string[];
  mediaError: string;
}
export const AddMedia = ({ handleClose }: IProps) => {
  const dispatch = useAppDispatch();
  const [mediaFile, setMediaFile] = useState<(string | File)[]>([]);
  const [mediaError, setMediaError] = useState<string>("");
  const handleUpload = (file: (string | File)[]) => {
    setMediaFile(file);
    setMediaError("");
  };

  const handleAddMedia = () => {
    if (mediaFile.length > 0) {
      dispatch(uploadLibraryFiles({ files: mediaFile }));
      setMediaFile([]);
      handleClose();
    } else {
      setMediaError("please upload a file");
    }
  };

  return (
    <Stack
      direction={"column"}
      gap={1}
      sx={addScreenStyles.mediaModal.modalBox}
    >
      <Box sx={addScreenStyles.mediaModal.buttonsBox}>
        <Typography sx={addScreenStyles.mediaModal.uploadText}>
          Library
        </Typography>
        <CustomButton sx={addScreenStyles.mediaModal.videoButton}>
          Media
        </CustomButton>
        <CustomButton onClick={() => handleAddMedia()}>Add Media</CustomButton>
      </Box>
      <Box>
        <DadzsDropzone
          uploadFileSetterWithEdit={handleUpload}
          uploadFiles={mediaFile}
          boxStyle={{ sx: { height: "300px" } }}
          helperText={mediaError}
          isAcceptMultiple={true}
        />
      </Box>
    </Stack>
  );
};
export const AddGroup = ({ handleClose, type }: GroupProps) => {
  const [input, setInput] = useState({ value: "", error: "" });
  const [description, setDescription] = useState({ value: "", error: "" });
  const [mediaFile, setMediaFile] = useState<IState["mediaFile"]>([]);
  const [mediaError, setMediaError] = useState<string>("");

  const dispatch = useAppDispatch();
  const handleChange = (value: string, name: string) => {
    if (name === "groupName") {
      setInput({
        value: value,
        error: "",
      });
    } else {
      setDescription({
        value: value,
        error: "",
      });
    }
  };
  const handleBlur = (value: string, name: string) => {
    if (name === "groupName") {
      setInput({
        value: value,
        error: value ? "" : "required",
      });
    } else {
      setDescription({
        value: value,
        error: value ? "" : "required",
      });
    }
  };

  const handleUpload = (file: File[]) => {
    setMediaFile(file);
    setMediaError("");
  };
  const createGroup = async () => {
    const regex = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;
    if (description.value && regex.test(input.value)) {
      if (type === "Group") {
        dispatch(createNewGroup({ groupName: input.value, file: mediaFile }));
        handleClose();
      } else if (type === "Playlist") {
        dispatch(
          createNewPlaylist({ groupName: input.value, description: description.value })
        );
        handleClose();
      }
    } else {
      setInput({
        value: input.value,
        error: !input.value
          ? "required"
          : !regex.test(input.value)
          ? "invalid"
          : "",
      });
      setDescription({
        value: description.value,
        error: description.value ? "" : "required",
      });
    }
  };
  return (
    <Stack
      direction={"column"}
      gap={5}
      sx={addScreenStyles.groupModal.modalGroup}
    >
      <Box sx={addScreenStyles.mediaModal.buttonsBox}>
        <Typography sx={addScreenStyles.mediaModal.uploadText}>
          New {type}
        </Typography>
      </Box>

      <Box sx={addScreenStyles.groupModal.inputContainer}>
        <InputField
          inputProps={{
            placeholder: `${type} Name`,
            name: "groupName",
            value: input.value,
            onChange: (event) =>
              handleChange(event.target.value, event.target.name),
            onBlur: (event) =>
              handleBlur(event.target.value, event.target.name),
            helperText: <Typography height={"25px"}>{input.error}</Typography>,
            error: input.error ? true : false,
            sx: { width: "100%" },
          }}
        />
        <Stack direction={"column"}>
          <TextareaAutosize
            placeholder="Description"
            style={addScreenStyles.groupModal.textArea}
            name={"description"}
            value={description.value}
            onChange={(event) =>
              handleChange(event.target.value, event.target.name)
            }
            onBlur={(event) =>
              handleBlur(event.target.value, event.target.name)
            }
          />
          <Typography sx={addScreenStyles.error}>
            {description.error}
          </Typography>
        </Stack>
        {type !== "Playlist" && (
          <Box sx={{ height: "150px" }}>
            <DadzsDropzone
              uploadFileSetter={(file: File[]) => handleUpload(file)}
              uploadFiles={mediaFile}
              boxStyle={{ sx: { height: "100%" } }}
              helperText={mediaError}
            />
          </Box>
        )}
      </Box>
      <CustomButton
        sx={addScreenStyles.groupModal.addBtn}
        endIcon={<AddIcon />}
        onClick={() => createGroup()}
      >
        Create {type}
      </CustomButton>
    </Stack>
  );
};
