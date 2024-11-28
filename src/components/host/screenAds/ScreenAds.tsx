import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import ClearIcon from "@mui/icons-material/Clear";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  Box,
  CircularProgress,
  FormControl,
  Grid,
  InputAdornment,
  MenuItem,
  Pagination,
  PaginationItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  hostDeleteMyAd,
  hostGetMyAds,
  LoadingStatus,
} from "../../../redux/reducers/hostReducers/HostSlice";
import { AppDispatch, RootState } from "../../../redux/store";
import CardLayout from "../../common/cardLayout/CardLayout";
import { logsStyles } from "../settings/logs/logsStyles";
import { screenAdsStyles } from "./ScreenAdsStyles";

import moment from "moment";
import { useAppSelector } from "../../../utils/useRedux";
import { useRoutePermissions } from "../../../utils/useRoutePermissions";
import { searchIcon } from "../assets";
import AdViewModal from "./AdViewModal";
interface IState {
  isDeleteModalOpen: boolean;
  activeLayoutId: null | number;
}
const ScreenAds = () => {
  const [activeLayoutId, setActiveLayoutId] =
    useState<IState["activeLayoutId"]>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { myAds, pagination, message, loadingStatus } = useSelector(
    (state: RootState) => state.HostSlice
  );
  const { token } = useAppSelector((state) => state.Auth);
  const permissions = useRoutePermissions();
  const [sortBy, setSortBy] = useState("desc");
  const [searchInput, setSearchInput] = useState("");
  const [openView, setOpenView] = useState(false);
  const [viewAd, setViewAd] = useState({ list: [""], url: "" });
  const handleChange = (event: SelectChangeEvent) => {
    setSortBy(event.target.value);
    setCurrentPage(1);
  };
  const handleSearchInput = (input: string) => {
    setSearchInput(input);
    setCurrentPage(1);
  };
  const handleRemoveSearchInput = () => {
    setSearchInput("");
  };
  const dispatch = useDispatch<AppDispatch>();

  const handleModalClose = () => {
    setActiveLayoutId(null);
  };
  const handleShow = (layOutId: number) => {
    const data = myAds.find((item) => item.id === layOutId);
    setViewAd({ list: data?.screenNames!, url: data?.url! });
    setOpenView(true);
  };
  const handleCloseShow = () => {
    setOpenView(false);
    setViewAd({ list: [""], url: "" });
  };
  const handleDelete = (layOutId: number) => {
    setActiveLayoutId(layOutId);
  };
  const handleDeleteLayout = () => {
    handleModalClose();
    dispatch(hostDeleteMyAd(activeLayoutId ?? 0));
  };

  const dataStatusJSX = (status: LoadingStatus) => {
    if (myAds && myAds.length === 0)
      return <Typography>Data Not Found !!</Typography>;
    switch (status) {
      case "PENDING":
        return <CircularProgress />;
      case "REJECTED":
        return <Typography>{message}</Typography>;
      default: {
        return false;
      }
    }
  };
  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    dispatch(hostGetMyAds(`page=${currentPage}&orderBy=${sortBy}`));
  }, [dispatch, currentPage, sortBy]);
  return (
    <Box sx={screenAdsStyles.mainBox}>
      <AdViewModal
        modalOpen={openView}
        handleModalClose={handleCloseShow}
        data={viewAd}
      />
      <Box sx={screenAdsStyles.mainContainer}>
        <Box sx={screenAdsStyles.titleContainer}>
          <Box>
            <Typography sx={screenAdsStyles.title}>My Ads</Typography>
            <Typography sx={screenAdsStyles.subTitle}>
              {loadingStatus === "FULFILLED" ? pagination?.totalItems : 0} List
            </Typography>
          </Box>
          <Box sx={screenAdsStyles.textFieldContainer}>
            <TextField
              sx={screenAdsStyles.textField}
              autoComplete="off"
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
                    sx={screenAdsStyles.textField.icon}
                    src={searchIcon}
                  />
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <ClearIcon
                      cursor={"pointer"}
                      onClick={handleRemoveSearchInput}
                      sx={{ visibility: searchInput ? "visible" : "hidden" }}
                    />
                  </InputAdornment>
                ),
              }}
            />
            <Box sx={screenAdsStyles.sortContainer}>
              <Box sx={screenAdsStyles.sortBox}>
                <Typography sx={screenAdsStyles.menuItem}>Sort By:</Typography>
                <FormControl sx={screenAdsStyles.sortFormControl}>
                  <Select
                    value={sortBy}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    IconComponent={KeyboardArrowDownIcon}
                  >
                    <MenuItem value="asc" sx={screenAdsStyles.menuItem}>
                      A-Z
                    </MenuItem>
                    <MenuItem value="desc" sx={screenAdsStyles.menuItem}>
                      Z-A
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Grid
        container
        spacing={screenAdsStyles.gridSpacing}
        sx={screenAdsStyles.grid}
      >
        {dataStatusJSX(loadingStatus) && (
          <Grid xs={12}>
            <Box sx={screenAdsStyles.loadingBox}>
              {dataStatusJSX(loadingStatus)}
            </Box>
          </Grid>
        )}
        {loadingStatus === "FULFILLED" &&
          myAds.length > 0 &&
          myAds.map((layout, index) => (
            <Grid item xs={12} sm={6} md={6} lg={4} xl={4} key={index}>
              <CardLayout
                layOutId={layout.id}
                activeLayoutId={activeLayoutId}
                imageSrc={layout?.url + `/${token}`}
                title={layout.screenNames[0]}
                date={moment(layout.createdAt).format("ll")}
                layout={layout.screenNames.length}
                isShow={true}
                handleCloseModal={() => handleModalClose()}
                handleShow={() => handleShow(layout.id)}
                handleDelete={
                  permissions.delete ? () => handleDelete(layout.id) : undefined
                }
                handleDeleteLayout={handleDeleteLayout}
              />
            </Grid>
          ))}
      </Grid>
      {loadingStatus === "FULFILLED" &&
        pagination?.totalPages &&
        pagination?.totalPages > 1 && (
          <Box sx={logsStyles.paginationBox}>
            <Pagination
              count={pagination?.totalPages}
              onChange={handlePageChange}
              page={currentPage}
              sx={logsStyles.paginationActiveColor}
              siblingCount={0}
              renderItem={(item) => (
                <PaginationItem
                  slots={{
                    previous: ChevronLeft,
                    next: ChevronRight,
                  }}
                  {...item}
                />
              )}
            />
          </Box>
        )}
    </Box>
  );
};

export default ScreenAds;
