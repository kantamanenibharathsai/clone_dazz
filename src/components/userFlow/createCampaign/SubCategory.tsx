import {
  Box,
  CircularProgress,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { translate } from "../../../config/i18n";
import {
  getSubCategories,
  setSubCategoryPagination,
} from "../../../redux/reducers/userReducers/createCampaignSlice";
import { useAppDispatch, useAppSelector } from "../../../utils/useRedux";
import CategoryCard from "../../common/imageViewer/CategoryCard";
import { InputField } from "../../common/inputField/InputField";
import { SearchIcon } from "../assets/Index";
import { addNewCampaign, mediaByGenre, selectCategory } from "./CommonStyles";
interface IState {
  search: string;
  searchPage: number;
}
interface SelectSubCategoryIProps {
  handleSubCategory: (subCategory: string) => void;
  helperText: string;
}
const SubCategory = ({
  handleSubCategory,
  helperText,
}: SelectSubCategoryIProps) => {
  const {
    loading,
    subCategoryList,
    subCategoryErrorTxt,
    form,
    subCategoryPagination,
  } = useAppSelector((state) => state.Campaign);
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState<IState["search"]>("");
  const [searchPage, setSearchPage] = useState<IState["searchPage"]>(1);
  const debounce = () => {
    let id: NodeJS.Timer | null = null;
    return (value: string, delay: number) => {
      if (id) clearTimeout(id);
      id = setTimeout(() => {
        setSearch(value);
        if (value === "") setSearchPage(1);
      }, delay);
    };
  };
  // eslint-disable-next-line
  const handleSearch = useCallback(debounce(), []);
  const handlePagination = (page: number) => {
    if (search) {
      setSearchPage(page);
    } else {
      dispatch(
        getSubCategories({
          categoryIds: form.selectedCategory,
          page: page.toString(),
          pageSize: subCategoryPagination.pageSize.toString(),
          subCategoryName: search,
        })
      );
    }
  };
  const handleCleanUpPaginationState = () => {
    dispatch(setSubCategoryPagination());
  };
  useEffect(() => {
    dispatch(
      getSubCategories({
        categoryIds: form.selectedCategory,
        page: search
          ? searchPage.toString()
          : subCategoryPagination.currentPage.toString(),
        pageSize: subCategoryPagination.pageSize.toString(),
        subCategoryName: search,
      })
    );
    // eslint-disable-next-line
  }, [search, searchPage]);
  useEffect(() => {
    return () => handleCleanUpPaginationState();
    //eslint-disable-next-line
  }, []);
  return (
    <Box maxWidth={2000}>
      <Stack
        flexDirection={"row"}
        alignItems={"end"}
        justifyContent={"space-between"}
        mb={3}
      >
        <Typography sx={{ ...addNewCampaign.title, mb: 0 }}>
          {translate("userFlow.chooseSubCategory")}
        </Typography>
        <InputField
          inputProps={{
            id: "SearchCategory",
            placeholder: "Search",
            InputProps: {
              startAdornment: (
                <Box component={"label"} htmlFor="SearchCategory">
                  <SearchIcon />
                </Box>
              ),
            },
            onChange: (event) => handleSearch(event.target.value, 500),
            sx: selectCategory.searchField,
          }}
        />
      </Stack>
      <Box textAlign={"center"}>
        {loading && <CircularProgress size={"25px"} />}
        {subCategoryErrorTxt && !loading && (
          <Typography sx={mediaByGenre.errorTxt}>
            {subCategoryErrorTxt}
          </Typography>
        )}
      </Box>
      {!loading && subCategoryErrorTxt === "" && subCategoryList.length > 0 && (
        <>
          <Typography sx={mediaByGenre.helperTxt}>{helperText}</Typography>
          <Box sx={selectCategory.categoriesContainer}>
            {subCategoryList.map((item) => (
              <CategoryCard
                groupCount={item.id}
                id={item.id}
                isActive={form.selectedSubCategory.includes(item.id.toString())}
                mainImage={item?.image?.url}
                text={item.subCategoryName}
                key={item.id}
                handleToggle={(category) =>
                  handleSubCategory(category.toString())
                }
                imageProps={{ ...selectCategory.imageStyle }}
              />
            ))}
          </Box>
          {subCategoryPagination.totalPages > 1 ? (
            <Pagination
              page={search ? searchPage : subCategoryPagination.currentPage}
              count={subCategoryPagination.totalPages}
              onChange={(_, page) => handlePagination(page)}
            />
          ) : (
            <></>
          )}
        </>
      )}
    </Box>
  );
};

export default SubCategory;
