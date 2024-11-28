import {
  Add,
  ArrowForward,
  Close,
  KeyboardArrowRight,
} from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Pagination,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, {
  ChangeEvent,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { endpoints } from "../../../config/config";
import { colors, hex2rgba } from "../../../config/theme";
import {
  createAndUpdateCard,
  deleteCard,
  readAllCards,
  resetSlice,
} from "../../../redux/reducers/superAdmin/CategoriesSlice";
import { useAppDispatch, useAppSelector } from "../../../utils/useRedux";
import { useRoutePermissions } from "../../../utils/useRoutePermissions";
import { cleanInputSetter, tokenWithUrl } from "../../../utils/utils";
import { CustomButton } from "../../common/customButton/CustomButton";
import DadzDropzone from "../../common/dropZone/DadzDropZone";
import CategoryCard from "../../common/imageViewer/CategoryCard";
import { InputField } from "../../common/inputField/InputField";
import MediaCard from "../../common/mediaCard/MediaCard";
import { ModalStyled } from "../../common/modal/CommonModal";
import { Magnifier, PlainDeleteIcon } from "../assets";
import { ApiStatus, commonStyles } from "../common/CommonStyles";
import { categoryStyles, screenGroupsStyles } from "./CategoriesStyles";
import ScreenGroupsForm from "./ScreenGroupsForm";
import ScreensForm from "./ScreensForm";
import { EachCard } from "./types";

export type BreadCrumb =
  | "GENRE"
  | "CATEGORY"
  | "SUB_CATEGORY"
  | "SCREEN_GROUPS"
  | "SCREENS";
interface BreadCrumbType {
  name: BreadCrumb;
  text: string;
}

interface IState {
  activeBreadCrumb: BreadCrumb;
  searchInput: string;
  activeCardId: number;
  uploadedImages: File[] | string[];
  fieldName: string;
  errorObj: {
    files: string;
    name: string;
  };
  actionType: "CREATE" | "READ" | "UPDATE" | "DELETE" | "NONE";
}
const breadCrumbs: BreadCrumbType[] = [
  {
    name: "GENRE",
    text: "Genre",
  },
  {
    name: "CATEGORY",
    text: "Category",
  },
  {
    name: "SUB_CATEGORY",
    text: "Sub Category",
  },
  {
    name: "SCREEN_GROUPS",
    text: "Screen Groups",
  },
  {
    name: "SCREENS",
    text: "Screens",
  },
];

interface IProps {
  active: BreadCrumb;
}

const Categories = ({ active }: IProps) => {
  const navigate = useNavigate();
  const { categoryId, genreId, screenGroupId, subCategoryId } = useParams();
  const [searchInput, setSearchInput] = useState<IState["searchInput"]>("");
  const [activeBreadCrumb, setActiveBreadCrumb] =
    useState<IState["activeBreadCrumb"]>("GENRE");
  const [activeCardId, setActiveCardId] = useState<IState["activeCardId"]>(-1);
  const [uploadedImages, setUploadedImages] = useState<
    IState["uploadedImages"]
  >([]);
  const [fieldName, setFieldName] = useState<IState["fieldName"]>("");
  const { allApiStatus, cardsData, allApiErrors, totalPages, currentPage } =
    useAppSelector((state) => state.CategoriesSlice);
  const [originalPage, setOriginalPage] = useState<number>(currentPage);
  const dispatch = useAppDispatch();
  const pageChangeHandler = (page: number) => {
    if (currentPage === page) return;
    getCardsData(page);
  };
  const getReadArguments = (page?: number, input?: string) => {
    const searchValue = input ?? searchInput;
    switch (active) {
      case "GENRE":
        return (
          endpoints.GET_GENRES +
          `?page=${page ?? originalPage}${
            searchValue && "&genreName=" + searchValue
          }`
        );
      case "CATEGORY":
        return `${endpoints.GET_CATEGORIES}?genreIds=${genreId}&page=${
          page ?? originalPage
        }${searchValue && "&categoryName=" + searchValue}`;
      case "SUB_CATEGORY":
        return `${
          endpoints.GET_SUB_CATEGORIES
        }?categoryIds=${categoryId}&page=${page ?? originalPage}${
          searchValue && "&subCategoryName=" + searchValue
        }`;
      case "SCREEN_GROUPS":
        return `${
          endpoints.GET_SCREEN_GROUPS
        }?subCategoryIds=${subCategoryId}&page=${page ?? originalPage}${
          searchValue && "&screenGroupName=" + searchValue
        }`;
      default:
        return `${endpoints.GET_SCREENS}?screenGroupIds=${screenGroupId}&page=${
          page ?? originalPage
        }${searchValue && "&screenName=" + searchValue}`;
    }
  };
  const getCardsData = (page?: number, input?: string) => {
    dispatch(readAllCards(getReadArguments(page, input)));
  };
  useEffect(() => {
    const id = setTimeout(() => {
      if (allApiStatus.readApi !== "INITIAL") {
        if (!searchInput) getCardsData(originalPage);
        else getCardsData(1, searchInput);
      }
    }, 750);
    return () => {
      clearTimeout(id);
    }; //eslint-disable-next-line
  }, [searchInput]);
  useEffect(() => {
    dispatch(resetSlice());
    setActiveCardId(-1);
    reInitializeStates();
    setSearchInput("");
    setOriginalPage(1);
    setActiveBreadCrumb(active);
    setActiveCardId(-1);
    getCardsData(1); //eslint-disable-next-line
  }, [active]);
  useEffect(() => {
    if (allApiStatus.readApi === "SUCCESS") {
      if (searchInput === "") setOriginalPage(currentPage);
      setActiveCardId(-1);
    } //eslint-disable-next-line
  }, [allApiStatus.readApi]);
  useEffect(() => {
    if (allApiStatus.createAndUpdateApi === "SUCCESS") {
      reInitializeStates();
      dispatch(readAllCards(getReadArguments(currentPage)));
    }
    if (allApiStatus.deleteApi === "SUCCESS") {
      reInitializeStates();
      dispatch(
        readAllCards(
          getReadArguments(
            cardsData.length === 1 ? currentPage - 1 : currentPage
          )
        )
      );
    }
  }, [allApiStatus.createAndUpdateApi, allApiStatus.deleteApi]); //eslint-disable-line

  const fieldHandler = (event: ChangeEvent<HTMLInputElement>) =>
    cleanInputSetter(event.target.value, setFieldName);
  const [errorObj, setErrorObj] = useState<IState["errorObj"]>({
    files: "",
    name: "",
  });
  const [actionType, setActionType] = useState<IState["actionType"]>("NONE");

  const handleSearchInput = (input: string) => {
    setSearchInput(input);
  };
  const handleRemoveSearchInput = () => {
    setSearchInput("");
  };
  const getUrlLink = (name: BreadCrumb) => {
    switch (name) {
      case "CATEGORY":
        return `/Categories/${genreId}`;
      case "SUB_CATEGORY":
        return `/Categories/${genreId}/types/${categoryId}`;
      case "SCREEN_GROUPS":
        return `/Categories/${genreId}/types/${categoryId}/subCategory/${subCategoryId}`;
      case "SCREENS":
        return `/Categories/${genreId}/types/${categoryId}/subCategory/${subCategoryId}/screenGroup/${screenGroupId}`;
      default:
        return "/Categories";
    }
  };
  const breadCrumbButton = (
    activeObj: BreadCrumbType,
    needEndIcon: boolean = false
  ) => {
    return (
      <Link to={getUrlLink(activeObj.name)}>
        <Button
          variant="text"
          endIcon={needEndIcon && <KeyboardArrowRight />}
          sx={
            needEndIcon
              ? categoryStyles.inActiveBreadCrumbBtn
              : categoryStyles.activeBreadCrumbBtn
          }
          onClick={() => handlerBreadCrumbClick(activeObj.name)}
          disableRipple
          disableElevation
          disableTouchRipple
          disableFocusRipple
        >
          {activeObj.text}
        </Button>
      </Link>
    );
  };
  const handlerBreadCrumbClick = (name: BreadCrumb) => {
    setActiveBreadCrumb(name);
  };
  const moveForward = () => {
    if (activeBreadCrumb === "SCREENS") return;
    switch (activeBreadCrumb) {
      case "GENRE":
        navigate(`/Categories/${activeCardId}`);
        break;
      case "CATEGORY":
        navigate(`types/${activeCardId}`);
        break;
      case "SUB_CATEGORY":
        navigate(`subCategory/${activeCardId}`);
        break;
      case "SCREEN_GROUPS":
        navigate(`screenGroup/${activeCardId}`);
        break;
      default:
        navigate(`/Categories/${activeCardId}`);
    }
  };
  const cardClickHandler = (id: number) => {
    setActiveCardId(id);
  };
  const createSubmission = () => {
    const body = new FormData();
    for (let image of uploadedImages)
      if (typeof image !== "string") body.append("image", image);
    if (activeBreadCrumb === "GENRE") {
      body.append("genreName", fieldName);
      dispatch(
        createAndUpdateCard({
          body,
          endPoint: endpoints.GET_GENRES,
          method: "POST",
        })
      );
    } else if (activeBreadCrumb === "CATEGORY") {
      body.append("categoryName", fieldName);
      body.append("genreId", genreId?.toString() ?? "");
      dispatch(
        createAndUpdateCard({
          body,
          endPoint: endpoints.GET_CATEGORIES,
          method: "POST",
        })
      );
    } else if (activeBreadCrumb === "SUB_CATEGORY") {
      body.append("subCategoryName", fieldName);
      body.append("categoryId", categoryId?.toString() ?? "");
      dispatch(
        createAndUpdateCard({
          body,
          endPoint: endpoints.GET_SUB_CATEGORIES,
          method: "POST",
        })
      );
    }
  };
  const updateSubmission = () => {
    const body = new FormData();
    for (let image of uploadedImages)
      if (typeof image !== "string") body.append("image", image);
    switch (activeBreadCrumb) {
      case "GENRE":
        body.append("genreName", fieldName);
        dispatch(
          createAndUpdateCard({
            body,
            endPoint: endpoints.GET_GENRES + "/" + activeCardId,
            method: "PUT",
          })
        );
        break;
      case "CATEGORY":
        body.append("categoryName", fieldName);
        dispatch(
          createAndUpdateCard({
            body,
            endPoint: endpoints.GET_CATEGORIES + "/" + activeCardId,
            method: "PUT",
          })
        );
        break;
      default:
        body.append("subCategoryName", fieldName);
        dispatch(
          createAndUpdateCard({
            body,
            endPoint: endpoints.GET_SUB_CATEGORIES + "/" + activeCardId,
            method: "PUT",
          })
        );
    }
  };
  const handleSubmit = () => {
    const dummyErrorObj = { files: "", name: "" };
    if (uploadedImages.length === 0) {
      dummyErrorObj.files = "Required";
    }
    if (fieldName.length === 0) {
      dummyErrorObj.name = "Required";
    }
    if (Object.values(dummyErrorObj).every((each) => each.length === 0)) {
      if (actionType === "CREATE") createSubmission();
      else updateSubmission();
    } else {
      setErrorObj(dummyErrorObj);
    }
  };
  const fillingTheState = () => {
    const activeCard = cardsData.filter((each) => each.id === activeCardId)[0];
    switch (active) {
      case "GENRE":
        setFieldName(activeCard.genreName ?? "");
        setUploadedImages([activeCard.image?.url ?? ""]);
        break;
      case "CATEGORY":
        setFieldName(activeCard.categoryName ?? "");
        setUploadedImages([activeCard.image?.url ?? ""]);
        break;
      default:
        setFieldName(activeCard.subCategoryName ?? "");
        setUploadedImages([activeCard.image?.url ?? ""]);
        break;
    }
  };

  const crudHandler = (id: number, actionType: IState["actionType"]) => {
    reInitializeStates();
    setActiveCardId(id);
    setActionType(actionType);
    if (actionType === "UPDATE") {
      fillingTheState();
    }
  };
  const deleteSubmission = () => {
    switch (activeBreadCrumb) {
      case "GENRE":
        dispatch(deleteCard(endpoints.GET_GENRES + "/" + activeCardId));
        break;
      case "CATEGORY":
        dispatch(deleteCard(endpoints.GET_CATEGORIES + "/" + activeCardId));
        break;
      case "SCREEN_GROUPS":
        dispatch(deleteCard(endpoints.GET_SCREEN_GROUPS + "/" + activeCardId));
        break;
      case "SCREENS":
        dispatch(deleteCard(endpoints.GET_SCREENS + "/" + activeCardId));
        break;
      default:
        dispatch(deleteCard(endpoints.GET_SUB_CATEGORIES + "/" + activeCardId));
    }
  };
  const requiredBreadCrumb = useMemo(() => {
    for (let i = 0; i < breadCrumbs.length; i++) {
      if (breadCrumbs[i].name === activeBreadCrumb) {
        return breadCrumbs.slice(0, i + 1);
      }
    }
  }, [activeBreadCrumb]);
  const reInitializeStates = () => {
    setActionType("NONE");
    setUploadedImages([]);
    setErrorObj({ files: "", name: "" });
    setFieldName("");
  };
  const getSuitableTitle = useMemo(
    () => breadCrumbs.filter((each) => each.name === activeBreadCrumb)[0].text,
    [activeBreadCrumb]
  );
  const handleCloseGroupAndScreensModal = () => setActionType("NONE");
  const getSuitableForm = () => {
    if (activeBreadCrumb === "SCREEN_GROUPS") {
      return (
        <ScreenGroupsForm
          actionType={actionType}
          handleClose={handleCloseGroupAndScreensModal}
          subCategoryId={subCategoryId!}
          cardData={cardsData.filter((each) => each.id === activeCardId)[0]}
        />
      );
    } else if (activeBreadCrumb === "SCREENS") {
      return (
        <ScreensForm
          actionType={actionType}
          screenId={activeCardId}
          groupId={screenGroupId!}
        />
      );
    } else {
      return (
        <Box sx={categoryStyles.categoryModal}>
          <Typography sx={categoryStyles.titleText}>
            {actionType === "CREATE" ? "Add New" : "Edit"} {getSuitableTitle}
          </Typography>
          <DadzDropzone
            uploadFiles={uploadedImages}
            uploadFileSetter={setUploadedImages}
            boxStyle={{ height: "187px !important" }}
            imgStyle={{ height: 58, width: 58 }}
            helperText={errorObj.files ?? ""}
          />
          <InputField
            inputProps={{
              placeholder: getSuitableTitle + " Name",
              onChange: fieldHandler,
              value: fieldName,
              fullWidth: true,
              sx: categoryStyles.inputText,
              helperText: (
                <Typography height={12} color={colors.validate}>
                  {errorObj.name ?? ""}
                </Typography>
              ),
            }}
          />
          <CustomButton
            bgcolor={colors.primary}
            sx={{ height: 48, width: 202, alignSelf: "center" }}
            onClick={handleSubmit}
          >
            {actionType === "CREATE" ? "Add New" : "Save"}
          </CustomButton>
        </Box>
      );
    }
  };
  const getSuitableCard = (each: EachCard) => {
    switch (activeBreadCrumb) {
      case "SUB_CATEGORY":
        return (
          <Box
            width={190}
            height={210}
            onClick={() => cardClickHandler(each.id)}
          >
            <CategoryCard
              mainImage={each?.image?.url + ""}
              id={each.id}
              isSelect={activeCardId === each.id}
              text={each.subCategoryName!}
              onDelete={
                permissions.delete
                  ? () => crudHandler(each.id, "DELETE")
                  : undefined
              }
              onEdit={
                permissions.edit
                  ? () => crudHandler(each.id, "UPDATE")
                  : undefined
              }
              extraIcon={
                <IconButton
                  disableFocusRipple
                  disableRipple
                  disableTouchRipple
                  sx={categoryStyles.nextSmallIcon}
                  onClick={moveForward}
                >
                  <ArrowForward
                    fontSize="small"
                    sx={{ color: colors.primary }}
                  />
                </IconButton>
              }
            />
          </Box>
        );
      case "SCREEN_GROUPS":
        return (
          <Box
            width={190}
            height={260}
            onClick={() => cardClickHandler(each.id)}
            sx={screenGroupsStyles.screenGroupCardContainer}
          >
            <CategoryCard
              mainImage={each.screenGroupImage?.url + ""}
              id={each.id}
              isSelect={activeCardId === each.id}
              groupCount={each.screenImagesCount}
              groupImages={each.screenImages?.map((each) =>
                tokenWithUrl(each.url)
              )}
              text={each.screenGroupName ?? "static"}
              subText={each.screenGroupImage?.size}
              onDelete={
                permissions.delete
                  ? () => crudHandler(each.id, "DELETE")
                  : undefined
              }
              onEdit={
                permissions.edit
                  ? () => crudHandler(each.id, "UPDATE")
                  : undefined
              }
              extraIcon={
                <IconButton
                  disableFocusRipple
                  disableRipple
                  disableTouchRipple
                  sx={{
                    backgroundColor: hex2rgba(colors.primary, 0.2),
                    borderRadius: 1,
                    p: 0.6,
                  }}
                  onClick={moveForward}
                >
                  <ArrowForward
                    fontSize="small"
                    sx={{ color: colors.primary }}
                  />
                </IconButton>
              }
            />
          </Box>
        );
      case "SCREENS":
        return (
          <Box
            width={190}
            height={250}
            onClick={() => cardClickHandler(each.id)}
            sx={screenGroupsStyles.screenGroupCardContainer}
          >
            <CategoryCard
              mainImage={each.images?.length ? each.images[0].url : ""}
              id={each.id}
              isSelect={activeCardId === each.id}
              text={each.screenName ?? ""}
              subText={each.images?.length ? each.images[0].size : ""}
              onDelete={
                permissions.delete
                  ? () => crudHandler(each.id, "DELETE")
                  : undefined
              }
              onEdit={
                permissions.edit
                  ? () => crudHandler(each.id, "UPDATE")
                  : undefined
              }
            />
          </Box>
        );
      case "CATEGORY":
        return (
          <Box
            width={190}
            height={260}
            onClick={() => cardClickHandler(each.id)}
          >
            <MediaCard
              genreImg={tokenWithUrl(each.image?.url + "")}
              genreText={each.categoryName ?? ""}
              clickable={each.id === activeCardId}
              onDelete={
                permissions.delete
                  ? () => crudHandler(each.id, "DELETE")
                  : undefined
              }
              onEdit={
                permissions.edit
                  ? () => crudHandler(each.id, "UPDATE")
                  : undefined
              }
              extraIcon={
                <IconButton
                  disableFocusRipple
                  disableRipple
                  disableTouchRipple
                  sx={categoryStyles.defaultNextIcon}
                  onClick={moveForward}
                >
                  <ArrowForward sx={{ color: colors.primary }} />
                </IconButton>
              }
            />
          </Box>
        );
      default:
        return (
          <Box
            width={190}
            height={260}
            onClick={() => cardClickHandler(each.id)}
          >
            <MediaCard
              genreImg={tokenWithUrl(each.image?.url + "")}
              genreText={each.genreName ?? ""}
              clickable={each.id === activeCardId}
              onDelete={
                permissions.delete
                  ? () => crudHandler(each.id, "DELETE")
                  : undefined
              }
              onEdit={
                permissions.edit
                  ? () => crudHandler(each.id, "UPDATE")
                  : undefined
              }
              extraIcon={
                <IconButton
                  disableFocusRipple
                  disableRipple
                  disableTouchRipple
                  sx={categoryStyles.defaultNextIcon}
                  onClick={moveForward}
                >
                  <ArrowForward sx={{ color: colors.primary }} />
                </IconButton>
              }
            />
          </Box>
        );
    }
  };
  const getComponent = (
    status: ApiStatus,
    error: string,
    element: ReactNode
  ) => {
    if (status === "PENDING") {
      return (
        <Box m={"auto"}>
          <CircularProgress />
        </Box>
      );
    }
    if (status === "ERROR") {
      return (
        <Box m={"auto"}>
          <Typography variant="h6">
            {error.length > 0 ? error : "Something went wrong"}
          </Typography>
        </Box>
      );
    }
    return element;
  };
  const permissions = useRoutePermissions();

  return (
    <Paper elevation={0} sx={categoryStyles.mainPaperContainer}>
      <Box sx={categoryStyles.header}>
        <Box sx={categoryStyles.breadCrumbContainer}>
          {requiredBreadCrumb?.map((breadCrumb, index) => (
            <React.Fragment key={index + breadCrumb.name}>
              {breadCrumbButton(
                breadCrumb,
                activeBreadCrumb !== breadCrumb.name
              )}
            </React.Fragment>
          ))}
        </Box>
        <Box sx={categoryStyles.textFieldContainer}>
          <TextField
            sx={categoryStyles.textField}
            type="text"
            placeholder="Search"
            value={searchInput}
            onChange={(event) =>
              cleanInputSetter(event.target.value, handleSearchInput)
            }
            InputProps={{
              startAdornment: <Magnifier />,
              endAdornment: (
                <InputAdornment position="end">
                  <Close
                    cursor={"pointer"}
                    onClick={handleRemoveSearchInput}
                    sx={{
                      visibility: searchInput ? "visible" : "hidden",
                    }}
                  />
                </InputAdornment>
              ),
            }}
          />
          {permissions.create && (
            <Button
              sx={categoryStyles.addNewBtn}
              endIcon={<Add />}
              variant="outlined"
              onClick={() => crudHandler(-1, "CREATE")}
            >
              Add New
            </Button>
          )}
        </Box>
      </Box>
      {getComponent(
        allApiStatus.readApi,
        allApiErrors.readApi,
        <Box
          sx={{
            ...categoryStyles.cardContainer,
            gridTemplateColumns: `repeat(auto-fill,minMax(${
              activeBreadCrumb === "SCREENS" ||
              activeBreadCrumb === "SCREEN_GROUPS"
                ? 180
                : 210
            }px,1fr))`,
          }}
        >
          {cardsData.map((each) => getSuitableCard(each))}
        </Box>
      )}
      <ModalStyled
        open={actionType === "CREATE" || actionType === "UPDATE"}
        isbgColor={
          activeBreadCrumb === "SCREENS" ? "" : colors.layoutBlack
        }
        onClose={reInitializeStates}
      >
        {getSuitableForm()}
      </ModalStyled>
      <ModalStyled
        open={actionType === "DELETE"}
        isClose={false}
        isbgColor={colors.lightBlack}
      >
        <Box sx={commonStyles.deleteModalBox}>
          <Box>
            <Typography sx={commonStyles.deleteAdsText}>
              Delete {activeBreadCrumb.replace('_',' ').toLocaleLowerCase()}
            </Typography>
            <Typography sx={commonStyles.areYouText}>
              Are you sure want to delete {activeBreadCrumb.replace('_',' ').toLocaleLowerCase()}?
            </Typography>
          </Box>
          <Box sx={commonStyles.buttonsBox}>
            <CustomButton
              bgcolor={colors.blueChalk}
              textColor={colors.black}
              width={128}
              onClick={() => setActionType("NONE")}
            >
              Cancel
            </CustomButton>
            <CustomButton
              bgcolor={colors.validate}
              width={158}
              onClick={deleteSubmission}
              endIcon={<PlainDeleteIcon />}
            >
              Delete
            </CustomButton>
          </Box>
        </Box>
      </ModalStyled>
      <Box>
        {totalPages > 1 && (
          <Pagination
            count={totalPages}
            page={currentPage}
            siblingCount={0}
            onChange={(_event, page) => pageChangeHandler(page)}
          />
        )}
      </Box>
    </Paper>
  );
};

export default Categories;
