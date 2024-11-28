import {
  Box,
  CircularProgress,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import moment from "moment";
import { useEffect } from "react";
import { translate } from "../../../config/i18n";
import { colors } from "../../../config/theme";
import {
  getScreenGroups,
  setGroupPagination,
} from "../../../redux/reducers/userReducers/createCampaignSlice";
import { useAppDispatch, useAppSelector } from "../../../utils/useRedux";
import { CustomButton } from "../../common/customButton/CustomButton";
import CategoryCard from "../../common/imageViewer/CategoryCard";
import { ModalStyled } from "../../common/modal/CommonModal";
import { DateArray } from "../userLayout/UserLayout";
import { userLayoutStyles } from "../userLayout/UserLayoutStyles";
import { addNewCampaign, mediaByGenre, selectCategory } from "./CommonStyles";

interface ChooseScreenGroupIProps {
  handleScreenGroup: (groupId: string) => void;
  handleScreenSelection: (screenId: string) => void;
  handleOpeningScreen: () => void;
  showScreenModal: boolean;
  helperText: string;
}

const ChooseScreenGroup = ({
  handleScreenGroup,
  handleScreenSelection,
  handleOpeningScreen,
  showScreenModal,
  helperText,
}: ChooseScreenGroupIProps) => {
  const { form, loading, groupListPagination, groupList, groupListErrorTxt } =
    useAppSelector((state) => state.Campaign);
  const dispatch = useAppDispatch();
  const time = form.selectedDates as DateArray;
  const startDate = moment(time?.[0] ?? new Date()).format("YYYY-MM-DD");
  const endDate = moment(time?.[1] ?? new Date()).format("YYYY-MM-DD");
  const availableScreens = groupList
    .filter((item) =>
      form.selectedScreenGroup.includes(item.screenGroupId.toString())
    )
    .map((item) => item.screens)
    .flat();
  const groupImageSet = groupList
    .map((item) => item.screens)
    .flat()
    .map((screen) => screen.screenimages?.url)
    .slice(0, 5);

  const handlePagination = (page: number) => {
    dispatch(
      getScreenGroups({
        categoryIds: form.selectedCategory,
        genreIds: form.selectedGenre ? [form.selectedGenre] : [],
        groupName: "",
        subCategoryIds: form.selectedSubCategory,
        startDate: startDate,
        endDate: endDate,
        page: page.toString(),
        radius: "10",
        latitude: "17.446",
        longitude: "78.3908",
        pageSize: groupListPagination.pageSize.toString(),
      })
    );
  };
  const handleCleanUpPaginationState = () => {
    dispatch(setGroupPagination());
  };
  useEffect(() => {
    dispatch(
      getScreenGroups({
        categoryIds: form.selectedCategory,
        genreIds: form.selectedGenre ? [form.selectedGenre] : [],
        groupName: "",
        subCategoryIds: form.selectedSubCategory,
        startDate: startDate,
        endDate: endDate,
        page: groupListPagination.currentPage.toString(),
        radius: "10", //10km
        latitude: "17.446",
        longitude: "78.3908",
        pageSize: groupListPagination.pageSize.toString(),
      })
    );
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    return () => handleCleanUpPaginationState();
    //eslint-disable-next-line
  }, []);
  return (
    <Box maxWidth={2000} position={"relative"}>
      <Stack
        flexDirection={"row"}
        alignItems={"end"}
        justifyContent={"start"}
        mb={3}
      >
        <Typography variant="h5" sx={{ ...addNewCampaign.title, mb: 0 }}>
          {translate("userFlow.chooseScreenGroups")}
        </Typography>
      </Stack>
      <Box textAlign={"center"}>
        {!loading && groupListErrorTxt && (
          <Typography sx={mediaByGenre.errorTxt}>
            {groupListErrorTxt}
          </Typography>
        )}
        {loading && <CircularProgress size={"25px"} />}
      </Box>
      {!loading && groupListErrorTxt === "" && groupList.length > 0 && (
        <>
          <Typography sx={mediaByGenre.helperTxt}>{helperText}</Typography>
          <Stack sx={selectCategory.categoriesContainer}>
            {groupList.map((item) => (
              <CategoryCard
                groupCount={item.screenCount}
                id={item.screenGroupId}
                isActive={form.selectedScreenGroup.includes(
                  item.screenGroupId.toString()
                )}
                mainImage={item?.screenGroupImage?.url}
                text={item.screenGroupName}
                key={item.screenGroupId}
                subText={item.screenGroupImage.size}
                groupImages={groupImageSet}
                handleToggle={() =>
                  handleScreenGroup(item.screenGroupId.toString())
                }
                handleGroupNav={handleOpeningScreen}
              />
            ))}
          </Stack>
          {groupListPagination.totalPages > 1 ? (
            <Pagination
              page={groupListPagination.currentPage}
              count={groupListPagination.totalPages}
              onChange={(_, page) => handlePagination(page)}
            />
          ) : (
            <></>
          )}
        </>
      )}
      <ModalStyled
        open={showScreenModal}
        isbgColor={colors.white}
        onClose={handleOpeningScreen}
      >
        <Stack justifyContent={"space-between"} minWidth={500}>
          <Box>
            <Typography sx={addNewCampaign.title}>
              {translate("userFlow.chooseScreen")}
            </Typography>
            <Stack sx={selectCategory.categoriesContainer}>
              {availableScreens.map((item) => {
                return (
                  <CategoryCard
                    groupCount={item.id}
                    id={item.id}
                    isActive={form.selectedScreens.includes(item.id.toString())}
                    mainImage={item?.screenimages?.url}
                    text={item.screenname}
                    key={item.id}
                    subText={item.screenimages?.size}
                    handleToggle={() =>
                      handleScreenSelection(item.id.toString())
                    }
                  />
                );
              })}
            </Stack>
          </Box>
          <Stack sx={userLayoutStyles.buttonContainer}>
            <CustomButton
              bgcolor={colors.primary}
              sx={userLayoutStyles.btn}
              outlined={true}
              disableElevation
              onClick={handleOpeningScreen}
            >
              {translate("userFlow.campaignBackBtnTxt")}
            </CustomButton>
            <CustomButton
              bgcolor={colors.primary}
              sx={userLayoutStyles.btn}
              disableElevation
              onClick={handleOpeningScreen}
            >
              save
            </CustomButton>
          </Stack>
        </Stack>
      </ModalStyled>
    </Box>
  );
};

export default ChooseScreenGroup;
