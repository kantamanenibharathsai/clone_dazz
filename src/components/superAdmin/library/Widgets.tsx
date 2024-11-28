import {
  Add,
  ArrowBack,
  ArrowForward,
  ChevronLeft,
  ChevronRight,
  Close,
} from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  IconButton,
  InputAdornment,
  ListItemText,
  Pagination,
  PaginationItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import { colors } from "../../../config/theme";
import { CustomButton } from "../../common/customButton/CustomButton";
import { InputField } from "../../common/inputField/InputField";
import { ModalStyled } from "../../common/modal/CommonModal";
import { searchIcon } from "../assets";
import { libraryStyles } from "./libraryStyles";
import { layOutStyles } from "../../common/cardLayout/CardLayoutStyles";
import { editIcon, layOutDelete } from "../../common/assets";
import { useAppDispatch, useAppSelector } from "../../../utils/useRedux";
import {
  deleteSubWidget,
  deleteWidget,
  getSubWidgets,
  getWidgets,
  ISubWidget,
  IWidget,
  uploadOrUpdateSubWidget,
  uploadOrUpdateWidget,
} from "../../../redux/reducers/superAdmin/WidgetsSlice";
import {
  handleCardLayoutPlaceHolder,
  tokenWithUrl,
} from "../../../utils/utils";
import DadzsDropzone from "../../common/dropZone/DadzDropZone";
import { Title } from "../../common/inputField/InputFieldStyles";
import { logsStyles } from "../../host/settings/logs/logsStyles";
import { LoadingStatus } from "../../../redux/reducers/common/logsSlice";
import { screenAdsStyles } from "../../host/screenAds/ScreenAdsStyles";
import { displayAlert } from "../../../utils/toastMessage";
import { screenStyles } from "../../admin/screens/ScreenStyles";
import { useRoutePermissions } from "../../../utils/useRoutePermissions";
interface IState {
  data: {
    name: string;
    url: File[] | string[];
  };
  subWidgetData: {
    name: string;
    url: string;
  };
  errorsData: {
    name: string;
    url: string;
  };
  booleanType: boolean;
  modalType: "UPLOAD" | "UPDATE";
  stringType: string;
  numberType: number;
}
const Widgets = () => {
  const [isOpenModal, setIsOpenModal] = useState<IState["booleanType"]>(false);
  const [data, setData] = useState<IState["data"]>({
    name: "",
    url: [],
  });
  const [subWidgetData, setSubWidgetData] = useState<IState["subWidgetData"]>({
    name: "",
    url: "",
  });
  const [errors, setErrors] = useState<IState["errorsData"]>({
    name: "",
    url: "",
  });
  const [modalType, setModalType] = useState<IState["modalType"]>("UPDATE");
  const [currentWidgetName, setCurrentWidgetName] =
    useState<IState["stringType"]>("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] =
    useState<IState["booleanType"]>(false);
  const [currentWidgetUrl, setCurrentWidgetUrl] =
    useState<IState["stringType"]>("");
  const [searchInput, setSearchInput] = useState<IState["stringType"]>("");
  const [widgetId, setWidgetId] = useState<IState["numberType"]>(0);
  const [currentPage, setCurrentPage] = useState<IState["numberType"]>(1);
  const [isParentWidget, setIsParentWidget] =
    useState<IState["booleanType"]>(true);
  const [currentWidget, setCurrentWidget] = useState<IWidget | null>(null);
  const [currentSubWidget, setCurrentSubWidget] = useState<ISubWidget | null>(
    null
  );
  const [widgetName, setWidgetName] = useState("");
  const nameValidation = (name: string) => {
    if (name === "") {
      return "Required";
    } else if (/^[a-zA-Z0-9 ]/.test(name) === false) {
      return "Only Alphabets and Numbers are allowed";
    } else if (name.length > 20) {
      return "Maximum 20 characters are allowed";
    } else {
      return "";
    }
  };
  const dispatch = useAppDispatch();
  const { widgets, subWidgets } = useAppSelector((state) => state.WidgetsSlice);
  const validate = () => {
    const dummyErrors = {} as IState["errorsData"];
    dummyErrors.name = nameValidation(
      isParentWidget ? data.name : subWidgetData.name
    );
    if (isParentWidget) {
      if (data.url.length === 0) {
        dummyErrors.url = "Required";
      } else {
        dummyErrors.url = "";
      }
    } else {
      if (subWidgetData.url.length === 0) {
        dummyErrors.url = "Required";
      } else if (!/^(http|https):\/\/[^ "]+$/.test(subWidgetData.url)) {
        dummyErrors.url = "Invalid URL";
      } else {
        dummyErrors.url = "";
      }
    }
    setErrors(dummyErrors);
    return Object.values(dummyErrors).every((value) => value === "");
  };
  const dispatchFunction = async () => {
    const formData = new FormData();
    if (
      (modalType === "UPDATE" && data.name !== currentWidgetName) ||
      modalType === "UPLOAD"
    ) {
      formData.append("widgetName", data.name);
    }
    formData.append("widgetImage", data.url[0]);
    const uploadOrUpdateWidgetDispatch = await dispatch(
      uploadOrUpdateWidget({
        formData: formData,
        type: modalType,
        widgetId: widgetId,
      })
    );
    if (uploadOrUpdateWidgetDispatch.meta.requestStatus === "fulfilled") {
      await dispatch(getWidgets({ searchWidget: "", page: 1 }));
      setIsOpenModal(false);
      setData({ name: "", url: [] });
    }
  };
  const SubWidgetDispatchF = async () => {
    const formData = new FormData();
    formData.append(
      modalType === "UPLOAD" ? "widgetId" : "subWidgetId",
      modalType === "UPLOAD"
        ? currentWidget!.id.toString()
        : currentSubWidget!.id.toString()
    );
    formData.append("name", subWidgetData.name);
    formData.append("text", subWidgetData.url);
    const uploadOrUpdateSubWidgetDispatch = await dispatch(
      uploadOrUpdateSubWidget({
        formData: formData,
        type: modalType,
      })
    );
    if (uploadOrUpdateSubWidgetDispatch.meta.requestStatus === "fulfilled") {
      handleGetSubWidgets();
      setIsOpenModal(false);
      setSubWidgetData({ name: "", url: "" });
    }
  };
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validate()) {
      if (isParentWidget) {
        if (
          modalType === "UPDATE" &&
          currentWidgetName === data.name &&
          currentWidgetUrl === data.url[0]
        ) {
          displayAlert("Please change the widget name or image", "error");
        } else {
          dispatchFunction();
        }
      } else {
        if (
          modalType === "UPDATE" &&
          currentSubWidget!.name === subWidgetData.name &&
          currentSubWidget!.text === subWidgetData.url
        ) {
          displayAlert("Please change the Sub widget name or URL", "error");
        } else {
          SubWidgetDispatchF();
        }
      }
    }
  };
  const handleDeleteModalOpen = (widgetId: number, widgetName: string) => {
    setIsDeleteModalOpen(true);
    setWidgetId(widgetId);
    setWidgetName(widgetName);
  };
  const handleDleteModalClose = () => {
    setIsDeleteModalOpen(false);
  };
  const handleDeleteWidget = async () => {
    if (isParentWidget) {
      const deleteWidgetDispatch = await dispatch(deleteWidget(widgetId));
      if (deleteWidgetDispatch.payload.statusCode === "200") {
        handleDleteModalClose();
        setCurrentPage(1);
      }
    } else {
      const deleteWidgetDispatch = await dispatch(deleteSubWidget(widgetId));
      if (deleteWidgetDispatch.payload.statusCode === "200") {
        handleDleteModalClose();
        setCurrentPage(1);
        handleGetSubWidgets();
      }
    }
  };
  const handleFileOnChange = (file: File[]) => {
    setData({ ...data, url: file });
    setErrors({ ...errors, url: "" });
  };
  const handleSearchInput = (input: IState["stringType"]) => {
    setCurrentPage(1);
    setSearchInput(input);
  };
  const handleRemoveSearchInput = () => {
    setSearchInput("");
  };
  const handleModalOpen = (modalType: IState["modalType"]) => {
    setModalType(modalType);
    setIsOpenModal(true);
  };

  const handleModalClose = () => {
    setIsOpenModal(false);
    setData({ name: "", url: [] });
    setCurrentWidgetName("");
    setCurrentWidgetUrl("");
    setErrors({
      name: "",
      url: "",
    });
    setSubWidgetData({
      name: "",
      url: "",
    });
  };
  const handleJSXSubwidget = (widget: IWidget) => {
    setCurrentWidget(widget);
    setIsParentWidget(false);
    setCurrentPage(1);
  };
  const handleJSXMainWidget = () => {
    setIsParentWidget(true);
  };
  const handleEditWidget = (
    widget: IWidget,
    modalType: IState["modalType"]
  ) => {
    setWidgetId(widget.id);
    handleModalOpen(modalType);
    setCurrentWidgetUrl(widget.widgetImage);
    setCurrentWidgetName(widget.widgetName);
    setData({
      name: widget.widgetName,
      url: [widget.widgetImage],
    });
  };
  const handleEditSubWidget = (
    subWidget: ISubWidget,
    modalType: IState["modalType"]
  ) => {
    handleModalOpen(modalType);
    setCurrentSubWidget(subWidget);
    setSubWidgetData({ name: subWidget.name, url: subWidget.text });
  };

  const dataStatusJSX = (
    data: ISubWidget[] | IWidget[],
    status: LoadingStatus,
    message: string
  ) => {
    if (data && data.length === 0)
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
  const handleGetSubWidgets = () => {
    dispatch(
      getSubWidgets({ subWidgetId: currentWidget?.id!, page: currentPage })
    );
  };
  const permissions = useRoutePermissions();
  useEffect(() => {
    if (searchInput.length === 0) {
      if (isParentWidget) {
        dispatch(getWidgets({ searchWidget: searchInput, page: currentPage }));
      } else {
        handleGetSubWidgets();
      }
    } else {
      const debounce = setTimeout(() => {
        if (isParentWidget) {
          dispatch(
            getWidgets({ searchWidget: searchInput, page: currentPage })
          );
        } else {
          handleGetSubWidgets();
        }
      }, 1500);
      return () => clearTimeout(debounce);
    }
    //eslint-disable-next-line
  }, [searchInput, currentPage, dispatch, isParentWidget]);
  return (
    <>
      <Stack sx={{ ...libraryStyles.mainContainer, py: 2 }}>
        {!isParentWidget && (
          <IconButton
            onClick={handleJSXMainWidget}
            sx={layOutStyles.iconButton(colors.primary)}
          >
            <ArrowBack sx={libraryStyles.arrowForward} />
          </IconButton>
        )}
        <ListItemText
          primary={isParentWidget ? "All Widgets" : currentWidget?.widgetName}
          secondary={
            isParentWidget
              ? "TOTAL WIDGETS - " + widgets?.pagination?.totalItems
              : "TOTAL SUB WIDGETS - " + subWidgets.pagination?.totalItems
          }
          sx={libraryStyles.listText}
        />
        {permissions.create && (
          <CustomButton
            sx={libraryStyles.uploadBtn}
            endIcon={<Add />}
            onClick={() => handleModalOpen("UPLOAD")}
          >
            Upload
          </CustomButton>
        )}
        {isParentWidget && (
          <TextField
            sx={libraryStyles.textField}
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
                  sx={libraryStyles.textField.icon}
                  src={searchIcon}
                />
              ),
              endAdornment: searchInput && (
                <InputAdornment position="end">
                  <Close cursor={"pointer"} onClick={handleRemoveSearchInput} />
                </InputAdornment>
              ),
            }}
          />
        )}
      </Stack>
      <Box sx={libraryStyles.widgetsContainer}>
        {isParentWidget ? (
          <Box>
            {dataStatusJSX(
              widgets.widgetsData,
              widgets.loadingStatus,
              widgets.message
            ) && (
              <Box sx={screenAdsStyles.loadingBox}>
                {dataStatusJSX(
                  widgets.widgetsData,
                  widgets.loadingStatus,
                  widgets.message
                )}
              </Box>
            )}
            <Box sx={libraryStyles.widgetsMainBox}>
              {widgets.loadingStatus === "FULFILLED" &&
                widgets.widgetsData &&
                widgets.widgetsData.length > 0 &&
                widgets.widgetsData.map((widget) => (
                  <Box sx={libraryStyles.widgetBox} key={widget.id}>
                    <Box
                      component={"img"}
                      loading="lazy"
                      src={tokenWithUrl(widget.widgetImage)}
                      width={"100%"}
                      borderRadius={"10px"}
                      onError={handleCardLayoutPlaceHolder}
                      sx={libraryStyles.image}
                    />
                    <Box id="iconsBox">
                      {permissions.edit && (
                        <IconButton
                          onClick={() => handleEditWidget(widget, "UPDATE")}
                          sx={layOutStyles.iconButton(colors.lightGreen)}
                        >
                          <Box
                            component={"img"}
                            src={editIcon}
                            sx={layOutStyles.edit}
                            alt="Card Layout image"
                          />
                        </IconButton>
                      )}
                      {permissions.delete && (
                        <IconButton
                          onClick={() =>
                            handleDeleteModalOpen(widget.id, widget.widgetName)
                          }
                          sx={layOutStyles.iconButton(colors.validate)}
                        >
                          <Box
                            component={"img"}
                            src={layOutDelete}
                            sx={layOutStyles.edit}
                          />
                        </IconButton>
                      )}
                      <IconButton
                        onClick={() => handleJSXSubwidget(widget)}
                        sx={layOutStyles.iconButton(colors.primary)}
                      >
                        <ArrowForward sx={libraryStyles.arrowForward} />
                      </IconButton>
                    </Box>
                  </Box>
                ))}
            </Box>
          </Box>
        ) : (
          <Box>
            {dataStatusJSX(
              subWidgets.subWidgetsData,
              subWidgets.loadingStatus,
              subWidgets.message
            ) && (
              <Box sx={screenAdsStyles.loadingBox}>
                {dataStatusJSX(
                  subWidgets.subWidgetsData,
                  subWidgets.loadingStatus,
                  subWidgets.message
                )}
              </Box>
            )}
            <Box sx={libraryStyles.subWidgetsMainBox}>
              {subWidgets.loadingStatus === "FULFILLED" &&
                subWidgets.subWidgetsData &&
                subWidgets.subWidgetsData.length > 0 &&
                subWidgets.subWidgetsData.map((subWidget) => (
                  <Box sx={libraryStyles.subWidgetBox} key={subWidget.id}>
                    <Box
                      component={"img"}
                      loading="lazy"
                      src={tokenWithUrl(currentWidget?.widgetImage)}
                      width={"100%"}
                      onError={handleCardLayoutPlaceHolder}
                      sx={libraryStyles.subWidgetBox.image}
                    />
                    <Box sx={libraryStyles.subWidgetContentBox}>
                      <Typography
                        sx={libraryStyles.subWidgetContentBox.text}
                        title={subWidget.name}
                      >
                        {subWidget.name}
                      </Typography>
                      {(permissions.edit || permissions.delete) && (
                        <Box sx={libraryStyles.subWidgetContentBox.iconsBox}>
                          {permissions.edit && (
                            <IconButton
                              onClick={() =>
                                handleEditSubWidget(subWidget, "UPDATE")
                              }
                              sx={layOutStyles.iconButton(colors.lightGreen)}
                            >
                              <Box
                                component={"img"}
                                src={editIcon}
                                sx={layOutStyles.edit}
                                alt="Card Layout image"
                              />
                            </IconButton>
                          )}
                          {permissions.delete && (
                            <IconButton
                              onClick={() =>
                                handleDeleteModalOpen(
                                  subWidget.id,
                                  subWidget.name
                                )
                              }
                              sx={layOutStyles.iconButton(colors.validate)}
                            >
                              <Box
                                component={"img"}
                                src={layOutDelete}
                                sx={layOutStyles.edit}
                              />
                            </IconButton>
                          )}
                        </Box>
                      )}
                    </Box>
                  </Box>
                ))}
            </Box>
          </Box>
        )}
        {isParentWidget ? (
          <>
            {widgets.loadingStatus === "FULFILLED" &&
              widgets.widgetsData.length > 0 &&
              widgets.pagination?.totalPages &&
              widgets.pagination?.totalPages > 1 && (
                <Box sx={libraryStyles.paginationBox}>
                  <Pagination
                    count={widgets.pagination?.totalPages}
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
          </>
        ) : (
          <>
            {subWidgets.loadingStatus === "FULFILLED" &&
              subWidgets.subWidgetsData.length > 0 &&
              subWidgets.pagination?.totalPages! > 1 && (
                <Box sx={libraryStyles.paginationBox}>
                  <Pagination
                    count={subWidgets.pagination?.totalPages}
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
          </>
        )}
      </Box>
      <ModalStyled
        isbgColor={colors.layoutBlack}
        open={isOpenModal}
        isClose
        onClose={handleModalClose}
        handleClose={handleModalClose}
      >
        <Box
          display={"flex"}
          component={"form"}
          flexDirection={"column"}
          rowGap={3}
          width={"75vw"}
          maxWidth={"350px"}
          onSubmit={handleSubmit}
        >
          <Typography
            fontSize={{ xs: "18px", md: "22px" }}
            color={colors.white}
            fontWeight={500}
          >
            {modalType === "UPLOAD" ? " Add New" : "Update"}
            {!isParentWidget && " Sub"} Widget
          </Typography>
          {isParentWidget ? (
            <>
              <Box sx={libraryStyles.textLabel}>
                <InputField
                  fieldName={"Widget Name"}
                  textProps={{ color: colors.white }}
                  inputProps={{
                    value: data.name,
                    fullWidth: true,
                    sx: libraryStyles.input,
                    placeholder: "Enter Widget Name",
                    onChange: (event) => {
                      setData({ ...data, name: event.target.value });
                      setErrors((prev) => ({ ...prev, name: "" }));
                    },
                    helperText: (
                      <Typography color={colors.validate} height={12}>
                        {errors.name ?? ""}
                      </Typography>
                    ),
                    error: Boolean(errors.name),
                  }}
                />
              </Box>
              <Box sx={libraryStyles.textLabel}>
                <Title color={"white"}>Widget</Title>
                <DadzsDropzone
                  uploadFileSetter={handleFileOnChange}
                  uploadFiles={data.url}
                  helperText={errors.url}
                  boxStyle={{
                    height: 300,
                    borderRadius: 10,
                    width: "100%",
                    mx: "auto",
                  }}
                />
              </Box>
            </>
          ) : (
            <>
              <Box sx={libraryStyles.textLabel}>
                <InputField
                  fieldName={"Sub Widget Name"}
                  textProps={{ color: colors.white }}
                  inputProps={{
                    value: subWidgetData.name,
                    fullWidth: true,
                    sx: libraryStyles.input,
                    placeholder: "Enter sub widget name",
                    onChange: (event) => {
                      setSubWidgetData({
                        ...subWidgetData,
                        name: event.target.value,
                      });
                      setErrors((prev) => ({ ...prev, name: "" }));
                    },
                    helperText: (
                      <Typography color={colors.validate} height={12}>
                        {errors.name ?? ""}
                      </Typography>
                    ),
                    error: Boolean(errors.name),
                  }}
                />
              </Box>
              <Box sx={libraryStyles.textLabel}>
                <InputField
                  fieldName={"URL"}
                  textProps={{ color: colors.white }}
                  inputProps={{
                    value: subWidgetData.url,
                    fullWidth: true,
                    sx: libraryStyles.input,
                    placeholder: "Enter Widget Name",
                    onChange: (event) => {
                      setSubWidgetData({
                        ...subWidgetData,
                        url: event.target.value,
                      });
                      setErrors((prev) => ({ ...prev, url: "" }));
                    },
                    helperText: (
                      <Typography color={colors.validate} height={12}>
                        {errors.url ?? ""}
                      </Typography>
                    ),
                    error: Boolean(errors.url),
                  }}
                />
              </Box>
            </>
          )}
          <CustomButton
            bgcolor={colors.primary}
            width={"138px"}
            sx={{ alignSelf: "center" }}
            type="submit"
          >
            {modalType === "UPLOAD" ? "Save" : "Update"}
          </CustomButton>
        </Box>
      </ModalStyled>
      <ModalStyled
        open={isDeleteModalOpen}
        isClose={false}
        isbgColor={colors.lightBlack}
      >
        <Box sx={screenStyles.modalBox}>
          <Box>
            <Typography sx={screenStyles.deleteAdsText}>
              Delete {widgetName}
            </Typography>
            <Typography sx={screenStyles.areYouText}>
              Are you sure you want to delete this {!isParentWidget && " Sub"}{" "}
              widget?
            </Typography>
          </Box>
          <Box sx={screenStyles.buttonsBox}>
            <CustomButton
              bgcolor={colors.blueChalk}
              textColor={colors.black}
              width={128}
              onClick={handleDleteModalClose}
            >
              Cancel
            </CustomButton>
            <CustomButton
              bgcolor={colors.validate}
              width={158}
              onClick={handleDeleteWidget}
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
    </>
  );
};
export default Widgets;
