import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import { ContentState, convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "../../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { colors } from "../../../../../config/theme";
import {
  ArgumentType,
  EachDocument,
  getDocuments,
  resetSlice,
  updateDocuments,
} from "../../../../../redux/reducers/superAdmin/AgreementsSlice";
import { useAppDispatch, useAppSelector } from "../../../../../utils/useRedux";
import { ApiStatus } from "../../../common/CommonStyles";
import { styles } from "./Styles";
import "./editorStyles.css";
import { useRoutePermissions } from "../../../../../utils/useRoutePermissions";
interface IState {
  role: number;
  data: string;
  documents: EachDocument[];
}
interface IProps {
  documentType:
    | "ABOUT_US"
    | "TERMS_AND_CONDITIONS"
    | "PRIVACY_POLICY"
    | "AGREEMENT";
}
const differentRoles = [
  { roleId: 7, text: "Admin" },
  { roleId: 8, text: "Host" },
  { roleId: 9, text: "User" },
  { roleId: 10, text: "Vendor" },
  { roleId: 11, text: "Investor" },
  { roleId: 12, text: "Ad Agency" },
];

const getContentState = (data: string) => {
  const contentBlock = htmlToDraft(data);
  const contentState = ContentState.createFromBlockArray(
    contentBlock.contentBlocks
  );
  return contentState;
};
const getSuitableObj = (documentType: IProps["documentType"]) => {
  switch (documentType) {
    case "ABOUT_US":
      return {
        keyOfEndPoint: "GET_ABOUT_US",
        keyInState: "aboutUs",
      };
    case "TERMS_AND_CONDITIONS":
      return {
        keyOfEndPoint: "GET_TERMS_AND_CONDITIONS",
        keyInState: "termsAndConditions",
      };
    case "PRIVACY_POLICY":
      return {
        keyOfEndPoint: "GET_PRIVACY_POLICY",
        keyInState: "privacyPolicy",
      };
    default:
      return {
        keyOfEndPoint: "GET_AGREEMENT_DOCUMENT",
        keyInState: "agreementDocument",
      };
  }
};
const TextEditor = ({ documentType }: IProps) => {
  const dispatch = useAppDispatch();
  const {
    aboutUs,
    agreementDocument,
    privacyPolicy,
    termsAndConditions,
    getDocumentsApiStatus,
    updateDocumentsApiStatus,
  } = useAppSelector((state) => state.AgreementsSlice);
  const [role, setRole] = useState<IState["role"]>(9);
  const [data, setData] = useState<IState["data"]>("");
  const [isEdit, setIsEdit] = useState(false);
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(getContentState(data))
  );
  const onEditorStateChange = (editorState: EditorState) =>
    setEditorState(editorState);
  const dropDownHandler = (event: SelectChangeEvent<IState["role"]>) => {
    setRole(event.target.value as IState["role"]);
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
  const getSuitableDocuments = useMemo(() => {
    switch (documentType) {
      case "ABOUT_US":
        return aboutUs;
      case "TERMS_AND_CONDITIONS":
        return termsAndConditions;
      case "PRIVACY_POLICY":
        return privacyPolicy;
      default:
        return agreementDocument;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getDocumentsApiStatus]);
  const argument: ArgumentType = useMemo(
    () => getSuitableObj(documentType) as ArgumentType,
    [documentType]
  );
  useEffect(() => {
    dispatch(getDocuments(argument));
    return () => {
      dispatch(resetSlice());
    };
  }, [dispatch, documentType, argument]);
  useEffect(() => {
    setEditorState(EditorState.createWithContent(getContentState(data)));
    if (getDocumentsApiStatus === "SUCCESS") {
      setData(
        getSuitableDocuments.filter((each) => each.roleId === role)[0].document
      );
    }
  }, [data, getDocumentsApiStatus, role, getSuitableDocuments]);
  const permissions = useRoutePermissions();
  const editHandler = () => {
    if (isEdit) {
      const htmlDataToBeSend = draftToHtml(
        convertToRaw(editorState.getCurrentContent())
      );
      dispatch(
        updateDocuments({
          document: htmlDataToBeSend,
          keyInEndPoint: argument.keyOfEndPoint,
          roleId: role,
        })
      );
    }
    setIsEdit((prev) => !prev);
  };
  const renderText = () => {
    if (updateDocumentsApiStatus === "PENDING") {
      return (
        <Button
          variant="contained"
          disableElevation
          disableFocusRipple
          disableRipple
          disableTouchRipple
          sx={styles.editBtn}
        >
          <CircularProgress sx={{ color: colors.white }} size={5} />
        </Button>
      );
    }
    return (
      <Button
        variant="contained"
        onClick={editHandler}
        disableElevation
        disableFocusRipple
        disableRipple
        disableTouchRipple
        sx={styles.editBtn}
      >
        {!isEdit ? "Edit" : "Save"}
      </Button>
    );
  };
  return (
    <Stack>
      {permissions.edit&&<Stack>{renderText()}</Stack>}
      <Box sx={{ ...styles.mainContainer, pt: isEdit ? 2 : 9 }}>
        <Select
          value={role}
          onChange={dropDownHandler}
          sx={styles.selectText}
          MenuProps={{
            sx: styles.unShadowMenu,
          }}
        >
          {differentRoles.map((role, index) => (
            <MenuItem value={role.roleId} key={index}>
              {role.text}
            </MenuItem>
          ))}
        </Select>
        {getComponent(
          getDocumentsApiStatus,
          "Something Went Wrong",
          <Editor
            editorState={editorState}
            onEditorStateChange={onEditorStateChange}
            editorClassName="exampleContainer"
            toolbarClassName={isEdit ? "toolbar" : "hidden-toolbar"}
            readOnly={!isEdit}
            toolbar={{
              options: [
                "inline",
                "blockType",
                "fontSize",
                "fontFamily",
                "link",
                "emoji",
                "image",
                "list",
                "textAlign",
              ],
            }}
          />
        )}
      </Box>
    </Stack>
  );
};
export default TextEditor;
