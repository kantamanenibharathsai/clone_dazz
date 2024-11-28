import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FolderIcon from "@mui/icons-material/Folder";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { colors } from "../../../config/theme";
import {
  deleteMediaData,
  updateMedia,
} from "../../../redux/reducers/adminReducers/librarySlice";
import { useAppDispatch, useAppSelector } from "../../../utils/useRedux";
import { layOutDelete } from "../../common/assets";
import { CustomButton } from "../../common/customButton/CustomButton";
import { InputField } from "../../common/inputField/InputField";
import { ModalStyled } from "../../common/modal/CommonModal";
import { libraryDelete, libraryEdit } from "../assets/Index";
import { screenStyles } from "../screens/ScreenStyles";
import { libraryStyles } from "./LibraryStyles";

interface IProps {
  handleBack: () => void;
}
interface IState {
  cardName: { value: string; error: string };
}
const SingleCard = ({ handleBack }: IProps) => {
  const { selectedMedia } = useAppSelector((state) => state.LibrarySlice);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [cardName, setCardName] = useState<IState["cardName"]>({
    value: selectedMedia!.category,
    error: "",
  });
  const dispatch = useAppDispatch();
  const handleCloseEdit = () => {
    setEditModal(false);
  };
  const handleOpenEdit = () => {
    setEditModal(true);
  };
  const handleOpenDelete = () => {
    setDeleteModal(true);
  };
  const handleCardInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCardName({ ...cardName, value: event.target.value });
  };
  const handleCardblur = () => {
    if (cardName.value.trim()) {
      setCardName({ ...cardName, error: "" });
    } else {
      setCardName({ ...cardName, error: "required" });
    }
  };
  const handleCreateCard = () => {
    if (cardName.value.trim()) {
      setCardName({ value: "", error: "" });
      dispatch(
        updateMedia({ id: selectedMedia!.id, mediaCategory: cardName.value })
      );
      handleCloseEdit();
    } else {
      setCardName({ value: "", error: "required" });
    }
  };
  const handleDelete = () => {
    dispatch(deleteMediaData(selectedMedia!.id));
    handleBack();
    setDeleteModal(false);
  };
  return (
    <Stack>
      <ModalStyled
        open={editModal}
        isbgColor={colors.lightBlack}
        isClose={true}
        handleClose={handleCloseEdit}
      >
        <Stack direction={"column"} gap={5} sx={libraryStyles.modalGroup}>
          <Typography sx={libraryStyles.heading}>
            Edit Media Category
          </Typography>

          <InputField
            inputProps={{
              placeholder: "Group Name",
              sx: libraryStyles.input,
              value: cardName.value,
              onChange: handleCardInput,
              onBlur: handleCardblur,
              helperText: (
                <Typography sx={libraryStyles.errorMsg}>
                  {cardName.error}
                </Typography>
              ),
              error: Boolean(cardName.error),
            }}
          />

          <CustomButton
            sx={libraryStyles.addBtn}
            endIcon={<AddIcon />}
            onClick={() => handleCreateCard()}
          >
            submit
          </CustomButton>
        </Stack>
      </ModalStyled>
      <ModalStyled
        open={deleteModal}
        isClose={false}
        isbgColor={colors.lightBlack}
      >
        <Box sx={screenStyles.modalBox}>
          <Box>
            <Typography sx={screenStyles.deleteAdsText}>Delete File</Typography>
            <Typography sx={screenStyles.areYouText}>
              Are you sure, you want to delete this media?
            </Typography>
          </Box>
          <Box sx={screenStyles.buttonsBox}>
            <CustomButton
              bgcolor={colors.blueChalk}
              textColor={colors.black}
              width={128}
              onClick={() => setDeleteModal(false)}
            >
              Cancel
            </CustomButton>
            <CustomButton
              bgcolor={colors.validate}
              width={158}
              onClick={handleDelete}
              endIcon={
                <Box
                  component={"img"}
                  src={layOutDelete}
                  sx={screenStyles.edit}
                />
              }
            >
              Delete
            </CustomButton>
          </Box>
        </Box>
      </ModalStyled>
      <Stack direction={"row"} gap={2} my={"30px"} flexWrap={"wrap"}>
        <CustomButton
          onClick={() => handleBack()}
          startIcon={<ArrowBackIcon />}
        >
          Back
        </CustomButton>
        <Stack direction={"column"} gap={1}>
          <Stack
            alignItems={"center"}
            direction={"row"}
            gap={1}
            sx={libraryStyles.card}
          >
            <FolderIcon sx={libraryStyles.card.birthdayColor} />
            <Typography title={selectedMedia!.category}>
              {selectedMedia!.category}
            </Typography>
          </Stack>
          <Stack direction={"row"} gap={2} justifyContent={"center"}>
            <IconButton
              sx={libraryStyles.editStyle(colors.lightGreen)}
              onClick={handleOpenEdit}
            >
              <Box component={"img"} src={libraryEdit} />
            </IconButton>
            <IconButton
              sx={libraryStyles.editStyle(colors.validate)}
              onClick={handleOpenDelete}
            >
              <Box component={"img"} src={libraryDelete} />
            </IconButton>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default SingleCard;
