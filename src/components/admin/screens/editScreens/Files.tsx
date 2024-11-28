import {
  Box,
  CircularProgress,
  InputAdornment,
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ClearIcon } from "@mui/x-date-pickers/icons";
import { ChangeEvent, ReactNode, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFiles } from "../../../../redux/reducers/adminReducers/screenFilesSlice";
import { useAppDispatch, useAppSelector } from "../../../../utils/useRedux";
import CategoryCard from "../../../common/imageViewer/CategoryCard";
import { ApiStatus } from "../../../superAdmin/common/CommonStyles";
import { searchIcon } from "../../assets/Index";
import { screenStyles } from "../ScreenStyles";
import { fileStyles } from "./EditStyles";

const Files = () => {
  const [searchInput, setSearchInput] = useState("");
  const { id } = useParams();
  const handleSearchInput = (input: string) => {
    setSearchInput(input);
  };
  const handleRemoveSearchInput = () => {
    setSearchInput("");
  };
  const { apiError, apiStatus, filesData, pagination } = useAppSelector(
    (state) => state.screenFilesSlice
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getFiles({ id: id!, page: 1, name: searchInput }));
  }, []); //eslint-disable-line
  const handlePageChange = (_event: ChangeEvent<unknown>, newPage: number) => {
    dispatch(getFiles({ id: id!, page: newPage, name: searchInput }));
  };
  const getComponent = (
    Element: ReactNode,
    apiStatus: ApiStatus,
    apiError: string
  ) => {
    switch (apiStatus) {
      case "SUCCESS":
        return Element;
      case "ERROR":
        return (
          <Box m={"auto"}>
            <Typography textAlign={"center"} variant="h6">
              {apiError}
            </Typography>
          </Box>
        );
      default:
        return (
          <Box m={"auto"}>
            <CircularProgress />
          </Box>
        );
    }
  };
  useEffect(() => {
    let timerId = setTimeout(() => {
      if (apiStatus !== "INITIAL")
        dispatch(getFiles({ id: id!, page: 1, name: searchInput }));
    }, 500);
    return () => clearInterval(timerId);
  }, [searchInput]); //eslint-disable-line
  return (
    <Stack direction={"column"} gap={4} sx={fileStyles.mainContainer}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexWrap={"wrap"}
      >
        <Typography sx={fileStyles.text}>Files</Typography>
        <TextField
          sx={screenStyles.textField}
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
                sx={screenStyles.textField.icon}
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
      </Stack>
      {getComponent(
        <Box sx={fileStyles.filesContainer}>
          {filesData.map((each, index) => (
            <CategoryCard
              key={index}
              mainImage={each.url}
              text={each.name}
              subText={each.size}
              id={index}
              containerProps={{ sx: fileStyles.card }}
              imageProps={{
                width: "100%",
                height: "180px",
                borderRadius: "20px",
                marginLeft: "-5px",
              }}
            />
          ))}
        </Box>,
        apiStatus,
        apiError
      )}
      {pagination.totalPages > 1 && (
        <Pagination
          count={pagination.totalPages}
          page={pagination.currentPage}
          onChange={handlePageChange}
        />
      )}
    </Stack>
  );
};

export default Files;
