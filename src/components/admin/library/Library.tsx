import AddIcon from "@mui/icons-material/Add";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FolderIcon from "@mui/icons-material/Folder";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import {
  Box,
  Button,
  IconButton,
  ListItemText,
  Pagination,
  PaginationItem,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { libraryDelete, libraryEdit } from "../../admin/assets/Index";
import { CustomButton } from "../../common/customButton/CustomButton";
import DadzsDropzone from "../../common/dropZone/DadzDropZone";

import { colors, hex2rgba } from "../../../config/theme";
import {
  clearSelectedMedia,
  deleteMediaFile,
  getMediaData,
  getMediaFiles,
  getSingleMedia,
  handlePage,
  handleTabs,
  updateMediaFiles,
  uploadMedia,
  uploadMediaFiles,
} from "../../../redux/reducers/adminReducers/librarySlice";
import { useAppDispatch, useAppSelector } from "../../../utils/useRedux";
import { useRoutePermissions } from "../../../utils/useRoutePermissions";
import { handleCardLayoutPlaceHolder } from "../../../utils/utils";
import { libraryStyles } from "../../admin/library/LibraryStyles";
import SingleCard from "../../admin/library/SingleCard";
import { layOutDelete } from "../../common/assets";
import { InputField } from "../../common/inputField/InputField";
import { ModalStyled } from "../../common/modal/CommonModal";
import { screenStyles } from "../screens/ScreenStyles";

const tabs = ["ALL", "Video", "Photo"];

interface IState {
  tabNumber: number;
  cardModal: boolean;
  mediaModal: boolean;
  cardName: { value: string; error: string };
  mediaFile: (string | File)[];
  mediaError: string;
  deleteModal: boolean;
  deleteType: { type: string; id: number };
}
const Library = () => {
  const [editModal, setEditModal] = useState(false);
  const [editFile, setEditFile] = useState({ id: 0, mediaId: 0 });
  const permissions = useRoutePermissions();
  const [tabNumber, setTabNumber] = useState<number>(0);
  const [cardModal, setCardModal] = useState<boolean>(false);
  const [mediaModal, setMediaModal] = useState<boolean>(false);
  const [cardName, setCardName] = useState<IState["cardName"]>({
    value: "",
    error: "",
  });
  const [mediaFile, setMediaFile] = useState<IState["mediaFile"]>([]);
  const [mediaError, setMediaError] = useState<string>("");
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [deleteType, setDeleteType] = useState<IState["deleteType"]>({
    type: "",
    id: 0,
  });
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const dispatch = useAppDispatch();
  const {
    mediaData,
    mediaFiles,
    pagination,
    currentPage,
    message,
    selectedMedia,
    mediaMessage,
  } = useAppSelector((state) => state.LibrarySlice);
  const { token } = useAppSelector((state) => state.Auth);

  const handleUpload = (file: (string | File)[]) => {
    setMediaFile(file);
    setMediaError("");
  };
  const handleEditUpload = (file: File[]) => {
    setMediaFile(file);
    setMediaError("");
  };
  const handleSetTab = (tabNum: number) => {
    setTabNumber(tabNum);
    switch (tabNum) {
      case 0:
        dispatch(handleTabs(""));
        dispatch(getMediaFiles({ id: selectedMedia?.id, page: currentPage }));
        break;
      case 1:
        dispatch(handleTabs("video"));
        dispatch(
          getMediaFiles({
            id: selectedMedia?.id,
            type: "video",
            page: currentPage,
          })
        );
        break;
      case 2:
        dispatch(handleTabs("image"));
        dispatch(
          getMediaFiles({
            id: selectedMedia?.id,
            type: "image",
            page: currentPage,
          })
        );
        break;
    }
  };
  const handleCloseCategory = () => {
    setCardName({ value: "", error: "" });
    setCardModal(false);
  };
  const handleOpenCategory = () => {
    setCardModal(true);
  };
  const handleCloseMedia = () => {
    setCardName({ value: "", error: "" });
    setMediaError("");
    setMediaFile([]);
    setMediaModal(false);
  };
  const handleOpenMedia = () => {
    setMediaModal(true);
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
      dispatch(uploadMedia(cardName.value));
      setCardName({ value: "", error: "" });
      handleCloseCategory();
    } else {
      setCardName({ value: "", error: "required" });
    }
  };

  const handleAddMedia = () => {
    if (mediaFile.length < 1) {
      setMediaError("required");
    } else {
      dispatch(
        uploadMediaFiles({
          files: mediaFile,
        })
      );
      handleCloseMedia();
    }
  };
  const handlePagination = (newPage: number) => {
    dispatch(handlePage(newPage));
    selectedMedia && selectedMedia!.id
      ? dispatch(getMediaFiles({ page: newPage, id: selectedMedia.id }))
      : dispatch(getMediaFiles({ page: newPage }));
  };
  const handleDeleteModal = (type: string, id: number) => {
    setDeleteModal(true);
    setDeleteType({ type: type, id: id });
  };
  const handleDelete = () => {
    dispatch(deleteMediaFile(deleteType.id));
    setDeleteModal(false);
    setDeleteType({ type: "", id: 0 });
  };
  const handleCategory = (id: number) => {
    dispatch(getSingleMedia(id));
    dispatch(handlePage(1));
    dispatch(getMediaFiles({ page: 1, id: id }));
  };
  const handleBack = () => {
    dispatch(clearSelectedMedia());
    dispatch(getMediaFiles({ page: currentPage }));
  };
  const handleCloseEdit = () => {
    setEditFile({ id: 0, mediaId: 0 });
    setEditModal(false);
    setMediaError("");
  };
  const handleOpenEdit = (id: number, mediaId: number, file: string) => {
    setEditFile({ id: id, mediaId: mediaId });
    setEditModal(true);
  };
  const handleEditMedia = () => {
    if (mediaFile.length < 1) {
      setMediaError("required");
    } else {
      dispatch(
        updateMediaFiles({
          id: editFile.id,
          mediaId: editFile.mediaId,
          files: mediaFile,
        })
      );
      handleCloseEdit();
    }
    setEditFile({ id: 0, mediaId: 0 });
    setMediaFile([]);
  };
  const handlePause = () => {
    videoRef.current && videoRef.current.pause();
    setIsPlaying(false);
  };

  const handlePlay = () => {
    videoRef.current && videoRef.current.play();
    setIsPlaying(true);
  };
  useEffect(() => {
    dispatch(getMediaData());
    dispatch(getMediaFiles({ page: 1 }));
    dispatch(clearSelectedMedia());
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    setIsPlaying(false);
  }, [mediaFiles]);

  return (
    <Stack>
      <Stack sx={libraryStyles.mainContainer}>
        <ListItemText
          primary={"All Media Files"}
          secondary={`TOTAL FILES - ${pagination?.totalItems ?? ""}`}
          sx={libraryStyles.listText}
        />
        <Box sx={libraryStyles.tabs}>
          {tabs.map((tab, index) => (
            <Button
              key={index}
              onClick={() => handleSetTab(index)}
              sx={libraryStyles.tabsElement(index, tabNumber)}
            >
              {tab}
            </Button>
          ))}
        </Box>

        {permissions.create && (
          <CustomButton
            sx={libraryStyles.uploadBtn}
            endIcon={<AddIcon />}
            onClick={handleOpenMedia}
          >
            Upload
          </CustomButton>
        )}
      </Stack>
      <ModalStyled
        open={cardModal}
        isbgColor={colors.lightBlack}
        isClose={true}
        handleClose={handleCloseCategory}
      >
        <Stack direction={"column"} gap={5} sx={libraryStyles.modalGroup}>
          <Typography sx={libraryStyles.heading}>Add New Category</Typography>

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
            Add Category
          </CustomButton>
        </Stack>
      </ModalStyled>
      <ModalStyled
        open={mediaModal}
        isbgColor={colors.lightBlack}
        isClose={true}
        handleClose={handleCloseMedia}
      >
        <Stack direction={"column"} gap={1} sx={libraryStyles.modalGroup}>
          <Typography sx={libraryStyles.heading}>Add Media File</Typography>
          <Box>
            <DadzsDropzone
              uploadFileSetterWithEdit={handleUpload}
              uploadFiles={mediaFile}
              boxStyle={{ sx: { height: "150px" } }}
              helperText={mediaError}
              isAcceptMultiple
            />
          </Box>
          <CustomButton
            sx={libraryStyles.addBtn}
            endIcon={<AddIcon />}
            onClick={() => handleAddMedia()}
          >
            Add Media
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
              Are you sure you want to delete this file?
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
      <ModalStyled
        open={editModal}
        isbgColor={colors.lightBlack}
        isClose={true}
        handleClose={handleCloseEdit}
      >
        <Stack direction={"column"} gap={1} sx={libraryStyles.modalGroup}>
          <Typography sx={libraryStyles.heading}>Edit Media File</Typography>
          <Box sx={{ height: "150px" }}>
            <DadzsDropzone
              uploadFileSetter={(file: File[]) => handleEditUpload(file)}
              uploadFiles={mediaFile}
              boxStyle={{ sx: { height: "100%" } }}
              helperText={mediaError}
            />
          </Box>
          <CustomButton
            sx={libraryStyles.addBtn}
            endIcon={<AddIcon />}
            onClick={() => handleEditMedia()}
          >
            Edit Media
          </CustomButton>
        </Stack>
      </ModalStyled>
      {selectedMedia && selectedMedia!.id ? (
        <SingleCard handleBack={handleBack} />
      ) : (
        <Stack gap={2} my={"30px"} sx={libraryStyles.catCard}>
          {mediaMessage ? (
            <Typography sx={libraryStyles.noDataText}>
              {mediaMessage}
            </Typography>
          ) : (
            mediaData?.length > 0 &&
            mediaData.map((each) => (
              <Stack
                key={each.id}
                alignItems={"center"}
                direction={"row"}
                gap={1}
                sx={libraryStyles.card}
                onClick={() => handleCategory(each.id)}
              >
                <FolderIcon sx={libraryStyles.card.birthdayColor} />
                <Typography title={each.category}>{each.category}</Typography>
              </Stack>
            ))
          )}
          {permissions.create && (
            <Stack
              alignItems={"center"}
              justifyContent={"center"}
              direction={"row"}
              gap={2}
              sx={libraryStyles.card}
            >
              <IconButton
                sx={{
                  bgcolor: colors.primary,
                  color: colors.white,
                  "&:hover": { bgcolor: hex2rgba(colors.primary, 0.8) },
                }}
                size="small"
                onClick={handleOpenCategory}
              >
                <AddIcon />
              </IconButton>
            </Stack>
          )}
        </Stack>
      )}
      {message ? (
        <Stack sx={libraryStyles.noData}>
          <Typography>{message}</Typography>
        </Stack>
      ) : (
        <Stack sx={libraryStyles.cardMain}>
          <Box sx={libraryStyles.mediaMainBox}>
            {mediaFiles &&
              mediaFiles?.map((item) => (
                <Box key={item.id} sx={libraryStyles.cardCon}>
                  <Stack
                    direction={"row"}
                    gap={1}
                    width={"100%"}
                    justifyContent={"end"}
                    boxSizing={"border-box"}
                    p={2}
                    className="iconDiv"
                  >
                    {permissions.edit && (
                      <IconButton
                        sx={libraryStyles.editStyle(colors.lightGreen)}
                        onClick={() =>
                          handleOpenEdit(item.id, item.mediaId, item.file)
                        }
                      >
                        <Box component={"img"} src={libraryEdit} />
                      </IconButton>
                    )}
                    {permissions.delete && (
                      <IconButton
                        sx={libraryStyles.editStyle(colors.validate)}
                        onClick={() => handleDeleteModal("file", item.id)}
                      >
                        <Box component={"img"} src={libraryDelete} />
                      </IconButton>
                    )}
                  </Stack>
                  <ListItemText
                    primary={item.fileName?.slice(0, item.fileName.indexOf("."))}
                    secondary={item.fileSize}
                    sx={libraryStyles.cardText}
                    className="textDiv"
                  />
                  {item.fileType === "video/mp4" ? (
                    <Stack
                      width={"250px"}
                      height={"250px"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      borderRadius={"30px"}
                      bgcolor={colors.black}
                      position={"relative"}
                    >
                      {!isPlaying && (
                        <PlayCircleIcon
                          fontSize="large"
                          sx={libraryStyles.playBtn}
                          onClick={() => handlePlay()}
                        />
                      )}
                      <video
                        ref={videoRef}
                        src={`${item.file}/${token}`}
                        width={"100%"}
                        controls
                        onPlay={handlePlay}
                        onPause={handlePause}
                      ></video>
                    </Stack>
                  ) : (
                    <Box
                      component={"img"}
                      src={`${item.file}/${token}`}
                      sx={libraryStyles.cardImg}
                      onError={handleCardLayoutPlaceHolder}
                    />
                  )}
                </Box>
              ))}
          </Box>

          {pagination?.totalPages && pagination?.totalPages > 1 && (
            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent={"end"}
              gap={{ xs: 2, sm: "" }}
              alignItems={"center"}
              m={2}
              width={"100%"}
            >
              <Pagination
                count={pagination?.totalPages}
                page={pagination?.currentPage}
                sx={screenStyles.paginationActiveColor}
                onChange={(_, pageNumber) => handlePagination(pageNumber)}
                siblingCount={0}
                renderItem={(item) => (
                  <PaginationItem
                    slots={{
                      previous: ChevronLeftIcon,
                      next: ChevronRightIcon,
                    }}
                    {...item}
                  />
                )}
              />
            </Stack>
          )}
        </Stack>
      )}
    </Stack>
  );
};

export default Library;
