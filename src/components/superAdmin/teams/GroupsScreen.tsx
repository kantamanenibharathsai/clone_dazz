import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { Box, Card, CircularProgress, Typography } from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import { colors, hex2rgba } from "../../../config/theme";
import {
  addNewGroup,
  deleteGroup,
  getAllGroups,
  getGroupMembers,
  updateGroup,
  updateSelectedGroupId,
} from "../../../redux/reducers/superAdmin/teamsSlice";
import { useAppDispatch, useAppSelector } from "../../../utils/useRedux";
import { useRoutePermissions } from "../../../utils/useRoutePermissions";
import { tokenWithUrl } from "../../../utils/utils";
import DadzDropzone from "../../common/dropZone/DadzDropZone";
import { InputField } from "../../common/inputField/InputField";
import MediaCard from "../../common/mediaCard/MediaCard";
import { ModalStyled } from "../../common/modal/CommonModal";
import { CustomButton } from "./../../common/customButton/CustomButton";
import { layOutStyles, teamStyles } from "./TeamStyles";

interface IState {
  displayGroup: {
    groupName: string;
    image: File | string;
    mode: "EDIT" | "ADD" | "" | "DELETE";
    activeId: number | null;
  };
  errors: {
    errorMessage: string;
    inputErrorTxt: string;
  };
}
const GroupsScreen = () => {
  const {
    groupErrorMessage,
    groups,
    loading,
    selectedGroupId,
  } = useAppSelector((state) => state.TeamsSlice);
  const [displayGroup, setDisplayGroup] = useState<IState["displayGroup"]>({
    activeId: selectedGroupId,
    groupName: "",
    image: "",
    mode: "",
  });
  const [errors, setErrors] = useState<IState["errors"]>({
    errorMessage: "",
    inputErrorTxt: "",
  });
  const dispatch = useAppDispatch();
  const permission = useRoutePermissions();
  const handleGroupName = (event: React.ChangeEvent<HTMLInputElement>) => {
    let validInput = /^(?:(?!.*\s{2,})[a-zA-Z][a-zA-Z ]*)?$/;
    let value = event.target.value;
    if (validInput.test(value))
      setDisplayGroup((previous) => ({ ...previous, groupName: value }));
  };
  const handleUploadImage = (file: File) => {
    setDisplayGroup((previous) => ({ ...previous, image: file }));
  };

  const handleCloseModal = () => {
    setDisplayGroup((prev) => ({
      ...prev,
      groupName: "",
      image: "",
      mode: "",
    }));
    setErrors({ errorMessage: "", inputErrorTxt: "" });
  };

  const handleOpenModal = (mode: IState["displayGroup"]["mode"]) => {
    setTimeout(() => {
      setDisplayGroup((previous) => ({ ...previous, mode: mode }));
    }, 10);

    if (mode === "EDIT") {
      const findEditItem = groups.find(
        (item) => item.id === displayGroup.activeId
      );
      setDisplayGroup((previous) => ({
        ...previous,
        groupName: findEditItem!.groupName,
        image: findEditItem!.image,
      }));
    }
  };

  const handleConfirmDeleteGroup = async () => {
    await dispatch(deleteGroup(displayGroup.activeId as number));
    handleGetAllTheGroups();
  };

  const handleGetAllTheGroups = () => {
    dispatch(getAllGroups());
    handleCloseModal();
  };

  const handleValidation = () => {
    let bool = false;
    setErrors((previous) => ({
      ...previous,
      errorMessage: "",
      inputErrorTxt: "",
    }));
    if (!displayGroup.image) {
      setErrors((previous) => ({
        ...previous,
        errorMessage: "Please Upload Image",
      }));
      bool = true;
    }
    if (displayGroup.groupName.length < 2) {
      setErrors((previous) => ({
        ...previous,
        inputErrorTxt: "Minimum three letters should be present",
      }));
      bool = true;
    }
    return bool;
  };

  const handleSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (handleValidation()) return;
    const copyGroupData = { ...displayGroup };
    if (copyGroupData.mode === "ADD") {
      await dispatch(
        addNewGroup({
          groupName: displayGroup.groupName,
          image: displayGroup.image as File,
        })
      );
    } else if (copyGroupData.mode === "EDIT") {
      await dispatch(
        updateGroup({
          groupName: displayGroup.groupName,
          id: displayGroup.activeId as number,
          image: displayGroup.image as File,
        })
      );
    }
    handleGetAllTheGroups();
  };
  const handleCardClicked = (groupId: number) => {
    const id = groupId === displayGroup.activeId ? null : groupId;
    setDisplayGroup((previous) => ({ ...previous, activeId: id }));
    dispatch(updateSelectedGroupId(id));
    dispatch(
      getGroupMembers({
        groupId: groupId.toString(),
        page: "1",
        pageSize: "10",
      })
    );
  };

  const handleButtonTxt = () => {
    return displayGroup.mode === "EDIT" ? "Update" : "Add New";
  };
  const selectedGroupName = groups.filter(
    (group) => group.id === displayGroup.activeId
  )[0]?.groupName;
  useEffect(() => {
    dispatch(getAllGroups());
  }, [dispatch]);
  return (
    <>
      <ModalStyled
        open={displayGroup.mode === "DELETE"}
        isClose={false}
        isbgColor={colors.lightBlack}
        onClose={handleCloseModal}
      >
        <Box sx={layOutStyles.modalBox}>
          <Box>
            <Typography sx={layOutStyles.deleteAdsText}>
              Delete Group
            </Typography>
            <Typography sx={layOutStyles.areYouText}>
              Are You Sure, You Want To Delete Group?
            </Typography>
          </Box>
          <Box sx={layOutStyles.buttonsBox}>
            <CustomButton
              bgcolor={colors.blueChalk}
              textColor={colors.black}
              width={128}
              onClick={handleCloseModal}
            >
              Cancel
            </CustomButton>
            <CustomButton
              bgcolor={colors.validate}
              width={158}
              onClick={handleConfirmDeleteGroup}
            >
              Delete
            </CustomButton>
          </Box>
        </Box>
      </ModalStyled>
      <Card sx={teamStyles.groupScreenMainContainer}>
        <Box sx={teamStyles.groupScreenSubContainer}>
          <Typography variant="body1" sx={teamStyles.subTitle}>
            Groups
          </Typography>
          {permission.create && (
            <CustomButton
              outlined
              width={"124px"}
              endIcon={<AddRoundedIcon sx={teamStyles.addRoundedIcon} />}
              sx={teamStyles.groupScreenButton}
              onClick={() => handleOpenModal("ADD")}
            >
              Add New
            </CustomButton>
          )}
        </Box>
        <Box textAlign={"center"}>
          {loading && <CircularProgress size={"25px"} />}
          {!loading && groupErrorMessage && (
            <Typography variant="h6" fontSize={14} color={colors.validate}>
              {groupErrorMessage}
            </Typography>
          )}
          {!loading && (
            <Typography height={16} fontSize={14}>
              {displayGroup.activeId && (
                <Typography
                  component={"span"}
                  color={hex2rgba(colors.black, 0.7)}
                >
                  You selected{" "}
                  <Typography component={"u"}>{selectedGroupName}</Typography>{" "}
                  group
                </Typography>
              )}
            </Typography>
          )}
        </Box>
        {!loading && !groupErrorMessage && (
          <Box sx={teamStyles.superGrid}>
            {groups.map((card) => (
              <Box
                minWidth={200}
                key={card.id}
                onClick={() => handleCardClicked(card.id)}
              >
                <MediaCard
                  clickable={displayGroup.activeId === card.id}
                  genreImg={tokenWithUrl(card.image)}
                  genreText={card.groupName}
                  onDelete={
                    permission.delete
                      ? () => handleOpenModal("DELETE")
                      : undefined
                  }
                  onEdit={
                    permission.edit ? () => handleOpenModal("EDIT") : undefined
                  }
                />
              </Box>
            ))}
          </Box>
        )}
        <ModalStyled
          onClose={handleCloseModal}
          open={displayGroup.mode === "ADD" || displayGroup.mode === "EDIT"}
          isbgColor={colors.layoutBlack}
        >
          <Box
            sx={teamStyles.categoryModal}
            component={"form"}
            onSubmit={handleSubmitForm}
          >
            <Typography sx={teamStyles.modalTitleText}>
              {displayGroup.mode === "EDIT" ? "Edit Group" : "Add New Group"}
            </Typography>
            <DadzDropzone
              uploadFiles={
                displayGroup.image ? [displayGroup.image as string] : []
              }
              uploadFileSetter={(files) =>
                handleUploadImage(files[files.length - 1])
              }
              boxStyle={{ height: "187px !important" }}
              imgStyle={{ height: 58, width: 58 }}
              helperText={errors.errorMessage}
            />
            <InputField
              inputProps={{
                placeholder: "Group Name",
                onChange: handleGroupName,
                value: displayGroup.groupName,
                fullWidth: true,
                sx: teamStyles.inputText,
                autoFocus: true,
                helperText: errors.inputErrorTxt,
                error: Boolean(errors.inputErrorTxt),
                spellCheck: true,
                autoCorrect: "on",
              }}
            />
            <CustomButton
              bgcolor={colors.primary}
              sx={teamStyles.updateButtonGroup}
              type="submit"
            >
              {loading ? (
                <CircularProgress size={"20px"} color="warning" />
              ) : (
                handleButtonTxt()
              )}
            </CustomButton>
          </Box>
        </ModalStyled>
      </Card>
    </>
  );
};

export default GroupsScreen;
