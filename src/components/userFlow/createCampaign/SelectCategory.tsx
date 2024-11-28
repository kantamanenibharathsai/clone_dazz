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
  getCategories,
  setCategoryPagination,
} from "../../../redux/reducers/userReducers/createCampaignSlice";
import { useAppDispatch, useAppSelector } from "../../../utils/useRedux";
import CategoryCard from "../../common/imageViewer/CategoryCard";
import { InputField } from "../../common/inputField/InputField";
import { SearchIcon } from "../assets/Index";
import { addNewCampaign, mediaByGenre, selectCategory } from "./CommonStyles";
interface SelectCategoryIProps {
  handleCategory: (category: string) => void;
  helperText: string;
}
interface IState {
  search: string;
  searchPage: number;
}

const SelectCategory = ({
  handleCategory,
  helperText,
}: SelectCategoryIProps) => {
  const { loading, categoryErrorTxt, categoryPagination, categoryList, form } =
    useAppSelector((state) => state.Campaign);
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
        getCategories({
          categoryName: search,
          genreIds: [form.selectedGenre],
          page: page.toString(),
          pageSize: categoryPagination.pageSize.toString(),
        })
      );
    }
  };
  const handleCleanUpPaginationState = () => {
    dispatch(setCategoryPagination());
  };
  useEffect(() => {
    dispatch(
      getCategories({
        categoryName: search,
        genreIds: [form.selectedGenre],
        page: search
          ? searchPage.toString()
          : categoryPagination.currentPage.toString(),
        pageSize: categoryPagination.pageSize.toString(),
      })
    );
    // eslint-disable-next-line
  }, [search, searchPage]);
  useEffect(() => {
    return () => handleCleanUpPaginationState();
    //eslint-disable-next-line
  }, []);
  return (
    <Box>
      <Stack
        alignItems={"end"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        mb={3}
      >
        <Typography sx={{ ...addNewCampaign.title, mb: 0 }}>
          {translate("userFlow.selectCategory")}
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
        {categoryErrorTxt && !loading && (
          <Typography sx={mediaByGenre.errorTxt}>{categoryErrorTxt}</Typography>
        )}
      </Box>
      {!loading && categoryErrorTxt === "" && categoryList.length > 0 && (
        <>
          <Typography sx={mediaByGenre.helperTxt}>{helperText}</Typography>
          <Box sx={selectCategory.categoriesContainer}>
            {categoryList.map((item) => (
              <CategoryCard
                groupCount={item.id}
                id={item.id}
                isActive={form.selectedCategory.includes(item.id.toString())}
                mainImage={item?.image?.url}
                text={item.categoryName}
                key={item.id}
                handleToggle={(categoryId) =>
                  handleCategory(categoryId.toString())
                }
                imageProps={{ ...selectCategory.imageStyle }}
              />
            ))}
          </Box>
          {categoryPagination.totalPages > 1 ? (
            <Pagination
              page={search ? searchPage : categoryPagination.currentPage}
              count={categoryPagination.totalPages}
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

export default SelectCategory;
