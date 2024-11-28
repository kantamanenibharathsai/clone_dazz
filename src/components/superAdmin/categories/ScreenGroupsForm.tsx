import { Box, Grid, Typography } from "@mui/material";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { endpoints } from "../../../config/config";
import { colors } from "../../../config/theme";
import { createAndUpdateCard } from "../../../redux/reducers/superAdmin/CategoriesSlice";
import { useAppDispatch } from "../../../utils/useRedux";
import { blockInvalidChar } from "../../../utils/utils";
import { CustomButton } from "../../common/customButton/CustomButton";
import DadzDropzone from "../../common/dropZone/DadzDropZone";
import { InputField } from "../../common/inputField/InputField";
import { categoryStyles, screenGroupsStyles } from "./CategoriesStyles";
import { EachCard } from "./types";

interface IState {
  uploadedImages: File[] | string[];
  formData: {
    name: string;
    groupName: string;
    description: string;
    CPM: string;
  };
  errorObj: {
    name: string;
    groupName: string;
    description: string;
    uploadedImages: string;
    CPM: string;
  };
}
interface IProps {
  actionType: "CREATE" | "READ" | "UPDATE" | "DELETE" | "NONE";
  handleClose: () => void;
  subCategoryId: string;
  cardData: EachCard;
}

const initialForm: IState["formData"] = {
  name: "",
  groupName: "",
  description: "",
  CPM: "",
};
const initialErrorObj: IState["errorObj"] = {
  name: "",
  groupName: "",
  description: "",
  uploadedImages: "",
  CPM: "",
};
const ScreenGroupsForm = ({
  actionType,
  handleClose,
  subCategoryId,
  cardData,
}: IProps) => {
  const [uploadedImages, setUploadedImages] = useState<
    IState["uploadedImages"]
  >([]);
  const [formData, setFormData] = useState<IState["formData"]>(initialForm);
  const [errorObj, setErrorObj] = useState<IState["errorObj"]>(initialErrorObj);
  const [visitedFields, setVisitedFields] =
    useState<IState["errorObj"]>(initialErrorObj);
  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (/^(?!.* {2})(?!^ ).*$/.test(value)) {
      setFormData((prev) => ({ ...prev, [name]: value }));
      setVisitedFields((prev) => ({ ...prev, [name]: "visited" }));
      setErrorObj((prev) => ({ ...prev, [name]: "" }));
    }
  };
  const dispatch = useAppDispatch();
  const validate = (name?: string) => {
    setVisitedFields((prev) => ({
      ...prev,
      [name as keyof IState["errorObj"]]: "visited",
    }));
    const dummyErrorObj = {} as IState["errorObj"];
    if (uploadedImages.length === 0) {
      dummyErrorObj.uploadedImages = "Required";
    }
    for (let [key, value] of Object.entries(formData)) {
      if (value.length === 0) {
        dummyErrorObj[key as keyof IState["errorObj"]] = "Required";
      } else if (!/^[a-zA-Z ]*$/.test(value) && key !== "CPM") {
        dummyErrorObj[key as keyof IState["errorObj"]] = "Invalid";
      }
    }
    setErrorObj(dummyErrorObj);
    return Object.values(dummyErrorObj).every((each) => each.length === 0);
  };




  
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setVisitedFields({
      description: "visited",
      groupName: "visited",
      name: "visited",
      uploadedImages: "visited",
      CPM: "visited",
    });
    if (validate()) {
      const body = new FormData();
      body.append("name", formData.name);
      body.append("groupName", formData.groupName);
      body.append("description", formData.description);
      if (formData.CPM) body.append("cpmValue", formData.CPM);
      if (typeof uploadedImages[0] !== "string")
        body.append("image", uploadedImages[0]);
      if (actionType === "CREATE") {
        body.append("subCategoryId", subCategoryId);
        dispatch(
          createAndUpdateCard({
            body,
            endPoint: endpoints.GET_SCREEN_GROUPS,
            method: "POST",
          })
        );
      } else {
        dispatch(
          createAndUpdateCard({
            body,
            endPoint: endpoints.GET_SCREEN_GROUPS + "/" + cardData.id,
            method: "PUT",
          })
        );
      }
      handleClose();
    }
  };

  useEffect(() => {
    if (actionType === "UPDATE") {
      setFormData({
        name: cardData.name ?? "",
        groupName: cardData.screenGroupName!,
        description: cardData.description ?? "",
        CPM: cardData.cpmValue ?? "",
      });
      setUploadedImages(
        cardData.screenGroupImage ? [cardData.screenGroupImage.url] : []
      );
    } //eslint-disable-next-line
  }, [actionType]);

  return (
    <Box
      sx={screenGroupsStyles.screenGroupModalStyle}
      component={"form"}
      onSubmit={handleSubmit}
    >
      <Typography sx={categoryStyles.titleText}>
        {actionType === "CREATE" ? "Add New" : "Edit"} Screen Groups
      </Typography>
      <DadzDropzone
        uploadFiles={uploadedImages}
        uploadFileSetter={setUploadedImages}
        boxStyle={{ height: "187px !important" }}
        imgStyle={{ height: 58, width: 58 }}
        helperText={errorObj.uploadedImages ?? ""}
      />
      <InputField
        inputProps={{
          placeholder: "Name",
          onChange: changeHandler,
          onBlur: () => validate("name"),
          value: formData.name,
          fullWidth: true,
          name: "name",
          sx: categoryStyles.inputText,
          helperText: (
            <Typography height={12} color={colors.validate}>
              {(visitedFields.name && errorObj.name) ?? ""}
            </Typography>
          ),
        }}
      />
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <InputField
            inputProps={{
              placeholder: "Group Name",
              onChange: changeHandler,
              onBlur: () => validate("groupName"),
              value: formData.groupName,
              fullWidth: true,
              name: "groupName",
              sx: categoryStyles.inputText,
              helperText: (
                <Typography height={12} color={colors.validate}>
                  {(visitedFields.groupName && errorObj.groupName) ?? ""}
                </Typography>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputField
            inputProps={{
              placeholder: "CPM",
              name: "CPM",
              type: "number",
              onKeyDown: blockInvalidChar,
              onBlur: () => validate("CPM"),
              onChange: changeHandler,
              value: formData.CPM,
              fullWidth: true,
              sx: categoryStyles.inputText,
              helperText: (
                <Typography height={12} color={colors.validate}>
                  {(visitedFields.CPM && errorObj.CPM) ?? ""}
                </Typography>
              ),
            }}
          />
        </Grid>
      </Grid>
      <InputField
        inputProps={{
          placeholder: "Description",
          name: "description",
          onBlur: () => validate("description"),
          onChange: changeHandler,
          value: formData.description,
          fullWidth: true,
          sx: categoryStyles.inputText,
          helperText: (
            <Typography height={12} color={colors.validate}>
              {(visitedFields.description && errorObj.description) ?? ""}
            </Typography>
          ),
        }}
      />

      <CustomButton
        type="submit"
        bgcolor={colors.primary}
        sx={{ height: 48, width: 202, alignSelf: "center" }}
      >
        Save
      </CustomButton>
    </Box>
  );
};

export default ScreenGroupsForm;
