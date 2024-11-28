import { Box, CircularProgress, Pagination, Typography } from "@mui/material";
import { useEffect } from "react";
import { translate } from "../../../config/i18n";
import { getGenre } from "../../../redux/reducers/userReducers/createCampaignSlice";
import { useAppDispatch, useAppSelector } from "../../../utils/useRedux";
import { tokenWithUrl } from "../../../utils/utils";
import MediaCard from "../../common/mediaCard/MediaCard";
import { addNewCampaign, mediaByGenre } from "./CommonStyles";

interface MediaByGenreProps {
  handleGenreClick: (genreText: string) => void;
  helperText: string;
}

const MediaByGenre = ({ handleGenreClick, helperText }: MediaByGenreProps) => {
  const { genreList, genreListErrorTxt, genrePagination, form, loading } =
    useAppSelector((state) => state.Campaign);
  const dispatch = useAppDispatch();
  const handlePagination = (page: number) => {
    dispatch(getGenre({ page: page, pageSize: genrePagination.pageSize }));
  };
  useEffect(() => {
    dispatch(
      getGenre({
        page: 1,
        pageSize: genrePagination.pageSize,
      })
    );
    // eslint-disable-next-line
  }, []);
  return (
    <Box>
      <Typography sx={addNewCampaign.title}>
        {translate("userFlow.mediaByGenre")}
      </Typography>
      <Box textAlign={"center"}>
        {genreListErrorTxt && !loading && (
          <Typography sx={mediaByGenre.errorTxt}>
            {genreListErrorTxt}
          </Typography>
        )}
        {loading && <CircularProgress size={"25px"} />}
      </Box>
      {genreListErrorTxt === "" && genreList.length > 0 && !loading && (
        <>
          <Typography sx={mediaByGenre.helperTxt}>{helperText}</Typography>
          <Box sx={mediaByGenre.flexWrap}>
            {genreList.map((item) => (
              <Box
                key={item.id}
                onClick={() => handleGenreClick(item.id.toString())}
                component={"article"}
              >
                <MediaCard
                  genreText={item.genreName}
                  genreImg={tokenWithUrl(item?.image?.url ?? "")}
                  doneIcon={form.selectedGenre === item.id.toString()}
                  styles={mediaByGenre.mediaCard}
                />
              </Box>
            ))}
          </Box>
          {genrePagination.totalPages > 1 ? (
            <Pagination
              page={genrePagination.currentPage}
              count={genrePagination.totalPages}
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

export default MediaByGenre;
