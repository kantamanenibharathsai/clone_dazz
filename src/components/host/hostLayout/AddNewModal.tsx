import { KeyboardArrowDown } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Checkbox,
  Chip,
  Modal,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { colors } from "../../../config/theme";
import {
  addMediaToScreen,
  getScreensHostData,
} from "../../../redux/reducers/hostReducers/ScreenSlice";
import { displayAlert } from "../../../utils/toastMessage";
import { useAppDispatch, useAppSelector } from "../../../utils/useRedux";
import { CustomButton } from "../../common/customButton/CustomButton";
import DadzsDropzone from "../../common/dropZone/DadzDropZone";
import { InputField } from "../../common/inputField/InputField";
import { styles } from "./HostLayOutStyles";
interface IProps {
  modalOpen: boolean;
  handleModalClose: () => void;
}
interface KKScreens {
  id: number;
  screenName: string;
}
let timerId: NodeJS.Timeout;
const AddMediaModal = ({ modalOpen, handleModalClose }: IProps) => {
  const [splitScreen, setSplitScreen] = useState(false);
  const dispatch = useAppDispatch();
  const handleSlipScreen = (event: ChangeEvent<HTMLInputElement>) => {
    setSplitScreen(event.target.checked);
  };
  const [screenIds, setScreenIds] = useState<KKScreens[]>([]);
  const [kkScreenText, setKkScreenText] = useState<string>("");
  const [mediaFile, setMediaFile] = useState<File[]>([]);

  const { screenData, pagination, allApiStatus } = useAppSelector(
    (state) => state.hostScreenSlice
  );

  useEffect(() => {
    dispatch(getScreensHostData({ page: 1, searchInput: "" }));
  }, []); //eslint-disable-line
  useEffect(() => {
    if (allApiStatus.uploadMedia === "SUCCESS") {
      handleModalClose();
      setScreenIds([]);
      setKkScreenText("");
      setMediaFile([]);
      setSplitScreen(false);
    }
  }, [allApiStatus.uploadMedia]); //eslint-disable-line

  const handleSendApproval = async () => {
    if (screenIds.length === 0) displayAlert("Please Select Screens", "error");
    else if (mediaFile.length === 0)
      displayAlert(
        `Please Upload ${splitScreen ? "Widget" : "Media"}`,
        "error"
      );
    else if (splitScreen && mediaFile[0].type.includes("video"))
      displayAlert("Cannot Accept Video As Widget", "error");
    else {
      dispatch(
        addMediaToScreen({
          screenIds: screenIds.map((each) => each.id),
          files: mediaFile[0],
          isWidget: splitScreen,
        })
      );
    }
  };
  const handleScreenIds = (values: KKScreens[]) => {
    setScreenIds(values);
  };
  const autoCompleteTextChangeHandler = (value: string) => {
    clearInterval(timerId);
    setKkScreenText(value);
    timerId = setTimeout(() => {
      dispatch(getScreensHostData({ page: 1, searchInput: value }));
    }, 500);
  };

  const getScreensField = () => {
    return (
      <Box width={{ xs: "100%", sm: "75%" }}>
        <Typography mb={0.5} color={colors.white}>
          Choose Screens
        </Typography>
        <Autocomplete
          fullWidth
          multiple
          value={screenIds}
          onChange={(_event, value) => {
            handleScreenIds(value);
          }}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          inputValue={kkScreenText}
          onInputChange={(_event: React.SyntheticEvent, value) => {
            autoCompleteTextChangeHandler(value);
          }}
          limitTags={2}
          popupIcon={<KeyboardArrowDown />}
          id="asynchronous-demo"
          ListboxProps={{
            sx: { maxHeight: "200px" },
            onScroll: (event: React.UIEvent<HTMLElement>) => {
              if (
                event.currentTarget.scrollHeight -
                  event.currentTarget.scrollTop ===
                event.currentTarget.clientHeight
              ) {
                if (pagination.totalPages > pagination.currentPage) {
                  dispatch(
                    getScreensHostData({
                      page: pagination.currentPage + 1,
                    })
                  );
                }
              }
            },
          }}
          getOptionLabel={(option) => option.screenName}
          options={screenData}
          renderTags={(values) => (
            <Box>
              <Chip label={values[values.length - 1].screenName} />
              {values.length > 1 && `+${values.length - 1} more`}
            </Box>
          )}
          renderInput={(params) => (
            <InputField
              inputProps={{
                placeholder: screenIds.length === 0 ? "Select Screens" : "",

                ...params,
                InputProps: {
                  ...params.InputProps,
                  fullWidth: true,
                },
              }}
            />
          )}
          disableCloseOnSelect
          renderOption={(props, option, { selected }) => {
            const withoutKey = Object.create({});
            for (let key in props) {
              if (key !== "key") {
                withoutKey[key] = props[key as keyof typeof props];
              }
            }
            return (
              <li key={option.id} {...withoutKey}>
                <Checkbox style={{ marginRight: 8 }} checked={selected} />
                {option.screenName}
              </li>
            );
          }}
        />
      </Box>
    );
  };

  return (
    <Modal open={modalOpen} onClose={handleModalClose}>
      <Box sx={styles.modalStyle}>
        <Box sx={styles.modalBox}>
          <Box sx={styles.buttonsBox}>
            <Typography sx={styles.uploadText}>Upload</Typography>
            <CustomButton
              onClick={handleSendApproval}
              disabled={allApiStatus.uploadMedia === "PENDING"}
            >
              Send Approval{" "}
            </CustomButton>
          </Box>
          <Box sx={styles.checkBoxMain}>
            <Checkbox onChange={handleSlipScreen} value={splitScreen} />
            <Typography sx={styles.splitText}>Widget</Typography>
          </Box>
          <Box sx={styles.autoCompleteBox}>{getScreensField()}</Box>
          <DadzsDropzone
            uploadFileSetter={setMediaFile}
            uploadFiles={mediaFile}
            boxStyle={!splitScreen ? styles.firstDropBox : styles.secondDropBox}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default React.memo(AddMediaModal);
