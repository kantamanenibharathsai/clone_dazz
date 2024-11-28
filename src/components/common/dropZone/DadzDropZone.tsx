import { Add, Close } from "@mui/icons-material";
import {
  Box,
  BoxProps,
  Chip,
  IconButton,
  Stack,
  SxProps,
  Typography,
} from "@mui/material";
import {
  ChangeEvent,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDropzone } from "react-dropzone";
import { translate } from "../../../config/i18n";
import { colors, hex2rgba } from "../../../config/theme";
import { displayAlert } from "../../../utils/toastMessage";
import { tokenWithUrl } from "../../../utils/utils";
import { cloudForDropZone } from "../assets";
import { DropZoneDiv, styles } from "./Styles";
interface IProps {
  uploadFileSetter?: (file: File[]) => void;
  uploadFileSetterWithEdit?: (file: (File | string)[]) => void;
  uploadFiles: (File | string)[];
  isAcceptMultiple?: boolean;
  boxStyle?: BoxProps;
  imgStyle?: SxProps;
  helperText?: string;
  readonly?: boolean;
}
interface IState {
  borderColor: string;
}

const DadzDropzone = ({
  uploadFileSetter,
  uploadFiles,
  uploadFileSetterWithEdit,
  isAcceptMultiple = false,
  boxStyle,
  imgStyle,
  helperText,
  readonly,
}: IProps) => {
  const [borderColor, setBorderColor] = useState<IState["borderColor"]>(
    hex2rgba(colors.black, 0.3)
  );
  const [activeImage, setActiveImage] = useState<string | File | null>(
    uploadFiles.length > 0 ? uploadFiles[0] : null
  );
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handlePause = () => {
    videoRef.current && videoRef.current.pause();
  };

  const handlePlay = () => {
    videoRef?.current?.play();
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      ["image/png", "image/jpg", "image/png", "video/mp4"].includes(
        acceptedFiles[0].type
      );
      if (uploadFileSetterWithEdit) {
        uploadFileSetterWithEdit([...acceptedFiles, ...uploadFiles]);
      } else if (uploadFileSetter) {
        uploadFileSetter([...acceptedFiles]);
      }
      setActiveImage(acceptedFiles[0]);
    },
    [uploadFileSetter] //eslint-disable-line
  );
  const onDragEnter = () => setBorderColor(colors.primary);
  const onDragLeave = () => setBorderColor(hex2rgba(colors.black, 0.3));
  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    onDrop,
    onDragEnter,
    onDragLeave,
    onDropAccepted: onDragLeave,
    onDropRejected: onDragLeave,
    multiple: isAcceptMultiple,
    accept: {
      "image/jpeg": [],
      "image/jpg": [],
      "image/png": [],
      "video/mp4": [],
    },
  });
  useEffect(() => {
    if (uploadFiles.length > 0) {
      setActiveImage(uploadFiles[0]);
    } else {
      setActiveImage(null);
    }
  }, [uploadFiles]);
  useEffect(() => {
    if (fileRejections.length > 0) {
      displayAlert(fileRejections[0].errors[0].message, "error");
    }
  }, [fileRejections]);
  const handleDelete = (each: string | File) => {
    if (each === activeImage) {
      clickHandlerMainImage();
      return;
    }
    const updatedFiles = uploadFiles.filter((item) => item !== each);
    if (uploadFileSetterWithEdit) uploadFileSetterWithEdit(updatedFiles);
  };
  const clickHandlerMainImage = () => {
    const updatedFiles = uploadFiles.filter((each) => each !== activeImage);
    if (updatedFiles.length === 0) {
      setActiveImage(null);
    } else {
      setActiveImage(updatedFiles[0]);
    }
    if (uploadFileSetterWithEdit) {
      uploadFileSetterWithEdit(updatedFiles);
    } else if (uploadFileSetter) uploadFileSetter([]);
  };
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    let allFiles = [];
    for (let i = 0; i < event.target.files?.length!; i++) {
      allFiles.push(event.target.files![i]);
    }
    if (uploadFileSetterWithEdit)
      uploadFileSetterWithEdit([...uploadFiles, ...allFiles]);
  };
  return (
    <Box>
      <DropZoneDiv
        {...getRootProps()}
        {...boxStyle}
        border={`2px dotted ${borderColor}`}
      >
        <Box component={"input"} {...getInputProps()} />
        {activeImage === null ? (
          <>
            {" "}
            <Box
              component={"img"}
              src={cloudForDropZone}
              sx={{ ...styles.defaultImageSize, ...imgStyle }}
            />
            <Typography sx={styles.fileExtension}>
              {translate("common.browseFiles")}
            </Typography>
          </>
        ) : (
          <>
            {typeof activeImage === "string" &&
              (!activeImage.endsWith(".mp4") ? (
                <Box
                  component={"img"}
                  width={"100%"}
                  height={"100%"}
                  onClick={(event) => event.stopPropagation()}
                  src={tokenWithUrl(activeImage)}
                />
              ) : (
                <Box
                  component={"video"}
                  ref={videoRef}
                  src={tokenWithUrl(activeImage)}
                  width={"100%"}
                  controls
                  onPlay={handlePlay}
                  onPause={handlePause}
                  autoPlay
                />
              ))}
            {typeof activeImage !== "string" &&
              (!activeImage.type.includes("video") ? (
                <Box
                  component={"img"}
                  width={"100%"}
                  height={"100%"}
                  onClick={(event) => event.stopPropagation()}
                  src={URL.createObjectURL(activeImage)}
                />
              ) : (
                <Box
                  width={"100%"}
                  height={"100%"}
                  component={"video"}
                  ref={videoRef}
                  src={URL.createObjectURL(activeImage)}
                  controls
                  onPlay={handlePlay}
                  onPause={handlePause}
                  autoPlay
                />
              ))}
            {readonly !== true && (
              <IconButton
                disableFocusRipple
                disableRipple
                disableTouchRipple
                size="small"
                sx={{
                  ...styles.removeBtn,
                  visibility: uploadFiles.length ? "visible" : "hidden",
                }}
                onClick={(event) => {
                  event.stopPropagation();
                  clickHandlerMainImage();
                }}
              >
                <Close fontSize="small" />
              </IconButton>
            )}
          </>
        )}
      </DropZoneDiv>
      <Typography sx={styles.validationText}>{helperText}</Typography>
      {isAcceptMultiple && (
        <Stack direction={"row"} spacing={1} flexWrap={"wrap"} rowGap={1}>
          {uploadFiles.length > 1 &&
            uploadFiles.map((each, index) =>
              typeof each === "string" ? (
                <Chip
                  key={index + "file"}
                  label={each.split("/").pop()?.slice(0, 20)}
                  onClick={() => setActiveImage(each)}
                  color={activeImage === each ? "success" : "info"}
                  onDelete={
                    readonly === true ? undefined : () => handleDelete(each)
                  }
                />
              ) : (
                <Chip
                  key={index + "file"}
                  label={each.name.slice(0, 15)}
                  onClick={() => setActiveImage(each)}
                  color={activeImage === each ? "success" : "info"}
                  onDelete={
                    readonly === true ? undefined : () => handleDelete(each)
                  }
                />
              )
            )}
          {isAcceptMultiple && uploadFiles.length > 0 && (
            <>
              <Box
                multiple
                component={"input"}
                type="file"
                id="add-file"
                display={"none"}
                accept="image/png, image/jpg, image/png, video/mp4"
                onChange={handleFileUpload}
              />
              <Box
                component={"label"}
                htmlFor="add-file"
                sx={{ cursor: "pointer" }}
              >
                <Chip
                  label="Add New"
                  color="primary"
                  deleteIcon={<Add fontSize="small" />}
                  onDelete={() => {}}
                />
              </Box>
            </>
          )}
        </Stack>
      )}
    </Box>
  );
};
export default memo(DadzDropzone);
