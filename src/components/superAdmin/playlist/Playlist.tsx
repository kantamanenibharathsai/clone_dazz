import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ClearIcon from "@mui/icons-material/Clear";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  Box,
  CircularProgress,
  FormControl,
  Grid,
  InputAdornment,
  InputBase,
  MenuItem,
  Pagination,
  PaginationItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { colors } from "../../../config/theme";
import {
  deletePlaylist,
  getPlaylistData,
  updatePlaylistData,
} from "../../../redux/reducers/adminReducers/playlistSlice";
import { AppDispatch, RootState } from "../../../redux/store";
import { useRoutePermissions } from "../../../utils/useRoutePermissions";
import { formateDate, showEntriesStats, tokenWithUrl } from "../../../utils/utils";
import { searchIcon } from "../../admin/assets/Index";
import { playlistStyles } from "../../admin/playlist/PlaylistStyles";
import CardLayout from "../../common/cardLayout/CardLayout";
import { CustomButton } from "../../common/customButton/CustomButton";
import { ModalStyled } from "../../common/modal/CommonModal";
import { screenStyles } from "../screens/ScreenStyles";

interface IPlayList {
  id: number | null;
  playlistName: string;
  description: string;
}
interface IState {
  activeLayoutId: null | number;
}
const Playlist = () => {
  const { playlistData, message, pagination, loading } = useSelector(
    (state: RootState) => state.PlaylistSlice
  );
  const [activeLayoutId, setActiveLayoutId] =
    useState<IState["activeLayoutId"]>(null);
  const [selectInput, setSelectInput] = useState("desc");
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchPage, setSearchPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<IPlayList>({
    playlistName: "",
    description: "",
    id: null,
  });
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (event: SelectChangeEvent) => {
    setSelectInput(event.target.value);
    if (searchInput) {
      dispatch(
        getPlaylistData({
          searchInput,
          page: searchPage,
          sort: event.target.value,
        })
      );
    } else {
      dispatch(
        getPlaylistData({
          searchInput,
          page: currentPage,
          sort: event.target.value,
        })
      );
    }
  };
  const handleSearchInput = (input: string) => {
    setSearchInput(input);
  };
  const handleRemoveSearchInput = () => {
    setSearchInput("");
  };
  const handleEdit = (playListId: number) => {
    navigate("/edit-playlist/" + playListId);
  };
  const handleModalClose = () => {
    setActiveLayoutId(null);
  };
  const handleShow = (layOutId: number) => {};
  const handleSettings = (layOutId: number) => {
    setIsModalOpen(!isModalOpen);
    const filter = playlistData?.find((each) => each.id === layOutId);
    if (filter) {
      setEditItem((prev) => ({
        ...prev,
        playlistName: filter.playlistName,
        description: filter.description,
        id: filter.id,
      }));
    }
  };
  const handleDelete = (layOutId: number) => {
    setActiveLayoutId(layOutId);
  };
  const handleDeleteLayout = async (layOutId: number) => {
    if (searchInput) {
      dispatch(
        deletePlaylist({ playlistId: layOutId, page: searchPage, searchInput })
      );
    } else {
      dispatch(
        deletePlaylist({ playlistId: layOutId, page: currentPage, searchInput })
      );
    }
    setActiveLayoutId(null);
  };
  const handlePagination = (newPage: number) => {
    setCurrentPage(newPage);
    dispatch(
      getPlaylistData({ searchInput: "", page: newPage, sort: selectInput })
    );
  };
  const handleSearchPagination = (newPage: number) => {
    setSearchPage(newPage);
    dispatch(getPlaylistData({ searchInput, page: newPage }));
  };
  const permissions = useRoutePermissions();
  useEffect(() => {
    if (searchInput.length === 0) {
      dispatch(
        getPlaylistData({ searchInput, page: currentPage, sort: selectInput })
      );
    } else {
      const searchData = setTimeout(() => {
        dispatch(getPlaylistData({ searchInput, page: searchPage,sort:selectInput }));
      }, 1000);
      return () => clearTimeout(searchData);
    }
    // eslint-disable-next-line
  }, [searchInput, dispatch]);

  const handleModalClosed = () => {
    setIsModalOpen(false);
  };

  const handlePlaylistUpdate = async () => {
    if (editItem) {
      const formData = new FormData();
      formData.append("playlistName", editItem?.playlistName);
      formData.append("description", editItem?.description);
      const idLayOut = editItem?.id ?? null;
      const result = await dispatch(
        updatePlaylistData({ formData, layOutId: idLayOut })
      );
      if (result?.payload?.statusCode === "200") {
        setIsModalOpen(false);
        setEditItem({ playlistName: "", description: "", id: null });
        dispatch(getPlaylistData({ searchInput, page: currentPage }));
      }
    }
  };

  const handleChangeInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditItem((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  return (
    <>
      <Box sx={playlistStyles.mainBox}>
        <Box sx={playlistStyles.mainContainer}>
          <Box sx={playlistStyles.titleContainer}>
            <Box>
              <Typography sx={playlistStyles.title}>Playlist</Typography>
              <Typography sx={playlistStyles.subTitle}>
                {pagination?.totalItems} List
              </Typography>
            </Box>
            <Box sx={playlistStyles.textFieldContainer}>
              <TextField
                sx={playlistStyles.textField}
                type="text"
                placeholder="Search"
                value={searchInput}
                onChange={(event) => handleSearchInput(event.target.value)}
                InputProps={{
                  startAdornment: (
                    <Box
                      component={"img"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      sx={playlistStyles.textField.icon}
                      src={searchIcon}
                    />
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <ClearIcon
                        cursor={"pointer"}
                        onClick={handleRemoveSearchInput}
                        sx={{ opacity: searchInput ? 1 : 0 }}
                      />
                    </InputAdornment>
                  ),
                }}
              />

              <Box sx={playlistStyles.sortContainer}>
                <Box sx={playlistStyles.sortBox}>
                  <Typography sx={playlistStyles.menuItem}>Sort By:</Typography>
                  <FormControl sx={playlistStyles.sortFormControl}>
                    <Select
                      value={selectInput}
                      onChange={handleChange}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      IconComponent={KeyboardArrowDownIcon}
                    >
                      <MenuItem value="asc" sx={playlistStyles.menuItem}>
                        Oldest
                      </MenuItem>
                      <MenuItem value="desc" sx={playlistStyles.menuItem}>
                        Newest
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        {loading ? (
          <Stack
            alignItems={"center"}
            justifyContent={"center"}
            height={"30vh"}
          >
            <CircularProgress />
          </Stack>
        ) : (
          <>
            <Grid
              container
              spacing={{ xs: 1, sm: 2, md: 1, lg: 2 }}
              sx={playlistStyles.grid}
            >
              {message ? (
                <Typography sx={playlistStyles.errorMessage}>
                  {message}
                </Typography>
              ) : (
                playlistData &&
                playlistData?.map((layout, index) => {
                  let image;
                  if (layout.layoutImages.length > 0) {
                    image = layout.layoutImages[0].url;
                  }
                  return (
                    <Grid item xs={12} sm={6} md={12} lg={6} xl={4} key={index}>
                      <CardLayout
                        layOutId={index}
                        activeLayoutId={activeLayoutId}
                        imageSrc={tokenWithUrl(image)}
                        title={layout.playlistName}
                        date={formateDate(layout.createdAt, "LL")}
                        layout={layout.layoutCount}
                        // status={layout.}
                        isShow={false}
                        handleCloseModal={() => handleModalClose()}
                        handleEdit={
                          permissions.edit ? () => handleEdit(layout.id) : undefined
                        }
                        handleShow={() => handleShow(index)}
                        handleSettings={
                          permissions.edit
                            ? () => handleSettings(layout?.id)
                            : undefined
                        }
                        handleDelete={
                          permissions.delete
                            ? () => handleDelete(index)
                            : undefined
                        }
                        handleDeleteLayout={() => handleDeleteLayout(layout.id)}
                      />
                    </Grid>
                  );
                })
              )}
            </Grid>
            {!message && (
              <Stack
                direction={{ xs: "column", sm: "row" }}
                justifyContent={"space-between"}
                gap={{ xs: 2, sm: "" }}
                alignItems={"center"}
                m={2}
              >
                {pagination?.totalPages && pagination?.totalPages > 1 && (
                  <>
                    <Typography textAlign={"left"} color={colors.lightGray}>
                      {showEntriesStats(
                        pagination?.totalItems ?? 1,
                        pagination?.currentPage ?? 1,
                        pagination?.pageSize ?? 1
                      )}
                    </Typography>
                    <Pagination
                      count={pagination?.totalPages}
                      page={pagination?.currentPage}
                      sx={screenStyles.paginationActiveColor}
                      onChange={(_, pageNumber) => {
                        searchInput
                          ? handleSearchPagination(pageNumber)
                          : handlePagination(pageNumber);
                      }}
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
                  </>
                )}
              </Stack>
            )}
          </>
        )}
      </Box>
      <ModalStyled
        open={isModalOpen}
        isClose={false}
        isbgColor={colors.lightBlack}
        onClose={handleModalClosed}
      >
        <Stack direction={"column"} gap={2} sx={playlistStyles.modalCon}>
          <Box sx={playlistStyles.modalButton}>
            <Typography sx={playlistStyles.uploadText}>
              Update Playlist
            </Typography>
          </Box>

          <Box sx={playlistStyles.inputContainer}>
            <InputBase
              placeholder="Playlist Name"
              sx={playlistStyles.input}
              value={editItem?.playlistName}
              name="playlistName"
              onChange={handleChangeInput}
            />
            <TextareaAutosize
              placeholder="Description"
              style={playlistStyles.textArea}
              value={editItem?.description}
              name="description"
              onChange={handleChangeInput}
            />
          </Box>
          <CustomButton
            sx={playlistStyles.addBtn}
            onClick={handlePlaylistUpdate}
          >
            Update Playlist
          </CustomButton>
        </Stack>
      </ModalStyled>
    </>
  );
};

export default Playlist;
