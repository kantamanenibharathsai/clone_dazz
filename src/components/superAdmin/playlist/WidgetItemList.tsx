import { DeleteOutline, Edit } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import WestIcon from "@mui/icons-material/West";
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  Modal,
  SxProps,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  Widget,
  addSubWidgets,
  deleteLayoutSubWidget,
  getLayoutSubWidgets,
  onAddZoneData,
  onDragStart,
  onDropAndAdd,
  onRemoveWidget,
  selectedMedia,
} from "../../../redux/reducers/layoutsReducer/layouts";
import { IWidget } from "../../../redux/reducers/superAdmin/WidgetsSlice";
import { useAppDispatch, useAppSelector } from "../../../utils/useRedux";
import { handleCardLayoutPlaceHolder } from "../../../utils/utils";
import { InputField } from "../../common/inputField/InputField";
import { playlistStyles } from "./playlistStyles";
import WidgetGenerator from "./WidgetGenerator";

interface IProps {
  selectedWidget: IWidget | null;
  onGoBack: () => void;
}

interface IState {
  searchKey: string;
  selectedWidgetItem: null | Widget;
}

const WidgetItemList: React.FC<IProps> = ({ selectedWidget, onGoBack }) => {
  const {
    selectedWidget: selectedPlaygroundWidget,
    mediaPage,
    subWidgets,
  } = useAppSelector((state) => state.layoutsSlice);
  const [searchKey, setSearchKey] = useState<IState["searchKey"]>("");
  const [selectedWidgetItem, setSelectedWidgetItem] =
    useState<IState["selectedWidgetItem"]>(null);
  const dispatch = useAppDispatch();

  const closeWidgetPreview = () => {
    setSelectedWidgetItem(null);
  };

  const addNewWidget = () => {
    if(!subWidgets[subWidgets.length-1]?.subWidgetImage&&subWidgets.length>=1)return;
    dispatch(
      addSubWidgets({
        id: -1,
        name: selectedWidget?.widgetName,
        text: selectedWidget?.widgetName,
        subWidgetImage: null,
      })
    );
  };

  const handleRemove = async(item:{id: number;
    name: string;
    text: string;
    subWidgetImage: string | null;}) => {
    if(item.subWidgetImage){
     const response=await dispatch(deleteLayoutSubWidget(item.id));
     if(response.meta.requestStatus==="fulfilled"){
      dispatch(
        getLayoutSubWidgets({
          widgetId: selectedWidget?.id ?? 0,
          page: mediaPage.currentPage,
        })
      );
     }
    }
    dispatch(onRemoveWidget(item.id));
  };

  const handleDragStart = (item: {
    id: number;
    name: string;
    text: string;
    subWidgetImage: string | null;
  }) => {
    dispatch(selectedMedia({ type: "widget", id: item.id }));
    dispatch(
      onDragStart({
        id: item.id,
        name: item.name,
        type: "widget",
        html: "",
        url: item?.subWidgetImage,
      })
    );
  };
  
  const handleAddWidget = (item: {
    id: number;
    name: string;
    text: string;
    subWidgetImage: string | null;
  }) => {
    if (selectedPlaygroundWidget) {
      dispatch(selectedMedia({ type: "widget", id: item.id }));
      dispatch(
        onAddZoneData({
          mediaType: "widget",
          path: item?.subWidgetImage,
          id: selectedPlaygroundWidget?.id,
          mediaId: item.id,
          name: item.name,
        })
      );
    } else {
      dispatch(selectedMedia({ type: "widget", id: item.id }));
      dispatch(
        onDropAndAdd({
          id: item.id,
          mediaType: "widget",
          path: item?.subWidgetImage,
          mediaId: item.id,
          name: item.name,
        })
      );
    }
  };
  
  useEffect(() => {
    dispatch(
      getLayoutSubWidgets({
        widgetId: selectedWidget?.id ?? 0,
        page: mediaPage.currentPage,
      })
    );
  }, []); //eslint-disable-line
  return (
    <>
      <Grid item xs={12}>
        <Box sx={{ px: "15px" }}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              gap: 2,
            }}
          >
            <Button
              variant="outlined"
              endIcon={<WestIcon />}
              sx={styles.iconButton}
              onClick={onGoBack}
            />
            <Box flex={1}>
              <InputField
                inputProps={{
                  placeholder: "Search",
                  sx: playlistStyles.inputField,
                  InputProps: {
                    sx: playlistStyles.inputProps,
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        sx={{ cursor: "pointer" }}
                      >
                        <SearchSharpIcon />
                      </InputAdornment>
                    ),
                    onChange: (event) => setSearchKey(event.target.value),
                    value: searchKey,
                  },
                }}
              />
            </Box>
            <Button
              variant="contained"
              endIcon={<AddIcon />}
              sx={styles.iconButton}
              onClick={addNewWidget}
            />
          </Box>
        </Box>
        <Grid container>
          {subWidgets.length > 0 ? (
            subWidgets.map((item) => (
              <Grid key={item.id} item xs={6} padding={"10px"}>
                <Box sx={styles.card}>
                  <Box
                    draggable={true}
                    component="img"
                    sx={styles.cardImage}
                    alt="Draggable Item"
                    src={selectedWidget?.widgetImage}
                    onError={handleCardLayoutPlaceHolder}
                    onClick={() => handleAddWidget(item)}
                    onDragStart={() => handleDragStart(item)}
                  />
                  <Box sx={styles.cardContent}>
                    <Typography
                      sx={styles.itemName}
                      onClick={() => handleAddWidget(item)}
                    >
                      {item.name}
                    </Typography>
                    <Box sx={styles.cardButtonGroup}>
                      <Button
                        variant="outlined"
                        endIcon={<Edit />}
                        sx={styles.iconButton}
                        onClick={() =>
                          setSelectedWidgetItem({
                            id: item.id,
                            name: item.name,
                            type: "",
                            html: "",
                            url: item?.subWidgetImage??"",
                          })
                        }
                      />
                      <Button
                        variant="outlined"
                        endIcon={<DeleteOutline />}
                        sx={styles.iconButton}
                        color="error"
                        onClick={() => handleRemove(item)}
                      />
                    </Box>
                  </Box>
                </Box>
              </Grid>
            ))
          ) : (
            <Typography sx={styles.noDataMsg}>Widget not added yet!</Typography>
          )}
        </Grid>
      </Grid>
      {selectedWidgetItem && (
        <Modal
          open={!!selectedWidgetItem}
          onClose={closeWidgetPreview}
          aria-labelledby="preview-modal-title"
          aria-describedby="preview-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "#F1FAFF",
              boxShadow: 24,
              width: "95vw",
              minHeight: "75vh",
              borderRadius: "10px",
            }}
          >
            <CloseIcon
              sx={{
                position: "absolute",
                top: "-10px",
                right: "-10px",
                color: "white",
                backgroundColor: "red",
                p: 1,
                borderRadius: "50px",
                cursor: "pointer",
                width: "30px",
                height: "30px",
              }}
              onClick={closeWidgetPreview}
            />
            <WidgetGenerator
              parentId={selectedWidget?.id??Date.now()}
              widgetName={selectedWidgetItem.name}
              selectedWidgetItem={selectedWidgetItem}
              closeWidgetPreview={closeWidgetPreview}
            />
          </Box>
        </Modal>
      )}
    </>
  );
};

const styles = {
  iconButton: {
    ".MuiButton-icon": { margin: 0 },
    minWidth: 0,
    borderRadius: 20,
  },
  card: {
    borderRadius: "10px",
    display: "flex",
    border: "1px solid #ccc",
    flexDirection: "column",
    overflow: "hidden",
  },
  cardImage: {
    cursor: "pointer",
    width: "100%",
  },
  cardContent: {
    p: 1,
  },
  cardButtonGroup: {
    display: "flex",
    gap: 1,
    mt: 1,
  },
  noDataMsg: {
    textAlign: "center",
    width: "100%",
    mt: 4,
  },
  itemName: {
    cursor: "pointer",
  },
} satisfies Record<string, SxProps>;

export default WidgetItemList;
