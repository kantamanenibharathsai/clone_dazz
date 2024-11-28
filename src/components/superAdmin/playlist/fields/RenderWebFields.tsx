import { Box, Button, SxProps, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  getLayoutSubWidgets,
  saveSubWidget,
  Widget,
} from "../../../../redux/reducers/layoutsReducer/layouts";
import { useAppDispatch } from "../../../../utils/useRedux";
import { displayAlert } from "../../../../utils/toastMessage";

interface IProps {
  parentId:number;
  onChange: (html: string) => void;
  initialFieldsValue: Widget;
  closeWidgetPreview: () => void;
}

const RenderWebFields: React.FC<IProps> = ({
  parentId,
  onChange,
  initialFieldsValue,
  closeWidgetPreview,
}) => {
  const [fields, setFields] = useState<Widget>(initialFieldsValue as Widget);
  const dispatch = useAppDispatch();
  
  const onChangeFields = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFields({
      ...fields,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    const html = `<iframe style="width: 100%; height: 100%" src="${fields.url}" title="${fields.name}" frameborder="0" allowfullscreen></iframe>`;
    setFields({
      ...fields,
      html,
    });
    onChange(html);
    // eslint-disable-next-line
  }, [fields]);

  const handleSave = async () => {
    if(!fields.url){
      return;
    }
    const formData=new FormData();
    let response;
    if(fields.id===-1){
      if(fields.name!==initialFieldsValue.name){
        formData.append("widgetId",parentId.toString());
        formData.append("name",fields.name.toString());
        formData.append("text",fields.name.toString());
        formData.append("subWidgetImage",fields.url.toString());
        response=await dispatch(saveSubWidget({
          formData,
          type:"POST",
        }))
      }else{
        displayAlert("Please change the  widget name","warning");
      }

    }else{
      formData.append("subWidgetId",fields.id.toString());
      formData.append("name",fields.name.toString());
      formData.append("text",fields.name.toString());
      formData.append("url",fields.url.toString());
      response=await dispatch(saveSubWidget({
        formData,
        type:"PUT",
      }))
    }
    if(response&&response?.meta.requestStatus==="fulfilled"){
      dispatch(
        getLayoutSubWidgets({
          widgetId: parentId ?? 0,
          page: 1,
        })
      );
      closeWidgetPreview();
    }
  };

  return (
    <Box sx={styles.container}>
      <TextField
        label="Widget Name"
        variant="outlined"
        value={fields.name}
        onChange={onChangeFields}
        name="name"
      />
      <TextField
        label="Url"
        variant="outlined"
        value={fields.url}
        onChange={onChangeFields}
        name="url"
      />
      <Button variant="contained" onClick={handleSave}>
        Save
      </Button>
    </Box>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
} satisfies Record<string, SxProps>;

export default RenderWebFields;
