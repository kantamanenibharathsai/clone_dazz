import ClearIcon from "@mui/icons-material/Clear";
import {
  Box,
  FormControl,
  Grid,
  InputAdornment,
  LinearProgress,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import moment from "moment";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { colors } from "../../../config/theme";
import {
  Form,
  getAdTypeOptions,
  getAvailableCoupons,
  getCategories,
  getGenre,
  getPricingModelOptions,
  getScreenGroups,
  getSubCategories,
  handleEditingCampaign,
} from "../../../redux/reducers/userReducers/createCampaignSlice";
import {
  deleteMyUserAd,
  getMyUserAds,
  getSingleCampaign,
} from "../../../redux/reducers/userReducers/myAdsSlice";
import { useAppDispatch, useAppSelector } from "../../../utils/useRedux";
import { useRoutePermissions } from "../../../utils/useRoutePermissions";
import { tokenWithUrl } from "../../../utils/utils";
import CardLayout from "../../common/cardLayout/CardLayout";
import { SearchIcon } from "../assets/Index";
import { myAdsStyles } from "./MyAdsStyles";

interface IState {
  search: string;
  searchPage: number;
  deleteAdId: number | null;
  filter: "A_Z" | "Z_A" | "NEW";
  editLoading: boolean;
}

const MyAds = () => {
  const [search, setSearch] = useState<IState["search"]>("");
  const [searchPage, setSearchPage] = useState<IState["searchPage"]>(1);
  const [filter, setFilter] = useState<IState["filter"]>("NEW");
  const [deleteAdId, setDeleteAdId] = useState<IState["deleteAdId"]>(0);
  const [editLoading, setEditLoading] = useState<IState["editLoading"]>(false);
  const { data, errorMessage, loading, pagination } = useAppSelector(
    (state) => state.MyAdsSlice
  );
  const permission = useRoutePermissions();
  const { user } = useAppSelector((state) => state.Auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const route = useLocation();
  const inputFieldRef = useRef<HTMLInputElement>(null);
  const handleEdit = async (campaignId: number) => {
    setEditLoading(true);
    if (editLoading) return;
    const { payload } = await dispatch(getSingleCampaign(campaignId));
    if (payload.statusCode === "200") {
      const campaign = payload.data;
      await dispatch(getPricingModelOptions());
      await dispatch(getAdTypeOptions());
      if (campaign.step === 4) {
        await dispatch(
          getGenre({
            page: 1,
            pageSize: 10,
          })
        );
      }
      if (campaign.step === 5) {
        await dispatch(
          getCategories({
            categoryName: "",
            genreIds: campaign?.genreIds?.[0] ? [campaign.genreIds[0]] : [],
            page: "1",
            pageSize: "10",
          })
        );
      }
      if (campaign.step === 6) {
        await dispatch(
          getSubCategories({
            categoryIds: campaign.categoryIds,
            page: "1",
            pageSize: "10",
            subCategoryName: "",
          })
        );
      }
      if (campaign.step === 7) {
        await dispatch(
          getScreenGroups({
            groupName: "",
            genreIds: campaign.genreIds,
            categoryIds: campaign.categoryIds,
            subCategoryIds: campaign.subCategoryIds,
            radius: "10",
            latitude: campaign.latitude,
            longitude: campaign.longitude,
            page: "1",
            pageSize: "10",
            endDate: campaign.endDate,
            startDate: campaign.startDate,
          })
        );
      }
      if (campaign.step === 9) {
        await dispatch(
          getAvailableCoupons({
            page: "1",
            pageSize: "10",
            totalPrice: campaign.price,
          })
        );
      }
      const mediaFiles = campaign.mediaFiles?.map(
        (item: { image: string }) => item?.image
      );
      const startDate = campaign.startDate
        ? new Date(`${campaign.startDate}T00:00:00`)
        : null;
      const endDate = campaign.endDate
        ? new Date(`${campaign.endDate}T23:59:59`)
        : null;
      const existingValues: {
        form: Form;
        [key: string]: string | boolean | {};
      } = {
        form: {
          campaignName: campaign.campaignName,
          location: {
            lat: campaign.latitude,
            lng: campaign.longitude,
            locationId: campaign.locationId,
            locationName: campaign.locationName,
          },
          selectedDates: startDate && endDate ? [startDate, endDate] : null,
          pricingModelId: campaign?.pricingModelId?.toString() ?? "2", //By default Spot selected
          numberOfSpots:
            campaign.pricingModelId === 2 ? campaign.adTypeId.toString() : "",
          adTypeId:
            campaign.pricingModelId === 3 ? campaign.adTypeId.toString() : "",
          CPM:
            campaign.pricingModelId === 4 ? campaign.adTypeId.toString() : "",
          price:
            campaign.pricingModelId === 5 ? campaign.adTypeId.toString() : "",
          selectedGenre: campaign?.genreIds?.[0]?.toString() ?? "",
          selectedCategory:
            campaign?.categoryIds?.map((item: number) => item.toString()) ?? [],
          selectedSubCategory:
            campaign?.subCategoryIds?.map((item: number) => item.toString()) ??
            [],
          selectedScreenGroup:
            campaign?.screenGroupIds?.map((item: number) => item.toString()) ??
            [],
          selectedScreens:
            campaign?.screenIds?.map((item: number) => item.toString()) ?? [],
          uploadedMedia: mediaFiles ?? [],
          paymentMode: "Online",
        },
        campaign: true,
        campaignId: campaign.id,
        campaignMode: "EDIT",
        currentStep: campaign.step,
        checkout: {
          price: campaign.price,
          commissionAmount: campaign.commissionAmount,
          commissionPercentage: campaign.commissionPercentage,
          gstAmount: campaign.gstAmount,
          gstPercentage: campaign.gstPercentage,
          couponCode: campaign.couponCode,
          couponAmount: campaign.couponDiscount,
          totalAmount: campaign.totalAmount,
          totalAmountBeforeApplyCoupon: campaign.totalAmountBeforeApplyCoupon,
          razorpayOrderId: "",
        },
      };
      dispatch(handleEditingCampaign(existingValues));
    }
    setEditLoading(false);
  };
  const handleModalClose = () => {
    setDeleteAdId(null);
  };
  const handleShow = (campaignId: number) => {
    navigate(`/Ads/${campaignId}`);
  };
  const handleDelete = (campaignId: number) => {
    setDeleteAdId(campaignId);
  };
  const debounce = () => {
    let id: null | NodeJS.Timeout = null;
    return (value: string) => {
      if (id) clearTimeout(id);
      id = setTimeout(() => {
        setSearch(value);
        if (!value) setSearchPage(1);
      }, 500);
    };
  };
  // eslint-disable-next-line
  const handleSearchInput = useCallback(debounce(), []);
  const handleRemoveSearchInput = () => {
    if (inputFieldRef.current?.value) inputFieldRef.current.value = "";
    setSearch("");
    setSearchPage(1);
  };
  const handleConfirmDelete = async () => {
    const { payload } = await dispatch(deleteMyUserAd(deleteAdId as number));
    if (payload.statusCode === "200") handleGetMyAdsList();
    setDeleteAdId(null);
  };
  const handleFilterChange = (event: SelectChangeEvent<IState["filter"]>) => {
    setFilter(event.target.value as IState["filter"]);
  };
  const handleFilterValues = () => {
    let orderBy: "desc" | "asc" = "desc";
    let sortBy: "id" | "campaign_name" = "id";
    switch (filter) {
      case "A_Z":
        orderBy = "asc";
        sortBy = "campaign_name";
        break;
      case "Z_A":
        sortBy = "campaign_name";
        break;
    }
    return { orderBy, sortBy };
  };
  const handlePagination = (currentPageNo: number) => {
    if (currentPageNo === pagination.currentPage) return;
    if (search) {
      setSearchPage(currentPageNo);
    } else {
      const { orderBy, sortBy } = handleFilterValues();
      dispatch(
        getMyUserAds({
          order: orderBy,
          sortBy: sortBy,
          page: currentPageNo,
          pageSize: pagination.pageSize,
          searchValue: search,
          userId: user.id.toString(),
        })
      );
    }
  };
  const handleGetMyAdsList = () => {
    const { orderBy, sortBy } = handleFilterValues();
    dispatch(
      getMyUserAds({
        order: orderBy,
        page: search ? searchPage : pagination.currentPage,
        pageSize: pagination.pageSize,
        searchValue: search,
        sortBy: sortBy,
        userId: user.id.toString(),
      })
    );
  };
  const loadingBar = loading || editLoading;
  useEffect(() => {
    handleGetMyAdsList();
    // eslint-disable-next-line
  }, [dispatch, search, searchPage, filter]);

  return (
    <Box sx={myAdsStyles.mainContainer}>
      <Box sx={{ position: "absolute", top: 0, left: 0, width: "100%" }}>
        {loadingBar && <LinearProgress />}
      </Box>
      <Box sx={myAdsStyles.titleContainer}>
        <Box>
          <Typography sx={myAdsStyles.title}>
            {route.pathname === "/Ads" ? "My Ads" : "Other Ads"}
          </Typography>
          {route.pathname === "/Ads" && (
            <Typography sx={myAdsStyles.subTitle}>
              {pagination.totalItems} List
            </Typography>
          )}
        </Box>
        <Box sx={myAdsStyles.textFeildContainer}>
          <TextField
            sx={myAdsStyles.textField}
            type="text"
            placeholder="Search"
            onChange={(event) => handleSearchInput(event.target.value)}
            InputProps={{
              startAdornment: <SearchIcon className="searchIcon" />,
              endAdornment: (
                <InputAdornment position="end">
                  <ClearIcon
                    cursor={search ? "pointer" : "none"}
                    onClick={handleRemoveSearchInput}
                    sx={{ opacity: search ? 1 : 0 }}
                  />
                </InputAdornment>
              ),
            }}
            inputRef={inputFieldRef}
          />
          <Box sx={myAdsStyles.sortContainer}>
            <Box sx={myAdsStyles.sortBox}>
              <Typography sx={myAdsStyles.menuItem}>Sort by :</Typography>
              <FormControl fullWidth sx={myAdsStyles.sortFormControl}>
                <Select value={filter} onChange={handleFilterChange}>
                  <MenuItem value="NEW" sx={myAdsStyles.menuItem}>
                    Newest
                  </MenuItem>
                  <MenuItem value="A_Z" sx={myAdsStyles.menuItem}>
                    Name (A to Z)
                  </MenuItem>
                  <MenuItem value="Z_A" sx={myAdsStyles.menuItem}>
                    Name (Z to A)
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box mt={5}>
        {!errorMessage && data.length > 0 && (
          <Grid container spacing={2} mb={3}>
            {data.map((campaign) => (
              <Grid item xs={12} lg={6} xl={4} key={campaign.id}>
                <CardLayout
                  layOutId={campaign.id}
                  activeLayoutId={deleteAdId}
                  imageSrc={tokenWithUrl(campaign.mediaFiles?.[0]?.url ?? "")}
                  title={campaign.campaignName}
                  date={moment(campaign.createdAt).format("MMM DD, YYYY")}
                  isShow={true}
                  handleCloseModal={handleModalClose}
                  handleEdit={
                    campaign.status === "draft" && permission.edit
                      ? () => handleEdit(campaign.id)
                      : undefined
                  }
                  handleShow={() => handleShow(campaign.id)}
                  handleDelete={
                    permission.delete
                      ? () => handleDelete(campaign.id)
                      : undefined
                  }
                  handleDeleteLayout={handleConfirmDelete}
                  status={campaign.status}
                />
              </Grid>
            ))}
          </Grid>
        )}
        <Box textAlign={"center"}>
          {!loading && errorMessage && (
            <Typography fontSize={14} color={colors.validate}>
              {errorMessage}
            </Typography>
          )}
        </Box>
        {pagination.totalPages > 1 && !errorMessage && (
          <Pagination
            siblingCount={0}
            page={search ? searchPage : pagination.currentPage}
            count={pagination.totalPages}
            onChange={(_, currentPage) => handlePagination(currentPage)}
          />
        )}
      </Box>
    </Box>
  );
};

export default MyAds;
